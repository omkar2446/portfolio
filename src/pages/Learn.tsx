import { useState } from 'react';
import { Button } from '@/components/ui/button';
import PageTransition from '@/components/PageTransition';
import AnimatedSection from '@/components/AnimatedSection';
import SectionTitle from '@/components/SectionTitle';
import { Code, Terminal, Atom, Brain, Play, BookOpen, Download, Database, FileJson, Layers } from 'lucide-react';
import { motion } from 'framer-motion';

const courses = [
  {
    icon: <Code size={32} />,
    title: 'Web Architecture',
    description: 'Master the fundamental principles of modern web engineering. From structure to complex state patterns.',
    status: 'available',
    youtubeId: 'yrXeT0jfc7w',
  },
  {
    icon: <Terminal size={32} />,
    title: 'Python Mastery',
    description: 'Advanced Python programming for engineering robust, automated, and high-performance systems.',
    status: 'available',
    youtubeId: 'YOUR_YOUTUBE_VIDEO_ID_2',
  },
  {
    icon: <Atom size={32} />,
    title: 'React Ecosystem',
    description: 'Developing high-fidelity user interfaces with React and its comprehensive library ecosystem.',
    status: 'available',
    youtubeId: 'YOUR_YOUTUBE_VIDEO_ID_3',
  },
  {
    icon: <Brain size={32} />,
    title: 'Intelligent Systems',
    description: 'Exploring neural networks and predictive modeling. Currently documenting technical milestones.',
    status: 'learning',
  },
];

const handbooks = [
  { title: 'Python Handbook', icon: <Terminal size={40} className="text-[#3776AB]" />, color: 'from-[#3776AB]/20 to-[#FFD43B]/20' },
  { title: 'C Handbook', icon: <Code size={40} className="text-[#A8B9CC]" />, color: 'from-[#A8B9CC]/20 to-[#555555]/20' },
  { title: 'HTML Handbook', icon: <FileJson size={40} className="text-[#E34F26]" />, color: 'from-[#E34F26]/20 to-[#F06529]/20' },
  { title: 'SQL Handbook', icon: <Database size={40} className="text-[#4479A1]" />, color: 'from-[#4479A1]/20 to-[#00758F]/20' },
  { title: 'MongoDB Handbook', icon: <Layers size={40} className="text-[#47A248]" />, color: 'from-[#47A248]/20 to-[#589636]/20' },
];

const Learn = () => {
  const [activeVideo, setActiveVideo] = useState(null);

  return (
    <PageTransition>
      <div className="min-h-screen pt-32 pb-20 overflow-hidden">
        <div className="container-max">
          <SectionTitle 
            centered
            label="Resources"
            title="Knowledge Sharing" 
            subtitle="Curated technical resources and strategic insights from my ongoing architectural journey."
          />

          {/* Handbooks Section */}
          <div className="mb-40">
            <div className="flex flex-col items-center mb-16 text-center">
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter">Download Handbooks</h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
              {handbooks.map((handbook, i) => (
                <AnimatedSection key={i} delay={i * 100}>
                  <div className="glass-card p-10 flex flex-col items-center text-center group card-lift h-full relative overflow-hidden border-white/5 bg-white/5 hover:bg-white/10 transition-colors">
                    <div className={`absolute inset-0 bg-gradient-to-br ${handbook.color} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
                    
                    <div className="relative z-10 w-24 h-24 rounded-full bg-secondary/50 flex items-center justify-center mb-6 shadow-soft group-hover:scale-110 transition-all duration-500">
                      {handbook.icon}
                    </div>
                    
                    <div className="relative z-10 flex-grow w-full">
                      <h3 className="text-xl font-bold mb-1 tracking-tight text-foreground">{handbook.title}</h3>
                      <p className="text-sm text-foreground/40 mb-8 font-medium">Download Handbook Here</p>
                    </div>
                    
                    <Button className="relative z-10 w-full py-6 rounded-xl bg-secondary/80 hover:bg-primary hover:text-white transition-all font-bold text-sm shadow-soft">
                      Download
                    </Button>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>

          {/* Courses Section */}
          <div className="mb-40">
            <div className="flex flex-col items-center mb-16 text-center">
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter">Premium Modules</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              {courses.map((course, index) => (
                <AnimatedSection key={course.title} delay={index * 100}>
                  <div className="glass-card p-12 h-full flex flex-col card-lift group relative overflow-hidden border-white/5">
                    <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 blur-[80px] rounded-full group-hover:bg-primary/10 transition-colors duration-700" />
                    
                    <div className="relative z-10 flex flex-col h-full">
                      <div className="flex items-start justify-between mb-10">
                        <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center text-primary group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-soft">
                          {course.icon}
                        </div>
                        {course.status === 'learning' && (
                          <span className="px-4 py-2 rounded-full bg-primary/10 text-primary text-xs font-bold border border-primary/20 shadow-glow">
                            Researching
                          </span>
                        )}
                      </div>
                      
                      <h3 className="text-3xl font-black mb-4 tracking-tighter">
                        {course.title}
                      </h3>
                      <p className="text-lg text-foreground/50 mb-10 leading-relaxed flex-grow font-medium">
                        {course.description}
                      </p>
                      
                      <Button 
                        variant={course.status === 'learning' ? 'outline' : 'default'}
                        className={`w-full py-8 text-sm font-bold rounded-2xl ${
                          course.status === 'learning' 
                          ? 'border-white/5 text-foreground/20' 
                          : 'btn-premium shimmer shadow-premium'
                        }`}
                        disabled={course.status === 'learning'}
                        onClick={() => setActiveVideo(course.youtubeId)}
                      >
                        {course.status === 'learning' ? (
                          <>
                            <BookOpen size={18} className="mr-2" />
                            Waitlist
                          </>
                        ) : (
                          <>
                            <Play size={18} className="mr-2" />
                            Initialize Course
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>

          <AnimatedSection className="mt-24" delay={400}>
            <div className="glass-card p-12 md:p-20 text-center relative overflow-hidden border-white/5">
              <div className="absolute inset-0 bg-primary/5 blur-[150px] rounded-full -z-10" />
              <h3 className="text-4xl md:text-5xl font-black mb-8 tracking-tighter">
                The Philosophy of Continuous Growth.
              </h3>
              <p className="text-xl md:text-2xl text-foreground/40 max-w-4xl mx-auto leading-relaxed font-medium">
                I believe in the power of shared knowledge. These modules are meticulously engineered 
                to simplify complex paradigms and provide strategic insights for the next generation of digital architects.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </div>

      {/* YouTube Modal */}
      {activeVideo && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/90 backdrop-blur-3xl p-6 md:p-12">
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative w-full max-w-6xl aspect-video bg-black rounded-[3rem] overflow-hidden border border-white/10 shadow-premium"
          >
            <button
              onClick={() => setActiveVideo(null)}
              className="absolute top-8 right-8 z-50 w-12 h-12 rounded-full bg-white/10 backdrop-blur-xl text-white flex items-center justify-center border border-white/20 hover:bg-white/20 transition-all shadow-glow"
            >
              ✕
            </button>
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1`}
              title="YouTube video player"
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          </motion.div>
        </div>
      )}
    </PageTransition>
  );
};

export default Learn;
