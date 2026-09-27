import { Fragment, useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Minimize2, Send, Bot, User } from 'lucide-react';
import logoImg from '../assets/images/logo.svg';
import { Button } from './ui/button';
import knowledge from './chat/knowledge.md?raw';
import { createAnswerer } from './chat/answer';

const { answer } = createAnswerer(knowledge);
// Short pause so replies feel considered rather than instant
const REPLY_DELAY_MS = 450;

/* Replies use a markdown subset: ```fenced code```, `inline code` and **bold**.
   Rendered as React text nodes (no HTML injection). */
function formatInline(text) {
  return text.split('`').map((part, i) =>
    i % 2 ? (
      <code key={i} className="rounded bg-black/30 px-1 py-0.5 font-mono text-[12.5px] text-accent-on-dark">
        {part}
      </code>
    ) : (
      <Fragment key={i}>
        {part.split('**').map((p, j) =>
          j % 2 ? (
            <strong key={j} className="font-semibold text-zinc-50">
              {p}
            </strong>
          ) : (
            p
          ),
        )}
      </Fragment>
    ),
  );
}

function formatReply(text) {
  return text.split('```').map((chunk, i) =>
    i % 2 ? (
      <pre
        key={i}
        className="my-2 overflow-x-auto whitespace-pre rounded-lg border border-white/10 bg-black/40 p-3 font-mono text-[12.5px] leading-relaxed text-zinc-100"
      >
        <code>{chunk.replace(/^[a-z]*\n/, '').replace(/\n$/, '')}</code>
      </pre>
    ) : (
      <Fragment key={i}>{formatInline(chunk.replace(/^\n|\n$/g, ''))}</Fragment>
    ),
  );
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: '1',
      role: 'assistant',
      content: "Hi! I'm the PyLearnWeb assistant. Ask me any Python question — `how do lists work?`, `what is a decorator?`, `how do I fix IndentationError?` — or about our courses.",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, loading]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    setTimeout(() => {
      const responseContent = answer(userMessage.content);

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: responseContent,
          timestamp: new Date()
        }
      ]);
      setLoading(false);
    }, REPLY_DELAY_MS);
  };

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-[100] flex items-center gap-3 px-5 py-3 rounded-full bg-brand text-white shadow-lg hover:bg-brand-hover transition-colors cursor-pointer border-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            whileHover={{ scale: 1.05 }}
          >
            <MessageSquare className="h-6 w-6" />
            <span className="font-semibold text-sm">Chat with us</span>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed bottom-6 right-6 z-[100] w-[90vw] max-w-[400px] h-[70vh] max-h-[600px] bg-neutral-900 rounded-2xl shadow-2xl flex flex-col border border-neutral-800 text-white overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-neutral-800 bg-neutral-950/80 rounded-t-2xl flex-shrink-0">
              <div className="flex items-center gap-2">
                <img src={logoImg} alt="PyLearnWeb" className="h-6 w-auto object-contain" />
                <h3 className="font-semibold text-white text-sm">AI Assistant</h3>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="h-8 w-8 text-zinc-400 hover:text-white hover:bg-neutral-800 border-0 bg-transparent"
                >
                  <Minimize2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Message List */}
            <div className="flex-grow overflow-y-auto p-4 space-y-4 bg-neutral-950/30">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex items-start gap-2.5 ${
                    msg.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {msg.role !== 'user' && (
                    <div className="w-8 h-8 rounded-full bg-brand/15 flex items-center justify-center border border-brand/30 flex-shrink-0">
                      <Bot className="w-4 h-4 text-accent-on-dark" />
                    </div>
                  )}
                  <div
                    className={`min-w-0 whitespace-pre-line rounded-2xl p-3 text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'max-w-[75%] bg-brand text-white rounded-tr-none'
                        : 'max-w-[85%] bg-neutral-800 text-zinc-200 rounded-tl-none border border-neutral-700'
                    }`}
                  >
                    {msg.role === 'user' ? msg.content : formatReply(msg.content)}
                  </div>
                  {msg.role === 'user' && (
                    <div className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center border border-neutral-700 flex-shrink-0">
                      <User className="w-4 h-4 text-zinc-400" />
                    </div>
                  )}
                </div>
              ))}
              {loading && (
                <div className="flex items-start gap-2.5 justify-start">
                  <div className="w-8 h-8 rounded-full bg-brand/15 flex items-center justify-center border border-brand/30 flex-shrink-0">
                    <Bot className="w-4 h-4 text-accent-on-dark" />
                  </div>
                  <div className="bg-neutral-800 text-zinc-400 rounded-2xl rounded-tl-none p-3 text-sm border border-neutral-700 flex gap-1 items-center">
                    <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce" />
                    <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce delay-100" />
                    <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce delay-200" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <form
              onSubmit={handleSend}
              className="p-3 bg-neutral-950 border-t border-neutral-800 flex gap-2 items-center flex-shrink-0"
            >
              <input
                type="text"
                placeholder="Ask a question..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-grow bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-2 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-1 focus:ring-brand focus:border-brand transition-all"
              />
              <Button
                type="submit"
                size="icon"
                disabled={!input.trim() || loading}
                className="bg-brand hover:bg-brand-hover text-white rounded-lg w-9 h-9 border-0 cursor-pointer flex items-center justify-center flex-shrink-0"
              >
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
