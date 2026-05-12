import { motion } from 'framer-motion';
import { 
  CheckCircle2, Globe, Brain, Palette, Rocket, Cpu, Binary, Network, 
  Database, BarChart, LineChart, Server, Activity, Terminal, Calendar, ArrowRight
} from 'lucide-react';
import AnimatedSection from '@/components/AnimatedSection';
import PageTransition from '@/components/PageTransition';

const About = () => {
  const coreSkills = [
    { name: 'Deep Learning', category: 'AI/ML' },
    { name: 'Predictive Analytics', category: 'Data Science' },
    { name: 'Statistical Modeling', category: 'Data Science' },
    { name: 'Neural Architectures', category: 'AI/ML' },
    { name: 'Scalable Pipelines', category: 'Engineering' },
    { name: 'Intelligent Web UI', category: 'Web' }
  ];

  const experience = [
    {
      period: '2023 - Present',
      role: 'AI/ML & Full-Stack Architect',
      company: 'Digital Systems Innovation',
      desc: 'Leading the development of autonomous stock management systems and neural chatbots for academic optimization.'
    },
    {
      period: '2022 - 2023',
      role: 'Data Science Specialist',
      company: 'Analytica Hub',
      desc: 'Architected end-to-end data pipelines and implemented predictive models for financial interest analysis.'
    },
    {
      period: '2021 - 2022',
      role: 'Web Systems Developer',
      company: 'AgTech Solutions',
      desc: 'Engineered comprehensive cattle health tracking systems and real-time dairy farm management platforms.'
    }
  ];

  return (
    <PageTransition>
      <div className="min-h-screen pt-32 pb-24 overflow-hidden">
        <div className="container-max">
          {/* Propanal Header */}
          <div className="mb-32">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-primary/5 border border-primary/10 mb-8"
            >
              <Activity size={14} className="text-primary" />
              <span className="text-[11px] font-sans font-bold uppercase tracking-[0.3em] text-primary">
                The Architect
              </span>
            </motion.div>
            <h1 className="text-[clamp(2.5rem,8vw,5.5rem)] font-heading font-extrabold mb-8 tracking-tighter leading-[1] text-foreground uppercase">
              Intelligence <br /><span className="text-gradient">Architect.</span>
            </h1>
            <p className="text-xl md:text-2xl text-foreground/40 leading-relaxed max-w-3xl font-medium">
              Merging the precision of Data Science with the power of Machine Learning and the speed of modern Web Architecture.
            </p>
          </div>

          <div className="max-w-6xl mx-auto space-y-32">
            {/* Narrative Section */}
            <AnimatedSection direction="up">
              <div className="glass-card p-12 md:p-20 relative overflow-hidden border-foreground/5">
                <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 blur-[120px] rounded-full -mr-48 -mt-48" />
                <div className="flex flex-col md:flex-row gap-16 items-start">
                  <div className="w-24 h-24 rounded-3xl bg-primary flex items-center justify-center text-primary-foreground shadow-glow flex-shrink-0">
                    <Terminal size={40} />
                  </div>
                  <div>
                    <h3 className="text-3xl font-heading font-bold mb-8 tracking-tighter text-foreground uppercase">The Engineering Narrative</h3>
                    <p className="text-xl text-foreground/50 leading-relaxed font-sans font-medium">
                      I specialize in the end-to-end lifecycle of intelligent digital products. 
                      From complex data ingestion and statistical modeling to the deployment of neural networks through scalable, high-performance web platforms.
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* Pillar Section */}
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { title: 'AI/ML Systems', icon: <Brain />, desc: 'Building complex neural models and automated learning systems.' },
                { title: 'Data Analytics', icon: <LineChart />, desc: 'Extracting strategic value through statistical and predictive analysis.' },
                { title: 'System Arch', icon: <Globe />, desc: 'Engineering the high-speed infrastructure that brings intelligence to life.' }
              ].map((pillar, i) => (
                <AnimatedSection key={i} delay={i * 100}>
                  <div className="glass-card p-10 flex flex-col h-full hover:shadow-glow transition-all duration-500">
                    <div className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center text-primary mb-8 border border-foreground/5">
                      {pillar.icon}
                    </div>
                    <h4 className="text-lg font-heading font-bold text-foreground mb-4 uppercase tracking-tighter">{pillar.title}</h4>
                    <p className="text-sm text-foreground/40 leading-relaxed font-medium">{pillar.desc}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>

            {/* Experience Timeline */}
            <div className="space-y-16">
              <div className="flex flex-col items-center text-center mb-20">
                <div className="text-[11px] font-sans font-bold uppercase tracking-[0.4em] text-primary mb-6">// TRAJECTORY</div>
                <h2 className="text-4xl md:text-5xl font-heading font-bold tracking-tighter uppercase">Work Experience</h2>
              </div>
              <div className="grid grid-cols-1 gap-8">
                {experience.map((exp, i) => (
                  <AnimatedSection key={i} delay={i * 100}>
                    <div className="group glass-card p-10 md:p-14 flex flex-col md:flex-row gap-12 items-start md:items-center hover:bg-primary/[0.02] transition-all duration-700">
                      <div className="w-full md:w-48 flex-shrink-0">
                        <div className="text-[11px] font-sans font-bold text-primary mb-2 uppercase tracking-widest">{exp.period}</div>
                        <div className="w-12 h-1 bg-primary/20 rounded-full" />
                      </div>
                      <div className="flex-grow">
                        <h4 className="text-2xl font-heading font-bold text-foreground mb-2 uppercase tracking-tight">{exp.role}</h4>
                        <div className="text-primary font-sans font-bold text-sm mb-6 uppercase tracking-widest">{exp.company}</div>
                        <p className="text-foreground/40 text-lg leading-relaxed font-medium max-w-3xl">{exp.desc}</p>
                      </div>
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 hidden md:block">
                        <ArrowRight className="text-primary" size={32} />
                      </div>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </div>

            {/* Skills & Mission */}
            <div className="grid lg:grid-cols-2 gap-16">
              <AnimatedSection direction="up" delay={100}>
                <div className="space-y-12">
                  <div className="space-y-4">
                    <div className="text-[11px] font-sans font-bold uppercase tracking-[0.4em] text-primary">Specializations</div>
                    <h4 className="text-3xl font-heading font-bold tracking-tighter leading-none text-foreground uppercase">Skill Matrix</h4>
                  </div>
                  <ul className="grid grid-cols-1 gap-6">
                    {coreSkills.map((skill, i) => (
                      <motion.li 
                        key={i} 
                        whileHover={{ x: 10 }}
                        className="flex items-center justify-between gap-6 bg-secondary/30 border border-foreground/5 rounded-[1.5rem] px-8 py-6 shadow-soft hover:bg-secondary/50 transition-all duration-300"
                      >
                        <div className="flex items-center gap-6">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary shadow-glow" />
                          <span className="font-sans font-bold text-lg uppercase tracking-tight text-foreground/80">{skill.name}</span>
                        </div>
                        <span className="text-[10px] font-sans font-black uppercase tracking-widest text-primary/40">{skill.category}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </AnimatedSection>

              <AnimatedSection direction="up" delay={200}>
                <div className="space-y-12 h-full flex flex-col">
                  <div className="space-y-4">
                    <div className="text-[11px] font-sans font-bold uppercase tracking-[0.4em] text-primary">Mission</div>
                    <h4 className="text-3xl font-heading font-bold tracking-tighter leading-none text-foreground uppercase">The Vision</h4>
                  </div>
                  <div className="glass-card p-12 md:p-16 flex-grow flex flex-col justify-center border-foreground/5 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                    <p className="text-2xl md:text-3xl text-foreground/60 leading-tight italic font-heading font-medium relative z-10 tracking-tighter">
                      "To bridge the gap between abstract data and human decision-making, engineering digital systems that are as technically intelligent as they are intuitively powerful."
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-12 border-t border-foreground/5">
              {[
                { value: '15+', label: 'Data Pipelines' },
                { value: '08+', label: 'AI Models' },
                { value: '99%', label: 'System Accuracy' },
              ].map((stat, i) => (
                <AnimatedSection key={i} delay={i * 100}>
                  <div className="text-center md:text-left group cursor-default">
                    <p className="text-5xl md:text-7xl font-heading font-black text-foreground/10 group-hover:text-primary transition-colors duration-500 tracking-tighter mb-4 leading-none">
                      {stat.value}
                    </p>
                    <p className="text-foreground/20 font-sans font-black uppercase tracking-[0.3em] text-[10px] px-1">{stat.label}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default About;
