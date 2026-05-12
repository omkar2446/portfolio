import { motion } from 'framer-motion';
import { CheckCircle2, Globe, Brain, Palette, Rocket } from 'lucide-react';
import SectionTitle from '@/components/SectionTitle';
import AnimatedSection from '@/components/AnimatedSection';
import PageTransition from '@/components/PageTransition';

const About = () => {
  const coreSkills = [
    'Architectural Web Development',
    'Intelligent System Integration',
    'High-Fidelity Interface Design',
    'Scalable Full-Stack Engineering',
    'Strategic Performance Audits',
    'Version Control & Collaborative Workflows'
  ];

  return (
    <PageTransition>
      <div className="min-h-screen pt-32 pb-20 overflow-hidden">
        <div className="container-max">
          <div className="mb-32 text-center">
            <SectionTitle 
              centered
              label="Identity"
              title="The Philosophy" 
              subtitle="Bridging the gap between human intuition and technical precision through uncompromising quality."
              className="mb-24"
            />
          </div>

          <div className="max-w-5xl mx-auto space-y-32">
            <AnimatedSection direction="up">
              <div className="glass-card p-14 md:p-24 relative overflow-hidden border-white/5">
                <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 blur-[120px] rounded-full -mr-48 -mt-48" />
                <div className="text-[10px] font-black uppercase tracking-[0.4em] text-foreground/20 mb-8">NARRATIVE</div>
                <h3 className="text-4xl md:text-6xl font-black mb-10 tracking-tighter leading-none">I am Omkar Tambe.</h3>
                <p className="text-2xl md:text-3xl text-foreground/50 leading-relaxed font-medium">
                  I specialize in engineering high-performance digital environments. 
                  Currently focusing on the intersection of complex architectural logic and intuitive human-centric design.
                </p>
              </div>
            </AnimatedSection>

            <div className="grid md:grid-cols-2 gap-16">
              <AnimatedSection direction="up" delay={100}>
                <div className="space-y-12">
                  <div className="space-y-4">
                    <div className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">// SPECIALIZATIONS</div>
                    <h4 className="text-3xl font-black tracking-tighter uppercase leading-none">Core Competencies</h4>
                  </div>
                  <ul className="grid grid-cols-1 gap-6">
                    {coreSkills.map((skill, i) => (
                      <motion.li 
                        key={i} 
                        whileHover={{ x: 10 }}
                        className="flex items-center gap-6 text-foreground/40 bg-secondary/20 border border-white/5 rounded-[2rem] px-8 py-6 shadow-soft hover:text-foreground hover:bg-secondary/40 transition-all duration-300"
                      >
                        <div className="w-3 h-3 rounded-full bg-primary shadow-glow" />
                        <span className="font-bold text-lg">{skill}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </AnimatedSection>

              <AnimatedSection direction="up" delay={200}>
                <div className="space-y-12 h-full flex flex-col">
                  <div className="space-y-4">
                    <div className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">// OBJECTIVE</div>
                    <h4 className="text-3xl font-black tracking-tighter uppercase leading-none">The Mission</h4>
                  </div>
                  <div className="glass-card p-12 flex-grow flex flex-col justify-center border-white/5 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    <p className="text-2xl md:text-3xl text-foreground/40 leading-relaxed italic font-medium relative z-10">
                      "To set the definitive standard for digital craftsmanship, creating systems that are as technically robust as they are visually impeccable."
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-12 border-t border-white/5">
              {[
                { value: '01', label: 'Years of Engineering' },
                { value: '12', label: 'Technical Projects' },
                { value: '06', label: 'Core Tech Stacks' },
              ].map((stat, i) => (
                <AnimatedSection key={i} delay={i * 100}>
                  <div className="text-center md:text-left group cursor-default">
                    <p className="text-6xl md:text-8xl font-black text-foreground/10 group-hover:text-primary transition-colors duration-500 tracking-tighter mb-4 leading-none">
                      {stat.value}
                    </p>
                    <p className="text-foreground/40 font-black uppercase tracking-[0.4em] text-xs px-1">{stat.label}</p>
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
