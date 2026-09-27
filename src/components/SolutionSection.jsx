import { Network, ShieldCheck } from 'lucide-react';
import { CodeComment, TypeOnView } from './ui/Typewriter';

const solutionCards = [
  {
    icon: Network,
    title: 'Structured Curriculum',
    description: 'A clear, project-based path from your first script to production-ready code — no guessing what to learn next.',
  },
  {
    icon: ShieldCheck,
    title: 'Real Code Review',
    description: 'Get instant automated checks plus real mentor feedback on your code, so mistakes become lessons, not habits.',
  },
];

export function SolutionSection() {
  return (
    <section id="two-pronged-approach" className="py-28 md:py-40 px-6 bg-surface/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-reveal-up">
          <CodeComment>how_it_works</CodeComment>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight">
            <TypeOnView text="How PyLearnWeb Teaches" />
          </h2>
          <p className="mt-4 text-lg text-gray-500 max-w-3xl mx-auto">
            We combine structured curriculum with real feedback — the two things most Python resources skip.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
          {solutionCards.map((card, i) => (
            <div
              key={card.title}
              className="bg-surface/80 p-8 rounded-2xl border border-gray-200 transition-all duration-300 hover:ring-2 hover:ring-brand hover:bg-surface animate-reveal-up card-hover"
              style={{ animationDelay: `${(i + 1) * 200}ms` }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-brand-100 rounded-lg">
                  <card.icon className="w-8 h-8 text-brand" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">{card.title}</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">{card.description}</p>
            </div>
          ))}
        </div>

        <div className="max-w-6xl mx-auto animate-reveal-up delay-400">
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-800 tracking-tight">The PyLearnWeb Learning Engine</h3>
          </div>

          <div className="-mx-6 overflow-x-auto px-6 md:mx-0 md:px-0">
          <svg viewBox="0 0 1200 550" xmlns="http://www.w3.org/2000/svg" className="learning-diagram w-full min-w-[760px] h-auto md:min-w-0">
            <defs>
              <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="8" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#4b5563" />
              </marker>
              <filter id="redglow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feFlood floodColor="#ef4444" floodOpacity="0.7" />
                <feComposite in2="coloredBlur" operator="in" />
                <feMerge>
                  <feMergeNode />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
                <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#000000" floodOpacity="0.05" />
              </filter>
              <linearGradient id="qlink-gradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#ef4444" />
                <stop offset="100%" stopColor="#b91c1c" />
              </linearGradient>
            </defs>

            {/* Curriculum Engine Card */}
            <g filter="url(#shadow)">
              <rect x="50" y="20" width="520" height="350" fill="white" stroke="#e5e7eb" strokeWidth="1.5" rx="16" />
              <rect x="50" y="20" width="520" height="50" fill="#1f2937" rx="16" />
              <text x="310" y="52" textAnchor="middle" fontSize="20" fontWeight="600" fill="white" fontFamily="sans-serif">
                Curriculum Engine — Structured Path
              </text>
              <circle cx="150" cy="190" r="40" fill="#374151" />
              <text x="150" y="195" textAnchor="middle" fontSize="18" fill="white" fontFamily="sans-serif">You</text>
              <rect x="120" y="120" width="60" height="30" fill="#ef4444" rx="5" />
              <text x="150" y="140" textAnchor="middle" fontSize="12" fill="white" fontFamily="sans-serif">Lesson</text>
              <circle cx="470" cy="190" r="40" fill="#374151" />
              <text x="470" y="195" textAnchor="middle" fontSize="18" fill="white" fontFamily="sans-serif">Mentor</text>
              <rect x="440" y="120" width="60" height="30" fill="#6b7280" rx="5" />
              <text x="470" y="140" textAnchor="middle" fontSize="12" fill="#e5e7eb" fontFamily="sans-serif">Feedback</text>
              <line x1="190" y1="190" x2="430" y2="190" stroke="#ef4444" strokeWidth="2.5" strokeDasharray="8,4" />
              <text x="310" y="180" textAnchor="middle" fontSize="14" fill="#4b5563" fontFamily="sans-serif">Learning Path</text>
              <circle cx="220" cy="190" r="5" fill="#ef4444" filter="url(#redglow)">
                <animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite" />
              </circle>
              <circle cx="310" cy="190" r="5" fill="#ef4444" filter="url(#redglow)">
                <animate attributeName="opacity" values="0;1;0" dur="2s" begin="0.5s" repeatCount="indefinite" />
              </circle>
              <circle cx="400" cy="190" r="5" fill="#ef4444" filter="url(#redglow)">
                <animate attributeName="opacity" values="0;1;0" dur="2s" begin="1s" repeatCount="indefinite" />
              </circle>
              <line x1="190" y1="220" x2="430" y2="220" stroke="#9ca3af" strokeWidth="2" />
              <text x="310" y="235" textAnchor="middle" fontSize="12" fill="#6b7280" fontFamily="sans-serif">Practice Loop</text>
              <rect x="210" y="270" width="200" height="70" fill="#f9fafb" stroke="#e5e7eb" strokeWidth="1" rx="8" />
              <text x="310" y="290" textAnchor="middle" fontSize="14" fontWeight="600" fill="#374151" fontFamily="sans-serif">Core Curriculum</text>
              <text x="310" y="308" textAnchor="middle" fontSize="12" fill="#6b7280" fontFamily="sans-serif">• Guided Lessons</text>
              <text x="310" y="324" textAnchor="middle" fontSize="12" fill="#6b7280" fontFamily="sans-serif">• Hands-on Labs</text>
            </g>

            {/* Practice Engine Card */}
            <g filter="url(#shadow)">
              <rect x="630" y="20" width="520" height="350" fill="white" stroke="#e5e7eb" strokeWidth="1.5" rx="16" />
              <rect x="630" y="20" width="520" height="50" fill="#dc2626" rx="16" />
              <text x="890" y="52" textAnchor="middle" fontSize="20" fontWeight="600" fill="white" fontFamily="sans-serif">
                Practice Engine — Code Review
              </text>
              <circle cx="730" cy="190" r="40" fill="#374151" />
              <text x="730" y="195" textAnchor="middle" fontSize="18" fill="white" fontFamily="sans-serif">You</text>
              <circle cx="1050" cy="190" r="40" fill="#374151" />
              <text x="1050" y="195" textAnchor="middle" fontSize="18" fill="white" fontFamily="sans-serif">Mentor</text>
              <line x1="770" y1="190" x2="1010" y2="190" stroke="#4b5563" strokeWidth="2.5" />
              <text x="890" y="180" textAnchor="middle" fontSize="14" fill="#4b5563" fontFamily="sans-serif">Your Code</text>
              <rect x="830" y="210" width="120" height="60" fill="#f9fafb" stroke="#e5e7eb" strokeWidth="1" rx="8" />
              {[-40, -20, 0, 20, 40].map((x) => (
                <g key={x}>
                  <circle cx={890 + x} cy={230} r="2" fill="#9ca3af" />
                  <circle cx={890 + x} cy={250} r="2" fill="#9ca3af" />
                </g>
              ))}
              <line x1={890} y1={250} x2={915} y2={235} stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrowhead)" />
              <circle cx={890} cy={250} r="4" fill="#ef4444" />
              <rect x="710" y="280" width="80" height="30" fill="#f9fafb" stroke="#e5e7eb" strokeWidth="1" rx="8" />
              <text x="750" y="300" textAnchor="middle" fontSize="12" fill="#374151" fontFamily="sans-serif">Draft</text>
              <rect x="810" y="280" width="80" height="30" fill="#f9fafb" stroke="#e5e7eb" strokeWidth="1" rx="8" />
              <text x="850" y="300" textAnchor="middle" fontSize="12" fill="#374151" fontFamily="sans-serif">Review</text>
              <rect x="910" y="280" width="80" height="30" fill="#f9fafb" stroke="#e5e7eb" strokeWidth="1" rx="8" />
              <text x="950" y="300" textAnchor="middle" fontSize="12" fill="#374151" fontFamily="sans-serif">Feedback</text>
              <rect x="1010" y="280" width="80" height="30" fill="#f9fafb" stroke="#e5e7eb" strokeWidth="1" rx="8" />
              <text x="1050" y="300" textAnchor="middle" fontSize="12" fill="#374151" fontFamily="sans-serif">Certify</text>
              <text x="890" y="345" textAnchor="middle" fontSize="12" fill="#6b7280" fontFamily="sans-serif">Production Ready</text>
            </g>

            {/* Integration */}
            <path d="M 310 370 Q 310 440, 600 440" stroke="#9ca3af" strokeWidth="2" fill="none" markerEnd="url(#arrowhead)" />
            <path d="M 890 370 Q 890 440, 600 440" stroke="#9ca3af" strokeWidth="2" fill="none" markerEnd="url(#arrowhead)" />
            <rect x="500" y="470" width="200" height="40" fill="#1f2937" rx="20" />
            <text x="600" y="495" textAnchor="middle" fontSize="14" fontWeight="500" fill="white" fontFamily="sans-serif">Skill Mastery</text>
          </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
