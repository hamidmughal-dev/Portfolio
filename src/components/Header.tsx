import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { useDownloadPortfolioPackage } from '../hooks/useQueries';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { downloadPackage, isLoading, hasPackage, packageVersion } = useDownloadPortfolioPackage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    section?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header 
      className={`fixed top-0 right-0 left-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? 'bg-background/95 backdrop-blur-md border-b border-border/50 shadow-lg' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between h-16 md:h-20">
          {/* Navigation links */}
          <div className="flex items-center gap-2 md:gap-4">
            <Button
              variant="ghost"
              className="text-foreground hover:text-accent-mint transition-colors duration-300 text-sm md:text-base"
              onClick={() => scrollToSection('about')}
            >
              About
            </Button>
            <Button
              variant="ghost"
              className="text-foreground hover:text-accent-mint transition-colors duration-300 text-sm md:text-base"
              onClick={() => scrollToSection('work')}
            >
              My Work
            </Button>
            <Button
              variant="ghost"
              className="text-foreground hover:text-accent-mint transition-colors duration-300 text-sm md:text-base"
              onClick={() => scrollToSection('contact')}
            >
              Contact
            </Button>
          </div>

          {/* Download button with tooltip */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={downloadPackage}
                  disabled={isLoading || !hasPackage}
                  className="bg-accent-mint text-background hover:bg-accent-mint/90 transition-all duration-300 text-sm md:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <Download className="mr-2 w-4 h-4 animate-pulse" />
                      Loading...
                    </>
                  ) : (
                    <>
                      <Download className="mr-2 w-4 h-4" />
                      <span className="hidden sm:inline">Download ZIP</span>
                      <span className="sm:hidden">ZIP</span>
                    </>
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                {hasPackage 
                  ? `Download portfolio package ${packageVersion || ''} (frontend + backend source)` 
                  : 'Portfolio package not available yet'}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>
      </div>
    </header>
  );
}
