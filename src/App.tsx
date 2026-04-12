import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { useRef, useEffect, useState } from "react";
import { Music2 } from "lucide-react";
import { usePerformanceMode } from "./hooks/usePerformanceMode";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import GlobalBackground from "./components/GlobalBackground";
import VantaBackground from "./components/VantaBackground";
import CustomCursor from "./components/CustomCursor";
import Home from "./pages/Home";



import About from "./pages/About";
import Learn from "./pages/Learn";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

/* ═══════════════════════════════════════════════════════
   STYLES
═══════════════════════════════════════════════════════ */
const MUSIC_STYLES = `
  @keyframes barDance {
    0%,100% { transform:scaleY(.4); }
    50%      { transform:scaleY(1); }
  }
  @keyframes entryOrbFloat1 {
    0%,100% { transform:translate(0,0) scale(1); }
    50%      { transform:translate(30px,-20px) scale(1.1); }
  }
  @keyframes entryOrbFloat2 {
    0%,100% { transform:translate(0,0) scale(1); }
    50%      { transform:translate(-20px,30px) scale(1.08); }
  }
  @keyframes entryFadeIn {
    from { opacity:0; transform:translateY(24px); }
    to   { opacity:1; transform:translateY(0); }
  }
  @keyframes entryRingPop {
    from { opacity:0; transform:scale(.7); }
    to   { opacity:1; transform:scale(1); }
  }
  @keyframes entryIconPulse {
    0%,100% { box-shadow:0 0 0 0 rgba(167,139,250,.4); }
    50%      { box-shadow:0 0 0 14px rgba(167,139,250,0); }
  }
  @keyframes entrySpinRing {
    to { transform:rotate(360deg); }
  }
  @keyframes entryOverlayOut {
    from { opacity:1; transform:scale(1); }
    to   { opacity:0; transform:scale(1.15) rotate(1deg); filter: blur(20px); }
  }
  @keyframes portalOutLeft {
    to { transform: translateX(-150%) scale(0.5); opacity: 0; }
  }
  @keyframes portalOutRight {
    to { transform: translateX(150%) scale(0.5); opacity: 0; }
  }
  @keyframes contentOut {
    to { transform: scale(0.8) translateY(50px); opacity: 0; }
  }

  .entry-overlay {
    position:fixed; inset:0; z-index:99999;
    background:#0a0a0f;
    display:flex; align-items:center; justify-content:center;
    overflow:hidden;
  }
  .entry-overlay.leaving {
    animation:entryOverlayOut .8s cubic-bezier(.22,1,.36,1) forwards;
    pointer-events:none;
  }
  .entry-overlay.leaving .entry-orb1 { animation: portalOutLeft .8s ease-in forwards; }
  .entry-overlay.leaving .entry-orb2 { animation: portalOutRight .8s ease-in forwards; }
  .entry-overlay.leaving .entry-content { animation: contentOut .6s ease-in forwards; }
  .entry-orb1 {
    position:absolute; width:420px; height:420px; border-radius:50%;
    background:radial-gradient(circle,rgba(139,92,246,.28) 0%,transparent 70%);
    top:-100px; left:-80px;
    animation:entryOrbFloat1 8s ease-in-out infinite;
  }
  .entry-orb2 {
    position:absolute; width:340px; height:340px; border-radius:50%;
    background:radial-gradient(circle,rgba(96,165,250,.22) 0%,transparent 70%);
    bottom:-60px; right:-60px;
    animation:entryOrbFloat2 11s ease-in-out infinite;
  }
  .entry-orb3 {
    position:absolute; width:200px; height:200px; border-radius:50%;
    background:radial-gradient(circle,rgba(244,114,182,.15) 0%,transparent 70%);
    top:40%; left:60%;
    animation:entryOrbFloat2 9s ease-in-out 2s infinite;
  }
  .entry-content {
    text-align:center; position:relative; z-index:2;
    padding:2.5rem 2rem;
  }
  .entry-icon-wrap {
    position:relative; display:inline-flex;
    align-items:center; justify-content:center;
    margin-bottom:1.75rem;
    animation:entryRingPop .6s cubic-bezier(.22,1,.36,1) .1s both;
  }
  .entry-ring1 {
    position:absolute; width:96px; height:96px; border-radius:50%;
    border:1.5px solid rgba(167,139,250,.35);
    animation:entrySpinRing 6s linear infinite;
  }
  .entry-ring2 {
    position:absolute; width:120px; height:120px; border-radius:50%;
    border:1px dashed rgba(96,165,250,.2);
    animation:entrySpinRing 10s linear infinite reverse;
  }
  .entry-icon-circle {
    width:72px; height:72px; border-radius:50%;
    background:rgba(139,92,246,.18);
    border:1.5px solid rgba(167,139,250,.55);
    display:flex; align-items:center; justify-content:center;
    animation:entryIconPulse 2.5s ease-in-out infinite;
  }
  .entry-title {
    color:#fff; font-size:1.5rem; font-weight:600;
    margin:0 0 .4rem; letter-spacing:.01em;
    animation:entryFadeIn .7s .15s both;
  }
  .entry-subtitle {
    color:rgba(255,255,255,.5); font-size:.9rem;
    margin:0 0 2.25rem;
    animation:entryFadeIn .7s .25s both;
  }
  .entry-buttons {
    display:flex; gap:14px; justify-content:center;
    animation:entryFadeIn .7s .35s both;
  }
  .entry-btn-play {
    display:flex; align-items:center; gap:9px;
    padding:.65rem 1.6rem; border-radius:99px;
    background:rgba(167,139,250,.85);
    border:1.5px solid rgba(167,139,250,.9);
    color:#fff; font-size:.9rem; font-weight:500;
    cursor:pointer;
    transition:transform .2s ease, background .2s ease, box-shadow .2s ease;
  }
  .entry-btn-play:hover {
    transform:translateY(-3px) scale(1.04);
    background:rgba(167,139,250,1);
    box-shadow:0 10px 28px rgba(139,92,246,.45);
  }
  .entry-btn-skip {
    padding:.65rem 1.6rem; border-radius:99px;
    background:rgba(255,255,255,.06);
    border:1.5px solid rgba(255,255,255,.15);
    color:rgba(255,255,255,.7); font-size:.9rem; font-weight:500;
    cursor:pointer;
    transition:transform .2s ease, background .2s ease;
  }
  .entry-btn-skip:hover {
    transform:translateY(-3px) scale(1.04);
    background:rgba(255,255,255,.12);
  }
  .entry-hint {
    color:rgba(255,255,255,.2); font-size:.75rem;
    margin-top:1.75rem;
    animation:entryFadeIn .7s .5s both;
  }
  .entry-bars {
    display:flex; align-items:flex-end;
    gap:3px; height:18px;
  }
  .entry-bar {
    width:3.5px; border-radius:2px; background:white;
    animation:barDance .8s ease-in-out infinite;
  }
  .music-fab {
    position:fixed; bottom:28px; right:28px; z-index:9999;
    width:52px; height:52px; border-radius:50%;
    backdrop-filter:blur(12px);
    display:flex; align-items:center; justify-content:center;
    cursor:pointer;
    transition:transform .25s ease, background .25s ease, box-shadow .25s ease, border-color .25s ease;
  }
  .music-fab:hover { transform:scale(1.12); }
  .music-fab-bars {
    display:flex; align-items:flex-end;
    gap:3px; height:20px;
  }
  .music-fab-bar {
    width:3px; border-radius:2px; background:white;
    transition:height .1s linear;
  }
`;

/* ═══════════════════════════════════════════════════════
   MUSIC ENTRY SCREEN
═══════════════════════════════════════════════════════ */
function MusicEntryScreen({ onChoice }: { onChoice: (withMusic: boolean) => void }) {
  const [leaving, setLeaving] = useState(false);
  const isLowPerformance = usePerformanceMode();

  const handleChoice = (withMusic: boolean) => {
    setLeaving(true);
    setTimeout(() => onChoice(withMusic), 750);
  };

  return (
    <div className={`entry-overlay${leaving ? " leaving" : ""}`}>
      {!isLowPerformance && (
        <>
          <div className="entry-orb1" />
          <div className="entry-orb2" />
          <div className="entry-orb3" />
        </>
      )}

      <div className="entry-content">
        <div className="entry-icon-wrap">
          <div className="entry-ring1" />
          <div className="entry-ring2" />
          <div className="entry-icon-circle">
            <Music2 size={28} color="rgba(200,180,255,0.95)" />
          </div>
        </div>

        <h2 className="entry-title">Background music</h2>
        <p className="entry-subtitle">Would you like ambient music while browsing?</p>

        <div className="entry-buttons">
          <button className="entry-btn-play" onClick={() => handleChoice(true)}>
            <div className="entry-bars">
              {[0, 1, 2, 3].map((_, i) => (
                <div
                  key={i}
                  className="entry-bar"
                  style={{ animationDelay: `${i * 0.1}s`, height: "100%" }}
                />
              ))}
            </div>
            Play music
          </button>
          <button className="entry-btn-skip" onClick={() => handleChoice(false)}>
            Skip
          </button>
        </div>

        <p className="entry-hint">You can toggle this anytime with the button below</p>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   FLOATING MUSIC TOGGLE BUTTON
═══════════════════════════════════════════════════════ */
function MusicFab({
  isPlaying,
  onToggle,
}: {
  isPlaying: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      onClick={onToggle}
      className="music-fab"
      style={{
        background: isPlaying ? "rgba(167,139,250,0.85)" : "rgba(0,0,0,0.75)",
        border: `1.5px solid ${isPlaying ? "#a78bfa" : "rgba(255,255,255,0.3)"}`,
        boxShadow: isPlaying
          ? "0 0 20px rgba(167,139,250,0.6)"
          : "0 2px 8px rgba(0,0,0,0.3)",
      }}
      title={isPlaying ? "Pause music" : "Play music"}
    >
      {isPlaying ? (
        <div className="music-fab-bars">
          {[0, 1, 2, 3].map((_, i) => (
            <div
              key={i}
              className="music-fab-bar"
              style={{
                height: "16px",
                animation: "barDance 0.8s ease-in-out infinite",
                animationDelay: `${i * 0.1}s`,
              }}
            />
          ))}
        </div>
      ) : (
        <Music2 size={22} color="white" />
      )}
    </button>
  );
}

/* ═══════════════════════════════════════════════════════
   APP
═══════════════════════════════════════════════════════ */
const App = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [showEntry, setShowEntry] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  // Create audio once, never recreate on route change
  useEffect(() => {
    const audio = new Audio("/sound.mp3");
    audio.loop = true;
    audio.volume = 0.3;
    audio.preload = "auto";
    audioRef.current = audio;

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  const handleEntryChoice = (withMusic: boolean) => {
    setShowEntry(false);
    if (withMusic && audioRef.current) {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.error("Playback failed:", err));
    }
  };

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.error("Playback failed:", err));
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <TooltipProvider>
          <Toaster />
          <Sonner />

          {/* Inject music styles globally */}
          <style>{MUSIC_STYLES}</style>

          {/* Entry screen — shown once, then gone forever */}
          {showEntry && <MusicEntryScreen onChoice={handleEntryChoice} />}

          {/* Floating toggle — always visible after entry */}
          {!showEntry && (
            <MusicFab isPlaying={isPlaying} onToggle={toggleMusic} />
          )}

          <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <div className="min-h-screen flex flex-col transition-colors duration-300 relative cursor-none">
              <GlobalBackground />
              <VantaBackground />
              <CustomCursor />
              <Navbar />


              <main className="flex-grow relative z-0">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
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