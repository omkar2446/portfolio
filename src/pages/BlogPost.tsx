import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import PageTransition from '@/components/PageTransition';
import AnimatedSection from '@/components/AnimatedSection';
import { ArrowLeft, Calendar, Clock, User, Hash } from 'lucide-react';

const blogPostsData: Record<string, {
  title: string;
  description: string;
  date: string;
  category: string;
  readTime: string;
  content: string[];
}> = {
  'how-i-started-web-development': {
    title: 'The Architecture of Modern Interfaces',
    description: 'Exploring the intersection of technical performance and aesthetic minimalist design.',
    date: 'Dec 15, 2024',
    category: 'Design',
    readTime: '5 min read',
    content : [
      "The pursuit of digital excellence begins with a single question: how do we balance complexity with clarity? In the modern web landscape, users expect seamless interactions paired with high-fidelity visuals. Achieving this requires a deep understanding of both frontend architecture and user psychology.",
      "At the core of every premium interface is a robust design system. Consistency in spacing, typography, and motion creates a sense of reliability and luxury. By utilizing modern tools like React and Tailwind CSS, we can build systems that are both highly performant and incredibly flexible.",
      "Performance is not just a technical metric; it is a fundamental part of the user experience. A slow interface, no matter how beautiful, will always feel 'cheap'. Optimization techniques like lazy loading, image compression, and efficient state management are essential for maintaining a premium feel.",
      "Minimalism is not about removing features; it is about clarifying intent. Every element on the screen should serve a purpose. If a design choice doesn't contribute to the user's primary objective, it is likely noise and should be reconsidered.",
      "As we look toward the future, the role of the frontend engineer is evolving. We are no longer just building pages; we are crafting immersive digital environments. Staying at the forefront of this evolution requires constant learning and a relentless focus on quality."
    ]
  },
  'my-journey-into-ai': {
    title: 'Building Scalable AI Tools',
    description: 'Insights into developing low-latency, high-impact AI integrations for the web.',
    date: 'Dec 10, 2024',
    category: 'Technology',
    readTime: '4 min read',
    content :[
      "Integrating artificial intelligence into web applications is more than just making API calls. It's about creating a cohesive experience where the AI feels like a natural extension of the interface. This requires careful consideration of latency, feedback loops, and user trust.",
      "The biggest challenge in web-based AI is often the perceived delay. When a user interacts with an AI-powered feature, they expect an immediate response. Techniques like streaming text responses (as seen in modern LLMs) and optimistic UI updates are crucial for keeping the experience fluid.",
      "Scalability is another key factor. As your user base grows, your AI integrations must be able to handle the load without sacrificing performance. This often involves backend optimizations, clever caching strategies, and sometimes even moving some computation to the edge or the client side.",
      "Trust is the invisible metric that defines the success of an AI tool. Users need to feel in control and understand what the AI is doing. Transparent loading states, clear error handling, and intuitive feedback mechanisms are essential for building this trust.",
      "The potential for AI to revolutionize the web is immense. From personalized content recommendations to intelligent automation, the possibilities are endless. The key is to implement these technologies in a way that truly adds value to the user's life."
    ]
  },
  'learning-machine-learning-step-by-step': {
    title: 'Minimalist Engineering Philosophy',
    description: 'Why less is often more when it comes to long-term software maintainability.',
    date: 'Dec 5, 2024',
    category: 'Engineering',
    readTime: '6 min read',
    content :[
      "In the world of software engineering, complexity is the enemy of progress. As codebases grow, the cost of maintenance and the risk of bugs increase exponentially. Adopting a minimalist philosophy can help mitigate these risks and lead to more sustainable development.",
      "Minimalist engineering starts with the selection of tools. Choosing technologies that are simple, well-documented, and have a clear purpose is essential. It's often better to master a small set of powerful tools than to constantly jump between the latest trends.",
      "The structure of your code is equally important. Simple, modular architectures are easier to understand, test, and refactor. Avoiding 'clever' solutions in favor of readable, predictable code will save countless hours of debugging in the long run.",
      "Documentation is often overlooked, but it is a cornerstone of minimalist engineering. Clear, concise documentation allows other developers (and your future self) to understand the intent behind the code without having to reverse-engineer it.",
      "Finally, minimalism requires the courage to say no. No to unnecessary features, no to over-engineering, and no to technical debt. By focusing on what truly matters, we can build software that is robust, elegant, and built to last."
    ]
  }
};

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? blogPostsData[slug] : null;

  if (!post) {
    return (
      <PageTransition>
        <div className="min-h-screen pt-32 pb-20 container-max">
          <div className="glass-card p-20 text-center">
            <h1 className="text-4xl font-black mb-8 tracking-tighter">Log Entry Not Found.</h1>
            <p className="text-xl text-foreground/50 mb-12">The requested technical documentation is missing or has been moved.</p>
            <Link to="/blog">
              <Button className="btn-premium px-10 py-7 text-xs font-black uppercase tracking-[0.3em]">
                <ArrowLeft size={16} className="mr-3" />
                Return to Logs
              </Button>
            </Link>
          </div>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="min-h-screen pt-32 pb-20 overflow-hidden">
        <article className="container-max max-w-5xl">
          <AnimatedSection direction="up">
            <Link to="/blog">
              <Button variant="ghost" className="mb-12 px-0 hover:bg-transparent group">
                <span className="flex items-center gap-3 text-xs font-black uppercase tracking-[0.3em] text-foreground/30 group-hover:text-primary transition-colors">
                  <ArrowLeft size={16} />
                  Back to Archives
                </span>
              </Button>
            </Link>

            {/* Header */}
            <header className="mb-20">
              <div className="flex items-center gap-4 mb-8">
                <span className="px-4 py-2 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest border border-primary/20 shadow-glow">
                  {post.category}
                </span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black mb-10 tracking-tighter leading-tight">
                {post.title}
              </h1>
              <div className="flex flex-wrap items-center gap-10 text-foreground/30 text-[10px] font-black uppercase tracking-[0.3em]">
                <span className="flex items-center gap-3">
                  <User size={14} className="text-primary" />
                  Omkar Tambe
                </span>
                <span className="flex items-center gap-3">
                  <Calendar size={14} className="text-primary" />
                  {post.date}
                </span>
                <span className="flex items-center gap-3">
                  <Clock size={14} className="text-primary" />
                  {post.readTime}
                </span>
              </div>
            </header>

            {/* Content */}
            <div className="glass-card p-12 md:p-20 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-primary/20 shimmer" />
              <div className="space-y-10">
                {post.content.map((paragraph, index) => (
                  <p 
                    key={index} 
                    className="text-xl md:text-2xl text-foreground/60 leading-relaxed font-medium"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Footer / CTA */}
            <div className="mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
              <p className="text-xs font-black uppercase tracking-[0.3em] text-foreground/20">End of Technical Log.</p>
              <Link to="/blog">
                <Button className="btn-premium px-12 py-8 text-xs font-black uppercase tracking-[0.3em] shadow-premium shimmer">
                  Explore More Insights
                </Button>
              </Link>
            </div>
          </AnimatedSection>
        </article>
      </div>
    </PageTransition>
  );
};

export default BlogPost;
