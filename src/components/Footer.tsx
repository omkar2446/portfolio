import { Github, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="glass-nav-solid mt-20 py-8">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm">
            © 2024 Omkar Tambe. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/omkar2446"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full hover:bg-primary/10 transition-colors text-muted-foreground hover:text-primary"
            >
              <Github size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/omkar-tambe-311a72350/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full hover:bg-primary/10 transition-colors text-muted-foreground hover:text-primary"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="otambe655@gmail.com"
              className="p-2 rounded-full hover:bg-primary/10 transition-colors text-muted-foreground hover:text-primary"
            >
              <Mail size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
