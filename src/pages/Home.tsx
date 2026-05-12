import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { 
  Code, Palette, FileCode2, Atom, Terminal, Brain, Sparkles, ArrowRight, 
  Github, Linkedin, Twitter, Mail, ExternalLink, Briefcase, Globe, Rocket,
  Layers, Cpu, Zap, Shield, MousePointer2, ChevronRight, Bot, Binary, Network,
  Database, BarChart3, LineChart, Cpu as Processor, Search, Share2, ShoppingCart,
  Calculator, Music, Video, Box, Calendar, Server, Activity, Command, Anchor
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import AnimatedSection from '@/components/AnimatedSection';
import PageTransition from '@/components/PageTransition';
import Typewriter from '@/components/Typewriter';

const Home = () => {
  const heroRef = useRef(null);

  const { scrollYProgress } = useScroll();
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.98]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  const techStack = [
    'Python', 'TensorFlow', 'PyTorch', 'Next.js', 'PostgreSQL', 
    'FastAPI', 'NumPy', 'React', 'Scikit-learn', 'Pandas', 'Node.js', 'MongoDB'
  ];

  const projects = [
    {
      title: 'Inventory AI',
      category: 'Computer Vision & DS',
      desc: 'Intelligent inventory tracking system using AI to automate stock management and predictive ordering.',
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=2070',
      tech: ['TensorFlow', 'FastAPI', 'React'],
      link: 'https://inventory-ai-five.vercel.app/',
      backend: 'https://inven-ai-backend-4.onrender.com/'
    },
    {
      title: 'SongQueue',
      category: 'Real-time Audio Intelligence',
      desc: 'Collaborative music queuing system with real-time synchronization and intelligent play-next logic.',
      image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=2070',
      tech: ['Node.js', 'Socket.io', 'React'],
      link: 'https://songqueue.vercel.app/',
      backend: 'https://songqueue-1.onrender.com'
    },
    {
      title: 'Timetable Chatbot',
      category: 'NLP & Automation',
      desc: 'AI-driven chatbot for automated schedule management and academic timetable optimization.',
      image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80&w=2070',
      tech: ['Python', 'FastAPI', 'React'],
      link: 'https://timetable-chatbot-one.vercel.app/',
      backend: 'https://timetable-chatbot-backend.onrender.com'
    },
    {
      title: 'Sync-Tube',
      category: 'Collaborative Media',
      desc: 'Real-time video synchronization platform for synchronized viewing experiences across the globe.',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=2071',
      tech: ['WebRTC', 'Socket.io', 'React'],
      link: 'https://sync-tube-theta.vercel.app/'
    },
    {
      title: 'LootDukan Store',
      category: 'E-Commerce Platform',
      desc: 'High-performance retail engine featuring modern UI/UX and seamless secure payment integration.',
      image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&q=80&w=2070',
      tech: ['Next.js', 'Stripe', 'MongoDB'],
      link: 'https://www.lootdukan.in/'
    },
    {
      title: 'CowCare Management',
      category: 'Agricultural Tech',
      desc: 'Comprehensive system for cattle health tracking and dairy farm operational management.',
      image: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&q=80&w=2070',
      tech: ['JS', 'HTML5', 'Architecture'],
      link: 'https://omkar2446.github.io/CowCare_Management_System/'
    },
    {
      title: 'EMI-Calculator',
      category: 'Financial Intelligence',
      desc: 'Precision financial planning tool for loan calculations and long-term interest analysis.',
      image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=2070',
      tech: ['React', 'Chart.js', 'Tailwind'],
      link: 'https://emi-calculator-loan-interest-emi-br.vercel.app/'
    }
  ];

  return (
    <PageTransition>
      <div className="flex flex-col">
        {/* Balanced Professional Hero */}
        <section ref={heroRef} className="relative min-h-[90vh] flex items-center pt-24 overflow-hidden">
          <motion.div 
            style={{ scale: heroScale, opacity: heroOpacity }}
            className="container-max relative z-10"
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-16">
              <div className="max-w-4xl">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1 }}
                  className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-primary/5 border border-primary/10 mb-8"
                >
                  <Activity size={14} className="text-primary animate-pulse" />
                  <span className="text-[11px] font-sans font-bold uppercase tracking-[0.3em] text-primary">
                    AI/ML • DATA SCIENCE • WEB ARCHITECT
                  </span>
                </motion.div>

                <motion.h1 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  className="text-[clamp(2.5rem,8vw,5.5rem)] font-heading font-extrabold mb-8 tracking-[-0.04em] leading-[1] text-foreground uppercase"
                >
                  CRAFTING <br />
                  <span className="text-gradient min-h-[1.1em] inline-block">
                    <Typewriter 
                      texts={[
                        'INTELLIGENT SYSTEMS',
                        'DATA INSIGHTS',
                        'NEURAL NETWORKS',
                        'AI SOLUTIONS'
                      ]} 
                    />
                  </span>
                </motion.h1>

                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="text-[1.1rem] md:text-[1.4rem] font-sans font-medium text-foreground/40 max-w-3xl mb-12 leading-relaxed tracking-tight"
                >
                  Engineering at the intersection of <span className="text-foreground">Machine Learning</span>, <span className="text-foreground">Data Science</span>, and <span className="text-foreground">Scalable Web Systems</span>.
                </motion.p>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-wrap items-center gap-8"
                >
                  <Button 
                    className="btn-premium px-12 py-8 text-lg shimmer shadow-premium"
                    onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    View Case Studies
                  </Button>
                  <div className="flex -space-x-3">
                    {[Brain, Database, Globe].map((Icon, i) => (
                      <div key={i} className="w-14 h-14 rounded-full bg-card border-4 border-background flex items-center justify-center text-primary shadow-soft">
                        <Icon size={20} />
                      </div>
                    ))}
                    <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-bold shadow-glow">
                      +12
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Refined Metric Panel */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
                className="hidden xl:grid grid-cols-1 gap-10 border-l border-foreground/5 pl-12"
              >
                {[
                  { val: '99%', label: 'ACCURACY' },
                  { val: '08+', label: 'AI MODELS' },
                  { val: '15+', label: 'PIPELINES' }
                ].map((m, i) => (
                  <div key={i}>
                    <div className="text-3xl font-heading font-black text-foreground tracking-tighter">{m.val}</div>
                    <div className="text-[9px] font-sans font-bold text-foreground/20 uppercase tracking-[0.4em]">{m.label}</div>
                  </div>
                ))}
              </motion.div>
            </div>
          </motion.div>

          {/* Infinite Scrolling Tech Marquee */}
          <div className="absolute bottom-0 left-0 right-0 py-8 border-t border-foreground/5 bg-background/30 backdrop-blur-sm overflow-hidden whitespace-nowrap">
            <motion.div 
              className="flex items-center gap-20 w-max"
              animate={{ x: [0, -2000] }}
              transition={{ 
                duration: 40, 
                repeat: Infinity, 
                ease: "linear" 
              }}
            >
              {[...techStack, ...techStack, ...techStack].map((t, i) => (
                <div key={i} className="text-[11px] font-sans font-black uppercase tracking-[0.5em] text-foreground/20 hover:text-primary transition-colors cursor-default inline-block">
                  {t}
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Intelligence Architecture Section */}
        <section className="section-spacing border-b border-foreground/5">
          <div className="container-max">
            <div className="grid lg:grid-cols-2 gap-24 items-center">
              <div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="mb-16"
                >
                  <div className="text-[11px] font-sans font-bold uppercase tracking-[0.4em] text-primary mb-6">// CAPABILITIES</div>
                  <h2 className="text-[3rem] md:text-[4.5rem] font-heading font-extrabold mb-8 tracking-tighter leading-[1] text-foreground uppercase">The <br />Intelligence <br />Matrix</h2>
                  <p className="text-lg text-foreground/40 leading-relaxed max-w-xl font-medium">
                    I architect the end-to-end lifecycle of intelligent systems, from abstract statistical modeling to cinematic web deployment.
                  </p>
                </motion.div>
                
                <div className="space-y-8">
                  {[
                    { title: 'Predictive DS', desc: 'Transforming raw chaos into strategic clarity through statistical neural modeling.', icon: <LineChart /> },
                    { title: 'Neural Systems', desc: 'Deploying autonomous deep learning architectures for real-time decision making.', icon: <Brain /> },
                    { title: 'Web Intelligence', desc: 'Engineering the high-performance interface layer for complex data ecosystems.', icon: <Command /> }
                  ].map((s, i) => (
                    <AnimatedSection key={i} delay={i * 100} direction="up">
                      <div className="flex gap-8 group cursor-default">
                        <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-700 shadow-soft flex-shrink-0">
                          {s.icon}
                        </div>
                        <div className="flex-1 border-b border-foreground/5 pb-8">
                          <h4 className="text-xl font-heading font-bold mb-3 text-foreground uppercase tracking-tight">{s.title}</h4>
                          <p className="text-base text-foreground/40 leading-relaxed font-medium">{s.desc}</p>
                        </div>
                      </div>
                    </AnimatedSection>
                  ))}
                </div>
              </div>

              <AnimatedSection direction="up">
                <div className="glass-card aspect-[4/5] relative overflow-hidden group">
                  <div className="absolute inset-0 bg-primary/5 transition-opacity duration-1000 opacity-0 group-hover:opacity-100" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative w-64 h-64">
                      <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 border-2 border-primary/10 rounded-full border-dashed" 
                      />
                      <motion.div 
                        animate={{ rotate: -360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-10 border border-primary/20 rounded-full border-dotted" 
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Bot size={60} className="text-primary animate-pulse" />
                      </div>
                    </div>
                  </div>
                  <div className="absolute bottom-10 left-10 right-10">
                    <div className="text-[10px] font-sans font-bold uppercase tracking-[0.5em] text-primary mb-3">Core Objective</div>
                    <h3 className="text-2xl font-heading font-bold text-foreground mb-3 uppercase tracking-tighter">AI-First <br />Architecture</h3>
                    <p className="text-foreground/30 text-sm leading-relaxed font-medium">Prioritizing technical endurance and computational intelligence in every pixel.</p>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Balanced Project Showcase */}
        <section id="projects" className="section-spacing bg-secondary/5 border-b border-foreground/5">
          <div className="container-max">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-24">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="text-[11px] font-sans font-bold uppercase tracking-[0.4em] text-primary mb-6">// PORTFOLIO</div>
                <h2 className="text-[3rem] md:text-[4.5rem] font-heading font-extrabold tracking-tighter leading-[1] text-foreground uppercase">Case <br />Studies</h2>
              </motion.div>
              <Button variant="ghost" className="text-primary font-bold gap-3 group hover:bg-transparent text-lg">
                Explore Archives <ArrowRight size={20} className="group-hover:translate-x-3 transition-transform duration-500" />
              </Button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
              {projects.map((project, i) => (
                <AnimatedSection key={i} delay={i * 100}>
                  <div className="group cursor-pointer">
                    <div className="relative aspect-[3.5/4] rounded-[2.5rem] overflow-hidden mb-8 glass-card border-none">
                      <img 
                        src={project.image} 
                        alt={project.title}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 grayscale group-hover:grayscale-0 opacity-40 group-hover:opacity-100"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80" />
                      
                      <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-700 z-30 gap-5 translate-y-8 group-hover:translate-y-0">
                        <a 
                          href={project.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="px-8 py-3 bg-primary text-primary-foreground rounded-full font-bold text-sm flex items-center gap-2 hover:scale-105 transition-all shadow-glow"
                        >
                          View Site <ExternalLink size={16} />
                        </a>
                        {project.backend && (
                          <a 
                            href={project.backend} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="px-8 py-3 bg-foreground text-background rounded-full font-bold text-sm flex items-center gap-2 hover:scale-105 transition-all"
                          >
                            Backend API <Server size={16} />
                          </a>
                        )}
                      </div>

                      <div className="absolute bottom-10 left-10 right-10 z-20 group-hover:opacity-0 transition-all duration-500">
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.tech.map((t, j) => (
                            <span key={j} className="text-[9px] font-sans font-bold uppercase tracking-widest px-3 py-1.5 bg-background/90 backdrop-blur-md rounded-full text-foreground/50 border border-foreground/5">
                              {t}
                            </span>
                          ))}
                        </div>
                        <h3 className="text-xl font-heading font-bold text-foreground mb-1 uppercase tracking-tighter">{project.title}</h3>
                        <p className="text-primary font-sans text-[9px] font-black uppercase tracking-[0.3em]">{project.category}</p>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Balanced CTA */}
        <section className="section-spacing relative overflow-hidden bg-background">
          <div className="container-max">
            <div className="glass-card p-16 md:p-32 text-center relative overflow-hidden border-primary/20 bg-primary/[0.01]">
              <div className="relative z-10 max-w-4xl mx-auto">
                <div className="text-[11px] font-sans font-bold uppercase tracking-[0.5em] text-primary mb-8">COLLABORATION</div>
                <h2 className="text-[3rem] md:text-[5rem] font-heading font-extrabold mb-12 tracking-tighter leading-[1] text-foreground uppercase">Ready to <br /><span className="text-gradient">Innovate</span>?</h2>
                <Button 
                  className="btn-premium px-16 py-8 text-xl shimmer shadow-premium"
                  onClick={() => window.location.href = '/contact'}
                >
                  Initialize Contact
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default Home;