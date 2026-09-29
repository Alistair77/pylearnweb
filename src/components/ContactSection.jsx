import { useState } from 'react';
import { Send } from 'lucide-react';
import { CodeComment, TypeOnView } from './ui/Typewriter';

const ROLES = ['Complete beginner', 'Career switcher', 'Student', 'Something else'];
const SEND_DELAY_MS = 700;

// ponytail: no backend yet; the form validates and confirms in place. Wire submitMessage
// to a form service (Formspree, Resend, a serverless endpoint) to deliver real email.
function submitMessage() {
  return new Promise((resolve) => setTimeout(resolve, SEND_DELAY_MS));
}

export function ContactSection() {
  const [status, setStatus] = useState('idle'); // idle | sending | sent
  const [sentTo, setSentTo] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    setStatus('sending');
    await submitMessage(Object.fromEntries(data));
    setSentTo(String(data.get('email')));
    setStatus('sent');
  };

  return (
    <section id="contact" className="py-28 md:py-40 px-6 bg-gray-50/90">
      <div className="max-w-3xl mx-auto">
        <div className="mb-12 animate-reveal-up">
          <CodeComment>get_in_touch</CodeComment>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight">
            <TypeOnView text="Ask us anything" />
          </h2>
          <p className="mt-4 max-w-[56ch] text-lg leading-relaxed text-gray-600">
            Questions about the tracks, mentoring or where to start? Send a note and a real person will reply.
          </p>
        </div>

        {status === 'sent' ? (
          <div
            role="status"
            className="rounded-2xl border border-gray-200 bg-surface p-8 font-mono text-sm leading-relaxed animate-reveal-up"
          >
            <p className="text-gray-600">
              <span className="text-brand">&gt;&gt;&gt;</span> send(message)
            </p>
            <p className="mt-2 font-sans text-lg text-gray-900">
              Message received. We&apos;ll reply to <span className="font-semibold">{sentTo}</span> within a day or two.
            </p>
            <button
              type="button"
              onClick={() => setStatus('idle')}
              className="mt-6 inline-flex min-h-11 items-center font-sans text-sm font-semibold text-brand"
            >
              Send another message
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="space-y-6 rounded-2xl border border-gray-200 bg-surface p-6 sm:p-8 animate-reveal-up delay-400"
          >
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label htmlFor="contact-name" className="mb-2 block text-sm font-medium text-gray-800">
                  Name
                </label>
                <input id="contact-name" name="name" autoComplete="name" required className="input-field" />
              </div>
              <div>
                <label htmlFor="contact-email" className="mb-2 block text-sm font-medium text-gray-800">
                  Email
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="input-field"
                />
              </div>
            </div>

            <div>
              <label htmlFor="contact-role" className="mb-2 block text-sm font-medium text-gray-800">
                Which describes you best?
              </label>
              <select id="contact-role" name="role" defaultValue={ROLES[0]} className="input-field">
                {ROLES.map((role) => (
                  <option key={role}>{role}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="contact-message" className="mb-2 block text-sm font-medium text-gray-800">
                Your question
              </label>
              <textarea
                id="contact-message"
                name="message"
                required
                rows={5}
                placeholder="e.g. I've never coded. Which track should I start with?"
                className="input-field h-auto min-h-[150px] resize-y py-3"
              />
            </div>

            <button
              type="submit"
              disabled={status === 'sending'}
              className="flex w-full min-h-12 items-center justify-center gap-2 rounded-lg bg-brand px-6 py-3 text-lg font-semibold text-white transition-colors hover:bg-brand-hover disabled:cursor-wait disabled:opacity-70"
            >
              <Send className="h-5 w-5" aria-hidden="true" />
              {status === 'sending' ? 'Sending…' : 'Send message'}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
