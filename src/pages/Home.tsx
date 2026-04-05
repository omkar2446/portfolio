import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import PageTransition from '@/components/PageTransition';
import AnimatedSection from '@/components/AnimatedSection';
import SectionTitle from '@/components/SectionTitle';
import SkillCard from '@/components/SkillCard';
import profilePhoto from '@/assets/profile-photo.png';
import { 
  Code, 
  Palette, 
  FileCode2, 
  Atom, 
  Terminal, 
  Brain,
  Sparkles,
  ArrowRight
} from 'lucide-react';

/* ─────────────────────────────────────────────
   Keyframe + utility styles injected once
───────────────────────────────────────────── */
const styles = `
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(40px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    33%       { transform: translateY(-14px) rotate(1deg); }
    66%       { transform: translateY(-7px) rotate(-1deg); }
  }
  @keyframes pulseGlow {
    0%, 100% { opacity: 0.75; box-shadow: 0 0 20px 4px rgba(139,92,246,0.4); }
    50%       { opacity: 1;    box-shadow: 0 0 40px 12px rgba(139,92,246,0.7); }
  }
  @keyframes spinSlow {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }
  @keyframes shimmer {
    0%   { background-position: -200% center; }
    100% { background-position:  200% center; }
  }
  @keyframes borderPulse {
    0%, 100% { border-color: rgba(255,255,255,0.15); }
    50%       { border-color: rgba(255,255,255,0.45); }
  }
  @keyframes slideInLeft {
    from { opacity: 0; transform: translateX(-60px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes slideInRight {
    from { opacity: 0; transform: translateX(60px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes scaleIn {
    from { opacity: 0; transform: scale(0.8); }
    to   { opacity: 1; transform: scale(1); }
  }
  @keyframes particleDrift {
    0%   { transform: translateY(0)   translateX(0)   opacity(0.6); }
    50%  { transform: translateY(-30px) translateX(15px) opacity(1); }
    100% { transform: translateY(0)   translateX(0)   opacity(0.6); }
  }
  @keyframes ringExpand {
    0%   { transform: scale(0.85); opacity: 0.6; }
    50%  { transform: scale(1.08); opacity: 0.3; }
    100% { transform: scale(0.85); opacity: 0.6; }
  }
  @keyframes badgeBounce {
    0%, 100% { transform: translateY(0); }
    40%       { transform: translateY(-6px); }
    60%       { transform: translateY(-3px); }
  }

  .anim-fade-up          { animation: fadeUp   0.7s cubic-bezier(.22,1,.36,1) both; }
  .anim-fade-up-d1       { animation: fadeUp   0.7s cubic-bezier(.22,1,.36,1) 0.15s both; }
  .anim-fade-up-d2       { animation: fadeUp   0.7s cubic-bezier(.22,1,.36,1) 0.30s both; }
  .anim-fade-up-d3       { animation: fadeUp   0.7s cubic-bezier(.22,1,.36,1) 0.45s both; }
  .anim-slide-left       { animation: slideInLeft  0.8s cubic-bezier(.22,1,.36,1) 0.1s both; }
  .anim-slide-right      { animation: slideInRight 0.8s cubic-bezier(.22,1,.36,1) 0.2s both; }
  .anim-scale-in         { animation: scaleIn  0.6s cubic-bezier(.22,1,.36,1) both; }
  .anim-float            { animation: float    5s ease-in-out infinite; }
  .anim-pulse-glow       { animation: pulseGlow 3s ease-in-out infinite; }
  .anim-spin-slow        { animation: spinSlow  4s linear infinite; }
  .anim-badge-bounce     { animation: badgeBounce 2.5s ease-in-out infinite; }
  .anim-ring-expand      { animation: ringExpand 3.5s ease-in-out infinite; }
  .anim-border-pulse     { animation: borderPulse 3s ease-in-out infinite; }

  .text-gradient {
    background: linear-gradient(135deg, #a78bfa, #60a5fa, #f472b6, #a78bfa);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: shimmer 3.5s linear infinite;
  }

  .skill-card-hover {
    transition: transform 0.35s cubic-bezier(.22,1,.36,1),
                box-shadow 0.35s ease,
                background 0.3s ease;
  }
  .skill-card-hover:hover {
    transform: translateY(-10px) scale(1.06);
    box-shadow: 0 20px 50px rgba(139,92,246,0.35);
  }

  .btn-hero-hover {
    transition: transform 0.25s ease, box-shadow 0.25s ease, background 0.25s ease;
  }
  .btn-hero-hover:hover {
    transform: translateY(-3px) scale(1.03);
    box-shadow: 0 12px 35px rgba(255,255,255,0.2);
  }

  /* decorative floating particle dots */
  .particle {
    position: absolute;
    border-radius: 50%;
    background: rgba(255,255,255,0.18);
    animation: particleDrift linear infinite;
    pointer-events: none;
  }
`;

/* ── tiny particle component ── */
const Particle = ({ size, top, left, delay, duration }) => (
  <span
    className="particle"
    style={{
      width: size, height: size,
      top, left,
      animationDelay: delay,
      animationDuration: duration,
    }}
  />
);

const Home = () => {
  const skills = [
    { icon: <Code size={40} />,      title: 'HTML' },
    { icon: <Palette size={40} />,   title: 'CSS' },
    { icon: <FileCode2 size={40} />, title: 'JavaScript' },
    { icon: <Atom size={40} />,      title: 'React' },
    { icon: <Terminal size={40} />,  title: 'Python' },
    { icon: <Brain size={40} />,     title: 'Machine Learning', isLearning: true },
  ];

  const particles = [
    { size:'10px', top:'12%', left:'8%',  delay:'0s',    duration:'6s'  },
    { size:'6px',  top:'25%', left:'80%', delay:'1.2s',  duration:'7s'  },
    { size:'14px', top:'65%', left:'15%', delay:'2s',    duration:'8s'  },
    { size:'8px',  top:'78%', left:'70%', delay:'0.5s',  duration:'5.5s'},
    { size:'5px',  top:'40%', left:'90%', delay:'3s',    duration:'9s'  },
    { size:'12px', top:'88%', left:'40%', delay:'1.8s',  duration:'7.5s'},
  ];

  const sectionHeight = 'min-h-[85vh]';

  return (
    <PageTransition>
      <style>{styles}</style>

      <div className="min-h-screen pt-24 flex flex-col gap-8 px-4 md:px-8">

        {/* ══════════════════════════════════════
            HERO SECTION
        ══════════════════════════════════════ */}
        <section className={`relative w-full ${sectionHeight} py-20 md:py-0 overflow-hidden rounded-3xl flex items-center`}>
          {/* Video BG */}
          <div className="absolute inset-0 w-full h-full">
            <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover">
              <source src="/back1.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-black/30 to-purple-900/40" />
          </div>

          {/* Decorative floating particles */}
          {particles.map((p, i) => <Particle key={i} {...p} />)}

          {/* Animated border ring on the section */}
          <div className="absolute inset-0 rounded-3xl border border-white/10 anim-border-pulse pointer-events-none" />

          {/* Content */}
          <div className="relative z-10 container mx-auto px-6 w-full">
            <div className="grid md:grid-cols-2 gap-12 items-center">

              {/* Text col */}
              <div className="order-2 md:order-1 anim-slide-left">
                <p className="text-white/80 font-medium mb-4 drop-shadow-lg flex items-center gap-2">
                  <span className="inline-block animate-bounce">👋</span>
                  Welcome to my portfolio
                </p>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 drop-shadow-xl leading-tight">
                  Hi, I am{' '}
                  <span className="text-gradient">Omkar Tambe</span>
                </h1>
                <p className="text-xl text-gray-100 mb-8 drop-shadow-md anim-fade-up-d2">
                  Web Developer&nbsp;|&nbsp;AI Enthusiast&nbsp;|&nbsp;Founder of LootDukan
                </p>
                <div className="flex flex-wrap gap-4 anim-fade-up-d3">
                  <Link to="/contact">
                    <Button
                      variant="hero" size="lg"
                      className="btn-hero-hover backdrop-blur-sm bg-white/15 hover:bg-white/25 border border-white/30 text-white shadow-lg"
                    >
                      Contact Me <ArrowRight size={18} className="ml-1 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                  <Link to="/about">
                    <Button
                      variant="heroOutline" size="lg"
                      className="btn-hero-hover backdrop-blur-sm bg-transparent hover:bg-white/10 border border-white/30 text-white shadow-lg"
                    >
                      View My Work
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Avatar col */}
              <div className="order-1 md:order-2 flex justify-center items-center anim-slide-right">
                <div className="relative flex items-center justify-center">

                  {/* outer expanding ring */}
                  <div className="absolute w-80 h-80 md:w-96 md:h-96 rounded-full border border-white/20 anim-ring-expand" />
                  {/* mid ring */}
                  <div className="absolute w-72 h-72 md:w-88 md:h-88 rounded-full border border-purple-400/20 anim-ring-expand"
                    style={{ animationDelay: '1s' }} />

                  {/* floating gradient disc */}
                  <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-gradient-to-br from-purple-500/20 to-blue-400/20 anim-float flex items-center justify-center">
                    <div className="absolute inset-4 rounded-full bg-gradient-to-br from-purple-500 to-blue-400 opacity-80 anim-pulse-glow" />
                    <div className="absolute inset-6 rounded-full bg-card flex items-center justify-center overflow-hidden z-10">
                      <img
                        src={profilePhoto}
                        alt="Omkar Tambe"
                        className="w-full h-full object-cover object-center rounded-full"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            SKILLS SECTION
        ══════════════════════════════════════ */}
        <AnimatedSection className={`relative w-full ${sectionHeight} overflow-hidden rounded-3xl flex items-center`}>
          {/* Video BG */}
          <div className="absolute inset-0 w-full h-full">
            <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover">
              <source src="/back2.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-bl from-black/50 via-black/30 to-indigo-900/40" />
          </div>

          {/* Animated border */}
          <div className="absolute inset-0 rounded-3xl border border-white/10 anim-border-pulse pointer-events-none"
            style={{ animationDelay: '1s' }} />

          {/* Particles */}
          {particles.slice(0, 4).map((p, i) => (
            <Particle key={i} {...p} left={`${100 - parseInt(p.left)}%`} />
          ))}

          {/* Content */}
          <div className="relative z-10 container mx-auto px-6 py-20 w-full">
            <SectionTitle
              title="My Skills"
              subtitle="Technologies I work with to bring ideas to life"
              className="text-white drop-shadow-lg"
            />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mt-10">
              {skills.map((skill, index) => (
                <div
                  key={skill.title}
                  className="skill-card-hover anim-scale-in"
                  style={{ animationDelay: `${0.1 + index * 0.12}s` }}
                >
                  <SkillCard
                    icon={skill.icon}
                    title={skill.title}
                    isLearning={skill.isLearning}
                    className="backdrop-blur-md bg-white/10 hover:bg-white/20 border border-white/20 text-white shadow-xl"
                  />
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* ══════════════════════════════════════
            AI AGENCY SECTION
        ══════════════════════════════════════ */}
        <AnimatedSection className={`relative w-full ${sectionHeight} overflow-hidden rounded-3xl flex items-center mb-8`}>
          {/* Video BG */}
          <div className="absolute inset-0 w-full h-full">
            <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover">
              <source src="/back3.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-black/35 to-violet-900/50" />
          </div>

          {/* Animated border */}
          <div className="absolute inset-0 rounded-3xl border border-white/10 anim-border-pulse pointer-events-none"
            style={{ animationDelay: '2s' }} />

          {/* Particles */}
          {particles.map((p, i) => (
            <Particle key={i} {...p} top={`${100 - parseInt(p.top)}%`} />
          ))}

          {/* Content */}
          <div className="relative z-10 container mx-auto px-6 py-20 w-full flex items-center justify-center">
            <div className="backdrop-blur-xl bg-white/10 hover:bg-white/15 border border-white/20 anim-border-pulse rounded-3xl p-10 md:p-16 text-center max-w-3xl w-full shadow-2xl transition-all duration-500 relative overflow-hidden">

              {/* inner shimmer strip */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

              {/* badge */}
              <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 text-white font-medium mb-8 backdrop-blur-sm border border-white/20 shadow-lg anim-badge-bounce">
                <Sparkles size={18} className="anim-spin-slow" />
                Coming Soon
              </div>

              <h2 className="text-3xl md:text-5xl font-bold text-white mb-5 drop-shadow-xl anim-fade-up">
                Building My{' '}
                <span className="text-gradient">AI Agency</span>
              </h2>

              <p className="text-gray-100 max-w-xl mx-auto mb-10 drop-shadow-md text-lg leading-relaxed anim-fade-up-d1">
                I am working on building AI-based tools and websites to help people and businesses
                leverage the power of artificial intelligence.
              </p>

              {/* decorative dots */}
              <div className="flex justify-center gap-3 mb-10">
                {[0, 1, 2].map(i => (
                  <span
                    key={i}
                    className="w-2 h-2 rounded-full bg-white/50"
                    style={{ animation: `badgeBounce 1.5s ease-in-out ${i * 0.2}s infinite` }}
                  />
                ))}
              </div>

              <Button
                variant="glass" size="lg" disabled
                className="backdrop-blur-sm bg-white/10 border border-white/20 text-white shadow-lg cursor-not-allowed opacity-70"
              >
                <Sparkles size={16} className="mr-2 anim-spin-slow" />
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