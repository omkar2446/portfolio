import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { useRef, useEffect, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import BackgroundVideo from "./components/BackgroundVideo";
import Home from "./pages/Home";
import About from "./pages/About";
import Startup from "./pages/Startup";
import Learn from "./pages/Learn";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = 0.3;
      if (!isMuted) {
        audio.play().catch(() => {
          // Autoplay prevented by browser
        });
      } else {
        audio.pause();
      }
    }
  }, [isMuted]);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            {/* Background Audio */}
            <audio
              ref={audioRef}
              loop
              preload="metadata"
            >
              <source src="/sound.mp3" type="audio/mpeg" />
            </audio>

            {/* Music Toggle Button - Fixed Position */}
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-2 rounded-lg bg-accent/20 hover:bg-accent/30 text-accent transition-colors backdrop-blur-sm border border-accent/20"
            >
              {isMuted ? (
                <>
                  <VolumeX size={18} />
                  <span className="hidden sm:inline">Tap for Music</span>
                </>
              ) : (
                <>
                  <Volume2 size={18} />
                  <span className="hidden sm:inline">Music Playing</span>
                </>
              )}
            </button>

            <div className="min-h-screen flex flex-col transition-colors duration-300 relative">
              <BackgroundVideo />
              <Navbar />
              <main className="flex-grow relative z-0">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/startup" element={<Startup />} />
                  <Route path="/learn" element={<Learn />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/blog/:slug" element={<BlogPost />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
