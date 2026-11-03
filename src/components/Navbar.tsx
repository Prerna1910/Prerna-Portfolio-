import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Sun, Moon, Github, Globe, Sparkles } from 'lucide-react';
import { DEVELOPER_INFO } from '../constants';
import { cn } from '../lib/utils';

interface NavbarProps {
  onOpenChat?: () => void;
}

export function Navbar({ onOpenChat }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      const sections = ['home', 'about', 'skills', 'experience', 'projects', 'ai-assistant', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', id: 'about' },
    { name: 'Skills', id: 'skills' },
    { name: 'Experience', id: 'experience' },
    { name: 'Projects', id: 'projects' },
    { name: 'AI Studio', id: 'ai-assistant' },
    { name: 'Contact', id: 'contact' },
  ];

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-[#0e0f15]/80 backdrop-blur-md py-3.5 border-b border-white/10 shadow-lg shadow-black/20'
          : 'bg-transparent py-5 border-b border-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <motion.a
          href="#"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-black tracking-tight flex items-center gap-2 group"
        >
          <div className="relative w-4 h-4 flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-ping opacity-30 scale-125" />
            <div className="relative w-3.5 h-3.5 bg-gradient-to-tr from-blue-400 via-purple-400 to-indigo-300 rounded-full group-hover:scale-110 transition-transform shadow-md shadow-purple-500/30" />
          </div>
          <span className="text-white">
            {DEVELOPER_INFO.name.split(' ')[0]}
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-300 bg-clip-text text-transparent">.</span>
          </span>
        </motion.a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          <div className="flex items-center gap-7">
            {navLinks.map((link, i) => (
              <motion.a
                key={link.id}
                href={`#${link.id}`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className={cn(
                  "text-xs font-semibold uppercase tracking-wider transition-all relative py-1.5",
                  activeSection === link.id
                    ? "text-white"
                    : "text-slate-400 hover:text-slate-200"
                )}
              >
                {link.name}
                {activeSection === link.id && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-300 rounded-full"
                  />
                )}
              </motion.a>
            ))}
          </div>
          
          <div className="h-4 w-px bg-white/10" />
          
          <div className="flex items-center gap-3">
            {onOpenChat && (
              <button
                onClick={onOpenChat}
                className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium text-xs shadow-md shadow-purple-500/20 hover:opacity-95 transition-all flex items-center gap-1.5"
                aria-label="Open AI Assistant"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>AI Twin</span>
              </button>
            )}

            <a
              href={DEVELOPER_INFO.github}
              target="_blank"
              rel="noreferrer"
              className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/[0.04] transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>

            <a
              href={DEVELOPER_INFO.resumeUrl}
              className="px-4 py-1.5 bg-white/[0.04] backdrop-blur-md border border-white/10 rounded-xl text-xs font-medium text-white hover:border-purple-400/30 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300"
            >
              Resume
            </a>
          </div>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center gap-2">
          {onOpenChat && (
            <button
              onClick={onOpenChat}
              className="px-2.5 py-1.5 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs font-medium flex items-center gap-1 shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI</span>
            </button>
          )}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-slate-300 hover:text-white"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -10 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -10 }}
            className="md:hidden bg-[#13131a]/95 backdrop-blur-md border-b border-white/10 overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "text-lg font-medium py-1 transition-colors",
                    activeSection === link.id ? "text-purple-300 font-bold" : "text-slate-300 hover:text-white"
                  )}
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <div className="flex gap-4">
                  {onOpenChat && (
                    <button
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        onOpenChat();
                      }}
                      className="flex items-center gap-2 text-purple-300 font-semibold text-sm"
                    >
                      <Sparkles className="w-4 h-4" />
                      Ask AI Twin
                    </button>
                  )}
                  <a href={DEVELOPER_INFO.github} target="_blank" rel="noreferrer" className="text-slate-400">
                    <Github className="w-5 h-5" />
                  </a>
                </div>
                <a
                  href={DEVELOPER_INFO.resumeUrl}
                  className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-medium text-xs shadow-md shadow-purple-500/20"
                >
                  Resume
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
