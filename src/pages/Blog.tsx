import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import PageTransition from '@/components/PageTransition';
import AnimatedSection from '@/components/AnimatedSection';
import SectionTitle from '@/components/SectionTitle';
import { ArrowRight, Calendar, Hash } from 'lucide-react';

const blogPosts = [
  {
    title: 'The Architecture of Modern Interfaces',
    description: 'Exploring the intersection of technical performance and aesthetic minimalist design.',
    date: 'Dec 15, 2024',
    category: 'Design',
    slug: 'how-i-started-web-development',
  },
  {
    title: 'Building Scalable AI Tools',
    description: 'Insights into developing low-latency, high-impact AI integrations for the web.',
    date: 'Dec 10, 2024',
    category: 'Technology',
    slug: 'my-journey-into-ai',
  },
  {
    title: 'Minimalist Engineering Philosophy',
    description: 'Why less is often more when it comes to long-term software maintainability.',
    date: 'Dec 5, 2024',
    category: 'Engineering',
    slug: 'learning-machine-learning-step-by-step',
  },
];

const Blog = () => {
  const topics = ['Web Architecture', 'React Ecosystem', 'Artificial Intelligence', 'Machine Learning', 'Next.js 15', 'Premium UX'];

  return (
    <PageTransition>
      <div className="min-h-screen pt-32 pb-20 overflow-hidden">
        <div className="container-max">
          <SectionTitle 
            label="ARCHIVES"
            title="INSIGHTS & LOGS." 
            subtitle="Documenting technical challenges and the evolution of digital craft through strategic development."
            className="mb-24"
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 mb-24">
            {blogPosts.map((post, index) => (
              <AnimatedSection key={post.title} delay={index * 100}>
                <article className="glass-card h-full flex flex-col card-lift group relative overflow-hidden">
                  <div className="h-4 bg-primary/20 absolute top-0 left-0 right-0 shimmer" />
                  
                  <div className="p-10 flex flex-col flex-grow">
                    <div className="flex items-center gap-3 text-foreground/40 text-[10px] font-black uppercase tracking-[0.2em] mb-6">
                      <Calendar size={14} className="text-primary" />
                      {post.date}
                    </div>
                    
                    <h3 className="text-3xl font-black mb-6 tracking-tighter leading-tight">
                      {post.title}
                    </h3>
                    <p className="text-lg text-foreground/50 mb-10 flex-grow leading-relaxed">
                      {post.description}
                    </p>
                    
                    <div className="flex items-center justify-between mt-auto">
                      <span className="text-[10px] font-black uppercase tracking-widest text-primary">
                        {post.category}
                      </span>
                      <Link to={`/blog/${post.slug}`}>
                        <Button 
                          variant="ghost" 
                          className="group/btn relative px-0 hover:bg-transparent"
                        >
                          <span className="relative z-10 flex items-center gap-2 font-black uppercase tracking-[0.2em] text-[10px] group-hover/btn:text-primary transition-colors">
                            Read Entry
                            <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                          </span>
                        </Button>
                      </Link>
                    </div>
                  </div>
                </article>
              </AnimatedSection>
            ))}
          </div>

          <div className="mt-32">
            <h4 className="text-xl font-black mb-10 tracking-[0.2em] flex items-center gap-4 text-foreground/30">
              <Hash className="text-primary" size={20} />
              EXPLORE TOPICS
            </h4>
            <div className="flex flex-wrap gap-4">
              {topics.map((topic, i) => (
                <AnimatedSection key={i} delay={i * 50} direction="up">
                  <div className="px-8 py-4 rounded-2xl bg-secondary/30 border border-white/5 text-foreground/60 text-xs font-black uppercase tracking-widest hover:bg-primary/10 hover:text-primary transition-all cursor-pointer shadow-soft">
                    {topic}
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

export default Blog;
