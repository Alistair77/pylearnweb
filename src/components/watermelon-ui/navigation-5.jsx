import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Menu, ChevronRight, Sun, Moon } from 'lucide-react';
import logoImg from '../../assets/images/logo.svg';

export function Navigation5() {
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme || 'light');

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem('theme', next); } catch { /* storage blocked — still switches for this visit */ }
    setTheme(next);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (!isHome) {
        setActiveSection('');
        return;
      }
      const sections = ['hero', 'technologies', 'two-pronged-approach', 'products', 'about', 'contact'];
      const y = window.scrollY + window.innerHeight / 2;
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && y >= el.offsetTop && y < el.offsetTop + el.offsetHeight) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHome, location.pathname]);

  const handleNavClick = (sectionId) => {
    if (isHome) {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate(`/#${sectionId}`);
    }
    setMobileOpen(false);
  };

  const isCoursesActive = isHome && activeSection === 'products';
  const isAboutActive = isHome && activeSection === 'about';

  const baseLink =
    'rounded-full bg-transparent px-4 py-2 text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-50';

  const triggerCls =
    'h-auto rounded-full bg-transparent px-4 py-2 text-sm font-medium text-neutral-600 transition-all hover:bg-neutral-100/50 hover:text-neutral-900 focus:bg-transparent data-[state=open]:bg-neutral-100/80 dark:text-neutral-400 dark:hover:bg-neutral-800/50 dark:hover:text-neutral-50 dark:data-[state=open]:bg-neutral-800/80';

  return (
    <div className="dark fixed top-0 left-0 right-0 z-50 w-full py-5">
      <div className="mx-auto flex max-w-7xl items-center justify-center px-6">
        {/* Floating Navbar Pill — dark liquid glass */}
        <div className="flex h-16 w-full items-center justify-between gap-2 rounded-full border border-white/10 bg-neutral-900/60 pr-3 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.08)] md:max-w-5xl">
          {/* Logo — white wordmark sits directly on the dark glass pill */}
          <Link to="/" className="flex items-center pl-6 pr-6">
            <img src={logoImg} alt="PyLearnWeb" className="h-9 w-auto object-contain" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden xl:block">
            <NavigationMenu
              className={cn(
                'static',
                '[&>div:last-child]:inset-x-0 [&>div:last-child]:top-full [&>div:last-child]:w-full',
                '[&_[data-slot=navigation-menu-viewport]]:mx-auto [&_[data-slot=navigation-menu-viewport]]:-mt-4 [&_[data-slot=navigation-menu-viewport]]:max-w-md [&_[data-slot=navigation-menu-viewport]]:ring-0',
                '[&_[data-slot=navigation-menu-viewport]]:rounded-2xl [&_[data-slot=navigation-menu-viewport]]:border [&_[data-slot=navigation-menu-viewport]]:border-white/10',
                '[&_[data-slot=navigation-menu-viewport]]:bg-neutral-900/80 [&_[data-slot=navigation-menu-viewport]]:backdrop-blur-xl [&_[data-slot=navigation-menu-viewport]]:shadow-2xl',
                '[&_[data-slot=navigation-menu-viewport]]:transition-all [&_[data-slot=navigation-menu-viewport]]:duration-300 [&_[data-slot=navigation-menu-viewport]]:ease-in-out',
              )}
            >
              <NavigationMenuList className="gap-1">
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link
                      to="/"
                      className={cn(baseLink, isHome && activeSection === 'hero' && 'text-neutral-900 dark:text-neutral-50')}
                    >
                      Home
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <button
                      type="button"
                      onClick={() => handleNavClick('technologies')}
                      className={cn(baseLink, isHome && activeSection === 'technologies' && 'text-neutral-900 dark:text-neutral-50')}
                    >
                      The Problem
                    </button>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger
                    className={cn(triggerCls, isCoursesActive && 'text-neutral-900 dark:text-neutral-50')}
                  >
                    Courses
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="p-0">
                    <div className="flex flex-col p-2 w-64">
                      <button
                        type="button"
                        onClick={() => handleNavClick('products')}
                        className="text-left rounded-lg px-3 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-900"
                      >
                        All Tracks
                      </button>
                      <button
                        type="button"
                        onClick={() => handleNavClick('two-pronged-approach')}
                        className="text-left rounded-lg px-3 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-900"
                      >
                        How It Works
                      </button>
                      <button
                        type="button"
                        onClick={() => handleNavClick('technologies')}
                        className="text-left rounded-lg px-3 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-900"
                      >
                        Why PyLearnWeb
                      </button>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger
                    className={triggerCls}
                  >
                    Resources
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="p-0">
                    <div className="flex flex-col p-2 w-64">
                      <button
                        type="button"
                        onClick={() => handleNavClick('products')}
                        className="text-left rounded-lg px-3 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-900"
                      >
                        Documentation
                      </button>
                      <button
                        type="button"
                        onClick={() => handleNavClick('about')}
                        className="text-left rounded-lg px-3 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-900"
                      >
                        Community
                      </button>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger
                    className={cn(triggerCls, isAboutActive && 'text-neutral-900 dark:text-neutral-50')}
                  >
                    About Us
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="p-0">
                    <div className="flex flex-col p-2 w-64">
                      <button
                        type="button"
                        onClick={() => handleNavClick('about')}
                        className="text-left rounded-lg px-3 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-900"
                      >
                        Team &amp; Milestones
                      </button>
                      <button
                        type="button"
                        onClick={() => handleNavClick('contact')}
                        className="text-left rounded-lg px-3 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-900"
                      >
                        Get in Touch
                      </button>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Right: CTA + Mobile trigger */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              className="flex h-9 w-9 items-center justify-center rounded-full text-neutral-300 transition-colors hover:bg-white/10 hover:text-white"
            >
              {theme === 'dark' ? <Sun className="size-4" /> : <Moon className="size-4" />}
            </button>
            <Button
              onClick={() => handleNavClick('contact')}
              className="hidden rounded-full bg-brand px-6 font-semibold text-white hover:bg-brand-hover md:block"
            >
              Get Started
            </Button>

            <div className="xl:hidden">
              <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full text-neutral-700 dark:text-neutral-300"
                  >
                    <Menu className="size-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="right"
                  className="dark flex w-[320px] flex-col gap-6 p-6 dark:bg-neutral-950 text-neutral-50 border-white/10"
                >
                  <div className="flex items-center pl-1">
                    <img src={logoImg} alt="PyLearnWeb" className="h-9 w-auto object-contain" />
                  </div>

                  <div className="flex flex-col gap-4">
                    <Link
                      to="/"
                      onClick={() => setMobileOpen(false)}
                      className="text-base font-medium text-neutral-900 dark:text-neutral-50"
                    >
                      Home
                    </Link>
                    <button
                      type="button"
                      onClick={() => handleNavClick('technologies')}
                      className="text-left text-base font-medium text-neutral-900 dark:text-neutral-50"
                    >
                      The Problem
                    </button>

                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="courses" className="border-none">
                        <AccordionTrigger className="justify-between py-0 text-base font-medium text-neutral-900 hover:no-underline dark:text-neutral-50">
                          Courses
                        </AccordionTrigger>
                        <AccordionContent className="mt-1 ml-2 flex !h-auto flex-col gap-3 border-l border-neutral-200 pb-0 pl-4 text-base font-medium dark:border-neutral-800 [&_a]:no-underline">
                          <button
                            type="button"
                            onClick={() => handleNavClick('products')}
                            className="text-left text-sm font-medium tracking-tight text-neutral-600 hover:text-brand dark:text-neutral-300"
                          >
                            All Tracks
                          </button>
                          <button
                            type="button"
                            onClick={() => handleNavClick('two-pronged-approach')}
                            className="text-left text-sm font-medium tracking-tight text-neutral-600 hover:text-brand dark:text-neutral-300"
                          >
                            How It Works
                          </button>
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="applications" className="mt-4 border-none">
                        <AccordionTrigger className="justify-between py-0 text-base font-medium text-neutral-900 hover:no-underline dark:text-neutral-50">
                          Resources
                        </AccordionTrigger>
                        <AccordionContent className="mt-1 ml-2 flex !h-auto flex-col gap-3 border-l border-neutral-200 pb-0 pl-4 text-base font-medium dark:border-neutral-800 [&_a]:no-underline">
                          <button
                            type="button"
                            onClick={() => handleNavClick('products')}
                            className="text-left text-sm font-medium tracking-tight text-neutral-600 hover:text-brand dark:text-neutral-300"
                          >
                            Documentation
                          </button>
                          <button
                            type="button"
                            onClick={() => handleNavClick('about')}
                            className="text-left text-sm font-medium tracking-tight text-neutral-600 hover:text-brand dark:text-neutral-300"
                          >
                            Community
                          </button>
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="about" className="mt-4 border-none">
                        <AccordionTrigger className="justify-between py-0 text-base font-medium text-neutral-900 hover:no-underline dark:text-neutral-50">
                          About Us
                        </AccordionTrigger>
                        <AccordionContent className="mt-1 ml-2 flex !h-auto flex-col gap-3 border-l border-neutral-200 pb-0 pl-4 text-base font-medium dark:border-neutral-800 [&_a]:no-underline">
                          <button
                            type="button"
                            onClick={() => handleNavClick('about')}
                            className="text-left text-sm font-medium tracking-tight text-neutral-600 hover:text-brand dark:text-neutral-300"
                          >
                            Team &amp; Milestones
                          </button>
                          <button
                            type="button"
                            onClick={() => handleNavClick('contact')}
                            className="text-left text-sm font-medium tracking-tight text-neutral-600 hover:text-brand dark:text-neutral-300"
                          >
                            Get in Touch
                          </button>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>

                  <div className="mt-auto flex flex-col gap-3">
                    <Button
                      onClick={() => handleNavClick('contact')}
                      className="w-full rounded-full bg-brand text-white hover:bg-brand-hover"
                    >
                      Get Started <ChevronRight className="ml-1 size-4" />
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
