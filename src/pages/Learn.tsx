import { Button } from '@/components/ui/button';
import PageTransition from '@/components/PageTransition';
import AnimatedSection from '@/components/AnimatedSection';
import SectionTitle from '@/components/SectionTitle';
import { Code, Terminal, Atom, Brain, Play, BookOpen } from 'lucide-react';

const courses = [
  {
    icon: <Code size={32} />,
    title: 'Web Development',
    description: 'Learn HTML, CSS, and JavaScript from scratch. Build responsive and modern websites.',
    status: 'available',
  },
  {
    icon: <Terminal size={32} />,
    title: 'Python Basics',
    description: 'Master Python programming fundamentals. Perfect for beginners and automation enthusiasts.',
    status: 'available',
  },
  {
    icon: <Atom size={32} />,
    title: 'React for Beginners',
    description: 'Build interactive user interfaces with React. Learn component-based architecture.',
    status: 'available',
  },
  {
    icon: <Brain size={32} />,
    title: 'Machine Learning',
    description: 'Introduction to ML concepts and algorithms. Currently learning and documenting my journey.',
    status: 'learning',
  },
];

const Learn = () => {
  return (
    <PageTransition>
      <div className="min-h-screen pt-24">
        <section className="container mx-auto px-6 py-20">
          <SectionTitle 
            title="Learn From Me" 
            subtitle="Sharing my knowledge and learning journey"
          />

          <div className="grid md:grid-cols-2 gap-8">
            {courses.map((course, index) => (
              <AnimatedSection key={course.title} delay={index * 100}>
                <div className="glass-card p-8 h-full hover-lift group relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-6">
                      <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:scale-110 transition-transform duration-300">
                        {course.icon}
                      </div>
                      {course.status === 'learning' && (
                        <span className="px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium">
                          Currently Learning
                        </span>
                      )}
                    </div>
                    
                    <h3 className="text-xl font-bold text-foreground mb-3">
                      {course.title}
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      {course.description}
                    </p>
                    
                    <Button 
                      variant={course.status === 'learning' ? 'outline' : 'default'}
                      className="w-full"
                    >
                      {course.status === 'learning' ? (
                        <>
                          <BookOpen size={18} />
                          Coming Soon
                        </>
                      ) : (
                        <>
                          <Play size={18} />
                          Watch / Learn
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          {/* Learning Philosophy */}
          <AnimatedSection className="mt-16" delay={400}>
            <div className="glass-card p-8 md:p-12 text-center">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                My Learning Philosophy
              </h3>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                I believe in learning by doing and sharing knowledge as I grow. 
                These resources are designed to help beginners understand concepts 
                through practical examples and real-world projects.
              </p>
            </div>
          </AnimatedSection>
        </section>
      </div>
    </PageTransition>
  );
};

export default Learn;
