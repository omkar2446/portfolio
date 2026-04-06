import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import PageTransition from '@/components/PageTransition';
import AnimatedSection from '@/components/AnimatedSection';
import SectionTitle from '@/components/SectionTitle';
import SkillCard from '@/components/SkillCard';
import profilePhoto from '@/assets/profile-photo.png';
import { useEffect, useRef, useState, useCallback } from 'react';
import {
  Code, Palette, FileCode2, Atom, Terminal, Brain, Sparkles, ArrowRight,
} from 'lucide-react';

/* ═══════════════════════════════════════════════════
   STYLES — all keyframes + utility classes
═══════════════════════════════════════════════════ */
const styles = `
  /* ── Entry animations ── */
  @keyframes fadeUp {
    from { opacity:0; transform:translateY(50px) scale(.97); }
    to   { opacity:1; transform:translateY(0) scale(1); }
  }
  @keyframes slideLeft {
    from { opacity:0; transform:translateX(-70px); }
    to   { opacity:1; transform:translateX(0); }
  }
  @keyframes slideRight {
    from { opacity:0; transform:translateX(70px); }
    to   { opacity:1; transform:translateX(0); }
  }
  @keyframes scaleIn {
    from { opacity:0; transform:scale(0.78) translateY(20px); }
    to   { opacity:1; transform:scale(1) translateY(0); }
  }
  @keyframes revealUp {
    from { clip-path:inset(100% 0 0 0); opacity:0; }
    to   { clip-path:inset(0% 0 0 0); opacity:1; }
  }

  /* ── Continuous loops ── */
  @keyframes float {
    0%,100% { transform:translate3d(0,0,0) rotate(0deg); }
    33%      { transform:translate3d(0,-18px,0) rotate(1.5deg); }
    66%      { transform:translate3d(0,-9px,0) rotate(-1deg); }
  }
  @keyframes floatX {
    0%,100% { transform:translate3d(0,0,0); }
    50%      { transform:translate3d(14px,-10px,0); }
  }
  @keyframes pulseGlow {
    0%,100% { opacity:.7; box-shadow:0 0 28px 8px rgba(139,92,246,.45); }
    50%      { opacity:1;  box-shadow:0 0 60px 22px rgba(139,92,246,.78); }
  }
  @keyframes spinSlow  { to { transform:rotate(360deg); } }
  @keyframes spinCCW   { to { transform:rotate(-360deg); } }
  @keyframes shimmer {
    0%   { background-position:-200% center; }
    100% { background-position: 200% center; }
  }
  @keyframes borderPulse {
    0%,100% { border-color:rgba(255,255,255,.13); }
    50%      { border-color:rgba(255,255,255,.48); }
  }
  @keyframes ringExpand {
    0%   { transform:scale(.82); opacity:.6; }
    50%  { transform:scale(1.12); opacity:.2; }
    100% { transform:scale(.82); opacity:.6; }
  }
  @keyframes orbit {
    from { transform:rotate(0deg) translateX(var(--r)) rotate(0deg); }
    to   { transform:rotate(360deg) translateX(var(--r)) rotate(-360deg); }
  }
  @keyframes blink {
    0%,100% { opacity:1; }
    50%      { opacity:0; }
  }
  @keyframes badgeBounce {
    0%,100% { transform:translateY(0) scale(1); }
    40%      { transform:translateY(-8px) scale(1.04); }
    60%      { transform:translateY(-4px) scale(1.02); }
  }
  @keyframes scanline {
    0%   { top:-8%; }
    100% { top:108%; }
  }
  @keyframes drift {
    0%,100% { transform:translate3d(0,0,0); opacity:.45; }
    50%      { transform:translate3d(14px,-32px,0); opacity:.9; }
  }
  @keyframes driftB {
    0%,100% { transform:translate3d(0,0,0); opacity:.35; }
    50%      { transform:translate3d(-18px,-22px,0); opacity:.8; }
  }
  @keyframes driftC {
    0%,100% { transform:translate3d(0,0,0); opacity:.5; }
    50%      { transform:translate3d(8px,24px,0); opacity:.75; }
  }

  /* ── Glitch effect on name ── */
  @keyframes glitch1 {
    0%,94%,100% { clip-path:inset(50% 0 30% 0); transform:translate(-3px,0); }
    96%         { clip-path:inset(10% 0 60% 0); transform:translate(3px,0); }
    98%         { clip-path:inset(80% 0 5% 0);  transform:translate(-2px,0); }
  }
  @keyframes glitch2 {
    0%,94%,100% { clip-path:inset(20% 0 65% 0); transform:translate(3px,0); }
    96%         { clip-path:inset(55% 0 10% 0); transform:translate(-3px,0); }
    98%         { clip-path:inset(5% 0 85% 0);  transform:translate(2px,0); }
  }

  /* ── Counter count-up ── */
  @keyframes countUp {
    from { opacity:0; transform:translateY(20px); }
    to   { opacity:1; transform:translateY(0); }
  }

  /* ── Utility classes ── */
  .au  { animation:fadeUp    .75s cubic-bezier(.22,1,.36,1) both; }
  .au1 { animation:fadeUp    .75s cubic-bezier(.22,1,.36,1) .15s both; }
  .au2 { animation:fadeUp    .75s cubic-bezier(.22,1,.36,1) .30s both; }
  .au3 { animation:fadeUp    .75s cubic-bezier(.22,1,.36,1) .45s both; }
  .au4 { animation:fadeUp    .75s cubic-bezier(.22,1,.36,1) .60s both; }
  .asl { animation:slideLeft  .85s cubic-bezier(.22,1,.36,1) .1s  both; }
  .asr { animation:slideRight .85s cubic-bezier(.22,1,.36,1) .2s  both; }
  .asi { animation:scaleIn    .65s cubic-bezier(.22,1,.36,1) both; }
  .aru { animation:revealUp   .6s  cubic-bezier(.22,1,.36,1) both; }

  .a-float     { animation:float 5.5s ease-in-out infinite; will-change:transform; }
  .a-glow      { animation:pulseGlow 3s ease-in-out infinite; }
  .a-spin      { animation:spinSlow 8s linear infinite; }
  .a-spinccw   { animation:spinCCW 12s linear infinite; }
  .a-badge     { animation:badgeBounce 2.8s ease-in-out infinite; }
  .a-ring      { animation:ringExpand 3.5s ease-in-out infinite; }
  .a-ring2     { animation:ringExpand 3.5s ease-in-out 1.1s infinite; }
  .a-ring3     { animation:ringExpand 4.2s ease-in-out 0.5s infinite; }
  .a-border    { animation:borderPulse 3s ease-in-out infinite; }
  .a-blink     { animation:blink 1s step-end infinite; }

  /* Shimmer text gradient */
  .tg {
    background:linear-gradient(120deg,#c084fc,#818cf8,#38bdf8,#f472b6,#c084fc);
    background-size:250% auto;
    -webkit-background-clip:text;
    -webkit-text-fill-color:transparent;
    background-clip:text;
    animation:shimmer 4s linear infinite;
  }

  /* Glitch name wrapper */
  .glitch-wrap { position:relative; display:inline-block; }
  .glitch-wrap::before,
  .glitch-wrap::after {
    content:attr(data-text);
    position:absolute; inset:0;
    background:inherit;
    -webkit-background-clip:text;
    background-clip:text;
    -webkit-text-fill-color:transparent;
  }
  .glitch-wrap::before {
    color:#f472b6;
    -webkit-text-fill-color:#f472b620;
    animation:glitch1 8s infinite;
  }
  .glitch-wrap::after {
    color:#38bdf8;
    -webkit-text-fill-color:#38bdf820;
    animation:glitch2 8s infinite .4s;
  }

  /* ── Video BG ── */
  .vbg {
    position:absolute; inset:0; overflow:hidden;
    border-radius:inherit;
    transform:translateZ(0);
    backface-visibility:hidden;
  }
  .vbg video {
    position:absolute; inset:0; width:100%; height:100%;
    object-fit:cover;
    will-change:transform;
    transform:translateZ(0);
    backface-visibility:hidden;
    opacity:0; transition:opacity .9s ease;
  }
  .vbg video.vloaded { opacity:1; }
  .vbg .vfall {
    position:absolute; inset:0;
    transition:opacity .9s ease;
  }
  .vbg video.vloaded ~ .vfall { opacity:0; pointer-events:none; }

  /* Overlays */
  .ov1 { position:absolute;inset:0;background:linear-gradient(135deg,rgba(0,0,0,.58)0%,rgba(0,0,0,.2)50%,rgba(67,20,120,.45)100%); }
  .ov2 { position:absolute;inset:0;background:linear-gradient(225deg,rgba(0,0,0,.58)0%,rgba(0,0,0,.2)50%,rgba(17,24,100,.48)100%); }
  .ov3 { position:absolute;inset:0;background:linear-gradient(45deg,rgba(0,0,0,.62)0%,rgba(0,0,0,.25)50%,rgba(76,0,130,.5)100%); }

  /* Scanline */
  .scanline {
    position:absolute; left:0; right:0; height:2.5%;
    background:linear-gradient(to bottom,transparent,rgba(255,255,255,.05),transparent);
    pointer-events:none; will-change:top;
    animation:scanline 7s linear infinite;
  }

  /* Sparkle dot */
  .sp {
    position:absolute; border-radius:50%;
    background:rgba(255,255,255,.25);
    pointer-events:none; will-change:transform;
    box-shadow:0 0 6px 2px rgba(255,255,255,.15);
  }

  /* Constellation line canvas */
  .constellation-canvas {
    position:absolute; inset:0;
    pointer-events:none; opacity:.35;
    border-radius:inherit;
  }

  /* ── Skill cards ── */
  .skc {
    transition:transform .38s cubic-bezier(.22,1,.36,1),
               box-shadow .38s ease, background .3s ease,
               border-color .3s ease;
  }
  .skc:hover {
    transform:translateY(-14px) scale(1.08) rotate(-1deg);
    box-shadow:0 28px 60px rgba(139,92,246,.45);
  }
  .skc:hover .sk-icon { animation:spinSlow .6s ease forwards; }

  /* ── Magnetic button ── */
  .mag-btn {
    transition:transform .2s cubic-bezier(.22,1,.36,1),
               box-shadow .2s ease;
    position:relative; overflow:hidden;
  }
  .mag-btn::after {
    content:'';
    position:absolute; inset:-2px;
    background:linear-gradient(120deg,rgba(255,255,255,0),rgba(255,255,255,.12),rgba(255,255,255,0));
    transform:translateX(-100%);
    transition:transform .5s ease;
    pointer-events:none;
  }
  .mag-btn:hover::after { transform:translateX(100%); }
  .mag-btn:hover { box-shadow:0 16px 42px rgba(255,255,255,.22); }

  /* ── Orbiting dot ── */
  .orbit-dot {
    position:absolute; top:50%; left:50%;
    width:10px; height:10px;
    border-radius:50%;
    margin:-5px 0 0 -5px;
    will-change:transform;
  }

  /* ── Stats strip ── */
  .stat-card {
    backdrop-filter:blur(12px);
    background:rgba(255,255,255,.08);
    border:1px solid rgba(255,255,255,.18);
    border-radius:16px;
    padding:1rem 1.5rem;
    text-align:center;
    transition:transform .3s ease, background .3s ease;
    animation:countUp .6s cubic-bezier(.22,1,.36,1) both;
  }
  .stat-card:hover {
    transform:translateY(-6px) scale(1.04);
    background:rgba(255,255,255,.14);
  }
  .stat-num {
    font-size:2rem; font-weight:800;
    line-height:1; margin-bottom:.25rem;
  }
  .stat-lbl { font-size:.8rem; opacity:.7; letter-spacing:.06em; text-transform:uppercase; }

  /* ── Agency card inner glow ── */
  .agency-glow {
    position:absolute; inset:0; border-radius:inherit;
    background:radial-gradient(ellipse at 50% 0%,rgba(139,92,246,.18),transparent 70%);
    pointer-events:none;
    animation:pulseGlow 4s ease-in-out infinite;
  }

  /* ── Progress bars on skills ── */
  @keyframes barGrow {
    from { width:0; }
    to   { width:var(--w); }
  }
  .bar-track {
    height:3px; background:rgba(255,255,255,.12);
    border-radius:99px; margin-top:6px; overflow:hidden;
  }
  .bar-fill {
    height:100%;
    background:linear-gradient(90deg,#a78bfa,#60a5fa);
    border-radius:99px;
    animation:barGrow .9s cubic-bezier(.22,1,.36,1) both;
  }

  /* ── Cursor blink ── */
  .cur {
    display:inline-block; width:2px; height:1em;
    background:rgba(255,255,255,.85); margin-left:3px;
    vertical-align:middle;
    animation:blink 1s step-end infinite;
  }

  /* Reduce motion */
  @media (prefers-reduced-motion:reduce) {
    *,*::before,*::after { animation-duration:.01ms!important; transition-duration:.01ms!important; }
  }
`;

/* ═══════════════════════════════════════════════════
   useVideoOptimization hook
═══════════════════════════════════════════════════ */
function useVideoOpt(ref) {
  useEffect(() => {
    const v = ref.current; if (!v) return;
    const mob = window.innerWidth < 768 || /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    if (mob) v.playbackRate = 0.75;
    const mark = () => v.classList.add('vloaded');
    if (v.readyState >= 3) mark();
    else v.addEventListener('canplaythrough', mark, { once: true });
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        if (v.preload === 'none') { v.preload = 'auto'; v.load(); }
        v.play().catch(() => {});
      } else { v.pause(); }
    }, { threshold: 0.1 });
    io.observe(v);
    return () => { v.removeEventListener('canplaythrough', mark); io.disconnect(); };
  }, [ref]);
}

/* ═══════════════════════════════════════════════════
   useTypewriter hook
═══════════════════════════════════════════════════ */
function useTypewriter(words, speed = 80, pause = 1800) {
  const [display, setDisplay] = useState('');
  const [wi, setWi] = useState(0);
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const word = words[wi];
    let timeout;
    if (!deleting && display === word) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && display === '') {
      setDeleting(false);
      setWi(p => (p + 1) % words.length);
    } else {
      timeout = setTimeout(() => {
        setDisplay(p => deleting ? p.slice(0, -1) : word.slice(0, p.length + 1));
      }, deleting ? speed / 2 : speed);
    }
    return () => clearTimeout(timeout);
  }, [display, deleting, wi, words, speed, pause]);
  return display;
}

/* ═══════════════════════════════════════════════════
   useMouseParallax hook — smooth avatar parallax
═══════════════════════════════════════════════════ */
function useMouseParallax(ref, strength = 18) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const raf = useRef(null);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const el = ref.current; if (!el) return;
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      target.current.x = ((e.clientX - cx) / (r.width / 2)) * strength;
      target.current.y = ((e.clientY - cy) / (r.height / 2)) * strength;
    };
    const onLeave = () => { target.current = { x: 0, y: 0 }; };
    const loop = () => {
      current.current.x += (target.current.x - current.current.x) * 0.08;
      current.current.y += (target.current.y - current.current.y) * 0.08;
      setTilt({ x: current.current.x, y: current.current.y });
      raf.current = requestAnimationFrame(loop);
    };
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    raf.current = requestAnimationFrame(loop);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
      cancelAnimationFrame(raf.current);
    };
  }, [ref, strength]);
  return tilt;
}

/* ═══════════════════════════════════════════════════
   useCountUp hook
═══════════════════════════════════════════════════ */
function useCountUp(target, duration = 1800, start = false) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (ts) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setVal(Math.floor(ease * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return val;
}

/* ═══════════════════════════════════════════════════
   VideoBg component
═══════════════════════════════════════════════════ */
const VideoBg = ({ src, ovClass, fallClass, scanDelay }) => {
  const vref = useRef(null);
  useVideoOpt(vref);
  const mob = typeof window !== 'undefined' &&
    (window.innerWidth < 768 || /Android|iPhone|iPad|iPod/i.test(navigator.userAgent));
  return (
    <div className="vbg">
      <div className={`vfall ${fallClass}`} />
      <video ref={vref} autoPlay muted loop playsInline
        preload={mob ? 'none' : 'auto'}
        disablePictureInPicture disableRemotePlayback>
        <source src={src} type="video/mp4" />
      </video>
      <div className={`absolute inset-0 ${ovClass}`} />
      <div className="scanline" style={scanDelay ? { animationDelay: scanDelay } : {}} />
    </div>
  );
};

/* ═══════════════════════════════════════════════════
   Sparkle dot
═══════════════════════════════════════════════════ */
const Sp = ({ size, top, left, delay, dur, variant = 'a' }) => {
  const name = variant === 'b' ? 'driftB' : variant === 'c' ? 'driftC' : 'drift';
  return (
    <span className="sp" style={{
      width: size, height: size, top, left,
      animationName: name, animationDelay: delay,
      animationDuration: dur, animationTimingFunction: 'ease-in-out',
      animationIterationCount: 'infinite',
    }} />
  );
};

/* ═══════════════════════════════════════════════════
   OrbitDot — truly orbiting dots around avatar
═══════════════════════════════════════════════════ */
const OrbitDot = ({ radius, size, color, duration, delay, shadow }) => (
  <div className="orbit-dot" style={{
    '--r': `${radius}px`,
    width: size, height: size,
    background: color,
    boxShadow: shadow,
    borderRadius: '50%',
    animation: `orbit ${duration} linear ${delay} infinite`,
    willChange: 'transform',
  }} />
);

/* ═══════════════════════════════════════════════════
   StatCard with count-up
═══════════════════════════════════════════════════ */
const StatCard = ({ num, suffix = '', label, delay, visible }) => {
  const val = useCountUp(num, 1600, visible);
  return (
    <div className="stat-card" style={{ animationDelay: delay }}>
      <div className="stat-num text-white">
        <span className="tg">{val}{suffix}</span>
      </div>
      <div className="stat-lbl text-white/70">{label}</div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════
   Constellation canvas background
═══════════════════════════════════════════════════ */
const Constellation = ({ count = 40 }) => {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let raf;
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);
    const dots = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - .5) * .4,
      vy: (Math.random() - .5) * .4,
      r: Math.random() * 2 + 1,
    }));
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      dots.forEach(d => {
        d.x += d.vx; d.y += d.vy;
        if (d.x < 0 || d.x > canvas.width) d.vx *= -1;
        if (d.y < 0 || d.y > canvas.height) d.vy *= -1;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255,255,255,.6)';
        ctx.fill();
      });
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dx = dots[i].x - dots[j].x;
          const dy = dots[i].y - dots[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(dots[i].x, dots[i].y);
            ctx.lineTo(dots[j].x, dots[j].y);
            ctx.strokeStyle = `rgba(180,160,255,${(1 - dist / 100) * .45})`;
            ctx.lineWidth = .6;
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, [count]);
  return <canvas ref={canvasRef} className="constellation-canvas" />;
};

/* ═══════════════════════════════════════════════════
   Main component
═══════════════════════════════════════════════════ */
const Home = () => {
  const heroRef = useRef(null);
  const tilt = useMouseParallax(heroRef, 16);
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef(null);

  // Trigger count-up when stats scroll into view
  useEffect(() => {
    const el = statsRef.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setStatsVisible(true); io.disconnect(); }
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const roles = ['Web Developer', 'AI Enthusiast', 'React Engineer', 'Founder @ LootDukan'];
  const role = useTypewriter(roles, 75, 2000);

  const skills = [
    { icon: <Code size={36} />,      title: 'HTML',            pct: 95 },
    { icon: <Palette size={36} />,   title: 'CSS',             pct: 90 },
    { icon: <FileCode2 size={36} />, title: 'JavaScript',      pct: 85 },
    { icon: <Atom size={36} />,      title: 'React',           pct: 82 },
    { icon: <Terminal size={36} />,  title: 'Python',          pct: 75 },
    { icon: <Brain size={36} />,     title: 'Machine Learning', pct: 55, isLearning: true },
  ];

  const sps = [
    { size:'10px', top:'10%', left:'7%',   delay:'0s',   dur:'6.5s' },
    { size:'6px',  top:'22%', left:'82%',  delay:'1.1s', dur:'7s',   variant:'b' },
    { size:'15px', top:'68%', left:'13%',  delay:'2.2s', dur:'8.2s', variant:'c' },
    { size:'8px',  top:'80%', left:'74%',  delay:'0.6s', dur:'5.8s', variant:'b' },
    { size:'5px',  top:'38%', left:'91%',  delay:'3.1s', dur:'9.4s' },
    { size:'12px', top:'86%', left:'44%',  delay:'1.7s', dur:'7.8s', variant:'c' },
    { size:'7px',  top:'45%', left:'3%',   delay:'2.8s', dur:'6.2s', variant:'b' },
    { size:'9px',  top:'18%', left:'55%',  delay:'0.4s', dur:'8s' },
  ];

  const sh = 'min-h-[88vh]';

  return (
    <PageTransition>
      <style>{styles}</style>
      <div className="min-h-screen pt-24 flex flex-col gap-8 px-4 md:px-8">

        {/* ════════════════════════════════════
            HERO SECTION
        ════════════════════════════════════ */}
        <section
          ref={heroRef}
          className={`relative w-full ${sh} py-20 md:py-0 overflow-hidden rounded-3xl flex items-center`}
        >
          <VideoBg src="/back1.mp4" ovClass="ov1"
            fallClass="bg-gradient-to-br from-purple-900 via-slate-900 to-blue-900" />
          <Constellation count={38} />
          <div className="absolute inset-0 rounded-3xl border border-white/10 a-border pointer-events-none" />
          {sps.map((s, i) => <Sp key={i} {...s} />)}

          <div className="relative z-10 container mx-auto px-6 w-full">
            <div className="grid md:grid-cols-2 gap-12 items-center">

              {/* ── Text col ── */}
              <div className="order-2 md:order-1 asl">
                {/* Greeting badge */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full
                  bg-white/10 border border-white/20 text-white/85 text-sm mb-5 backdrop-blur-sm au">
                  <span className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_8px_2px_rgba(74,222,128,.6)]"
                    style={{ animation: 'blink 2s ease-in-out infinite' }} />
                  Available for projects
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-3 drop-shadow-xl leading-[1.08] au1">
                  Hi, I am
                </h1>
                {/* Glitch name */}
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-[1.08] au2">
                  <span className="glitch-wrap tg" data-text="Omkar Tambe">Omkar Tambe</span>
                </h1>

                {/* Typewriter role */}
                <p className="text-xl text-gray-100/90 mb-8 drop-shadow-md au3 h-8 flex items-center">
                  <span className="tg font-semibold">{role}</span>
                  <span className="cur" />
                </p>

                {/* CTA buttons */}
                <div className="flex flex-wrap gap-4 au4">
                  <Link to="/contact">
                    <Button variant="hero" size="lg"
                      className="mag-btn backdrop-blur-sm bg-white/15 hover:bg-white/28 border border-white/30 text-white shadow-lg">
                      Contact Me <ArrowRight size={17} className="ml-1.5 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                  <Link to="/about">
                    <Button variant="heroOutline" size="lg"
                      className="mag-btn backdrop-blur-sm bg-transparent hover:bg-white/12 border border-white/30 text-white shadow-lg">
                      View My Work
                    </Button>
                  </Link>
                </div>

                {/* Stats strip */}
                <div ref={statsRef} className="grid grid-cols-3 gap-3 mt-10 au4"
                  style={{ animationDelay: '.75s' }}>
                  <StatCard num={10} suffix="+" label="Projects" delay=".8s" visible={statsVisible} />
                  <StatCard num={3}  suffix="+" label="Years Exp" delay=".95s" visible={statsVisible} />
                  <StatCard num={5}  suffix="★" label="Avg Rating" delay="1.1s" visible={statsVisible} />
                </div>
              </div>

              {/* ── Avatar col ── */}
              <div className="order-1 md:order-2 flex justify-center items-center asr">
                <div
                  className="relative flex items-center justify-center"
                  style={{
                    transform: `perspective(900px) rotateY(${tilt.x * 0.6}deg) rotateX(${-tilt.y * 0.6}deg)`,
                    transition: 'transform .05s linear',
                  }}
                >
                  {/* Rings */}
                  <div className="absolute w-[340px] h-[340px] md:w-[400px] md:h-[400px] rounded-full border border-white/15 a-ring" />
                  <div className="absolute w-[300px] h-[300px] md:w-[350px] md:h-[350px] rounded-full border border-purple-400/22 a-ring2" />
                  <div className="absolute w-[260px] h-[260px] md:w-[300px] md:h-[300px] rounded-full border border-blue-400/15 a-ring3" />

                  {/* Spinning dashed ring */}
                  <div className="absolute w-[380px] h-[380px] md:w-[440px] md:h-[440px] rounded-full a-spin"
                    style={{
                      border: '1px dashed rgba(167,139,250,.25)',
                    }} />
                  <div className="absolute w-[280px] h-[280px] md:w-[330px] md:h-[330px] rounded-full a-spinccw"
                    style={{
                      border: '1px dashed rgba(96,165,250,.2)',
                    }} />

                  {/* Orbiting dots */}
                  <OrbitDot radius={165} size="12px" color="#c084fc" duration="6s" delay="0s" shadow="0 0 10px 3px rgba(192,132,252,.7)" />
                  <OrbitDot radius={165} size="8px"  color="#38bdf8" duration="6s" delay="-3s" shadow="0 0 8px 2px rgba(56,189,248,.6)" />
                  <OrbitDot radius={140} size="7px"  color="#f472b6" duration="9s" delay="-2s" shadow="0 0 8px 2px rgba(244,114,182,.6)" />
                  <OrbitDot radius={140} size="5px"  color="#a78bfa" duration="9s" delay="-5s" shadow="0 0 6px 2px rgba(167,139,250,.5)" />

                  {/* Photo disc */}
                  <div className="w-[240px] h-[240px] md:w-[280px] md:h-[280px] rounded-full
                    bg-gradient-to-br from-purple-500/25 to-blue-400/25 a-float
                    flex items-center justify-center">
                    <div className="absolute inset-5 rounded-full bg-gradient-to-br from-purple-500 to-blue-400 opacity-85 a-glow" />
                    <div className="absolute inset-7 rounded-full bg-card flex items-center justify-center overflow-hidden z-10
                      border-2 border-white/10">
                      <img src={profilePhoto} alt="Omkar Tambe"
                        className="w-full h-full object-cover object-center rounded-full" />
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ════════════════════════════════════
            SKILLS SECTION
        ════════════════════════════════════ */}
        <AnimatedSection className={`relative w-full ${sh} overflow-hidden rounded-3xl flex items-center`}>
          <VideoBg src="/back2.mp4" ovClass="ov2"
            fallClass="bg-gradient-to-bl from-indigo-900 via-slate-900 to-emerald-900"
            scanDelay="2s" />
          <Constellation count={30} />
          <div className="absolute inset-0 rounded-3xl border border-white/10 a-border pointer-events-none"
            style={{ animationDelay: '1s' }} />
          {sps.slice(0, 5).map((s, i) => <Sp key={i} {...s} left={`${100 - parseInt(s.left)}%`} />)}

          <div className="relative z-10 container mx-auto px-6 py-20 w-full">
            <SectionTitle title="My Skills"
              subtitle="Technologies I work with to bring ideas to life"
              className="text-white drop-shadow-lg" />

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5 mt-10">
              {skills.map((skill, i) => (
                <div key={skill.title} className="skc asi"
                  style={{ animationDelay: `${0.08 + i * 0.11}s` }}>
                  <SkillCard
                    icon={<span className="sk-icon">{skill.icon}</span>}
                    title={skill.title}
                    isLearning={skill.isLearning}
                    className="backdrop-blur-md bg-white/10 hover:bg-white/20 border border-white/18 text-white shadow-xl"
                  />
                  {/* Skill progress bar */}
                  <div className="bar-track mt-2">
                    <div className="bar-fill"
                      style={{
                        '--w': `${skill.pct}%`,
                        width: `${skill.pct}%`,
                        animationDelay: `${0.3 + i * 0.12}s`,
                      }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* ════════════════════════════════════
            AI AGENCY SECTION
        ════════════════════════════════════ */}
        <AnimatedSection className={`relative w-full ${sh} overflow-hidden rounded-3xl flex items-center mb-8`}>
          <VideoBg src="/back3.mp4" ovClass="ov3"
            fallClass="bg-gradient-to-tr from-violet-900 via-slate-900 to-purple-900"
            scanDelay="4s" />
          <Constellation count={45} />
          <div className="absolute inset-0 rounded-3xl border border-white/10 a-border pointer-events-none"
            style={{ animationDelay: '2s' }} />
          {sps.map((s, i) => <Sp key={i} {...s} top={`${100 - parseInt(s.top)}%`} />)}

          <div className="relative z-10 container mx-auto px-6 py-20 w-full flex items-center justify-center">
            <div className="backdrop-blur-2xl bg-white/10 hover:bg-white/14
              border border-white/20 a-border rounded-3xl
              p-10 md:p-16 text-center max-w-3xl w-full shadow-2xl
              transition-all duration-500 relative overflow-hidden">

              {/* Inner glow */}
              <div className="agency-glow" />

              {/* Shimmer edge lines */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/55 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
              <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent" />
              <div className="absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent" />

              {/* Spinning decoration behind */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10">
                <div style={{
                  width: '420px', height: '420px', borderRadius: '50%',
                  border: '1px dashed rgba(167,139,250,.8)',
                  animation: 'spinSlow 20s linear infinite',
                }} />
              </div>

              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full
                bg-white/12 text-white font-medium mb-8 backdrop-blur-sm
                border border-white/22 shadow-lg a-badge au">
                <Sparkles size={16} className="a-spin" />
                Coming Soon
              </div>

              <h2 className="text-3xl md:text-5xl font-black text-white mb-5 drop-shadow-xl au1 leading-tight">
                Building My{' '}
                <span className="tg">AI Agency</span>
              </h2>

              <p className="text-gray-100/90 max-w-xl mx-auto mb-10 drop-shadow-md text-lg leading-relaxed au2">
                I am working on building AI-based tools and websites to help people and businesses
                leverage the power of artificial intelligence.
              </p>

              {/* Animated dots */}
              <div className="flex justify-center gap-3 mb-10">
                {[0, 1, 2, 3, 4].map(i => (
                  <span key={i}
                    className="rounded-full"
                    style={{
                      width: i === 2 ? '10px' : '6px',
                      height: i === 2 ? '10px' : '6px',
                      background: i === 2 ? 'rgba(192,132,252,.8)' : 'rgba(255,255,255,.4)',
                      animation: `badgeBounce ${1.4 + i * 0.1}s ease-in-out ${i * 0.18}s infinite`,
                      boxShadow: i === 2 ? '0 0 10px 3px rgba(192,132,252,.5)' : 'none',
                    }} />
                ))}
              </div>

              <Button variant="glass" size="lg" disabled
                className="mag-btn backdrop-blur-sm bg-white/10 border border-white/22
                  text-white shadow-lg cursor-not-allowed opacity-70">
                <Sparkles size={15} className="mr-2 a-spin" />
                Coming Soon
              </Button>
            </div>
          </div>
        </AnimatedSection>

      </div>
    </PageTransition>
  );
};

export default Home;