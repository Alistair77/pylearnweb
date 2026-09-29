import TiltedCard from '@/components/ui/TiltedCard';
import { CodeComment, TypeOnView } from './ui/Typewriter';
import CodeSample from './ui/CodeSample';

// Locally generated placeholder art — no network dependency, no real photos.
const initialsAvatar = (initials, bg) =>
  `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="280" height="340"><rect width="280" height="340" fill="${bg}"/><text x="140" y="185" font-family="Arial, sans-serif" font-size="72" font-weight="700" fill="#ffffff" text-anchor="middle" dominant-baseline="middle">${initials}</text></svg>`
  )}`;

const leadership = [
  { id: 'maya-chen', name: 'Maya Chen', role: 'Co-Founder & CEO', image: initialsAvatar('MC', '#0353a4') },
  { id: 'daniel-osei', name: 'Daniel Osei', role: 'Co-Founder & CTO', image: initialsAvatar('DO', '#12263a') },
  { id: 'priya-nair', name: 'Priya Nair', role: 'Co-Founder & Head of Curriculum', image: initialsAvatar('PN', '#2f5d8a') },
];

// What learners build on each track: real code and real output, instead of self-awarded badges
const PROJECTS = [
  {
    track: 'beginner_track',
    title: 'Expense tracker',
    desc: 'Read a CSV of your spending, total it by category and print a clean report. Files, loops, dictionaries and f-strings in one small tool.',
    code: [
      'import csv',
      'from collections import defaultdict',
      '',
      'totals = defaultdict(float)',
      'with open("expenses.csv") as f:',
      '    for row in csv.DictReader(f):',
      '        totals[row["category"]] += float(row["amount"])',
      '',
      'for category, amount in sorted(totals.items()):',
      '    print(f"{category:<10} ${amount:>8.2f}")',
    ],
    output: ['food       $  412.50', 'rent       $ 1200.00', 'transport  $   86.40'],
  },
  {
    track: 'practitioner_track',
    title: 'Weather in your terminal',
    desc: 'Call a real web API, handle timeouts, and turn JSON into something readable.',
    code: [
      'import requests',
      '',
      'city = input("City: ")',
      'r = requests.get(f"https://wttr.in/{city}",',
      '                 params={"format": "3"}, timeout=10)',
      'print(r.text)',
    ],
    output: ['City: Lisbon', 'Lisbon: +21°C'],
  },
  {
    track: 'professional_track',
    title: 'Your own web API',
    desc: 'Ship a typed, tested FastAPI service and deploy it.',
    code: [
      'from fastapi import FastAPI',
      '',
      'app = FastAPI()',
      'tasks: list[str] = []',
      '',
      '@app.post("/tasks")',
      'def add_task(title: str):',
      '    tasks.append(title)',
      '    return {"count": len(tasks)}',
    ],
    output: ['$ curl -X POST "localhost:8000/tasks?title=learn"', '{"count": 1}'],
  },
];

export function AboutSection() {
  return (
    <section id="about" className="py-28 md:py-40 px-6 bg-surface/90">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-end mb-16 md:mb-20 animate-reveal-up">
          <div className="lg:col-span-7">
            <CodeComment>about_us</CodeComment>
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 tracking-tight leading-[1.04] text-balance">
              <TypeOnView text="Built by developers, for developers" />
            </h2>
          </div>
          <div className="lg:col-span-5 lg:pb-2">
            <p className="text-lg text-gray-600 leading-relaxed text-pretty max-w-[48ch]">
              We&apos;re an independent team building the Python learning experience we wish we&apos;d had: practical, project-based, and honest about what it actually takes to learn to code.
            </p>
          </div>
        </div>

        <div className="mb-20">
          <h3 className="text-2xl md:text-4xl font-bold mb-10 text-gray-900 tracking-tight">
            Meet the team
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center sm:justify-items-start max-w-5xl">
            {leadership.map((member) => (
              <TiltedCard
                key={member.id}
                imageSrc={member.image}
                altText={`${member.name}, ${member.role}`}
                captionText={member.name}
                containerHeight="340px"
                containerWidth="280px"
                imageHeight="340px"
                imageWidth="280px"
                rotateAmplitude={12}
                scaleOnHover={1.08}
                showMobileWarning={false}
                showTooltip={true}
                displayOverlayContent={true}
                overlayContent={
                  <div
                    style={{
                      width: '280px',
                      height: '340px',
                      borderRadius: '15px',
                      background:
                        'linear-gradient(to top, rgba(15,15,15,0.9) 0%, rgba(15,15,15,0.35) 45%, rgba(15,15,15,0) 70%)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'flex-end',
                      padding: '20px',
                      color: '#fff',
                    }}
                  >
                    <p style={{ fontSize: '18px', fontWeight: 600, lineHeight: 1.2 }}>
                      {member.name}
                    </p>
                    <p style={{ fontSize: '13px', opacity: 0.85, marginTop: '4px' }}>
                      {member.role}
                    </p>
                  </div>
                }
              />
            ))}
          </div>
        </div>

        <div id="projects" className="scroll-mt-28">
          <h3 className="mb-3 text-2xl md:text-4xl font-bold text-gray-900 tracking-tight">What you&apos;ll build</h3>
          <p className="mb-10 max-w-[60ch] text-lg leading-relaxed text-gray-600">
            Every track ends in projects you can run, show and extend. Here&apos;s a taste of each.
          </p>
          <div className="grid gap-6 lg:grid-cols-12">
            {PROJECTS.map((project, index) => {
              const featured = index === 0;
              return (
                <article
                  key={project.title}
                  className={`flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-surface animate-reveal-up ${
                    featured ? 'lg:col-span-7 lg:row-span-2' : 'lg:col-span-5'
                  }`}
                  style={{ animationDelay: `${(index + 1) * 140}ms` }}
                >
                  <div className={featured ? 'p-7 md:p-9' : 'p-6 md:p-7'}>
                    <p className="mb-2 font-mono text-xs font-medium text-brand">
                      <span className="text-gray-500">#</span> {project.track}
                    </p>
                    <h4 className={`font-semibold tracking-tight text-gray-900 ${featured ? 'text-2xl md:text-3xl' : 'text-xl'}`}>
                      {project.title}
                    </h4>
                    <p className={`mt-2 leading-relaxed text-gray-600 ${featured ? 'max-w-[52ch] text-base' : 'text-[15px]'}`}>
                      {project.desc}
                    </p>
                  </div>
                  <CodeSample
                    lines={project.code}
                    output={project.output}
                    className="flex-1 border-t border-gray-200"
                  />
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
