import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import PageTransition from '@/components/PageTransition';
import AnimatedSection from '@/components/AnimatedSection';
import { ArrowLeft, Calendar, Clock, User } from 'lucide-react';

const blogPostsData: Record<string, {
  title: string;
  description: string;
  date: string;
  category: string;
  readTime: string;
  content: string[];
}> = {
  'how-i-started-web-development': {
    title: 'How I Started Web Development',
    description: 'My journey from complete beginner to building real-world projects. Tips and resources that helped me along the way.',
    date: 'Dec 15, 2024',
    category: 'Journey',
    readTime: '5 min read',
    content : [
  "My journey into web development started with curiosity and one simple question: How do websites actually work? I still remember opening the page source for the first time and staring at all that HTML like it was some secret hacker language 😄. That curiosity slowly turned into passion.",

  "The first real step I took was learning HTML. Writing my first few tags and seeing content appear on the browser felt magical. I was like, ‘Wait… I made this?!’ 😄 I used free resources like freeCodeCamp and MDN Web Docs to build a strong foundation.",

  "After that, I moved on to CSS, and that’s where things got fun. Learning Flexbox, Grid, and responsive design helped me understand how websites actually look good on all devices. Later, Tailwind CSS became my favorite because it made styling faster and cleaner.",

  "JavaScript was the real game changer. At first, it felt confusing, but once I understood variables, functions, and DOM manipulation, everything started making sense. I built small projects like calculators and to-do apps, broke them, fixed them, and learned a lot in the process 😅.",

  "Then came React — and that completely changed how I build applications. Components, state management, and reusable UI made development feel powerful. Using React, I started building real-world projects like LootDukan, which helped me understand how actual products are built.",

  "If I had to give one piece of advice, it would be this: start small, build projects, and don’t be afraid to make mistakes. Every error is a lesson. Keep learning, stay consistent, and most importantly — keep coding every day 💻🔥",

  "— Omkar Tambe"
]
  },
  'my-journey-into-ai': {
    title: 'My Journey into AI',
    description: 'Exploring the fascinating world of artificial intelligence and how it inspired me to build AI-powered tools.',
    date: 'Dec 10, 2024',
    category: 'AI',
    readTime: '4 min read',
    content :[
  "My journey into Artificial Intelligence started with curiosity and a little bit of fear 😄. AI sounded very advanced at first — words like neural networks, models, and algorithms made me think, ‘Arre baba, ye toh bohot tough hai!’ But curiosity won, and I decided to explore it step by step.",

  "The first thing I learned was how AI actually works behind the scenes. I started with Python and basic concepts like data, logic, and problem-solving. Slowly, things began to make sense, and AI didn’t feel that scary anymore.",

  "Then I moved into Machine Learning, where I learned how machines learn from data. Concepts like supervised and unsupervised learning were confusing at first, but once I practiced with small datasets, everything became clearer. As we say — ‘Samajla ki mag sagla soppa vatata.’ 😄",

  "Next came the exciting part — building models. I trained simple models for prediction and classification, made mistakes, fixed them, and learned a lot in the process. Some models worked, some failed, but every failure taught me something new.",

  "When I explored AI tools and real-world applications, my interest grew even more. Chatbots, recommendation systems, automation — all of this showed me how powerful AI really is. That’s when I decided to use AI in real projects and experiments.",

  "Today, I’m still learning AI step by step. I believe AI is not about being perfect, it’s about continuous learning. My goal is to combine AI with real-world applications and build something meaningful in the future.",

  "My advice for beginners: Don’t rush. Learn slowly, practice daily, and don’t fear mistakes. AI is a journey, not a race. As we say — ‘Halu-halu pan pakka!’ 🚀",

  "— Omkar Tambe"
]


  },
  'learning-machine-learning-step-by-step': {
    title: 'Learning Machine Learning Step by Step',
    description: 'A beginner-friendly guide to understanding machine learning concepts and getting started with your first ML project.',
    date: 'Dec 5, 2024',
    category: 'Tutorial',
    readTime: '6 min read',
    content :[
  "Machine Learning can feel overwhelming at first. So many algorithms, so much math, and so many tutorials that make you think: 'Bhai, ye sab kaise hoga?' 😅 I’ve been there too. This post is my attempt to explain ML in a simple and practical way — the way I learned it.",

  "Step 1: Start with Python. You don’t need to be a pro, but you should be comfortable with variables, loops, functions, and basic data structures. Libraries like NumPy and Pandas will soon become your best friends. Trust me, once you get used to them, coding feels smooth like butter 🧈.",

  "Step 2: Learn the basics of math. Yes, math 😄 — but don’t panic! You don’t need to be a topper. Just understand the basics of linear algebra, probability, and a little calculus. It’s more about understanding concepts than solving big equations. Thoda patience rakha ki ho jaata hai 👍.",

  "Step 3: Start with supervised learning. This is where things get interesting. Try classification and regression models. Build something simple like house price prediction or spam detection. Scikit-learn is perfect for beginners and very easy to use.",

  "Step 4: Practice with real datasets. Kaggle is a goldmine for learning. Start with small datasets like Iris or Titanic. Don’t worry if your model performs badly at first — even my first models were terrible 😄. Practice makes perfect.",

  "Step 5: Build projects. This is the most important step. Theory is good, but projects make you confident. Try making a movie recommendation system or a sentiment analyzer. Share your work, learn from feedback, and keep improving.",

  "Remember — Machine Learning is a marathon, not a sprint. Take it step by step. Celebrate small wins, stay curious, and never stop experimenting. As we say in Marathi: 'Halu-halu pan nischit!' 🚀",

  "— Omkar Tambe"
]

  }
};

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? blogPostsData[slug] : null;

  if (!post) {
    return (
      <PageTransition>
        <div className="min-h-screen pt-24 container mx-auto px-6 py-20">
          <div className="glass-card p-12 text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">Post Not Found</h1>
            <p className="text-muted-foreground mb-6">The blog post you're looking for doesn't exist.</p>
            <Link to="/blog">
              <Button variant="hero">
                <ArrowLeft size={18} />
                Back to Blog
              </Button>
            </Link>
          </div>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="min-h-screen pt-24">
        <article className="container mx-auto px-6 py-12 max-w-4xl">
          <AnimatedSection>
            <Link to="/blog">
              <Button variant="ghost" className="mb-8 hover:bg-primary/10">
                <ArrowLeft size={18} />
                Back to Blog
              </Button>
            </Link>

            {/* Header */}
            <header className="mb-12">
              <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm mb-6">
                {post.category}
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
                {post.title}
              </h1>
              <p className="text-xl text-muted-foreground mb-6">
                {post.description}
              </p>
              <div className="flex flex-wrap items-center gap-6 text-muted-foreground text-sm">
                <span className="flex items-center gap-2">
                  <User size={16} />
                  Omkar Tambe
                </span>
                <span className="flex items-center gap-2">
                  <Calendar size={16} />
                  {post.date}
                </span>
                <span className="flex items-center gap-2">
                  <Clock size={16} />
                  {post.readTime}
                </span>
              </div>
            </header>

            {/* Content */}
            <div className="glass-card p-8 md:p-12">
              <div className="prose prose-lg max-w-none">
                {post.content.map((paragraph, index) => (
                  <p 
                    key={index} 
                    className="text-muted-foreground leading-relaxed mb-6 last:mb-0"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Share / Navigation */}
            <div className="mt-12 pt-8 border-t border-border">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <p className="text-muted-foreground">Thanks for reading!</p>
                <Link to="/blog">
                  <Button variant="heroOutline">
                    Read More Posts
                  </Button>
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </article>
      </div>
    </PageTransition>
  );
};

export default BlogPost;
