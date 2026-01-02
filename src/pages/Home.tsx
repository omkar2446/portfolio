import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import PageTransition from '@/components/PageTransition';
import AnimatedSection from '@/components/AnimatedSection';
import SectionTitle from '@/components/SectionTitle';
import SkillCard from '@/components/SkillCard';
import profilePhoto from '@/assets/profile-photo.png';
import { 
  Code, 
  Palette, 
  FileCode2, 
  Atom, 
  Terminal, 
  Brain,
  Sparkles,
  ArrowRight
} from 'lucide-react';

const Home = () => {
  const skills = [
    { icon: <Code size={40} />, title: 'HTML' },
    { icon: <Palette size={40} />, title: 'CSS' },
    { icon: <FileCode2 size={40} />, title: 'JavaScript' },
    { icon: <Atom size={40} />, title: 'React' },
    { icon: <Terminal size={40} />, title: 'Python' },
    { icon: <Brain size={40} />, title: 'Machine Learning', isLearning: true },
  ];

  return (
    <PageTransition>
      <div className="min-h-screen pt-24">
        {/* Hero Section */}
        <section className="container mx-auto px-6 py-20 md:py-32">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <p className="text-primary font-medium mb-4 animate-fade-up">
                👋 Welcome to my portfolio
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 animate-fade-up-delay-1">
                Hi, I am{' '}
                <span className="text-gradient">Omkar Tambe</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 animate-fade-up-delay-2">
                Web Developer | AI Enthusiast | Founder of LootDukan
              </p>
              <div className="flex flex-wrap gap-4 animate-fade-up-delay-3">
                <Link to="/contact">
                  <Button variant="hero" size="lg">
                    Contact Me
                    <ArrowRight size={18} />
                  </Button>
                </Link>
                <Link to="/about">
                  <Button variant="heroOutline" size="lg">
                    View My Work
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="order-1 md:order-2 flex justify-center items-center">
  <div className="relative">
    
    <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 animate-float flex items-center justify-center">
      
      <div className="absolute inset-4 rounded-full bg-gradient-to-br from-primary to-accent opacity-80 animate-pulse-glow"></div>

      <div className="absolute inset-6 rounded-full bg-card flex items-center justify-center overflow-hidden">
        <img 
          src={profilePhoto}
          alt="Omkar Tambe"
          className="w-full h-full object-cover object-center rounded-full"
        />
      </div>

    </div>

  </div>
</div>

          </div>
        </section>

        {/* Skills Section */}
        <AnimatedSection className="container mx-auto px-6 py-20">
          <SectionTitle 
            title="My Skills" 
            subtitle="Technologies I work with to bring ideas to life"
          />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {skills.map((skill, index) => (
              <div 
                key={skill.title}
                style={{ animationDelay: `${index * 100}ms` }}
                className="animate-fade-up"
              >
                <SkillCard 
                  icon={skill.icon} 
                  title={skill.title} 
                  isLearning={skill.isLearning} 
                />
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* AI Agency Section */}
        <AnimatedSection className="container mx-auto px-6 py-20">
          <div className="glass-card p-8 md:p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5" />
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent font-medium mb-6">
                <Sparkles size={18} />
                Coming Soon
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Building My AI Agency
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
                I am working on building AI-based tools and websites to help people and businesses 
                leverage the power of artificial intelligence.
              </p>
              <Button variant="glass" size="lg" disabled>
                Coming Soon
              </Button>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </PageTransition>
  );
};

export default Home;
