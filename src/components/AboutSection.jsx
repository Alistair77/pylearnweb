import { Award, Globe, Calendar } from 'lucide-react';
import TiltedCard from '@/components/ui/TiltedCard';

const awardIcons = [Award, Globe, Calendar];

// Locally generated placeholder art — no network dependency, no real photos.
const initialsAvatar = (initials, bg) =>
  `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="280" height="340"><rect width="280" height="340" fill="${bg}"/><text x="140" y="185" font-family="Arial, sans-serif" font-size="72" font-weight="700" fill="#ffffff" text-anchor="middle" dominant-baseline="middle">${initials}</text></svg>`
  )}`;

const milestoneTile = (from, to) =>
  `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="${from}"/><stop offset="100%" stop-color="${to}"/></linearGradient></defs><rect width="800" height="500" fill="url(#g)"/></svg>`
  )}`;

const leadership = [
  { id: 'maya-chen', name: 'Maya Chen', role: 'Co-Founder & CEO', image: initialsAvatar('MC', '#0353a4') },
  { id: 'daniel-osei', name: 'Daniel Osei', role: 'Co-Founder & CTO', image: initialsAvatar('DO', '#12263a') },
  { id: 'priya-nair', name: 'Priya Nair', role: 'Co-Founder & Head of Curriculum', image: initialsAvatar('PN', '#2f5d8a') },
];

const awards = [
  {
    title: '50,000+ Learners Milestone',
    description: "Crossed 50,000 active learners building real Python skills through PyLearnWeb's project-based curriculum.",
    image: milestoneTile('#0353a4', '#12263a'),
  },
  {
    title: 'Featured in Developer Weekly',
    description: 'Recognized by Developer Weekly for our practical, project-first approach to teaching Python.',
    image: milestoneTile('#12263a', '#0b1a29'),
  },
  {
    title: 'Top-Rated Learning Platform',
    description: "Rated among the top Python learning platforms by our own community of learners and mentors.",
    image: milestoneTile('#2f5d8a', '#12263a'),
  },
];

export function AboutSection() {
  return (
    <section id="about" className="py-28 md:py-40 px-6 bg-surface/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-end mb-16 md:mb-20 animate-reveal-up">
          <div className="lg:col-span-7">
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 tracking-tight leading-[1.04] text-balance">
              Built by developers, for developers
            </h2>
          </div>
          <div className="lg:col-span-5 lg:pb-2">
            <p className="text-lg text-gray-600 leading-relaxed text-pretty max-w-[48ch]">
              We&apos;re an independent team building the Python learning experience we wish we&apos;d had — practical, project-based, and honest about what it actually takes to learn to code.
            </p>
          </div>
        </div>

        <div className="mb-20">
          <h3 className="text-2xl md:text-4xl font-bold mb-10 text-gray-900 tracking-tight">
            Our Leadership
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center sm:justify-items-start max-w-5xl">
            {leadership.map((member) => (
              <TiltedCard
                key={member.id}
                imageSrc={member.image}
                altText={`${member.name} — ${member.role}`}
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

        <div>
          <h3 className="text-2xl md:text-4xl font-bold mb-10 text-gray-900 tracking-tight">
            Milestones &amp; Recognition
          </h3>
          <div className="grid lg:grid-cols-12 gap-6">
            {awards.map((award, index) => {
              const Icon = awardIcons[index] || Award;
              const featured = index === 0;
              return (
                <article
                  key={award.title}
                  className={`group relative overflow-hidden rounded-2xl ring-1 ring-gray-200 animate-reveal-up ${
                    featured
                      ? 'lg:col-span-7 lg:row-span-2 min-h-[320px] lg:min-h-[460px]'
                      : 'lg:col-span-5 min-h-[220px]'
                  }`}
                  style={{ animationDelay: `${(index + 1) * 160}ms` }}
                >
                  <img
                    src={award.image}
                    alt={award.title}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/35 to-transparent"
                  />
                  <div className={`relative flex h-full flex-col justify-end ${featured ? 'p-8 md:p-10' : 'p-6 md:p-7'}`}>
                    <span className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/15 text-white backdrop-blur-sm">
                      <Icon className="w-5 h-5" strokeWidth={1.5} />
                    </span>
                    <h4 className={`font-semibold text-white tracking-tight ${featured ? 'text-2xl md:text-3xl mb-3' : 'text-lg mb-2'}`}>
                      {award.title}
                    </h4>
                    <p className={`text-zinc-300 leading-relaxed ${featured ? 'text-base max-w-[46ch]' : 'text-sm max-w-[42ch] line-clamp-3'}`}>
                      {award.description}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
