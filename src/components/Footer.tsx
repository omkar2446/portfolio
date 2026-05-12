import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Mail, ArrowUpRight, Brain, Globe, Shield, Terminal } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: 'Navigation',
      links: [
        { label: 'Intelligence Home', path: '/' },
        { label: 'Architect Profile', path: '/about' },
        { label: 'Neural Learning', path: '/learn' },
        { label: 'Technical Blog', path: '/blog' },
      ],
    },
    {
      title: 'Specializations',
      links: [
        { label: 'Deep Learning', path: '#' },
        { label: 'Data Science', path: '#' },
        { label: 'Predictive DS', path: '#' },
        { label: 'Web Architecture', path: '#' },
      ],
    },
    {
      title: 'Connect',
      links: [
        { label: 'GitHub', path: 'https://github.com/omkar2446', external: true },
        { label: 'LinkedIn', path: 'https://linkedin.com', external: true },
        { label: 'Twitter', path: 'https://twitter.com', external: true },
        { label: 'Contact Me', path: '/contact' },
      ],
    },
  ];

  return (
    <footer className="relative bg-background border-t border-foreground/5 pt-24 pb-12 overflow-hidden">
      {/* Decorative Neural Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 blur-[120px] rounded-full -mr-48 -mt-48 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 blur-[100px] rounded-full -ml-32 -mb-32 pointer-events-none" />

      <div className="container-max relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-16 mb-24">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-8">
            <Link to="/" className="inline-block">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center shadow-glow">
                  <span className="text-primary-foreground font-heading font-extrabold text-2xl">O</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-foreground font-heading font-bold tracking-tight text-xl leading-none uppercase">OMKAR TAMBE</span>
                  <span className="text-[10px] font-sans font-semibold uppercase tracking-[0.2em] text-primary mt-1">AI/ML • DATA SCIENCE • WEB</span>
                </div>
              </div>
            </Link>
            <p className="text-foreground/40 text-lg leading-relaxed max-w-sm">
              Engineering autonomous systems and high-performance digital experiences through the lens of machine intelligence.
            </p>
            <div className="flex gap-4">
              {[Github, Linkedin, Twitter, Mail].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ y: -4, scale: 1.1 }}
                  className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center text-foreground/40 hover:text-primary transition-all duration-300 border border-foreground/5"
                >
                  <Icon size={20} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          {footerLinks.map((column, i) => (
            <div key={i} className="space-y-8">
              <h4 className="text-[11px] font-sans font-bold uppercase tracking-[0.3em] text-primary">{column.title}</h4>
              <ul className="space-y-4">
                {column.links.map((link, j) => (
                  <li key={j}>
                    {link.external ? (
                      <a
                        href={link.path}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-2 text-foreground/40 hover:text-foreground font-sans font-semibold text-sm transition-colors"
                      >
                        {link.label}
                        <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                      </a>
                    ) : (
                      <Link
                        to={link.path}
                        className="text-foreground/40 hover:text-foreground font-sans font-semibold text-sm transition-colors"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-foreground/5 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-6 text-[10px] font-sans font-bold uppercase tracking-widest text-foreground/20">
            <span>© {currentYear} Omkar Tambe</span>
            <span className="w-1 h-1 rounded-full bg-foreground/10" />
            <span>Built with Precision</span>
          </div>
          
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2 text-[10px] font-sans font-bold uppercase tracking-widest text-foreground/20">
              <Terminal size={14} />
              <span>v2.0.4 - Production</span>
            </div>
            <div className="flex items-center gap-2 text-[10px] font-sans font-bold uppercase tracking-widest text-foreground/20">
              <Shield size={14} />
              <span>Secure Architecture</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
