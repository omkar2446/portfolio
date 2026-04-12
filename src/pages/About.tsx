import { Button } from '@/components/ui/button';
import PageTransition from '@/components/PageTransition';
import AnimatedSection from '@/components/AnimatedSection';
import SectionTitle from '@/components/SectionTitle';
import { ExternalLink, CheckCircle2 } from 'lucide-react';
import profilePhoto from '@/assets/profile-photo.png';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';


const About = () => {
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (!listRef.current) return;
    
    const items = listRef.current.querySelectorAll('li');
    gsap.set(items, { opacity: 0, x: -20 });

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        gsap.to(items, {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
        });
        observer.disconnect();
      }
    }, { threshold: 0.2 });

    observer.observe(listRef.current);
    return () => observer.disconnect();
  }, []);

  const coreSkills = [
    'Modern Web Development (React, Next.js)',
    'AI & Machine Learning Integration',
    'Responsive Design & UI/UX Excellence',
    'Full-Stack Architecture',
    'Performance Optimization',
    'Version Control & Team Collaboration'
  ];

  return (
    <PageTransition>
      <div className="min-h-screen pt-24">
        <section className="container mx-auto px-6 py-20">
          <div className="reveal-text mb-2">
            <SectionTitle 
              title="About Me" 
              subtitle="Get to know me better"
              className="text-white drop-shadow-lg reveal-content"
            />
          </div>

          <AnimatedSection>
            <div className="backdrop-blur-xl bg-white/10 hover:bg-white/15 border border-white/20 rounded-2xl p-8 md:p-12 shadow-2xl hover:shadow-3xl transition-all duration-500">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                {/* Photo Section */}
               <div className="flex justify-center">
    <div className="relative">

      {/* Main Card */}
      <div className="w-72 h-80 md:w-80 md:h-96  p-3 hover-lift animate-float flex items-center justify-center">
      
      <div className="w-full h-full rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center overflow-hidden">
        <img 
          src={profilePhoto}
          alt="Omkar Tambe"
          className="max-w-full max-h-full object-contain rounded-xl"
        />
      </div>

    </div>

      {/* Decorative layers */}
      <div className="absolute -z-10 top-4 left-4 w-full h-full rounded-2xl border-2 border-white/20"></div>
      <div className="absolute -z-20 top-8 left-8 w-full h-full rounded-2xl bg-white/10"></div>

    </div>
  </div>


                {/* Content Section */}
                <div className="space-y-6">
                  <p className="text-xl text-white leading-relaxed drop-shadow-md">
                    I am <span className="font-semibold text-white drop-shadow-lg">Omkar Tambe</span>, 
                    a passionate Web Developer.
                  </p>
                  <p className="text-lg text-gray-100 leading-relaxed drop-shadow-md"> 
                    I love building web apps, AI tools, and exploring new technologies.
                  </p>
                  
                  <div className="pt-4">
                    <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                       <CheckCircle2 className="text-purple-400" size={20} />
                       Core Competencies
                    </h4>
                    <ul ref={listRef} className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {coreSkills.map((skill, i) => (
                        <li key={i} className="flex items-center gap-2 text-gray-200 text-sm md:text-base bg-white/5 border border-white/10 rounded-lg px-3 py-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <p className="text-lg text-gray-100 leading-relaxed drop-shadow-md pt-4">
                    A Computer Engineering student and dedicated developer who loves building real-world applications.
                    I specialize in creating modern web applications using React, Tailwind CSS, and Supabase. 
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Stats Section */}
          <AnimatedSection className="mt-20" delay={200}>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {[
                { value: '1+', label: 'Years Experience' },
                { value: '10+', label: 'Projects Completed' },
                { value: '5+', label: 'Technologies' },
              ].map((stat, index) => (
                <div 
                  key={stat.label} 
                  className="backdrop-blur-md bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl p-6 text-center hover-lift shadow-xl hover:shadow-2xl transition-all duration-300"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <p className="text-3xl md:text-4xl font-bold text-white mb-2 drop-shadow-lg">
                    {stat.value}
                  </p>
                  <p className="text-gray-100 text-sm drop-shadow-md">{stat.label}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </section>
      </div>
    </PageTransition>
  );
};

export default About;
