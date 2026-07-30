import { Send } from 'lucide-react';

export function ContactSection() {
  return (
    <section id="contact" className="py-28 md:py-40 px-6 bg-gray-50/80 backdrop-blur-md">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 animate-reveal-up">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight">Connect With Us</h2>
          <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
            Have questions or want to discuss a partnership? We&apos;re ready to help you start your Python journey.
          </p>
        </div>

        <form className="space-y-6 bg-white/80 p-8 rounded-2xl border border-gray-200 animate-reveal-up delay-400">
          <div className="grid md:grid-cols-2 gap-6">
            <input
              className="input-field"
              id="name"
              placeholder="Full Name"
              required
            />
            <input
              type="email"
              className="input-field"
              id="email"
              placeholder="Work Email"
              required
            />
          </div>
          <input
            className="input-field"
            id="company"
            placeholder="Company Name"
          />
          <textarea
            className="flex min-h-[150px] w-full rounded-md border px-3 py-2 text-base shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm bg-gray-100/80 border-gray-300 text-gray-900 placeholder:text-gray-500 resize-none"
            id="message"
            placeholder="How can we help?"
            required
          />
          <button
            type="submit"
            className="w-full bg-quantasphere-red hover:bg-quantasphere-red-hover text-white font-semibold py-3 px-6 rounded-lg text-lg flex items-center justify-center gap-2 transition-colors"
          >
            <Send className="w-5 h-5" />
            Send Inquiry
          </button>
        </form>
      </div>
    </section>
  );
}
