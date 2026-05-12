import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { 
  Code, Palette, FileCode2, Atom, Terminal, Brain, Sparkles, ArrowRight, 
  Github, Linkedin, Twitter, Mail
} from 'lucide-react';
import { Button } from '@/components/ui/button';

/* ═══════════════════════════════════════════════════
   ANIMATION VARIANTS
═══════════════════════════════════════════════════ */
const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

/* ═══════════════════════════════════════════════════
   COMPONENTS
═══════════════════════════════════════════════════ */

const SectionHeading = ({ title, subtitle }: { title: string, subtitle?: string }) => (
  <motion.div 
    variants={fadeIn}
    initial="initial"
    whileInView="animate"
    viewport={{ once: true }}
    className="mb-16"
  >
    <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">{title}</h2>
    {subtitle && <p className="text-lg text-foreground/60 max-w-2xl">{subtitle}</p>}
  </motion.div>
);

const Home = () => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  const skills = [
    { icon: <Code size={24} />, title: 'HTML', pct: 95 },
    { icon: <Palette size={24} />, title: 'CSS', pct: 90 },
    { icon: <FileCode2 size={24} />, title: 'JavaScript', pct: 85 },
    { icon: <Atom size={24} />, title: 'React', pct: 82 },
    { icon: <Terminal size={24} />, title: 'Python', pct: 75 },
    { icon: <Brain size={24} />, title: 'Machine Learning', pct: 55 },
  ];

  const projects = [
    {
      title: 'AI Portfolio Architect',
      desc: 'A premium platform for developers to build state-of-the-art portfolios with AI assistance.',
      tech: ['React', 'Three.js', 'Framer Motion'],
      link: '#'
    },
    {
      title: 'NexGen SaaS Platform',
      desc: 'Modern dashboard for next-generation businesses with real-time analytics.',
      tech: ['Next.js', 'Tailwind', 'PostgreSQL'],
      link: '#'
    },
    {
      title: 'E-Commerce Ultra',
      desc: 'High-performance e-commerce engine with smooth transitions and premium feel.',
      tech: ['React', 'Node.js', 'Stripe'],
      link: '#'
    }
  ];

  const experience = [
    {
      year: '2024 - Present',
      title: 'Lead Frontend Engineer',
      company: 'TechFlow Systems',
      desc: 'Leading the development of high-performance React applications and design systems.'
    },
    {
      year: '2022 - 2024',
      title: 'Full Stack Developer',
      company: 'Innovate AI',
      desc: 'Built scalable AI-driven interfaces and optimized backend performance.'
    },
    {
      year: '2020 - 2022',
      title: 'Junior Web Developer',
      company: 'Creative Media',
      desc: 'Developed interactive web experiences for global brands.'
    }
  ];

  return (
    <div className="overflow-x-hidden">
      {/* ════════════════════════════════════
          HERO SECTION
      ════════════════════════════════════ */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute inset-0 z-0">
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] bg-primary/20 blur-[120px] rounded-full" 
          />
          <motion.div 
            animate={{ 
              scale: [1.2, 1, 1.2],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-1/4 -right-1/4 w-[500px] h-[500px] bg-blue-400/20 blur-[100px] rounded-full" 
          />
        </div>

        <motion.div 
          style={{ scale, opacity }}
          className="container-max relative z-10 text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-8"
          >
            <Sparkles size={14} />
            <span>Available for new projects</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl md:text-8xl font-black mb-6 tracking-tight leading-[1.1]"
          >
            Building the <span className="text-primary italic">future</span> of <br /> 
            digital experiences.
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="text-lg md:text-2xl text-foreground/60 max-w-3xl mx-auto mb-12 font-medium"
          >
            I am a Frontend Engineer specializing in high-end web experiences, 
            blending technical precision with creative design.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <Button className="btn-premium px-10 py-7 text-lg">
              View Projects
            </Button>
            <Button variant="ghost" className="px-10 py-7 text-lg font-bold rounded-full hover:bg-white/5">
              Contact Me
            </Button>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-xs uppercase tracking-[0.2em] font-bold text-foreground/40">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-primary to-transparent" />
        </motion.div>
      </section>

      {/* ════════════════════════════════════
          ABOUT SECTION
      ════════════════════════════════════ */}
      <section className="section-spacing relative bg-secondary/30">
        <div className="container-max">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="aspect-square rounded-3xl overflow-hidden glass-card p-4">
                <div className="w-full h-full rounded-2xl bg-gradient-to-br from-primary/20 to-blue-400/20 relative group">
                  <img 
                    src="/profile.png" 
                    alt="Profile" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/20 blur-3xl rounded-full" />
            </motion.div>

            <div>
              <SectionHeading 
                title="A passion for perfection." 
                subtitle="I create digital products that feel as good as they look. My approach is centered around performance, accessibility, and pixel-perfect execution."
              />
              <motion.div 
                variants={staggerContainer}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                className="space-y-6"
              >
                {[
                  { title: 'User Experience', text: 'Crafting intuitive journeys that solve real problems.' },
                  { title: 'Modern Stack', text: 'Using the latest technologies to ensure future-proof solutions.' },
                  { title: 'Performance', text: 'Optimized to the bone for lightning-fast load times.' }
                ].map((item, i) => (
                  <motion.div key={i} variants={fadeIn} className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Sparkles size={16} className="text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">{item.title}</h4>
                      <p className="text-foreground/60">{item.text}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          SKILLS SECTION
      ════════════════════════════════════ */}
      <section className="section-spacing container-max">
        <SectionHeading 
          title="Technical Expertise" 
          subtitle="My toolkit for bringing complex ideas to life across the digital landscape."
        />
        <motion.div 
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6"
        >
          {skills.map((skill, i) => (
            <motion.div 
              key={i} 
              variants={fadeIn}
              className="glass-card p-8 text-center flex flex-col items-center group card-lift"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4 transition-transform duration-500 group-hover:scale-110">
                {skill.icon}
              </div>
              <h3 className="font-bold text-sm uppercase tracking-widest text-foreground/80 mb-2">{skill.title}</h3>
              <div className="w-full h-1 bg-foreground/5 rounded-full overflow-hidden mt-auto">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.pct}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="h-full bg-primary"
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ════════════════════════════════════
          FEATURED PROJECTS
      ════════════════════════════════════ */}
      <section className="section-spacing bg-secondary/30">
        <div className="container-max">
          <SectionHeading 
            title="Featured Projects" 
            subtitle="A curated selection of work that represents my technical depth and creative vision."
          />
          <div className="grid md:grid-cols-3 gap-8">
            {projects.map((project, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="glass-card overflow-hidden group flex flex-col"
              >
                <div className="aspect-[16/10] bg-primary/5 overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-blue-400/20" />
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <Code size={48} className="text-primary/40" />
                  </motion.div>
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <h3 className="text-2xl font-bold mb-3">{project.title}</h3>
                  <p className="text-foreground/60 mb-6 flex-grow">{project.desc}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((t, j) => (
                      <span key={j} className="text-xs font-bold uppercase tracking-widest px-3 py-1 bg-primary/5 text-primary rounded-full border border-primary/10">
                        {t}
                      </span>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full rounded-xl border-white/10 hover:bg-primary hover:text-white hover:border-primary transition-all">
                    View Case Study <ArrowRight size={16} className="ml-2" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          EXPERIENCE TIMELINE
      ════════════════════════════════════ */}
      <section className="section-spacing container-max">
        <SectionHeading 
          title="Career Journey" 
          subtitle="My professional evolution through technology and design."
        />
        <div className="max-w-4xl mx-auto">
          {experience.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="relative pl-12 pb-12 border-l border-white/10 last:pb-0"
            >
              <div className="absolute left-0 top-0 -translate-x-1/2 w-4 h-4 rounded-full bg-primary shadow-[0_0_15px_rgba(59,130,246,0.6)]" />
              <div className="text-sm font-bold uppercase tracking-[0.2em] text-primary mb-2">{item.year}</div>
              <h3 className="text-2xl font-bold mb-1">{item.title}</h3>
              <div className="text-lg font-medium text-foreground/80 mb-4">{item.company}</div>
              <p className="text-foreground/60 leading-relaxed max-w-2xl">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════
          CONTACT SECTION
      ════════════════════════════════════ */}
      <section className="section-spacing relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 blur-[150px] rounded-full" />
        <div className="container-max relative z-10">
          <div className="glass-card p-8 md:p-20">
            <div className="grid md:grid-cols-2 gap-16">
              <div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-8"
                >
                  <Mail size={32} />
                </motion.div>
                <h2 className="text-4xl md:text-6xl font-black mb-6">Let's build something <span className="text-primary italic">extraordinary</span>.</h2>
                <p className="text-lg text-foreground/60 mb-12">
                  Have a project in mind? Let's discuss how we can work together to bring your vision to life.
                </p>
                <div className="space-y-6">
                  <div className="flex items-center gap-4 text-foreground/80">
                    <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                      <Mail size={18} />
                    </div>
                    <span className="font-bold">hello@omkartambe.com</span>
                  </div>
                  <div className="flex items-center gap-4 text-foreground/80">
                    <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                      <Briefcase size={18} />
                    </div>
                    <span className="font-bold">Available for Freelance</span>
                  </div>
                </div>
              </div>

              <motion.form 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-foreground/40 px-1">Name</label>
                    <input 
                      type="text" 
                      placeholder="John Doe"
                      className="w-full px-6 py-4 rounded-2xl bg-secondary/50 border border-white/5 focus:border-primary/50 focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-300"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-foreground/40 px-1">Email</label>
                    <input 
                      type="email" 
                      placeholder="john@example.com"
                      className="w-full px-6 py-4 rounded-2xl bg-secondary/50 border border-white/5 focus:border-primary/50 focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-300"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-foreground/40 px-1">Message</label>
                  <textarea 
                    rows={4}
                    placeholder="Tell me about your project..."
                    className="w-full px-6 py-4 rounded-2xl bg-secondary/50 border border-white/5 focus:border-primary/50 focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-300 resize-none"
                  />
                </div>
                <Button className="btn-premium w-full py-8 text-lg">
                  Send Message
                </Button>
              </motion.form>
            </div>
            
            <div className="flex gap-8 mt-16 pt-16 border-t border-white/10 w-full justify-center">
              {[
                { icon: <Github />, link: '#' },
                { icon: <Linkedin />, link: '#' },
                { icon: <Twitter />, link: '#' }
              ].map((social, i) => (
                <motion.a
                  key={i}
                  href={social.link}
                  whileHover={{ y: -5, scale: 1.1 }}
                  className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary/10 hover:text-primary transition-colors duration-300"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          FOOTER
      ════════════════════════════════════ */}
      <footer className="py-12 border-t border-white/5">
        <div className="container-max flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-sm font-medium text-foreground/40">
            © {new Date().getFullYear()} Omkar Tambe. All rights reserved.
          </div>
          <div className="flex gap-8">
            <a href="#" className="text-xs uppercase tracking-widest font-bold text-foreground/60 hover:text-primary transition-colors">Privacy</a>
            <a href="#" className="text-xs uppercase tracking-widest font-bold text-foreground/60 hover:text-primary transition-colors">Terms</a>
            <a href="#" className="text-xs uppercase tracking-widest font-bold text-foreground/60 hover:text-primary transition-colors">Cookies</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;