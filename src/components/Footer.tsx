import { Github, Linkedin, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="py-20 border-t border-white/5 bg-secondary/10">
      <div className="container-max">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="text-center md:text-left">
            <div className="text-2xl font-black tracking-tighter mb-4 uppercase">OMKAR TAMBE</div>
            <p className="text-foreground/40 text-xs font-bold uppercase tracking-widest max-w-sm">
              Elevating the standard of web experiences through technical precision and creative vision.
            </p>
          </div>
          
          <div className="flex gap-6">
            {[
              { icon: <Github size={20} />, link: 'https://github.com/omkar2446' },
              { icon: <Linkedin size={20} />, link: 'https://www.linkedin.com/in/omkar-tambe-311a72350/' },
              { icon: <Mail size={20} />, link: 'mailto:otambe655@gmail.com' }
            ].map((social, i) => (
              <motion.a
                key={i}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -5, scale: 1.1 }}
                className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center text-foreground/40 hover:text-primary hover:bg-primary/10 transition-all duration-300 shadow-soft"
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
        </div>
        
        <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6 text-[10px] font-black uppercase tracking-[0.3em] text-foreground/20">
          <div>© {new Date().getFullYear()} ALL RIGHTS RESERVED</div>
          <div className="flex gap-10">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-primary transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
