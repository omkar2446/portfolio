import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight, Search, Command, Activity, Cpu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/learn', label: 'Learn' },
    { path: '/blog', label: 'Blog' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'py-4' : 'py-8'
      }`}
    >
      <div className="container-max">
        <div className={`relative flex items-center justify-between px-6 py-3 rounded-full transition-all duration-700 ${
          isScrolled ? 'bg-background/40 backdrop-blur-3xl border border-foreground/[0.03] shadow-premium' : 'bg-transparent'
        }`}>
          {/* Brand Identity */}
          <Link to="/" className="relative z-[60]">
            <motion.div
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="flex items-center gap-4"
            >
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-glow group overflow-hidden">
                <Cpu size={20} className="text-primary-foreground transition-transform duration-500 group-hover:rotate-12" />
              </div>
              <div className="flex flex-col">
                <span className="text-foreground font-heading font-extrabold tracking-tighter text-lg leading-none uppercase">
                  OMKAR TAMBE
                </span>
                <div className="flex items-center gap-2 mt-1">
                  <div className="w-1 h-1 rounded-full bg-primary animate-pulse" />
                  <span className="text-[9px] font-sans font-bold uppercase tracking-[0.2em] text-foreground/40">
                    AI/ML ARCHITECT
                  </span>
                </div>
              </div>
            </motion.div>
          </Link>

          {/* Desktop Navigation Hub */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="relative px-5 py-2 group"
              >
                <span className={`relative z-10 text-[13px] font-sans font-bold tracking-tight uppercase transition-all duration-500 ${
                  location.pathname === link.path ? 'text-primary' : 'text-foreground/40 group-hover:text-foreground'
                }`}>
                  {link.label}
                </span>
                {location.pathname === link.path && (
                  <motion.div
                    layoutId="nav-active"
                    className="absolute inset-0 bg-primary/5 rounded-full border border-primary/10"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Action Center */}
          <div className="flex items-center gap-4 lg:gap-8">
            {/* Command Search Simulation */}
            <div className="hidden xl:flex items-center gap-3 px-4 py-2 bg-foreground/5 border border-foreground/5 rounded-full text-foreground/30 hover:border-primary/20 transition-all cursor-text group">
              <Search size={14} className="group-hover:text-primary transition-colors" />
              <span className="text-[11px] font-sans font-bold uppercase tracking-widest">Search Insights</span>
              <div className="flex items-center gap-1 px-1.5 py-0.5 bg-background border border-foreground/5 rounded text-[9px] font-black">
                <Command size={10} />
                <span>K</span>
              </div>
            </div>

            <div className="hidden md:block">
              <ThemeToggle />
            </div>
            
            <Link to="/contact">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="hidden md:flex items-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground rounded-full font-sans font-bold text-[12px] uppercase tracking-widest hover:shadow-glow transition-all"
              >
                Connect
                <ArrowUpRight size={14} />
              </motion.div>
            </Link>

            {/* Mobile Menu Trigger */}
            <button
              className="relative z-[60] lg:hidden p-2.5 bg-secondary/50 backdrop-blur-xl rounded-xl border border-foreground/5 text-foreground"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Control Center Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 bg-background/98 backdrop-blur-3xl z-50 lg:hidden flex flex-col pt-32 px-8"
          >
            <div className="flex flex-col gap-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.1 }}
                >
                  <Link
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`text-5xl font-heading font-black tracking-tighter uppercase transition-all ${
                      location.pathname === link.path ? 'text-primary' : 'text-foreground/20 hover:text-foreground'
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="pt-12 mt-12 border-t border-foreground/5 flex flex-col gap-10"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <ThemeToggle />
                    <span className="text-[10px] font-sans font-black uppercase tracking-[0.2em] text-foreground/40">Toggle Neural View</span>
                  </div>
                  <Link 
                    to="/contact" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-14 h-14 rounded-full bg-primary flex items-center justify-center text-primary-foreground shadow-glow"
                  >
                    <ArrowUpRight size={24} />
                  </Link>
                </div>
                
                <div className="p-6 bg-foreground/5 rounded-3xl border border-foreground/5">
                  <div className="text-[9px] font-sans font-black uppercase tracking-[0.4em] text-primary mb-4">Core Systems</div>
                  <div className="grid grid-cols-2 gap-4">
                    {['Neural Nets', 'Data Flow', 'API Hub', 'Scalability'].map((t, i) => (
                      <div key={i} className="flex items-center gap-2 text-[10px] font-sans font-bold text-foreground/40">
                        <div className="w-1 h-1 rounded-full bg-primary/40" />
                        {t}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
