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
   STYLES — GPU-composited animations only
   All animations use transform/opacity to avoid
   layout/paint — zero jank on any device.
═══════════════════════════════════════════════════ */
const styles = `
  /* ── Entry animations (transform + opacity only) ── */
  @keyframes fadeUp {
    from { opacity:0; transform:translateY(40px); }
    to   { opacity:1; transform:translateY(0); }
  }
  @keyframes slideLeft {
    from { opacity:0; transform:translateX(-60px); }
    to   { opacity:1; transform:translateX(0); }
  }
  @keyframes slideRight {
    from { opacity:0; transform:translateX(60px); }
    to   { opacity:1; transform:translateX(0); }
  }
  @keyframes scaleIn {
    from { opacity:0; transform:scale(0.82) translateY(16px); }
    to   { opacity:1; transform:scale(1) translateY(0); }
  }

  /* ── Continuous loops — transform/opacity ONLY ── */
  @keyframes float {
    0%,100% { transform:translateY(0px) rotate(0deg); }
    50%      { transform:translateY(-16px) rotate(1deg); }
  }
  @keyframes pulseOpacity {
    0%,100% { opacity:.6; transform:scale(1); }
    50%      { opacity:1;  transform:scale(1.06); }
  }
  @keyframes spinSlow  { to { transform:rotate(360deg); } }
  @keyframes spinCCW   { to { transform:rotate(-360deg); } }
  @keyframes shimmer {
    0%   { background-position:-200% center; }
    100% { background-position: 200% center; }
  }
  @keyframes borderFade {
    0%,100% { opacity:.13; }
    50%      { opacity:.48; }
  }
  @keyframes ringPulse {
    0%   { transform:scale(.85); opacity:.55; }
    50%  { transform:scale(1.1); opacity:.18; }
    100% { transform:scale(.85); opacity:.55; }
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
    40%      { transform:translateY(-7px) scale(1.03); }
    70%      { transform:translateY(-3px) scale(1.01); }
  }
  @keyframes scanline {
    0%   { transform:translateY(-100%); opacity:.6; }
    100% { transform:translateY(1200%); opacity:.4; }
  }
  @keyframes driftA {
    0%,100% { transform:translate(0,0); opacity:.45; }
    50%      { transform:translate(12px,-28px); opacity:.85; }
  }
  @keyframes driftB {
    0%,100% { transform:translate(0,0); opacity:.35; }
    50%      { transform:translate(-16px,-20px); opacity:.75; }
  }
  @keyframes driftC {
    0%,100% { transform:translate(0,0); opacity:.5; }
    50%      { transform:translate(7px,22px); opacity:.7; }
  }
  @keyframes glitch1 {
    0%,92%,100% { clip-path:inset(50% 0 30% 0); transform:translateX(-3px); }
    95%         { clip-path:inset(10% 0 60% 0); transform:translateX(3px); }
    97%         { clip-path:inset(80% 0 5% 0);  transform:translateX(-2px); }
  }
  @keyframes glitch2 {
    0%,92%,100% { clip-path:inset(20% 0 65% 0); transform:translateX(3px); }
    95%         { clip-path:inset(55% 0 10% 0); transform:translateX(-3px); }
    97%         { clip-path:inset(5% 0 85% 0);  transform:translateX(2px); }
  }
  @keyframes countUp {
    from { opacity:0; transform:translateY(16px); }
    to   { opacity:1; transform:translateY(0); }
  }
  @keyframes barGrow {
    from { transform:scaleX(0); }
    to   { transform:scaleX(1); }
  }
  @keyframes videoFadeIn {
    from { opacity:0; }
    to   { opacity:1; }
  }

  /* ── Utility entry classes ── */
  .au  { animation:fadeUp    .7s cubic-bezier(.22,1,.36,1) both; }
  .au1 { animation:fadeUp    .7s cubic-bezier(.22,1,.36,1) .12s both; }
  .au2 { animation:fadeUp    .7s cubic-bezier(.22,1,.36,1) .26s both; }
  .au3 { animation:fadeUp    .7s cubic-bezier(.22,1,.36,1) .40s both; }
  .au4 { animation:fadeUp    .7s cubic-bezier(.22,1,.36,1) .54s both; }
  .asl { animation:slideLeft  .8s cubic-bezier(.22,1,.36,1) .08s both; }
  .asr { animation:slideRight .8s cubic-bezier(.22,1,.36,1) .18s both; }
  .asi { animation:scaleIn    .6s cubic-bezier(.22,1,.36,1) both; }

  /* ── Continuous ── */
  .a-float   { animation:float 5.5s ease-in-out infinite; will-change:transform; }
  .a-glow    { animation:pulseOpacity 3s ease-in-out infinite; will-change:transform,opacity; }
  .a-spin    { animation:spinSlow 8s linear infinite; will-change:transform; }
  .a-spinccw { animation:spinCCW 12s linear infinite; will-change:transform; }
  .a-badge   { animation:badgeBounce 2.8s ease-in-out infinite; will-change:transform; }
  .a-blink   { animation:blink 1s step-end infinite; }

  /* Border pulse via opacity on a pseudo layer */
  .a-border-wrap {
    position:absolute; inset:0; border-radius:inherit;
    border:1px solid rgba(255,255,255,.28);
    pointer-events:none;
    animation:borderFade 3s ease-in-out infinite;
    will-change:opacity;
  }

  /* Shimmer gradient text */
  .tg {
    background:linear-gradient(120deg,#c084fc,#818cf8,#38bdf8,#f472b6,#c084fc);
    background-size:250% auto;
    -webkit-background-clip:text;
    -webkit-text-fill-color:transparent;
    background-clip:text;
    animation:shimmer 4s linear infinite;
  }

  /* Glitch name */
  .glitch-wrap { position:relative; display:inline-block; }
  .glitch-wrap::before,
  .glitch-wrap::after {
    content:attr(data-text);
    position:absolute; inset:0;
    background:linear-gradient(120deg,#c084fc,#818cf8,#38bdf8,#f472b6,#c084fc);
    background-size:250% auto;
    -webkit-background-clip:text;
    background-clip:text;
    -webkit-text-fill-color:transparent;
    animation:shimmer 4s linear infinite;
    will-change:transform,clip-path;
  }
  .glitch-wrap::before { animation:glitch1 9s infinite, shimmer 4s linear infinite; }
  .glitch-wrap::after  { animation:glitch2 9s .4s infinite, shimmer 4s linear infinite; }

  /* ── Video BG — GPU composited ── */
  .vbg {
    position:absolute; inset:0; overflow:hidden;
    border-radius:inherit;
    /* isolate stacking context without forcing 3d */
    isolation:isolate;
  }
  .vbg video {
    position:absolute; inset:0; width:100%; height:100%;
    object-fit:cover;
    will-change:opacity;
    opacity:0;
    transition:opacity 1s ease;
    transform:translateZ(0); /* promote to own layer */
  }
  .vbg video.vloaded { opacity:1; }
  .vbg .vfall {
    position:absolute; inset:0;
    transition:opacity 1s ease;
    will-change:opacity;
  }
  .vbg video.vloaded ~ .vfall { opacity:0; pointer-events:none; }

  /* Overlays — static, no animation needed */
  .ov1 { position:absolute;inset:0;background:linear-gradient(135deg,rgba(0,0,0,.58)0%,rgba(0,0,0,.18)50%,rgba(67,20,120,.45)100%); }
  .ov2 { position:absolute;inset:0;background:linear-gradient(225deg,rgba(0,0,0,.58)0%,rgba(0,0,0,.18)50%,rgba(17,24,100,.48)100%); }
  .ov3 { position:absolute;inset:0;background:linear-gradient(45deg,rgba(0,0,0,.62)0%,rgba(0,0,0,.22)50%,rgba(76,0,130,.5)100%); }

  /* Scanline — only transform, no top change */
  .scanline {
    position:absolute; left:0; right:0; height:2%;
    background:linear-gradient(to bottom,transparent,rgba(255,255,255,.055),transparent);
    pointer-events:none;
    will-change:transform;
    animation:scanline 7s linear infinite;
  }

  /* Sparkle dots — transform only */
  .sp {
    position:absolute; border-radius:50%;
    background:rgba(255,255,255,.22);
    pointer-events:none;
    will-change:transform,opacity;
    box-shadow:0 0 5px 1px rgba(255,255,255,.12);
  }

  /* Constellation canvas */
  .constellation-canvas {
    position:absolute; inset:0;
    pointer-events:none; opacity:.3;
    border-radius:inherit;
  }

  /* ── Skill cards ── */
  .skc {
    transition:transform .35s cubic-bezier(.22,1,.36,1),
               box-shadow .35s ease;
    will-change:transform;
  }
  .skc:hover {
    transform:translateY(-12px) scale(1.07) rotate(-1deg);
    box-shadow:0 24px 52px rgba(139,92,246,.4);
  }

  /* ── Magnetic button ── */
  .mag-btn {
    position:relative; overflow:hidden;
    transition:transform .22s cubic-bezier(.22,1,.36,1),
               box-shadow .22s ease;
    will-change:transform;
  }
  .mag-btn::after {
    content:'';
    position:absolute; inset:-2px;
    background:linear-gradient(120deg,rgba(255,255,255,0),rgba(255,255,255,.11),rgba(255,255,255,0));
    transform:translateX(-100%);
    transition:transform .5s ease;
    pointer-events:none;
    will-change:transform;
  }
  .mag-btn:hover::after { transform:translateX(100%); }
  .mag-btn:hover { box-shadow:0 14px 38px rgba(255,255,255,.2); }

  /* Orbiting dot — pure CSS, zero JS */
  .orbit-dot {
    position:absolute; top:50%; left:50%;
    border-radius:50%;
    margin:calc(var(--s) / -2) 0 0 calc(var(--s) / -2);
    will-change:transform;
    animation:orbit var(--dur) linear var(--delay) infinite;
  }

  /* Stats */
  .stat-card {
    backdrop-filter:blur(10px);
    -webkit-backdrop-filter:blur(10px);
    background:rgba(255,255,255,.08);
    border:1px solid rgba(255,255,255,.18);
    border-radius:16px;
    padding:.9rem 1.3rem;
    text-align:center;
    transition:transform .3s ease, background .3s ease;
    animation:countUp .6s cubic-bezier(.22,1,.36,1) both;
    will-change:transform;
  }
  .stat-card:hover {
    transform:translateY(-5px) scale(1.03);
    background:rgba(255,255,255,.13);
  }
  .stat-num { font-size:2rem; font-weight:800; line-height:1; margin-bottom:.22rem; }
  .stat-lbl { font-size:.78rem; opacity:.7; letter-spacing:.07em; text-transform:uppercase; }

  /* Agency card inner glow */
  .agency-glow {
    position:absolute; inset:0; border-radius:inherit;
    background:radial-gradient(ellipse at 50% 0%,rgba(139,92,246,.16),transparent 68%);
    pointer-events:none;
    animation:pulseOpacity 4s ease-in-out infinite;
    will-change:opacity;
  }

  /* Progress bars — scaleX instead of width (cheaper) */
  .bar-track {
    height:3px; background:rgba(255,255,255,.12);
    border-radius:99px; margin-top:6px; overflow:hidden;
  }
  .bar-fill {
    height:100%; width:100%;
    background:linear-gradient(90deg,#a78bfa,#60a5fa);
    border-radius:99px;
    transform-origin:left center;
    transform:scaleX(var(--w));
    animation:barGrow .85s cubic-bezier(.22,1,.36,1) both;
    will-change:transform;
  }

  /* Typewriter cursor */
  .cur {
    display:inline-block; width:2px; height:1em;
    background:rgba(255,255,255,.85); margin-left:3px;
    vertical-align:middle;
    animation:blink 1s step-end infinite;
  }

  /* Section contain — isolates paint/layout per section */
  .section-contain {
    contain:layout style paint;
  }

  /* Ring animations — scale only ── */
  .a-ring  { animation:ringPulse 3.5s ease-in-out infinite; will-change:transform,opacity; }
  .a-ring2 { animation:ringPulse 3.5s ease-in-out 1.1s infinite; will-change:transform,opacity; }
  .a-ring3 { animation:ringPulse 4.2s ease-in-out 0.5s infinite; will-change:transform,opacity; }

  /* Reduce motion — global kill switch */
  @media (prefers-reduced-motion:reduce) {
    *,*::before,*::after {
      animation-duration:.01ms!important;
      animation-iteration-count:1!important;
      transition-duration:.01ms!important;
    }
  }
`;

/* ═══════════════════════════════════════════════════
   useVideoOptimization — lazy + mobile throttle
═══════════════════════════════════════════════════ */
function useVideoOpt(ref) {
  useEffect(() => {
    const v = ref.current; if (!v) return;
    const mob = window.innerWidth < 768 || /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    if (mob) v.playbackRate = 0.6;

    const mark = () => v.classList.add('vloaded');
    if (v.readyState >= 3) mark();
    else v.addEventListener('canplaythrough', mark, { once: true });

    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        if (v.preload === 'none') { v.preload = 'auto'; v.load(); }
        v.play().catch(() => {});
      } else {
        v.pause();
      }
    }, { threshold: 0.1 });
    io.observe(v);

    return () => { v.removeEventListener('canplaythrough', mark); io.disconnect(); };
  }, [ref]);
}

/* ═══════════════════════════════════════════════════
   useTypewriter
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
      timeout = setTimeout(
        () => setDisplay(p => deleting ? p.slice(0, -1) : word.slice(0, p.length + 1)),
        deleting ? speed / 2 : speed,
      );
    }
    return () => clearTimeout(timeout);
  }, [display, deleting, wi, words, speed, pause]);

  return display;
}

/* ═══════════════════════════════════════════════════
   useMouseParallax — smooth lerp, RAF-based
═══════════════════════════════════════════════════ */
function useMouseParallax(ref, strength = 16) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const raf = useRef(null);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const el = ref.current; if (!el) return;
    // skip on touch devices — saves battery
    if ('ontouchstart' in window) return;

    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      target.current.x = ((e.clientX - r.left - r.width / 2) / (r.width / 2)) * strength;
      target.current.y = ((e.clientY - r.top - r.height / 2) / (r.height / 2)) * strength;
    };
    const onLeave = () => { target.current = { x: 0, y: 0 }; };

    const loop = () => {
      const lerpFactor = 0.07;
      current.current.x += (target.current.x - current.current.x) * lerpFactor;
      current.current.y += (target.current.y - current.current.y) * lerpFactor;
      setTilt({ x: current.current.x, y: current.current.y });
      raf.current = requestAnimationFrame(loop);
    };

    el.addEventListener('mousemove', onMove, { passive: true });
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
   useCountUp
═══════════════════════════════════════════════════ */
function useCountUp(target, duration = 1600, start = false) {
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
   VideoBg
═══════════════════════════════════════════════════ */
const VideoBg = ({ src, ovClass, fallClass, scanDelay }) => {
  const vref = useRef(null);
  useVideoOpt(vref);
  const mob = typeof window !== 'undefined' &&
    (window.innerWidth < 768 || /Android|iPhone|iPad|iPod/i.test(navigator.userAgent));
  return (
    <div className="vbg">
      <div className={`vfall ${fallClass}`} />
      <video
        ref={vref}
        autoPlay muted loop playsInline
        preload={mob ? 'none' : 'auto'}
        disablePictureInPicture
        disableRemotePlayback
      >
        <source src={src} type="video/mp4" />
      </video>
      <div className={`absolute inset-0 ${ovClass}`} />
      <div className="scanline" style={scanDelay ? { animationDelay: scanDelay } : {}} />
    </div>
  );
};

/* ═══════════════════════════════════════════════════
   Sparkle dot — transform-only animation
═══════════════════════════════════════════════════ */
const Sp = ({ size, top, left, delay, dur, variant = 'a' }) => {
  const name = variant === 'b' ? 'driftB' : variant === 'c' ? 'driftC' : 'driftA';
  return (
    <span className="sp" style={{
      width: size, height: size, top, left,
      animationName: name,
      animationDelay: delay,
      animationDuration: dur,
      animationTimingFunction: 'ease-in-out',
      animationIterationCount: 'infinite',
    }} />
  );
};

/* ═══════════════════════════════════════════════════
   OrbitDot — pure CSS orbit, zero JS overhead
═══════════════════════════════════════════════════ */
const OrbitDot = ({ radius, size, color, duration, delay, shadow }) => (
  <div
    className="orbit-dot"
    style={{
      '--r': `${radius}px`,
      '--s': size,
      '--dur': duration,
      '--delay': delay,
      width: size,
      height: size,
      background: color,
      boxShadow: shadow,
    }}
  />
);

/* ═══════════════════════════════════════════════════
   StatCard
═══════════════════════════════════════════════════ */
const StatCard = ({ num, suffix = '', label, delay, visible }) => {
  const val = useCountUp(num, 1500, visible);
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
   Constellation canvas — optimised RAF loop
   Uses devicePixelRatio for crisp rendering
   Reduces dot count on mobile
═══════════════════════════════════════════════════ */
const Constellation = ({ count = 40 }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    const mob = window.innerWidth < 768;
    const actualCount = mob ? Math.floor(count * 0.5) : count;
    const dpr = Math.min(window.devicePixelRatio || 1, 2); // cap at 2x
    let raf;
    let lastTime = 0;

    const resize = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
    };
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const W = () => canvas.offsetWidth;
    const H = () => canvas.offsetHeight;

    const dots = Array.from({ length: actualCount }, () => ({
      x: Math.random() * W(),
      y: Math.random() * H(),
      vx: (Math.random() - .5) * .35,
      vy: (Math.random() - .5) * .35,
      r: Math.random() * 1.8 + 0.8,
    }));

    const LINK_DIST = mob ? 70 : 95;

    const draw = (time) => {
      // delta-time so speed is consistent across frame rates
      const dt = Math.min((time - lastTime) / 16.67, 3);
      lastTime = time;

      ctx.clearRect(0, 0, W(), H());

      const w = W(); const h = H();
      for (const d of dots) {
        d.x += d.vx * dt; d.y += d.vy * dt;
        if (d.x < 0) { d.x = 0; d.vx *= -1; }
        else if (d.x > w) { d.x = w; d.vx *= -1; }
        if (d.y < 0) { d.y = 0; d.vy *= -1; }
        else if (d.y > h) { d.y = h; d.vy *= -1; }

        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255,255,255,.55)';
        ctx.fill();
      }

      for (let i = 0; i < dots.length - 1; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dx = dots[i].x - dots[j].x;
          const dy = dots[i].y - dots[j].y;
          const dist2 = dx * dx + dy * dy;
          if (dist2 < LINK_DIST * LINK_DIST) {
            const dist = Math.sqrt(dist2);
            ctx.beginPath();
            ctx.moveTo(dots[i].x, dots[i].y);
            ctx.lineTo(dots[j].x, dots[j].y);
            ctx.strokeStyle = `rgba(180,160,255,${(1 - dist / LINK_DIST) * .4})`;
            ctx.lineWidth = .5;
            ctx.stroke();
          }
        }
      }

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, [count]);

  return <canvas ref={canvasRef} className="constellation-canvas" />;
};

/* ═══════════════════════════════════════════════════
   Main component
═══════════════════════════════════════════════════ */
const Home = () => {
  const heroRef = useRef(null);
  const tilt = useMouseParallax(heroRef, 14);
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef(null);

  useEffect(() => {
    const el = statsRef.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setStatsVisible(true); io.disconnect(); }
    }, { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const roles = ['Web Developer', 'AI Enthusiast', 'React Engineer', 'Founder @ LootDukan'];
  const role = useTypewriter(roles, 75, 2000);

  const skills = [
    { icon: <Code size={36} />,      title: 'HTML',             pct: 0.95 },
    { icon: <Palette size={36} />,   title: 'CSS',              pct: 0.90 },
    { icon: <FileCode2 size={36} />, title: 'JavaScript',       pct: 0.85 },
    { icon: <Atom size={36} />,      title: 'React',            pct: 0.82 },
    { icon: <Terminal size={36} />,  title: 'Python',           pct: 0.75 },
    { icon: <Brain size={36} />,     title: 'Machine Learning', pct: 0.55, isLearning: true },
  ];

  const sps = [
    { size:'10px', top:'10%', left:'7%',   delay:'0s',   dur:'6.5s' },
    { size:'6px',  top:'22%', left:'82%',  delay:'1.1s', dur:'7s',   variant:'b' },
    { size:'14px', top:'68%', left:'13%',  delay:'2.2s', dur:'8.2s', variant:'c' },
    { size:'8px',  top:'80%', left:'74%',  delay:'0.6s', dur:'5.8s', variant:'b' },
    { size:'5px',  top:'38%', left:'91%',  delay:'3.1s', dur:'9.4s' },
    { size:'11px', top:'86%', left:'44%',  delay:'1.7s', dur:'7.8s', variant:'c' },
    { size:'7px',  top:'45%', left:'3%',   delay:'2.8s', dur:'6.2s', variant:'b' },
    { size:'9px',  top:'18%', left:'55%',  delay:'0.4s', dur:'8s' },
  ];

  const sh = 'min-h-[88vh]';

  return (
    <PageTransition>
      <style>{styles}</style>
      <div className="min-h-screen pt-24 flex flex-col gap-8 px-4 md:px-8">

        {/* ════════════════════════════════════
            HERO
        ════════════════════════════════════ */}
        <section
          ref={heroRef}
          className={`relative w-full ${sh} py-20 md:py-0 overflow-hidden rounded-3xl flex items-center section-contain`}
        >
          <VideoBg src="/back1.mp4" ovClass="ov1"
            fallClass="bg-gradient-to-br from-purple-900 via-slate-900 to-blue-900" />
          <Constellation count={38} />
          <div className="a-border-wrap" />
          {sps.map((s, i) => <Sp key={i} {...s} />)}

          <div className="relative z-10 container mx-auto px-6 w-full">
            <div className="grid md:grid-cols-2 gap-12 items-center">

              {/* ── Text col ── */}
              <div className="order-2 md:order-1 asl">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full
                  bg-white/10 border border-white/20 text-white/85 text-sm mb-5 backdrop-blur-sm au">
                  <span className="w-2 h-2 rounded-full bg-green-400"
                    style={{
                      boxShadow:'0 0 8px 2px rgba(74,222,128,.6)',
                      animation:'blink 2.2s ease-in-out infinite',
                    }} />
                  Available for projects
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-3 drop-shadow-xl leading-[1.08] au1">
                  Hi, I am
                </h1>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-[1.08] au2">
                  <span className="glitch-wrap tg" data-text="Omkar Tambe">Omkar Tambe</span>
                </h1>

                <p className="text-xl text-gray-100/90 mb-8 drop-shadow-md au3 h-8 flex items-center">
                  <span className="tg font-semibold">{role}</span>
                  <span className="cur" />
                </p>

                <div className="flex flex-wrap gap-4 au4">
                  <Link to="/contact">
                    <Button variant="hero" size="lg"
                      className="mag-btn backdrop-blur-sm bg-white/15 hover:bg-white/28 border border-white/30 text-white shadow-lg">
                      Contact Me <ArrowRight size={17} className="ml-1.5" />
                    </Button>
                  </Link>
                  <Link to="/about">
                    <Button variant="heroOutline" size="lg"
                      className="mag-btn backdrop-blur-sm bg-transparent hover:bg-white/12 border border-white/30 text-white shadow-lg">
                      View My Work
                    </Button>
                  </Link>
                </div>

                <div ref={statsRef} className="grid grid-cols-3 gap-3 mt-10 au4"
                  style={{ animationDelay:'.72s' }}>
                  <StatCard num={10} suffix="+" label="Projects"  delay=".78s" visible={statsVisible} />
                  <StatCard num={3}  suffix="+" label="Years Exp" delay=".92s" visible={statsVisible} />
                  <StatCard num={5}  suffix="★" label="Avg Rating" delay="1.06s" visible={statsVisible} />
                </div>
              </div>

              {/* ── Avatar col ── */}
              <div className="order-1 md:order-2 flex justify-center items-center asr">
                <div
                  className="relative flex items-center justify-center"
                  style={{
                    transform:`perspective(900px) rotateY(${tilt.x * 0.55}deg) rotateX(${-tilt.y * 0.55}deg)`,
                    transition:'transform .05s linear',
                    willChange:'transform',
                  }}
                >
                  {/* Rings — scale-based pulse, no layout change */}
                  <div className="absolute w-[340px] h-[340px] md:w-[400px] md:h-[400px] rounded-full border border-white/15 a-ring" />
                  <div className="absolute w-[300px] h-[300px] md:w-[350px] md:h-[350px] rounded-full border border-purple-400/22 a-ring2" />
                  <div className="absolute w-[260px] h-[260px] md:w-[300px] md:h-[300px] rounded-full border border-blue-400/15 a-ring3" />

                  {/* Spinning rings — rotate only */}
                  <div className="absolute w-[380px] h-[380px] md:w-[440px] md:h-[440px] rounded-full a-spin"
                    style={{ border:'1px dashed rgba(167,139,250,.22)' }} />
                  <div className="absolute w-[280px] h-[280px] md:w-[330px] md:h-[330px] rounded-full a-spinccw"
                    style={{ border:'1px dashed rgba(96,165,250,.18)' }} />

                  {/* Orbiting dots — pure CSS, no JS */}
                  <OrbitDot radius={162} size="12px" color="#c084fc" duration="6s"  delay="0s"   shadow="0 0 10px 3px rgba(192,132,252,.7)" />
                  <OrbitDot radius={162} size="8px"  color="#38bdf8" duration="6s"  delay="-3s"  shadow="0 0 8px 2px rgba(56,189,248,.6)" />
                  <OrbitDot radius={138} size="7px"  color="#f472b6" duration="9s"  delay="-2s"  shadow="0 0 8px 2px rgba(244,114,182,.6)" />
                  <OrbitDot radius={138} size="5px"  color="#a78bfa" duration="9s"  delay="-5s"  shadow="0 0 6px 2px rgba(167,139,250,.5)" />

                  {/* Photo disc */}
                  <div className="w-[240px] h-[240px] md:w-[280px] md:h-[280px] rounded-full
                    bg-gradient-to-br from-purple-500/22 to-blue-400/22 a-float
                    flex items-center justify-center">
                    <div className="absolute inset-5 rounded-full bg-gradient-to-br from-purple-500 to-blue-400 opacity-80 a-glow" />
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
            SKILLS
        ════════════════════════════════════ */}
        <AnimatedSection className={`relative w-full ${sh} overflow-hidden rounded-3xl flex items-center section-contain`}>
          <VideoBg src="/back2.mp4" ovClass="ov2"
            fallClass="bg-gradient-to-bl from-indigo-900 via-slate-900 to-emerald-900"
            scanDelay="2s" />
          <Constellation count={28} />
          <div className="a-border-wrap" style={{ animationDelay:'1s' }} />
          {sps.slice(0, 5).map((s, i) => <Sp key={i} {...s} left={`${100 - parseInt(s.left)}%`} />)}

          <div className="relative z-10 container mx-auto px-6 py-20 w-full">
            <SectionTitle title="My Skills"
              subtitle="Technologies I work with to bring ideas to life"
              className="text-white drop-shadow-lg" />

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5 mt-10">
              {skills.map((skill, i) => (
                <div key={skill.title} className="skc asi"
                  style={{ animationDelay:`${0.07 + i * 0.1}s` }}>
                  <SkillCard
                    icon={skill.icon}
                    title={skill.title}
                    isLearning={skill.isLearning}
                    className="backdrop-blur-md bg-white/10 hover:bg-white/20 border border-white/18 text-white shadow-xl"
                  />
                  <div className="bar-track mt-2">
                    <div className="bar-fill"
                      style={{
                        '--w': skill.pct,
                        animationDelay:`${0.28 + i * 0.1}s`,
                      }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* ════════════════════════════════════
            AI AGENCY
        ════════════════════════════════════ */}
        <AnimatedSection className={`relative w-full ${sh} overflow-hidden rounded-3xl flex items-center mb-8 section-contain`}>
          <VideoBg src="/back3.mp4" ovClass="ov3"
            fallClass="bg-gradient-to-tr from-violet-900 via-slate-900 to-purple-900"
            scanDelay="4s" />
          <Constellation count={42} />
          <div className="a-border-wrap" style={{ animationDelay:'2s' }} />
          {sps.map((s, i) => <Sp key={i} {...s} top={`${100 - parseInt(s.top)}%`} />)}

          <div className="relative z-10 container mx-auto px-6 py-20 w-full flex items-center justify-center">
            <div className="backdrop-blur-2xl bg-white/10 hover:bg-white/13
              border border-white/20 rounded-3xl
              p-10 md:p-16 text-center max-w-3xl w-full shadow-2xl
              transition-all duration-500 relative overflow-hidden">

              <div className="agency-glow" />

              {/* Shimmer edge lines */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/28 to-transparent" />
              <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/18 to-transparent" />
              <div className="absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/18 to-transparent" />

              {/* Spinning decoration */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.07]">
                <div style={{
                  width:'420px', height:'420px', borderRadius:'50%',
                  border:'1px dashed rgba(167,139,250,.9)',
                  animation:'spinSlow 22s linear infinite',
                  willChange:'transform',
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

              {/* Bouncing dots */}
              <div className="flex justify-center gap-3 mb-10">
                {[0,1,2,3,4].map(i => (
                  <span key={i} className="rounded-full" style={{
                    width: i === 2 ? '10px' : '6px',
                    height: i === 2 ? '10px' : '6px',
                    background: i === 2 ? 'rgba(192,132,252,.8)' : 'rgba(255,255,255,.38)',
                    boxShadow: i === 2 ? '0 0 9px 3px rgba(192,132,252,.5)' : 'none',
                    animation:`badgeBounce ${1.4 + i * 0.1}s ease-in-out ${i * 0.18}s infinite`,
                    willChange:'transform',
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