import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import PageTransition from '@/components/PageTransition';
import AnimatedSection from '@/components/AnimatedSection';
import SectionTitle from '@/components/SectionTitle';
import SkillCard from '@/components/SkillCard';
import profilePhoto from '@/assets/profile-photo.png';
import {
  Code, Palette, FileCode2, Atom, Terminal, Brain, Sparkles, ArrowRight,
  Music2
} from 'lucide-react';

/* ═══════════════════════════════════════════════════════
   GLOBAL STYLES  (cursor + scroll-progress removed)
═══════════════════════════════════════════════════════ */
const STYLES = `
  @keyframes fadeUp {
    from { opacity:0; transform:translateY(48px); }
    to   { opacity:1; transform:translateY(0); }
  }
  @keyframes float {
    0%,100% { transform:translateY(0) rotate(0deg); }
    33%      { transform:translateY(-16px) rotate(1.5deg); }
    66%      { transform:translateY(-8px) rotate(-1.5deg); }
  }
  @keyframes pulseGlow {
    0%,100% { opacity:.75; box-shadow:0 0 24px 6px rgba(139,92,246,.45); }
    50%      { opacity:1;   box-shadow:0 0 48px 16px rgba(139,92,246,.75); }
  }
  @keyframes spinSlow { to { transform:rotate(360deg); } }
  @keyframes shimmer {
    0%   { background-position:-200% center; }
    100% { background-position: 200% center; }
  }
  @keyframes borderPulse {
    0%,100% { border-color:rgba(255,255,255,.12); }
    50%      { border-color:rgba(255,255,255,.45); }
  }
  @keyframes slideLeft {
    from { opacity:0; transform:translateX(-70px); }
    to   { opacity:1; transform:translateX(0); }
  }
  @keyframes slideRight {
    from { opacity:0; transform:translateX(70px); }
    to   { opacity:1; transform:translateX(0); }
  }
  @keyframes ringExpand {
    0%,100% { transform:scale(.85); opacity:.55; }
    50%      { transform:scale(1.1); opacity:.2; }
  }
  @keyframes badgeBounce {
    0%,100% { transform:translateY(0); }
    40%      { transform:translateY(-7px); }
    60%      { transform:translateY(-3px); }
  }
  @keyframes scrollIndicator {
    0%,100% { transform:translateX(-50%) translateY(0); opacity:.8; }
    50%      { transform:translateX(-50%) translateY(12px); opacity:.3; }
  }
  @keyframes revealMask {
    from { clip-path:inset(0 100% 0 0); }
    to   { clip-path:inset(0 0% 0 0); }
  }
  @keyframes countUp {
    from { opacity:0; transform:translateY(20px); }
    to   { opacity:1; transform:translateY(0); }
  }
  @keyframes glowLine {
    0%,100% { opacity:.3; transform:scaleX(.6); }
    50%      { opacity:1;  transform:scaleX(1); }
  }
  @keyframes particleOrbit {
    from { transform:rotate(0deg) translateX(140px) rotate(0deg); }
    to   { transform:rotate(360deg) translateX(140px) rotate(-360deg); }
  }
  @keyframes waveBar {
    0%,100% { transform:scaleY(.4); }
    50%      { transform:scaleY(1); }
  }
  @keyframes barDance {
    0%,100% { transform:scaleY(.4); }
    50%      { transform:scaleY(1); }
  }

  /* ── entry screen ── */
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
    to   { opacity:0; transform:scale(1.04); }
  }

  .entry-overlay {
    position:fixed; inset:0; z-index:99999;
    background:#0a0a0f;
    display:flex; align-items:center; justify-content:center;
    overflow:hidden;
  }
  .entry-overlay.leaving {
    animation:entryOverlayOut .55s cubic-bezier(.22,1,.36,1) forwards;
    pointer-events:none;
  }
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

  /* ── scroll-reveal ── */
  .scroll-reveal {
    opacity:0; transform:translateY(56px);
    transition:opacity .75s cubic-bezier(.22,1,.36,1),
                transform .75s cubic-bezier(.22,1,.36,1);
  }
  .scroll-reveal.visible { opacity:1; transform:translateY(0); }
  .scroll-reveal-left {
    opacity:0; transform:translateX(-60px);
    transition:opacity .75s cubic-bezier(.22,1,.36,1),
                transform .75s cubic-bezier(.22,1,.36,1);
  }
  .scroll-reveal-left.visible { opacity:1; transform:translateX(0); }
  .scroll-reveal-right {
    opacity:0; transform:translateX(60px);
    transition:opacity .75s cubic-bezier(.22,1,.36,1),
                transform .75s cubic-bezier(.22,1,.36,1);
  }
  .scroll-reveal-right.visible { opacity:1; transform:translateX(0); }
  .scroll-reveal-scale {
    opacity:0; transform:scale(.82);
    transition:opacity .65s cubic-bezier(.22,1,.36,1),
                transform .65s cubic-bezier(.22,1,.36,1);
  }
  .scroll-reveal-scale.visible { opacity:1; transform:scale(1); }

  /* ── text ── */
  .text-gradient {
    background:linear-gradient(135deg,#a78bfa,#60a5fa,#f472b6,#a78bfa);
    background-size:220% auto;
    -webkit-background-clip:text; -webkit-text-fill-color:transparent;
    background-clip:text;
    animation:shimmer 3.5s linear infinite;
  }
  .reveal-text { animation:revealMask .9s cubic-bezier(.22,1,.36,1) both; }

  /* ── util ── */
  .anim-float        { animation:float 5s ease-in-out infinite; }
  .anim-pulse-glow   { animation:pulseGlow 3s ease-in-out infinite; }
  .anim-spin-slow    { animation:spinSlow 4s linear infinite; }
  .anim-badge-bounce { animation:badgeBounce 2.5s ease-in-out infinite; }
  .anim-ring-expand  { animation:ringExpand 3.5s ease-in-out infinite; }
  .anim-border-pulse { animation:borderPulse 3s ease-in-out infinite; }
  .anim-slide-left   { animation:slideLeft .85s cubic-bezier(.22,1,.36,1) .1s both; }
  .anim-slide-right  { animation:slideRight .85s cubic-bezier(.22,1,.36,1) .2s both; }

  .skill-card-hover {
    transition:transform .35s cubic-bezier(.22,1,.36,1), box-shadow .35s ease;
  }
  .skill-card-hover:hover {
    transform:translateY(-12px) scale(1.07);
    box-shadow:0 24px 55px rgba(139,92,246,.4);
  }
  .btn-lift {
    transition:transform .22s ease, box-shadow .22s ease;
  }
  .btn-lift:hover {
    transform:translateY(-3px) scale(1.03);
    box-shadow:0 14px 38px rgba(255,255,255,.18);
  }
  .wave-bar {
    width:4px; border-radius:2px; background:rgba(255,255,255,.45);
    animation:waveBar 1.1s ease-in-out infinite;
  }
  .glow-line {
    height:2px; border-radius:1px;
    background:linear-gradient(90deg,transparent,#a78bfa,#60a5fa,transparent);
    animation:glowLine 3s ease-in-out infinite;
  }
  .orbit-dot {
    position:absolute; width:10px; height:10px; border-radius:50%;
    animation:particleOrbit linear infinite;
    top:50%; left:50%; margin:-5px 0 0 -5px;
  }
`;

/* ═══════════════════════════════════════════════════════
   MUSIC ENTRY SCREEN
═══════════════════════════════════════════════════════ */
function MusicEntryScreen({ onChoice }) {
  const [leaving, setLeaving] = useState(false);

  const handleChoice = (withMusic) => {
    setLeaving(true);
    setTimeout(() => onChoice(withMusic), 520);
  };

  return (
    <div className={`entry-overlay${leaving ? ' leaving' : ''}`}>
      <div className="entry-orb1" />
      <div className="entry-orb2" />
      <div className="entry-orb3" />

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
                <div key={i} className="entry-bar"
                  style={{ animationDelay: `${i * 0.1}s`, height: '100%' }} />
              ))}
            </div>
            Play music
          </button>
          <button className="entry-btn-skip" onClick={() => handleChoice(false)}>
            Skip
          </button>
        </div>

        <p className="entry-hint">You can change this anytime with the button below</p>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   MUSIC TOGGLE BUTTON (corner)
═══════════════════════════════════════════════════════ */
function MusicButton({ isPlaying, onToggle }) {
  const MusicBars = () => (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: '3px', height: '20px' }}>
      {[0, 1, 2, 3].map((_, i) => (
        <div key={i} style={{
          width: '3px', borderRadius: '2px', background: 'white',
          animation: isPlaying ? `barDance 0.8s ease-in-out infinite` : 'none',
          animationDelay: `${i * 0.1}s`,
          height: isPlaying ? '16px' : '12px',
          transition: 'height 0.1s linear',
        }} />
      ))}
    </div>
  );

  return (
    <button
      onClick={onToggle}
      style={{
        position: 'fixed', bottom: '28px', right: '28px', zIndex: 99990,
        width: '52px', height: '52px', borderRadius: '50%',
        background: isPlaying ? 'rgba(167,139,250,0.85)' : 'rgba(0,0,0,0.75)',
        backdropFilter: 'blur(12px)',
        border: `1.5px solid ${isPlaying ? '#a78bfa' : 'rgba(255,255,255,0.3)'}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: 'white', cursor: 'pointer',
        transition: 'all 0.3s ease',
        boxShadow: isPlaying ? '0 0 20px rgba(167,139,250,0.6)' : '0 2px 8px rgba(0,0,0,0.3)',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'scale(1.1)';
        e.currentTarget.style.background = isPlaying
          ? 'rgba(167,139,250,1)' : 'rgba(167,139,250,0.7)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.background = isPlaying
          ? 'rgba(167,139,250,0.85)' : 'rgba(0,0,0,0.75)';
      }}
    >
      {isPlaying ? <MusicBars /> : <Music2 size={22} />}
    </button>
  );
}

/* ═══════════════════════════════════════════════════════
   CANVAS PARTICLE FIELD
═══════════════════════════════════════════════════════ */
function ParticleField({ count = 35, zIndex = 2 }) {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W = canvas.offsetWidth, H = canvas.offsetHeight;
    canvas.width = W; canvas.height = H;

    const dots = Array.from({ length: count }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      r: Math.random() * 2 + 1,
      vx: (Math.random() - .5) * .38,
      vy: (Math.random() - .5) * .38,
      a: .3 + Math.random() * .5,
    }));

    let raf;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      dots.forEach(d => {
        d.x += d.vx; d.y += d.vy;
        if (d.x < 0) d.x = W; if (d.x > W) d.x = 0;
        if (d.y < 0) d.y = H; if (d.y > H) d.y = 0;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(167,139,250,${d.a * .55})`;
        ctx.fill();
      });
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dx = dots[i].x - dots[j].x, dy = dots[i].y - dots[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 95) {
            ctx.beginPath();
            ctx.moveTo(dots[i].x, dots[i].y);
            ctx.lineTo(dots[j].x, dots[j].y);
            ctx.strokeStyle = `rgba(167,139,250,${(1 - dist / 95) * .16})`;
            ctx.lineWidth = .7;
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    };
    draw();

    const handleResize = () => {
      W = canvas.offsetWidth; H = canvas.offsetHeight;
      canvas.width = W; canvas.height = H;
    };
    window.addEventListener('resize', handleResize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', handleResize); };
  }, [count]);

  return (
    <canvas ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex }} />
  );
}

/* ═══════════════════════════════════════════════════════
   SCROLL REVEAL HOOK
═══════════════════════════════════════════════════════ */
function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(
      '.scroll-reveal,.scroll-reveal-left,.scroll-reveal-right,.scroll-reveal-scale'
    );
    const io = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
      }),
      { threshold: 0.12 }
    );
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* ═══════════════════════════════════════════════════════
   HOME
═══════════════════════════════════════════════════════ */
const Home = () => {
  const [showEntry, setShowEntry] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useScrollReveal();

  // Setup audio once
  useEffect(() => {
    audioRef.current = new Audio('/sound.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;
    audioRef.current.preload = 'auto';
    return () => {
      if (audioRef.current) { audioRef.current.pause(); audioRef.current = null; }
    };
  }, []);

  const handleEntryChoice = (withMusic) => {
    setShowEntry(false);
    if (withMusic && audioRef.current) {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(err => console.error('Playback failed:', err));
    }
  };

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(err => console.error('Playback failed:', err));
    }
  };

  const skills = [
    { icon: <Code size={40} />,      title: 'HTML' },
    { icon: <Palette size={40} />,   title: 'CSS' },
    { icon: <FileCode2 size={40} />, title: 'JavaScript' },
    { icon: <Atom size={40} />,      title: 'React' },
    { icon: <Terminal size={40} />,  title: 'Python' },
    { icon: <Brain size={40} />,     title: 'Machine Learning', isLearning: true },
  ];

  const stats = [
    { value: '10+', label: 'Projects Built' },
    { value: '3+',  label: 'Years Coding'   },
    { value: '5+',  label: 'Tech Stacks'    },
  ];

  const SH = 'min-h-[88vh]';

  return (
    <PageTransition>
      <style>{STYLES}</style>

      {/* ── Music entry overlay ── */}
      {showEntry && <MusicEntryScreen onChoice={handleEntryChoice} />}

      {/* ── Music toggle (corner) ── */}
      <MusicButton isPlaying={isPlaying} onToggle={toggleMusic} />

      <div className="min-h-screen pt-24 flex flex-col gap-10 px-4 md:px-8 pb-12">

        {/* ══════════════════════════════════════
            HERO SECTION
        ══════════════════════════════════════ */}
        <section className={`relative w-full ${SH} overflow-hidden rounded-3xl flex items-center`}>
          <video autoPlay muted loop playsInline
            className="absolute inset-0 w-full h-full object-cover" style={{ zIndex: 0 }}>
            <source src="/back1.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-br from-black/55 via-black/30 to-purple-900/45" style={{ zIndex: 1 }} />
          <ParticleField count={32} zIndex={2} />
          <div className="absolute inset-0 rounded-3xl border border-white/10 anim-border-pulse pointer-events-none" style={{ zIndex: 3 }} />

          <div className="relative container mx-auto px-6 w-full" style={{ zIndex: 4 }}>
            <div className="grid md:grid-cols-2 gap-12 items-center">

              {/* text */}
              <div className="order-2 md:order-1 anim-slide-left">
                <p className="text-white/80 font-medium mb-3 flex items-center gap-2">
                  <span style={{ animation: 'badgeBounce 2s ease-in-out infinite', display: 'inline-block' }}>👋</span>
                  Welcome to my portfolio
                </p>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-5 leading-tight">
                  Hi, I am{' '}
                  <span className="text-gradient reveal-text">Omkar Tambe</span>
                </h1>
                <div className="glow-line w-48 mb-5" />
                <p className="text-xl text-gray-100 mb-6" style={{ animation: 'fadeUp .7s .3s both' }}>
                  Web Developer&nbsp;|&nbsp;AI Enthusiast&nbsp;|&nbsp;Founder of LootDukan
                </p>

                <div className="flex gap-8 mb-8" style={{ animation: 'fadeUp .7s .4s both' }}>
                  {stats.map((s, i) => (
                    <div key={s.label} className="text-center" style={{ animation: `countUp .6s ${.5 + i * .15}s both` }}>
                      <div className="text-2xl font-bold text-gradient">{s.value}</div>
                      <div className="text-xs text-white/60 mt-0.5">{s.label}</div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-4" style={{ animation: 'fadeUp .7s .55s both' }}>
                  <Link to="/contact">
                    <Button variant="hero" size="lg" className="btn-lift backdrop-blur-sm bg-white/15 hover:bg-white/25 border border-white/30 text-white shadow-lg">
                      Contact Me <ArrowRight size={18} className="ml-1" />
                    </Button>
                  </Link>
                  <Link to="/about">
                    <Button variant="heroOutline" size="lg" className="btn-lift backdrop-blur-sm bg-transparent hover:bg-white/10 border border-white/30 text-white shadow-lg">
                      View My Work
                    </Button>
                  </Link>
                </div>
              </div>

              {/* avatar */}
              <div className="order-1 md:order-2 flex justify-center items-center anim-slide-right">
                <div className="relative flex items-center justify-center">
                  <div className="absolute w-96 h-96 rounded-full border border-white/10 anim-ring-expand" />
                  <div className="absolute w-[340px] h-[340px] rounded-full border border-purple-400/15 anim-ring-expand" style={{ animationDelay: '1.1s' }} />
                  {[
                    { color: '#a78bfa', dur: '7s',  delay: '0s'   },
                    { color: '#60a5fa', dur: '11s', delay: '2s'   },
                    { color: '#f472b6', dur: '9s',  delay: '4.5s' },
                  ].map((o, i) => (
                    <span key={i} className="orbit-dot" style={{
                      background: o.color, animationDuration: o.dur, animationDelay: o.delay,
                      boxShadow: `0 0 8px 3px ${o.color}`,
                    }} />
                  ))}
                  <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-gradient-to-br from-purple-500/20 to-blue-400/20 anim-float flex items-center justify-center">
                    <div className="absolute inset-4 rounded-full bg-gradient-to-br from-purple-500 to-blue-400 opacity-80 anim-pulse-glow" />
                    <div className="absolute inset-6 rounded-full bg-card flex items-center justify-center overflow-hidden z-10">
                      <img src={profilePhoto} alt="Omkar Tambe" className="w-full h-full object-cover rounded-full" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute bottom-8 left-1/2 flex flex-col items-center gap-2"
              style={{ zIndex: 4, animation: 'scrollIndicator 2s ease-in-out infinite' }}>
              <span className="text-white/50 text-xs tracking-widest uppercase">Scroll</span>
              <div className="w-px h-10 bg-gradient-to-b from-white/50 to-transparent" />
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            SKILLS SECTION
        ══════════════════════════════════════ */}
        <AnimatedSection className={`relative w-full ${SH} overflow-hidden rounded-3xl flex items-center`}>
          <video autoPlay muted loop playsInline
            className="absolute inset-0 w-full h-full object-cover" style={{ zIndex: 0 }}>
            <source src="/back2.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-bl from-black/55 via-black/30 to-indigo-900/45" style={{ zIndex: 1 }} />
          <ParticleField count={26} zIndex={2} />
          <div className="absolute inset-0 rounded-3xl border border-white/10 anim-border-pulse pointer-events-none" style={{ animationDelay: '1s', zIndex: 3 }} />

          <div className="relative container mx-auto px-6 py-20 w-full" style={{ zIndex: 4 }}>
            <div className="scroll-reveal">
              <SectionTitle title="My Skills" subtitle="Technologies I work with to bring ideas to life" className="text-white drop-shadow-lg" />
              <div className="glow-line w-32 mx-auto mt-2 mb-10" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {skills.map((skill, i) => (
                <div key={skill.title} className="skill-card-hover scroll-reveal-scale" style={{ transitionDelay: `${i * 0.1}s` }}>
                  <SkillCard icon={skill.icon} title={skill.title} isLearning={skill.isLearning}
                    className="backdrop-blur-md bg-white/10 hover:bg-white/20 border border-white/20 text-white shadow-xl" />
                </div>
              ))}
            </div>
            <div className="flex justify-center items-end gap-1.5 mt-14 h-10 scroll-reveal" style={{ transitionDelay: '.4s' }}>
              {Array.from({ length: 20 }).map((_, i) => (
                <div key={i} className="wave-bar" style={{
                  height: `${Math.abs(Math.sin(i * 0.52)) * 24 + 10}px`,
                  animationDelay: `${i * 0.07}s`,
                  opacity: .4 + Math.abs(Math.sin(i)) * .4,
                }} />
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* ══════════════════════════════════════
            AI AGENCY SECTION
        ══════════════════════════════════════ */}
        <AnimatedSection className={`relative w-full ${SH} overflow-hidden rounded-3xl flex items-center`}>
          <video autoPlay muted loop playsInline
            className="absolute inset-0 w-full h-full object-cover" style={{ zIndex: 0 }}>
            <source src="/back3.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-tr from-black/65 via-black/35 to-violet-900/55" style={{ zIndex: 1 }} />
          <ParticleField count={28} zIndex={2} />
          <div className="absolute inset-0 rounded-3xl border border-white/10 anim-border-pulse pointer-events-none" style={{ animationDelay: '2s', zIndex: 3 }} />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-400/60 to-transparent" style={{ zIndex: 3 }} />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/40 to-transparent" style={{ zIndex: 3 }} />

          <div className="relative container mx-auto px-6 py-20 w-full flex items-center justify-center" style={{ zIndex: 4 }}>
            <div className="backdrop-blur-xl bg-white/8 hover:bg-white/12 border border-white/20 anim-border-pulse rounded-3xl p-10 md:p-16 text-center max-w-3xl w-full shadow-2xl transition-all duration-500 relative overflow-hidden scroll-reveal">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full border border-purple-500/20 anim-ring-expand pointer-events-none" style={{ animationDelay: '1s' }} />
              <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full border border-blue-400/15 anim-ring-expand pointer-events-none" style={{ animationDelay: '.5s' }} />

              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 text-white font-medium mb-8 backdrop-blur-sm border border-white/20 shadow-lg anim-badge-bounce">
                  <Sparkles size={18} className="anim-spin-slow" />
                  Coming Soon
                </div>
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 drop-shadow-xl scroll-reveal-left">
                  Building My <span className="text-gradient">AI Agency</span>
                </h2>
                <div className="glow-line w-40 mx-auto mb-6" />
                <p className="text-gray-200 max-w-xl mx-auto mb-10 text-lg leading-relaxed scroll-reveal" style={{ transitionDelay: '.15s' }}>
                  I am working on building AI-based tools and websites to help people and businesses
                  leverage the power of artificial intelligence.
                </p>
                <div className="flex justify-center gap-3 mb-10">
                  {[0, 1, 2].map(i => (
                    <span key={i} className="w-2.5 h-2.5 rounded-full bg-gradient-to-br from-purple-400 to-blue-400"
                      style={{ animation: `badgeBounce 1.4s ease-in-out ${i * .18}s infinite`, boxShadow: '0 0 8px rgba(139,92,246,.6)' }} />
                  ))}
                </div>
                <Button variant="glass" size="lg" disabled
                  className="backdrop-blur-sm bg-white/10 border border-white/20 text-white shadow-lg cursor-not-allowed opacity-75">
                  <Sparkles size={16} className="mr-2 anim-spin-slow" />
                  Coming Soon
                </Button>
              </div>
            </div>
          </div>
        </AnimatedSection>

      </div>
    </PageTransition>
  );
};

export default Home;