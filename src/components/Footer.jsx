import { useLocation, useNavigate } from 'react-router-dom';
import footerLogoImg from '../assets/images/logo.svg';

export default function Footer() {
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';

  const handleNavClick = (sectionId) => {
    if (isHome) {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(`/#${sectionId}`);
    }
  };

  return (
    <footer className="relative z-10 bg-zinc-950 text-zinc-400 border-t border-white/10">
      <div className="max-w-7xl mx-auto py-12 px-6">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          {/* Logo and blurb */}
          <div className="flex-shrink-0 max-w-sm">
            <div className="flex items-center gap-3">
              <img src={footerLogoImg} alt="PythonSphere Logo" className="h-8 w-auto object-contain" />
            </div>
            <p className="mt-4 text-sm text-zinc-500">
              Making Python approachable, one project at a time.
            </p>
            <div className="mt-6">
              <h4 className="font-semibold text-zinc-100 mb-2">Remote-First Team</h4>
              <p className="text-sm leading-relaxed text-zinc-400">
                Based remotely, serving learners worldwide.
              </p>
            </div>
          </div>

          {/* Links Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 flex-grow">
            {/* Column 1 */}
            <div>
              <h3 className="font-semibold text-zinc-100 mb-3 text-sm uppercase tracking-wider">
                Courses
              </h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <button onClick={() => handleNavClick('products')} className="hover:text-white transition-colors text-left bg-transparent border-0 p-0 cursor-pointer text-zinc-400">
                    Beginner Track
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNavClick('products')} className="hover:text-white transition-colors text-left bg-transparent border-0 p-0 cursor-pointer text-zinc-400">
                    Practitioner Track
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNavClick('products')} className="hover:text-white transition-colors text-left bg-transparent border-0 p-0 cursor-pointer text-zinc-400">
                    Professional Track
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNavClick('two-pronged-approach')} className="hover:text-white transition-colors text-left bg-transparent border-0 p-0 cursor-pointer text-zinc-400">
                    How It Works
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 2 */}
            <div>
              <h3 className="font-semibold text-zinc-100 mb-3 text-sm uppercase tracking-wider">
                Community
              </h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <button onClick={() => handleNavClick('about')} className="hover:text-white transition-colors text-left bg-transparent border-0 p-0 cursor-pointer text-zinc-400">
                    Blog
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNavClick('about')} className="hover:text-white transition-colors text-left bg-transparent border-0 p-0 cursor-pointer text-zinc-400">
                    Discussion Forum
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNavClick('products')} className="hover:text-white transition-colors text-left bg-transparent border-0 p-0 cursor-pointer text-zinc-400">
                    Documentation
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 3 */}
            <div>
              <h3 className="font-semibold text-zinc-100 mb-3 text-sm uppercase tracking-wider">
                Company
              </h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <button
                    onClick={() => handleNavClick('about')}
                    className="hover:text-white transition-colors text-left bg-transparent border-0 p-0 cursor-pointer text-zinc-400"
                  >
                    About Us
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavClick('contact')}
                    className="hover:text-white transition-colors text-left bg-transparent border-0 p-0 cursor-pointer text-zinc-400"
                  >
                    Contact
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavClick('technologies')}
                    className="hover:text-white transition-colors text-left bg-transparent border-0 p-0 cursor-pointer text-zinc-400"
                  >
                    Why Python
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Socials and Copyright */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs">
          <p>© {new Date().getFullYear()} PythonSphere. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="hover:text-white text-zinc-500 transition-colors"
              aria-label="X (Twitter)"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="hover:text-white text-zinc-500 transition-colors"
              aria-label="LinkedIn"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
