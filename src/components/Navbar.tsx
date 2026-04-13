import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Rocket } from 'lucide-react';
import gsap from 'gsap';
import ThemeToggle from './ThemeToggle';

/**
 * Navbar - The "Proper" Edition
 * Perfectly balanced, glass-pill design with synchronized animations.
 */
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navRef = useRef<HTMLDivElement>(null);
  const hireBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);

    // Entrance Animation
    const ctx = gsap.context(() => {
      gsap.from('.nav-pill', {
        y: -100,
        opacity: 0,
        duration: 1,
        ease: 'power4.out',
      });
    }, navRef);

    // Magnetic CTA
    const btn = hireBtnRef.current;
    if (btn) {
      const magnetic = (e: MouseEvent) => {
        const { left, top, width, height } = btn.getBoundingClientRect();
        const x = e.clientX - (left + width / 2);
        const y = e.clientY - (top + height / 2);
        if (Math.abs(x) < 70 && Math.abs(y) < 70) {
          gsap.to(btn, { x: x * 0.4, y: y * 0.4, rotate: x * 0.05, duration: 0.3 });
        } else {
          gsap.to(btn, { x: 0, y: 0, rotate: 0, duration: 0.5, ease: 'back.out(1.7)' });
        }
      };
      window.addEventListener('mousemove', magnetic);
      return () => window.removeEventListener('mousemove', magnetic);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      ctx.revert();
    };
  }, []);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/learn', label: 'Learn' },
    { path: '/blog', label: 'Blog' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-500 ${
        isScrolled ? 'pt-2' : 'pt-6'
      }`}
    >
      <div 
        className={`nav-pill flex items-center justify-between gap-8 h-14 px-4 rounded-full transition-all duration-500 border border-white/10 ${
          isScrolled 
            ? 'w-[95%] max-w-5xl bg-black/60 backdrop-blur-xl shadow-2xl' 
            : 'w-[98%] max-w-7xl bg-white/5 backdrop-blur-lg'
        }`}
      >
        {/* Logo Section */}
        <Link to="/" className="flex items-center gap-2 group ml-2">
          <div className="w-9 h-9 overflow-hidden rounded-full ring-2 ring-white/10 group-hover:ring-purple-500 transition-all duration-500">
            <img src="/profile.png" alt="Omkar" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
          </div>
          <span className="text-white font-black text-sm tracking-widest uppercase hidden sm:block group-hover:text-purple-400 transition-colors">
            Portfolio
          </span>
        </Link>

        {/* Links - Proper Centering */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-300 relative group ${
                  isActive ? 'text-white' : 'text-white/70 hover:text-white'
                }`}
              >
                {isActive && (
                  <div className="absolute inset-0 bg-white/10 rounded-full border border-white/5" />
                )}
                <span className="relative z-10">{link.label}</span>
              </Link>
            );
          })}
        </div>

        {/* Actions Section */}
        <div className="flex items-center gap-3 mr-2">
          <ThemeToggle />
          
          <Link to="/contact">
            <button
              ref={hireBtnRef}
              className="px-5 py-2 bg-white text-black rounded-full text-[10px] font-black uppercase tracking-tighter hover:bg-purple-600 hover:text-white transition-colors flex items-center gap-1.5 shadow-lg active:scale-95"
            >
              <Rocket size={12} />
              Hire Me
            </button>
          </Link>

          {/* Mobile Icon */}
          <button
            className="md:hidden p-1.5 text-white/70 hover:text-white transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-black/95 backdrop-blur-3xl flex flex-col p-8 pt-24 animate-in fade-in duration-300">
          <button className="absolute top-8 right-8 text-white" onClick={() => setIsMobileMenuOpen(false)}>
            <X size={24} />
          </button>
          <div className="flex flex-col gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-5xl font-black uppercase tracking-tighter transition-all ${
                  location.pathname === link.path ? 'text-purple-500' : 'text-white/30 hover:text-white'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
