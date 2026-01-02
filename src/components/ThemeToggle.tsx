import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-10 h-10 rounded-full bg-secondary/50 animate-pulse" />
    );
  }

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="relative w-10 h-10 rounded-full bg-secondary/50 hover:bg-secondary transition-all duration-300 flex items-center justify-center group overflow-hidden"
      aria-label="Toggle theme"
    >
      <Sun 
        size={18} 
        className={`absolute transition-all duration-500 ${
          theme === 'dark' 
            ? 'rotate-90 scale-0 opacity-0' 
            : 'rotate-0 scale-100 opacity-100 text-amber-500'
        }`}
      />
      <Moon 
        size={18} 
        className={`absolute transition-all duration-500 ${
          theme === 'dark' 
            ? 'rotate-0 scale-100 opacity-100 text-primary' 
            : '-rotate-90 scale-0 opacity-0'
        }`}
      />
    </button>
  );
};

export default ThemeToggle;
