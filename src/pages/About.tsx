import { Button } from '@/components/ui/button';
import PageTransition from '@/components/PageTransition';
import AnimatedSection from '@/components/AnimatedSection';
import SectionTitle from '@/components/SectionTitle';
import { ExternalLink } from 'lucide-react';
import profilePhoto from '@/assets/profile-photo.png';

const About = () => {
  return (
    <PageTransition>
      <div className="min-h-screen pt-24">
        <section className="container mx-auto px-6 py-20">
          <SectionTitle 
            title="About Me" 
            subtitle="Get to know me better"
          />

          <AnimatedSection>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Photo Section */}
             <div className="flex justify-center">
  <div className="relative">

    {/* Main Card */}
    <div className="w-72 h-80 md:w-80 md:h-96 glass-card p-3 hover-lift animate-float flex items-center justify-center">
      
      <div className="w-full h-full rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center overflow-hidden">
        <img 
          src={profilePhoto}
          alt="Omkar Tambe"
          className="max-w-full max-h-full object-contain rounded-xl"
        />
      </div>

    </div>

    {/* Decorative layers */}
    <div className="absolute -z-10 top-4 left-4 w-full h-full rounded-2xl border-2 border-primary/20"></div>
    <div className="absolute -z-20 top-8 left-8 w-full h-full rounded-2xl bg-accent/10"></div>

  </div>
</div>


              {/* Content Section */}
              <div className="space-y-6">
                <p className="text-lg text-foreground leading-relaxed">
                  I am <span className="font-semibold text-primary">Omkar Tambe</span>, 
                  founder of <span className="font-semibold">LootDukan</span>.
                </p>
                <p className="text-muted-foreground leading-relaxed"> 
                  I love building web apps, AI tools, and learning new technologies.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                 A Computer Engineering student and passionate Web Developer who loves building real-world applications.

I specialize in creating modern web applications using React, Tailwind CSS, and Supabase. 
Currently, I am working on LootDukan — a marketplace platform that helps sellers list products and connect with buyers easily.

I enjoy learning about AI, automation, and full-stack development, and I love turning ideas into working products.

My goal is to become a skilled full-stack developer and build impactful digital solutions..
                </p>
                
              </div>
            </div>
          </AnimatedSection>

          {/* Stats Section */}
          <AnimatedSection className="mt-20" delay={200}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { value: '1+', label: 'Years Experience' },
                { value: '10+', label: 'Projects Completed' },
                { value: '3+', label: 'Technologies' },
                { value: '1', label: 'Startup Founded' },
              ].map((stat, index) => (
                <div 
                  key={stat.label} 
                  className="glass-card p-6 text-center hover-lift"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <p className="text-3xl md:text-4xl font-bold text-gradient mb-2">
                    {stat.value}
                  </p>
                  <p className="text-muted-foreground text-sm">{stat.label}</p>
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
