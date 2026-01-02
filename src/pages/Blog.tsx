import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import PageTransition from '@/components/PageTransition';
import AnimatedSection from '@/components/AnimatedSection';
import SectionTitle from '@/components/SectionTitle';
import { ArrowRight, Calendar } from 'lucide-react';

const blogPosts = [
  {
    title: 'How I Started Web Development',
    description: 'My journey from complete beginner to building real-world projects. Tips and resources that helped me along the way.',
    date: 'Dec 15, 2024',
    category: 'Journey',
    slug: 'how-i-started-web-development',
  },
  {
    title: 'My Journey into AI',
    description: 'Exploring the fascinating world of artificial intelligence and how it inspired me to build AI-powered tools.',
    date: 'Dec 10, 2024',
    category: 'AI',
    slug: 'my-journey-into-ai',
  },
  {
    title: 'Learning Machine Learning Step by Step',
    description: 'A beginner-friendly guide to understanding machine learning concepts and getting started with your first ML project.',
    date: 'Dec 5, 2024',
    category: 'Tutorial',
    slug: 'learning-machine-learning-step-by-step',
  },
];

const Blog = () => {
  return (
    <PageTransition>
      <div className="min-h-screen pt-24">
        <section className="container mx-auto px-6 py-20">
          <SectionTitle 
            title="Blog" 
            subtitle="Thoughts, tutorials, and my learning journey"
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <AnimatedSection key={post.title} delay={index * 100}>
                <article className="glass-card h-full flex flex-col hover-lift group overflow-hidden">
                  {/* Image placeholder */}
                  <div className="h-48 bg-gradient-to-br from-primary/20 to-accent/20 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
                    <span className="absolute bottom-4 left-4 px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-medium backdrop-blur-sm">
                      {post.category}
                    </span>
                  </div>
                  
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center gap-2 text-muted-foreground text-sm mb-3">
                      <Calendar size={14} />
                      {post.date}
                    </div>
                    
                    <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground mb-6 flex-grow">
                      {post.description}
                    </p>
                    
                    <Link to={`/blog/${post.slug}`}>
                      <Button 
                        variant="ghost" 
                        className="w-fit group/btn relative overflow-hidden bg-foreground/5 hover:bg-foreground hover:text-background transition-all duration-300"
                      >
                        <span className="relative z-10 flex items-center gap-2">
                          Read More
                          <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                        </span>
                      </Button>
                    </Link>
                  </div>
                </article>
              </AnimatedSection>
            ))}
          </div>

          {/* Newsletter Section */}
          
        </section>
      </div>
    </PageTransition>
  );
};

export default Blog;
