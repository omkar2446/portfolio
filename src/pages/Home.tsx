import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { 
  Code, Palette, FileCode2, Atom, Terminal, Brain, Sparkles, ArrowRight, 
  Github, Linkedin, Twitter, Mail, ExternalLink, Briefcase, Globe, Rocket
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import AnimatedSection from '@/components/AnimatedSection';
import PageTransition from '@/components/PageTransition';

/* ═══════════════════════════════════════════════════
   ANIMATION VARIANTS
═══════════════════════════════════════════════════ */
const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
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

const SectionHeading = ({ 
  title, 
  subtitle, 
  label, 
  centered = false 
}: { 
  title: string, 
  subtitle?: string, 
  label?: string, 
  centered?: boolean 
}) => (
  <motion.div 
    variants={fadeIn}
    initial="initial"
    whileInView="animate"
    viewport={{ once: true }}
    className={`mb-20 ${centered ? 'text-center' : ''}`}
  >
    {label && (
      <div className={`text-[10px] font-black uppercase tracking-[0.5em] text-primary mb-6 ${centered ? 'mx-auto' : ''}`}>
        // {label}
      </div>
    )}
    <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter leading-[0.95]">
      {title}
    </h2>
    {subtitle && (
      <p className={`text-xl md:text-2xl text-foreground/40 max-w-3xl leading-relaxed font-medium ${centered ? 'mx-auto' : ''}`}>
        {subtitle}
      </p>
    )}
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
    { icon: <Brain size={24} />, title: 'AI & ML', pct: 55 },
  ];

  const projects = [
    {
      title: 'AI Portfolio Architect',
      desc: 'An intelligent platform enabling developers to create world-class portfolios with zero effort.',
      tech: ['Next.js', 'OpenAI', 'Framer'],
      link: '#'
    },
    {
      title: 'Quantum SaaS Dashboard',
      desc: 'Real-time analytics engine for modern enterprises with predictive modeling.',
      tech: ['React', 'D3.js', 'Node.js'],
      link: '#'
    },
    {
      title: 'Lumina E-Commerce',
      desc: 'High-conversion retail experience with immersive 3D product visualization.',
      tech: ['Three.js', 'Stripe', 'React'],
      link: '#'
    }
  ];

  return (
    <PageTransition>
      <div className="overflow-x-hidden">
        {/* ════════════════════════════════════
            HERO SECTION
        ════════════════════════════════════ */}
        <section ref={heroRef} className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
          {/* Enhanced Background Glows */}
          <div className="absolute inset-0 z-0">
            <motion.div 
              animate={{ 
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/4 left-1/4 w-[800px] h-[800px] bg-primary/20 blur-[150px] rounded-full" 
            />
            <motion.div 
              animate={{ 
                scale: [1.3, 1, 1.3],
                opacity: [0.2, 0.5, 0.2]
              }}
              transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-1/4 right-1/4 w-[700px] h-[700px] bg-indigo-500/10 blur-[130px] rounded-full" 
            />
          </div>

          <motion.div 
            style={{ scale, opacity }}
            className="container-max relative z-10 text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-bold mb-10 shimmer"
            >
              <Rocket size={16} />
              <span>Available for high-impact collaborations</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="text-6xl md:text-9xl font-black mb-8 tracking-tighter leading-[0.95]"
            >
              CRAFTING <br />
              <span className="text-gradient">DIGITAL</span> <br />
              MASTERY.
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="text-xl md:text-3xl text-foreground/50 max-w-4xl mx-auto mb-16 font-medium leading-relaxed"
            >
              I bridge the gap between technical complexity and artistic elegance, 
              delivering interfaces that define the modern web.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-wrap items-center justify-center gap-6"
            >
              <Button className="btn-premium px-12 py-8 text-xl shimmer shadow-premium">
                Explore Work
              </Button>
              <Button variant="outline" className="px-12 py-8 text-xl font-bold rounded-full border-white/10 hover:bg-white/5 transition-all">
                Let's Talk
              </Button>
            </motion.div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
          >
            <span className="text-xs uppercase tracking-[0.4em] font-black text-foreground/30">Scroll</span>
            <div className="w-0.5 h-16 bg-gradient-to-b from-primary to-transparent rounded-full shadow-glow" />
          </motion.div>
        </section>

        {/* ════════════════════════════════════
            ABOUT SECTION
        ════════════════════════════════════ */}
        <section className="section-spacing relative">
          <div className="container-max">
            <div className="max-w-5xl mx-auto">
              <SectionHeading 
                centered
                label="Philosophy"
                title="Engineering with Intent" 
                subtitle="I don't just build websites; I engineer experiences that resonate. Every pixel is intentional, every interaction is a statement of quality."
              />
              <div className="grid md:grid-cols-2 gap-12 mt-20">
                {[
                  { title: 'Architectural Design', text: 'Scalable and performant frontend architectures built for the future.', icon: <Globe size={24} /> },
                  { title: 'AI Integration', text: 'Harnessing the power of LLMs to create smarter, more intuitive interfaces.', icon: <Brain size={24} /> },
                  { title: 'UX Excellence', text: 'Human-centric design principles ensuring every user interaction is meaningful.', icon: <Palette size={24} /> },
                  { title: 'Fluid Motion', text: 'Butter-smooth animations that guide users and enhance overall usability.', icon: <Rocket size={24} /> }
                ].map((item, i) => (
                  <AnimatedSection key={i} delay={i * 100} direction="up">
                    <div className="glass-card p-10 group h-full">
                      <div className="w-16 h-16 rounded-[2rem] bg-secondary flex items-center justify-center text-primary mb-8 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 shadow-soft">
                        {item.icon}
                      </div>
                      <h4 className="font-black text-2xl mb-4">{item.title}</h4>
                      <p className="text-xl text-foreground/50 leading-relaxed">{item.text}</p>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════
            SKILLS SECTION
        ════════════════════════════════════ */}
        <section className="section-spacing">
          <div className="container-max">
            <SectionHeading 
              centered
              label="Technologies"
              title="Forged in Code" 
              subtitle="The technologies I use to build the future of the web."
            />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
              {skills.map((skill, i) => (
                <AnimatedSection key={i} delay={i * 100}>
                  <div className="glass-card p-10 text-center flex flex-col items-center group card-lift h-full">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 shadow-soft">
                      {skill.icon}
                    </div>
                    <h3 className="font-black text-sm uppercase tracking-widest text-foreground/80 mb-6">{skill.title}</h3>
                    <div className="w-full h-1.5 bg-foreground/5 rounded-full overflow-hidden mt-auto">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.pct}%` }}
                        transition={{ duration: 1.5, delay: 0.5, ease: "circOut" }}
                        className="h-full bg-primary shadow-glow"
                      />
                    </div>
                    <div className="mt-2 text-[10px] font-black text-primary/40">{skill.pct}%</div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════
            FEATURED PROJECTS
        ════════════════════════════════════ */}
        <section className="section-spacing relative bg-secondary/30">
          <div className="container-max">
            <SectionHeading 
              label="Case Studies"
              title="Visionary Work" 
              subtitle="Selected projects that demonstrate my commitment to excellence and innovation."
            />
            <div className="grid lg:grid-cols-3 gap-12">
              {projects.map((project, i) => (
                <AnimatedSection key={i} delay={i * 100}>
                  <div className="glass-card overflow-hidden group flex flex-col h-full card-lift">
                    <div className="aspect-[16/10] bg-secondary overflow-hidden relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-indigo-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10" />
                      <div className="absolute inset-0 flex items-center justify-center z-20">
                        <Rocket size={60} className="text-foreground/10 group-hover:text-white transition-colors duration-500" />
                      </div>
                    </div>
                    <div className="p-10 flex flex-col flex-grow">
                      <div className="flex justify-between items-start mb-6">
                        <h3 className="text-3xl font-black tracking-tighter">{project.title}</h3>
                        <ExternalLink size={20} className="text-foreground/30 group-hover:text-primary transition-colors" />
                      </div>
                      <p className="text-lg text-foreground/50 mb-8 flex-grow leading-relaxed">{project.desc}</p>
                      <div className="flex flex-wrap gap-3 mb-8">
                        {project.tech.map((t, j) => (
                          <span key={j} className="text-[10px] font-black uppercase tracking-[0.2em] px-4 py-2 bg-secondary text-foreground/60 rounded-full border border-white/5">
                            {t}
                          </span>
                        ))}
                      </div>
                      <Button variant="outline" className="w-full py-7 rounded-2xl border-white/5 hover:bg-primary hover:text-white hover:border-primary transition-all font-black uppercase tracking-widest text-xs">
                        Case Study
                      </Button>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════
            TIMELINE
        ════════════════════════════════════ */}
        <section className="section-spacing">
          <div className="container-max">
            <SectionHeading 
              label="Experience"
              title="Career Trajectory" 
              subtitle="My professional evolution through the years, from architecture to execution."
            />
            <div className="max-w-5xl">
              {[
                { year: '2024 - Present', title: 'Senior Interface Engineer', company: 'Global Tech', desc: 'Leading design systems and premium frontend architectures for multi-million user platforms.' },
                { year: '2022 - 2024', title: 'Full Stack Architect', company: 'AI Innovation Lab', desc: 'Pioneered generative AI integrations and low-latency data visualization tools.' },
                { year: '2020 - 2022', title: 'UX Developer', company: 'Studio Creative', desc: 'Crafting immersive digital experiences for high-end fashion and automotive brands.' }
              ].map((item, i) => (
                <AnimatedSection key={i} delay={i * 100}>
                  <div className="relative pl-20 pb-20 border-l-2 border-secondary last:pb-0">
                    <div className="absolute left-0 top-0 -translate-x-1/2 w-6 h-6 rounded-full bg-primary shadow-glow border-4 border-background" />
                    <div className="text-sm font-black uppercase tracking-[0.4em] text-primary mb-4">{item.year}</div>
                    <h3 className="text-4xl font-black mb-2 tracking-tight">{item.title}</h3>
                    <div className="text-xl font-bold text-foreground/40 mb-8">{item.company}</div>
                    <p className="text-xl text-foreground/50 leading-relaxed max-w-3xl">{item.desc}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════
            CONTACT SECTION
        ════════════════════════════════════ */}
        <section className="section-spacing relative overflow-hidden bg-background">
          <div className="absolute inset-0 bg-primary/5 blur-[150px] rounded-full" />
          <div className="container-max relative z-10">
            <div className="glass-card p-12 md:p-24 overflow-hidden relative">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 blur-[100px] rounded-full -mr-48 -mt-48" />
              
              <div className="grid lg:grid-cols-2 gap-24 relative z-10">
                <div>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="w-20 h-20 rounded-3xl bg-primary/10 flex items-center justify-center text-primary mb-10 shadow-soft"
                  >
                    <Mail size={36} />
                  </motion.div>
                  <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter leading-tight">LET'S START <br /><span className="text-gradient">SOMETHING</span>.</h2>
                  <p className="text-xl text-foreground/50 mb-12 leading-relaxed">
                    Ready to elevate your project? Reach out and let's discuss how we can create digital excellence together.
                  </p>
                  <div className="space-y-8">
                    <div className="flex items-center gap-6 group cursor-pointer">
                      <div className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center text-foreground/40 group-hover:text-primary group-hover:bg-primary/10 transition-all duration-300">
                        <Mail size={24} />
                      </div>
                      <div>
                        <div className="text-xs font-black uppercase tracking-widest text-foreground/30 mb-1">Email Me</div>
                        <div className="text-xl font-black">hello@omkartambe.com</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-6 group cursor-pointer">
                      <div className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center text-foreground/40 group-hover:text-primary group-hover:bg-primary/10 transition-all duration-300">
                        <Briefcase size={24} />
                      </div>
                      <div>
                        <div className="text-xs font-black uppercase tracking-widest text-foreground/30 mb-1">Status</div>
                        <div className="text-xl font-black">Available for select projects</div>
                      </div>
                    </div>
                  </div>
                </div>

                <motion.form 
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="space-y-8"
                >
                  <div className="space-y-4">
                    <label className="text-xs font-black uppercase tracking-[0.2em] text-foreground/30 px-2">Your Name</label>
                    <input 
                      type="text" 
                      placeholder="John Doe"
                      className="w-full px-8 py-6 rounded-[2rem] bg-secondary/50 border border-white/5 focus:border-primary focus:ring-8 focus:ring-primary/5 outline-none transition-all duration-500 font-bold"
                    />
                  </div>
                  <div className="space-y-4">
                    <label className="text-xs font-black uppercase tracking-[0.2em] text-foreground/30 px-2">Your Email</label>
                    <input 
                      type="email" 
                      placeholder="john@example.com"
                      className="w-full px-8 py-6 rounded-[2rem] bg-secondary/50 border border-white/5 focus:border-primary focus:ring-8 focus:ring-primary/5 outline-none transition-all duration-500 font-bold"
                    />
                  </div>
                  <div className="space-y-4">
                    <label className="text-xs font-black uppercase tracking-[0.2em] text-foreground/30 px-2">Project Details</label>
                    <textarea 
                      rows={5}
                      placeholder="Tell me about your vision..."
                      className="w-full px-8 py-6 rounded-[2.5rem] bg-secondary/50 border border-white/5 focus:border-primary focus:ring-8 focus:ring-primary/5 outline-none transition-all duration-500 font-bold resize-none"
                    />
                  </div>
                  <Button className="btn-premium w-full py-10 text-xl font-black uppercase tracking-[0.3em] shimmer shadow-premium">
                    Submit Inquiry
                  </Button>
                </motion.form>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════
            FOOTER
        ════════════════════════════════════ */}
        <footer className="py-20 bg-secondary/10">
          <div className="container-max">
            <div className="flex flex-col md:flex-row items-center justify-between gap-12">
              <div className="text-center md:text-left">
                <div className="text-2xl font-black tracking-tighter mb-4">OMKAR TAMBE</div>
                <p className="text-foreground/40 text-sm max-w-sm">
                  Elevating the standard of web experiences through technical precision and creative vision.
                </p>
              </div>
              
              <div className="flex gap-6">
                {[
                  { icon: <Github size={20} />, link: '#' },
                  { icon: <Linkedin size={20} />, link: '#' },
                  { icon: <Twitter size={20} />, link: '#' },
                  { icon: <Mail size={20} />, link: '#' }
                ].map((social, i) => (
                  <motion.a
                    key={i}
                    href={social.link}
                    whileHover={{ y: -5, scale: 1.1 }}
                    className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center text-foreground/40 hover:text-primary hover:bg-primary/10 transition-all duration-300"
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>
            
            <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6 text-[10px] font-black uppercase tracking-[0.3em] text-foreground/30">
              <div>© {new Date().getFullYear()} ALL RIGHTS RESERVED</div>
              <div className="flex gap-10">
                <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
                <a href="#" className="hover:text-primary transition-colors">Cookie Policy</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </PageTransition>
  );
};

export default Home;