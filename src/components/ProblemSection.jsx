import { TriangleAlert, ServerCrash, Clock, ArrowRight } from 'lucide-react';

const problems = [
  {
    icon: TriangleAlert,
    title: 'Tutorial Hell',
    description: 'Endless videos and copy-pasted code that never turns into projects you actually understand.',
  },
  {
    icon: ServerCrash,
    title: 'No Clear Path',
    description: 'Scattered resources with no structured roadmap make it hard to know what to learn next.',
  },
  {
    icon: Clock,
    title: "Skills That Don't Stick",
    description: 'Without hands-on practice and real feedback, concepts fade as fast as they were learned.',
  },
];

export function ProblemSection() {
  return (
    <section id="technologies" className="py-28 md:py-40 px-6 bg-gray-50/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto">
        {/* Editorial header — headline carries the section, no eyebrow scaffolding */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-end mb-14 md:mb-18 animate-reveal-up">
          <div className="lg:col-span-7">
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 tracking-tight leading-[1.04] text-balance">
              Why most people give up learning Python
            </h2>
          </div>
          <div className="lg:col-span-5 lg:pb-2">
            <p className="text-lg text-gray-600 leading-relaxed text-pretty max-w-[48ch]">
              Scattered tutorials and no feedback loop make learning feel harder than it should. It doesn&apos;t have to be that way.
            </p>
          </div>
        </div>

        {/* Pain points — logic grouping via dividers, not boxes */}
        <div className="border-t border-gray-200">
          {problems.map((problem, index) => (
            <div
              key={problem.title}
              className="group grid md:grid-cols-12 gap-4 md:gap-10 items-start py-8 md:py-10 border-b border-gray-200 transition-colors duration-300 hover:bg-white/60 animate-reveal-up"
              style={{ animationDelay: `${(index + 1) * 120}ms` }}
            >
              <div className="md:col-span-5 flex items-start gap-4">
                <span className="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-quantasphere-red-50 text-quantasphere-red transition-transform duration-300 group-hover:-translate-y-1">
                  <problem.icon className="w-5 h-5" strokeWidth={1.5} />
                </span>
                <h3 className="pt-1.5 text-xl md:text-2xl font-semibold text-gray-900 tracking-tight leading-snug text-balance">
                  {problem.title}
                </h3>
              </div>
              <div className="md:col-span-6 md:col-start-7">
                <p className="text-gray-600 md:text-lg leading-relaxed text-pretty">
                  {problem.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 animate-reveal-up delay-500">
          <button
            type="button"
            onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
            className="group inline-flex items-center gap-2 text-base font-semibold text-gray-900 hover:text-quantasphere-red transition-colors active:translate-y-px"
          >
            See how PythonSphere is different
            <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </section>
  );
}
