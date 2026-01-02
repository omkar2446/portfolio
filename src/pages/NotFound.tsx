import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from '@/components/ui/button';
import PageTransition from '@/components/PageTransition';
import { Home } from 'lucide-react';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <PageTransition>
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center px-6">
          <h1 className="text-8xl md:text-9xl font-bold text-gradient mb-4">
            404
          </h1>
          <p className="text-2xl text-foreground mb-4">
            Page Not Found
          </p>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Link to="/">
            <Button variant="hero" size="lg">
              <Home size={18} />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </PageTransition>
  );
};

export default NotFound;
