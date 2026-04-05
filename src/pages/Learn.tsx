import { useState } from 'react';
import { Button } from '@/components/ui/button';
import PageTransition from '@/components/PageTransition';
import AnimatedSection from '@/components/AnimatedSection';
import SectionTitle from '@/components/SectionTitle';
import { Code, Terminal, Atom, Brain, Play, BookOpen } from 'lucide-react';

const courses = [
  {
    icon: <Code size={32} />,
    title: 'Web Development',
    description: 'Learn HTML.',
    status: 'available',
    youtubeId: 'yrXeT0jfc7w',
  },
  {
    icon: <Terminal size={32} />,
    title: 'Python Basics',
    description: 'Master Python programming fundamentals. Perfect for beginners and automation enthusiasts.',
    status: 'available',
    youtubeId: 'YOUR_YOUTUBE_VIDEO_ID_2',
  },
  {
    icon: <Atom size={32} />,
    title: 'React for Beginners',
    description: 'Build interactive user interfaces with React. Learn component-based architecture.',
    status: 'available',
    youtubeId: 'YOUR_YOUTUBE_VIDEO_ID_3',
  },
  {
    icon: <Brain size={32} />,
    title: 'Machine Learning',
    description: 'Introduction to ML concepts and algorithms. Currently learning and documenting my journey.',
    status: 'learning',
  },
];

const Learn = () => {
  const [activeVideo, setActiveVideo] = useState(null);

  return (
    <PageTransition>
      <div className="min-h-screen pt-24">
        <section className="container mx-auto px-6 py-20">
          <SectionTitle 
            title="Learn From Me" 
            subtitle="Sharing my knowledge and learning journey"
            className="text-white drop-shadow-lg"
          />

          <div className="grid md:grid-cols-2 gap-10">
            {courses.map((course, index) => (
              <AnimatedSection key={course.title} delay={index * 100}>
                <div className="backdrop-blur-xl bg-white/10 hover:bg-white/15 border border-white/20 rounded-2xl p-8 h-full hover-lift group relative overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400/5 to-purple-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-6">
                      <div className="p-3 rounded-xl bg-blue-400/20 text-blue-300 group-hover:scale-110 transition-transform duration-300 border border-blue-400/30">
                        {course.icon}
                      </div>
                      {course.status === 'learning' && (
                        <span className="px-3 py-1 rounded-full bg-yellow-400/20 text-yellow-100 text-sm font-medium border border-yellow-400/30 drop-shadow-sm">
                          Currently Learning
                        </span>
                      )}
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-3 drop-shadow-lg">
                      {course.title}
                    </h3>
                    <p className="text-gray-100 mb-6 drop-shadow-sm">
                      {course.description}
                    </p>
                    
                    <Button 
                      variant={course.status === 'learning' ? 'outline' : 'default'}
                      className="w-full bg-blue-500/20 hover:bg-blue-500/30 text-white border-blue-400/30 hover:border-blue-400/50 drop-shadow-sm"
                      disabled={course.status === 'learning'}
                      onClick={() => setActiveVideo(course.youtubeId)}
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
            <div className="backdrop-blur-xl bg-white/10 hover:bg-white/15 border border-white/20 rounded-2xl p-8 md:p-12 text-center shadow-2xl hover:shadow-3xl transition-all duration-500">
              <h3 className="text-2xl font-bold text-white mb-4 drop-shadow-lg">
                My Learning Philosophy
              </h3>
              <p className="text-gray-100 max-w-2xl mx-auto drop-shadow-sm">
                I believe in learning by doing and sharing knowledge as I grow. 
                These resources are designed to help beginners understand concepts 
                through practical examples and real-world projects.
              </p>
            </div>
          </AnimatedSection>
        </section>
      </div>

      {/* ================= YouTube Popup Modal ================= */}
      {activeVideo && (
<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-3xl aspect-video bg-black rounded-2xl overflow-hidden border border-white/20 shadow-2xl">
            
            {/* Close Button */}
            <button
              onClick={() => setActiveVideo(null)}
              className="absolute top-3 right-3 z-10 bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-lg border border-white/30 hover:bg-white/30 transition-colors drop-shadow-lg"
            >
              ✕
            </button>

            {/* YouTube Video */}
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1`}
              title="YouTube video player"
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          </div>
        </div>
      )}
      {/* ======================================================= */}
    </PageTransition>
  );
};

export default Learn;
