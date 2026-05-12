import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from '@/components/ui/button';
import PageTransition from '@/components/PageTransition';
import { Home, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: Architectural path missing:", location.pathname);
  }, [location.pathname]);

  return (
    <PageTransition>
      <div className="min-h-screen pt-32 flex items-center justify-center overflow-hidden">
        <div className="container-max relative">
          {/* Background Decorative Element */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 blur-[150px] rounded-full -z-10" />
          
          <div className="text-center">
            <div className="text-[10px] font-black uppercase tracking-[0.5em] text-primary mb-8">// ERROR 404</div>
            <h1 className="text-[12rem] md:text-[20rem] font-black tracking-tighter leading-none mb-4 opacity-5 select-none">
              404
            </h1>
            <div className="relative -mt-20 md:-mt-40">
              <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter leading-tight uppercase">Path Missing.</h2>
              <p className="text-xl md:text-2xl text-foreground/40 max-w-lg mx-auto mb-16 leading-relaxed font-medium">
                The requested digital destination does not exist within our current architectural framework.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-6">
                <Link to="/">
                  <Button className="btn-premium px-12 py-8 text-xs font-black uppercase tracking-[0.3em] shadow-premium shimmer">
                    <Home size={16} className="mr-3" />
                    Return Home
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button variant="outline" className="px-12 py-8 text-xs font-black uppercase tracking-[0.3em] rounded-full border-white/5 hover:bg-white/5 transition-all">
                    Report Issue
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default NotFound;
