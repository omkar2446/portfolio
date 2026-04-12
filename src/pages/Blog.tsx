import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import PageTransition from '@/components/PageTransition';
import AnimatedSection from '@/components/AnimatedSection';
import SectionTitle from '@/components/SectionTitle';
import { ArrowRight, Calendar, Hash } from 'lucide-react';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';


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
  const trendingRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (!trendingRef.current) return;
    const items = trendingRef.current.querySelectorAll('li');
    gsap.set(items, { opacity: 0, scale: 0.8 });

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        gsap.to(items, {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: 'back.out(1.7)',
        });
        observer.disconnect();
      }
    }, { threshold: 0.2 });

    observer.observe(trendingRef.current);
    return () => observer.disconnect();
  }, []);

  const topics = ['Web Development', 'React', 'Artificial Intelligence', 'Machine Learning', 'Next.js', 'UI Design'];

  return (
    <PageTransition>
      <div className="min-h-screen pt-24">
        <section className="container mx-auto px-6 py-20">
          <SectionTitle 
            title="Blog" 
            subtitle="Thoughts, tutorials, and my learning journey"
            className="text-white drop-shadow-lg"
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {blogPosts.map((post, index) => (
              <AnimatedSection key={post.title} delay={index * 100}>
                <article className="backdrop-blur-xl bg-white/10 hover:bg-white/15 border border-white/20 rounded-2xl h-full flex flex-col hover-lift group overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500">
                  <div className="h-48 bg-gradient-to-br from-white/20 to-white/10 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    <span className="absolute bottom-4 left-4 px-3 py-1 rounded-full backdrop-blur-sm bg-white/20 text-white text-sm font-medium border border-white/20 shadow-lg">
                      {post.category}
                    </span>
                  </div>
                  
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center gap-2 text-gray-200 text-sm mb-3 drop-shadow-sm">
                      <Calendar size={14} className="text-white" />
                      {post.date}
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-white transition-colors drop-shadow-lg">
                      {post.title}
                    </h3>
                    <p className="text-gray-100 mb-6 flex-grow drop-shadow-md">
                      {post.description}
                    </p>
                    
                    <Link to={`/blog/${post.slug}`}>
                      <Button 
                        variant="ghost" 
                        className="w-fit group/btn relative overflow-hidden backdrop-blur-sm bg-white/10 hover:bg-white/20 border border-white/20 text-white hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl"
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

          <div className="mt-20">
            <h4 className="text-white font-bold mb-6 flex items-center gap-2">
              <Hash className="text-purple-400" size={20} />
              Trending Topics
            </h4>
            <ul ref={trendingRef} className="flex flex-wrap gap-4">
              {topics.map((topic, i) => (
                <li key={i} className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white text-sm hover:bg-white/10 transition-colors cursor-pointer shadow-lg backdrop-blur-sm">
                  {topic}
                </li>
              ))}
            </ul>
          </div>



          {/* Newsletter Section */}
          
        </section>
      </div>
    </PageTransition>
  );
};

export default Blog;
