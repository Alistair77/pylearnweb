import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Minimize2, ExternalLink, Send, Bot, User } from 'lucide-react';
import logoImg from '../assets/images/logo.svg';
import { Button } from './ui/button';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: '1',
      role: 'assistant',
      content: "Hello! I'm the PyLearnWeb assistant. I can help you learn about our courses, learning tracks, and how the platform works. How can I assist you today?",
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

    // Simulate AI response delay
    setTimeout(() => {
      let responseContent = '';
      const query = userMessage.content.toLowerCase();

      if (query.includes('founder') || query.includes('team') || query.includes('leader') || query.includes('who')) {
        responseContent = `PyLearnWeb is built by a small independent team:
- Co-Founder & CEO
- Co-Founder & CTO
- Co-Founder & Head of Curriculum`;
      } else if (query.includes('course') || query.includes('track') || query.includes('beginner') || query.includes('practitioner') || query.includes('professional')) {
        responseContent = `We offer three learning tracks:
1. **Beginner Track**: Start from zero — syntax, logic, and your first working programs.
2. **Practitioner Track**: Real projects, testing, and clean-code practices for job-ready skills.
3. **Professional Track**: Advanced topics like APIs, data pipelines, and deployment, with mentor code review.`;
      } else if (query.includes('contact') || query.includes('email') || query.includes('support')) {
        responseContent = `You can reach us via the contact form on the home page, or submit a question here anytime!`;
      } else if (query.includes('how') || query.includes('work') || query.includes('curriculum')) {
        responseContent = `PyLearnWeb pairs a structured, project-based curriculum with automated code review and mentor feedback — so every lesson ends with something real you built, checked, and understand.`;
      } else {
        responseContent = `Thanks for your question! PyLearnWeb helps people learn Python through structured lessons and hands-on projects, with real feedback on real code. Ask me about our courses, tracks, or how the platform works.`;
      }

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
    }, 1200);
  };

  const handleOpenAssistant = () => {
    window.open('/Assistant', '_blank');
  };

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-[100] flex items-center gap-3 px-5 py-3 rounded-full bg-quantasphere-red text-white shadow-lg hover:bg-quantasphere-red-hover transition-colors cursor-pointer border-0"
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
                  onClick={handleOpenAssistant}
                  className="h-8 w-8 text-gray-400 hover:text-white hover:bg-neutral-800 border-0 bg-transparent"
                >
                  <ExternalLink className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="h-8 w-8 text-gray-400 hover:text-white hover:bg-neutral-800 border-0 bg-transparent"
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
                    <div className="w-8 h-8 rounded-full bg-quantasphere-red/15 flex items-center justify-center border border-quantasphere-red/30 flex-shrink-0">
                      <Bot className="w-4 h-4 text-accent-on-dark" />
                    </div>
                  )}
                  <div
                    className={`max-w-[75%] rounded-2xl p-3 text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-quantasphere-red text-white rounded-tr-none'
                        : 'bg-neutral-800 text-gray-200 rounded-tl-none border border-neutral-700'
                    }`}
                  >
                    {msg.content}
                  </div>
                  {msg.role === 'user' && (
                    <div className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center border border-neutral-700 flex-shrink-0">
                      <User className="w-4 h-4 text-gray-400" />
                    </div>
                  )}
                </div>
              ))}
              {loading && (
                <div className="flex items-start gap-2.5 justify-start">
                  <div className="w-8 h-8 rounded-full bg-quantasphere-red/15 flex items-center justify-center border border-quantasphere-red/30 flex-shrink-0">
                    <Bot className="w-4 h-4 text-accent-on-dark" />
                  </div>
                  <div className="bg-neutral-800 text-gray-400 rounded-2xl rounded-tl-none p-3 text-sm border border-neutral-700 flex gap-1 items-center">
                    <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" />
                    <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce delay-100" />
                    <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce delay-200" />
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
                className="flex-grow bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-2 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-quantasphere-red focus:border-quantasphere-red transition-all"
              />
              <Button
                type="submit"
                size="icon"
                disabled={!input.trim() || loading}
                className="bg-quantasphere-red hover:bg-quantasphere-red-hover text-white rounded-lg w-9 h-9 border-0 cursor-pointer flex items-center justify-center flex-shrink-0"
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
