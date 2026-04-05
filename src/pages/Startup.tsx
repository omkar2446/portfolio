import { Button } from '@/components/ui/button';
import PageTransition from '@/components/PageTransition';
import AnimatedSection from '@/components/AnimatedSection';
import SectionTitle from '@/components/SectionTitle';
import { 
  ExternalLink, 
  Rocket, 
  Code2, 
  Database, 
  CreditCard, 
  Shield, 
  Smartphone, 
  Search, 
  MessageSquare, 
  Users, 
  ShoppingBag,
  Zap,
  Globe,
  CheckCircle2,
  Star
} from 'lucide-react';

const Startup = () => {
  const features = {
    buyers: [
      { icon: <ShoppingBag size={20} />, text: 'Browse products easily' },
      { icon: <Search size={20} />, text: 'Search & filter items' },
      { icon: <Users size={20} />, text: 'View seller details' },
      { icon: <MessageSquare size={20} />, text: 'Direct contact with sellers' },
      { icon: <Zap size={20} />, text: 'Fast-loading interface' },
    ],
    sellers: [
      { icon: <Shield size={20} />, text: 'Register & login securely' },
      { icon: <ShoppingBag size={20} />, text: 'Add products with images' },
      { icon: <CreditCard size={20} />, text: 'Set price & discount' },
      { icon: <MessageSquare size={20} />, text: 'Add WhatsApp contact' },
      { icon: <CheckCircle2 size={20} />, text: 'Manage product listings' },
    ],
  };

  const techStack = [
    { category: 'Frontend', items: ['React.js', 'Tailwind CSS', 'ShadCN UI', 'React Router', 'Lucide Icons'] },
    { category: 'Backend', items: ['Supabase (PostgreSQL)', 'Supabase Auth', 'Supabase Storage'] },
    { category: 'Payments', items: ['Razorpay'] },
    { category: 'Tools', items: ['Git & GitHub', 'Vercel', 'Postman', 'Figma'] },
  ];

  const highlights = [
    'Multiple Supabase integration',
    'Secure product access',
    'Seller verification logic',
    'Lightweight & fast UI',
    'SEO-friendly pages',
    'Scalable architecture',
  ];

  const responsibilities = [
    'UI/UX Design',
    'Frontend Development',
    'Backend Integration',
    'Supabase Setup',
    'Payment Gateway Integration',
    'Database Design',
    'Deployment',
    'Performance Optimization',
  ];

  return (
    <PageTransition>
      <div className="min-h-screen pt-24">
        {/* Hero Section */}
        <section className="container mx-auto px-6 py-12">
          <AnimatedSection>
            <div className="backdrop-blur-xl bg-white/10 hover:bg-white/15 border border-white/20 rounded-2xl p-8 md:p-12 relative overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/10" />
              <div className="relative z-10">
                <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-white/20 to-white/10 flex items-center justify-center text-white border border-white/20">
                    <Rocket size={40} />
                  </div>
                  <div className="text-center md:text-left">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 drop-shadow-xl">
                      LootDukan
                    </h1>
                    <p className="text-xl text-gray-100 drop-shadow-md">
                      Smart Product Discovery Platform
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-wrap items-center gap-4 mb-6">
                  <span className="px-4 py-2 rounded-full backdrop-blur-sm bg-white/20 text-white font-medium flex items-center gap-2 border border-white/20 shadow-lg">
                    <Globe size={16} />
                    lootdukan.in
                  </span>
                  <span className="px-4 py-2 rounded-full backdrop-blur-sm bg-white/20 text-white font-medium flex items-center gap-2 border border-white/20 shadow-lg">
                    <Code2 size={16} />
                    Founder & Full Stack Developer
                  </span>
                </div>

                <p className="text-lg text-gray-100 mb-8 max-w-3xl drop-shadow-md">
                  LootDukan is a modern e-commerce discovery platform that helps users find the best deals 
                  from verified sellers in one place. The platform allows sellers to list their products 
                  and buyers to directly connect with them — without complex middlemen.
                </p>

                <a 
                  href="https://www.lootdukan.in" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <Button variant="hero" size="lg" className="backdrop-blur-sm bg-white/10 hover:bg-white/20 border-white/20 text-white hover:text-white shadow-lg hover:shadow-xl transition-all duration-300">
                    Visit LootDukan
                    <ExternalLink size={18} />
                  </Button>
                </a>
              </div>
            </div>
          </AnimatedSection>
        </section>

        {/* Problem & Solution */}
        <section className="container mx-auto px-6 py-12">
          <div className="grid md:grid-cols-2 gap-8">
            <AnimatedSection>
              <div className="backdrop-blur-xl bg-white/10 hover:bg-white/15 border border-red-400/30 rounded-2xl p-8 h-full shadow-2xl hover:shadow-3xl transition-all duration-500">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3 drop-shadow-lg">
                  <span className="text-red-400">⚠️</span> Problem Statement
                </h2>
                <ul className="space-y-4 text-gray-100">
                  <li className="flex items-start gap-3">
                    <span className="text-red-400 mt-1">•</span>
                    Small sellers cannot afford high marketplace commissions
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-400 mt-1">•</span>
                    Buyers struggle to find genuine products at the best price
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-400 mt-1">•</span>
                    Existing platforms are complex and expensive
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-400 mt-1">•</span>
                    No easy way for sellers to list products quickly
                  </li>
                </ul>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={100}>
              <div className="backdrop-blur-xl bg-white/10 hover:bg-white/15 border border-green-400/30 rounded-2xl p-8 h-full shadow-2xl hover:shadow-3xl transition-all duration-500">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3 drop-shadow-lg">
                  <span className="text-green-400">✅</span> Solution
                </h2>
                <ul className="space-y-4 text-gray-100">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 size={20} className="text-green-400 mt-0.5 flex-shrink-0" />
                    Simple product listing
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 size={20} className="text-green-400 mt-0.5 flex-shrink-0" />
                    Low-cost seller onboarding (₹50 per product)
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 size={20} className="text-green-400 mt-0.5 flex-shrink-0" />
                    Direct buyer–seller communication
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 size={20} className="text-green-400 mt-0.5 flex-shrink-0" />
                    Clean UI & fast performance
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 size={20} className="text-green-400 mt-0.5 flex-shrink-0" />
                    Secure authentication & Mobile-first design
                  </li>
                </ul>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Features */}
        <section className="container mx-auto px-6 py-12">
          <SectionTitle 
            title="Key Features" 
            subtitle="What makes LootDukan special"
            className="text-white drop-shadow-lg"
          />
          <div className="grid md:grid-cols-2 gap-8">
            <AnimatedSection>
              <div className="backdrop-blur-xl bg-white/10 hover:bg-white/15 border border-white/20 rounded-2xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3 drop-shadow-lg">
                  <ShoppingBag className="text-blue-400" size={24} />
                  For Buyers
                </h3>
                <ul className="space-y-4">
                  {features.buyers.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3 text-gray-100 drop-shadow-sm">
                      <span className="text-blue-400">{feature.icon}</span>
                      {feature.text}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={100}>
              <div className="backdrop-blur-xl bg-white/10 hover:bg-white/15 border border-white/20 rounded-2xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3 drop-shadow-lg">
                  <Users className="text-purple-400" size={24} />
                  For Sellers
                </h3>
                <ul className="space-y-4">
                  {features.sellers.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3 text-gray-100 drop-shadow-sm">
                      <span className="text-purple-400">{feature.icon}</span>
                      {feature.text}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Tech Stack */}
        <section className="container mx-auto px-6 py-12">
          <SectionTitle 
            title="Tech Stack" 
            subtitle="Technologies powering LootDukan"
            className="text-white drop-shadow-lg"
          />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {techStack.map((stack, index) => (
              <AnimatedSection key={stack.category} delay={index * 100}>
                <div className="backdrop-blur-xl bg-white/10 hover:bg-white/15 border border-white/20 rounded-2xl p-6 h-full shadow-2xl hover:shadow-3xl transition-all duration-500">
                  <h3 className="text-lg font-bold text-white mb-4 drop-shadow-lg">{stack.category}</h3>
                  <ul className="space-y-2">
                    {stack.items.map((item) => (
                      <li key={item} className="text-gray-100 text-sm flex items-center gap-2 drop-shadow-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-400/50" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </section>

        {/* Architecture */}
        <section className="container mx-auto px-6 py-12">
          <AnimatedSection>
            <div className="backdrop-blur-xl bg-white/10 hover:bg-white/15 border border-white/20 rounded-2xl p-8 md:p-12 shadow-2xl hover:shadow-3xl transition-all duration-500">
              <h2 className="text-2xl font-bold text-white mb-8 text-center flex items-center justify-center gap-3 drop-shadow-lg">
                <Database className="text-blue-400" size={28} />
                System Architecture
              </h2>
              <div className="bg-white/10 rounded-xl p-6 font-mono text-sm md:text-base overflow-x-auto border border-white/20">
                <pre className="text-gray-100 drop-shadow-sm">
{`Frontend (React)
   │
   ├── Supabase Auth
   │
   ├── Supabase Database
   │
   ├── Supabase Storage
   │
   └── Razorpay (Payment)`}
                </pre>
              </div>
            </div>
          </AnimatedSection>
        </section>

        {/* Highlights & Responsibilities */}
        <section className="container mx-auto px-6 py-12">
          <div className="grid md:grid-cols-2 gap-8">
            <AnimatedSection>
              <div className="backdrop-blur-xl bg-white/10 hover:bg-white/15 border border-white/20 rounded-2xl p-8 h-full shadow-2xl hover:shadow-3xl transition-all duration-500">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3 drop-shadow-lg">
                  <Star className="text-yellow-400" size={24} />
                  Special Highlights
                </h2>
                <div className="flex flex-wrap gap-3">
                  {highlights.map((highlight) => (
                    <span 
                      key={highlight}
                      className="px-4 py-2 rounded-full bg-yellow-400/20 text-yellow-100 text-sm font-medium border border-yellow-400/30 drop-shadow-sm"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={100}>
              <div className="backdrop-blur-xl bg-white/10 hover:bg-white/15 border border-white/20 rounded-2xl p-8 h-full shadow-2xl hover:shadow-3xl transition-all duration-500">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3 drop-shadow-lg">
                  <Code2 className="text-purple-400" size={24} />
                  My Responsibilities
                </h2>
                <div className="grid grid-cols-2 gap-3">
                  {responsibilities.map((item) => (
                    <div 
                      key={item}
                      className="flex items-center gap-2 text-gray-100 text-sm drop-shadow-sm"
                    >
                      <CheckCircle2 size={16} className="text-purple-400 flex-shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* What I Learned */}
        <section className="container mx-auto px-6 py-12 pb-20">
          <AnimatedSection>
            <div className="backdrop-blur-xl bg-white/10 hover:bg-white/15 border border-white/20 rounded-2xl p-8 md:p-12 text-center relative overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400/5 to-purple-400/5" />
              <div className="relative z-10">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 drop-shadow-lg">
                  🏆 What I Learned
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
                  {[
                    'Real-world SaaS architecture',
                    'Supabase authentication & RLS',
                    'Payment gateway integration',
                    'React performance optimization',
                    'Building scalable products',
                    'Startup-level system design',
                  ].map((learning) => (
                    <div 
                      key={learning}
                      className="p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 hover:border-blue-400/50 transition-colors hover:bg-white/15"
                    >
                      <p className="text-sm text-gray-100 drop-shadow-sm">{learning}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedSection>
        </section>
      </div>
    </PageTransition>
  );
};

export default Startup;
