import React from 'react';
import { Globe, Mail } from 'lucide-react';
import { cn } from '@/lib/utils';

const Twitter = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const Linkedin = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

const Github = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

const Dribbble = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="12" cy="12" r="10" />
    <path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.49-11.05 1-11.6 8.56" />
  </svg>
);

const IconMap = {
  twitter: Twitter,
  linkedin: Linkedin,
  github: Github,
  dribbble: Dribbble,
  website: Globe,
  email: Mail,
};

const defaultMembers = [
  {
    id: '1',
    name: 'Eleanor Pena',
    role: 'Founder & CEO',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800&auto=format&fit=crop',
    bio: 'Eleanor is a visionary leader with over a decade of experience designing intuitive and engaging user experiences for global brands.',
    socials: [
      { icon: 'twitter', url: '#' },
      { icon: 'linkedin', url: '#' }
    ]
  },
  {
    id: '2',
    name: 'Cody Fisher',
    role: 'Head of Engineering',
    image: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=800&auto=format&fit=crop',
    bio: 'A technical mastermind, Cody specializes in building robust, scalable architectures and leading high-performing engineering teams.',
    socials: [
      { icon: 'github', url: '#' },
      { icon: 'linkedin', url: '#' },
      { icon: 'twitter', url: '#' }
    ]
  },
  {
    id: '3',
    name: 'Courtney Henry',
    role: 'Lead Designer',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=800&auto=format&fit=crop',
    bio: 'Courtney crafts pixel-perfect designs with a relentless focus on user-centric principles and modern aesthetic trends.',
    socials: [
      { icon: 'dribbble', url: '#' },
      { icon: 'website', url: '#' }
    ]
  },
  {
    id: '4',
    name: 'Albert Flores',
    role: 'Product Manager',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=800&auto=format&fit=crop',
    bio: 'Albert excels at connecting complex user needs with technical execution, driving product strategy from concept to launch.',
    socials: [
      { icon: 'linkedin', url: '#' },
      { icon: 'email', url: 'mailto:#' }
    ]
  }
];

export default function Team1({
  badge = "Our Team",
  heading = "Meet the minds behind the magic",
  description = "Our team of passionate designers, engineers, and strategists are dedicated to building the best products in the world.",
  members = defaultMembers,
  className,
}) {
  return (
    <section className={cn('bg-background py-24 md:py-32', className)}>
      <div className="container mx-auto px-4 md:px-6">

        <div className="mx-auto mb-16 flex max-w-3xl flex-col items-center text-center md:mb-24">
          {badge && (
            <div className="border-border bg-muted text-muted-foreground mb-6 inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium">
              {badge}
            </div>
          )}
          {heading && (
            <h2 className="text-foreground mb-6 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
              {heading}
            </h2>
          )}
          {description && (
            <p className="text-muted-foreground text-lg leading-relaxed md:text-xl">
              {description}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 justify-center max-w-5xl mx-auto">
          {members.map((member) => (
            <div
              key={member.id}
              className="group bg-muted focus-within:ring-ring border-zinc-100 dark:border-zinc-900 relative aspect-[4/5] overflow-hidden rounded-4xl border-6 focus-within:ring-2 focus-within:ring-offset-2 sm:aspect-[3/4]"
              tabIndex={0}
            >
              <img
                src={member.image}
                alt={member.name}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
              />

              <div
                className="absolute inset-0 rounded-4xl opacity-0 backdrop-blur-md transition-opacity duration-500 group-focus-within:opacity-100 group-hover:opacity-100"
                style={{
                  WebkitMaskImage:
                    'linear-gradient(to top, black 10%, transparent 70%)',
                  maskImage:
                    'linear-gradient(to top, black 10%, transparent 70%)',
                }}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent opacity-80 transition-opacity duration-500 group-focus-within:opacity-90 group-hover:opacity-90" />

              <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-6">
                <div className="z-10">
                  <h3 className="text-xl font-semibold tracking-tight text-white">
                    {member.name}
                  </h3>
                  <p className="text-sm font-medium tracking-wider text-zinc-200">
                    {member.role}
                  </p>

                  <div className="grid grid-rows-[0fr] opacity-0 transition-all duration-300 ease-out group-focus-within:grid-rows-[1fr] group-focus-within:opacity-100 group-hover:grid-rows-[1fr] group-hover:opacity-100 ">
                    <div className="overflow-hidden">
                      <div className="flex flex-col gap-2 pt-2">
                        {member.bio && (
                          <p className="line-clamp-3 text-sm leading-tight text-white/80">
                            {member.bio}
                          </p>
                        )}
                        {member.socials && member.socials.length > 0 && (
                          <div className="flex items-center gap-3 mb-1">
                            {member.socials.map((social, idx) => {
                              const Icon = IconMap[social.icon];
                              if (!Icon) return null;
                              return (
                                <a
                                  key={idx}
                                  href={social.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-all hover:bg-white hover:text-zinc-950 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-zinc-950 focus:outline-none"
                                  aria-label={`Visit ${member.name}'s ${social.icon}`}
                                >
                                  <Icon className="h-4 w-4" />
                                </a>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
