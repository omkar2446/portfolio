import { motion } from 'framer-motion';
import { ExternalLink, CheckCircle2 } from 'lucide-react';
import SectionTitle from '@/components/SectionTitle';
import AnimatedSection from '@/components/AnimatedSection';

const About = () => {
  const coreSkills = [
    'Modern Web Development (React, Next.js)',
    'AI & Machine Learning Integration',
    'Responsive Design & UI/UX Excellence',
    'Full-Stack Architecture',
    'Performance Optimization',
    'Version Control & Team Collaboration'
  ];

  return (
    <div className="min-h-screen pt-24 pb-20 overflow-hidden">
      <div className="container-max">
        <SectionTitle 
          title="About Me" 
          subtitle="A deeper look into my journey and core competencies."
          className="mb-20"
        />

        <div className="grid md:grid-cols-2 gap-16 items-center">
          <AnimatedSection direction="left">
            <div className="aspect-square rounded-3xl overflow-hidden glass-card p-4">
              <div className="w-full h-full rounded-2xl bg-gradient-to-br from-primary/20 to-blue-400/20 relative group">
                <img 
                  src="/profile.png" 
                  alt="Profile" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
            </div>
          </AnimatedSection>

          <div className="space-y-8">
            <AnimatedSection direction="right">
              <h3 className="text-3xl font-bold mb-4">I am Omkar Tambe, a passionate Web Developer.</h3>
              <p className="text-lg text-foreground/60 leading-relaxed">
                I specialize in building high-performance web applications and AI-driven tools. 
                Currently a Computer Engineering student, I focus on creating real-world solutions 
                that bridge the gap between complex logic and intuitive design.
              </p>
            </AnimatedSection>

            <AnimatedSection direction="right" delay={100}>
              <h4 className="text-xl font-bold mb-6 flex items-center gap-2">
                <CheckCircle2 className="text-primary" size={24} />
                Core Competencies
              </h4>
              <ul className="grid grid-cols-1 gap-4">
                {coreSkills.map((skill, i) => (
                  <motion.li 
                    key={i} 
                    whileHover={{ x: 10 }}
                    className="flex items-center gap-4 text-foreground/80 bg-secondary/50 border border-white/5 rounded-2xl px-6 py-4 shadow-soft"
                  >
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    {skill}
                  </motion.li>
                ))}
              </ul>
            </AnimatedSection>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mt-32">
          {[
            { value: '1+', label: 'Years Experience' },
            { value: '10+', label: 'Projects Completed' },
            { value: '5+', label: 'Technologies' },
          ].map((stat, i) => (
            <AnimatedSection key={i} delay={i * 100}>
              <div className="glass-card p-10 text-center card-lift">
                <p className="text-4xl md:text-5xl font-black text-primary mb-3">
                  {stat.value}
                </p>
                <p className="text-foreground/60 font-bold uppercase tracking-widest text-xs">{stat.label}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
