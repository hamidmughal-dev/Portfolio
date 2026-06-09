import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Download, AlertCircle } from 'lucide-react';
import { useDownloadPortfolioPackage } from '../hooks/useQueries';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface HeroProps {
  onContactClick: () => void;
}

export default function Hero({ onContactClick }: HeroProps) {
  const [isVisible, setIsVisible] = useState(false);
  const { downloadPackage, isLoading, hasPackage, packageVersion } = useDownloadPortfolioPackage();

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-accent/5"></div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Main heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
            Hi, I'm <span className="text-accent-mint">Hamid Mughal</span>,<br />
            and I'm a <span className="text-accent-mint">Game Developer</span>.
          </h1>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              onClick={onContactClick}
              size="lg"
              className="group bg-transparent border-2 border-accent-mint text-accent-mint hover:bg-accent-mint hover:text-background transition-all duration-300 text-lg px-8 py-6 rounded-full"
            >
              Contact Me
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    onClick={downloadPackage}
                    disabled={isLoading || !hasPackage}
                    size="lg"
                    className="group bg-accent-mint/10 border-2 border-accent-mint/50 text-accent-mint hover:bg-accent-mint hover:text-background transition-all duration-300 text-lg px-8 py-6 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <>
                        <Download className="mr-2 w-5 h-5 animate-pulse" />
                        Loading Package...
                      </>
                    ) : !hasPackage ? (
                      <>
                        <AlertCircle className="mr-2 w-5 h-5" />
                        Package Unavailable
                      </>
                    ) : (
                      <>
                        <Download className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                        Download Portfolio Package
                      </>
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  {hasPackage 
                    ? `Download complete portfolio package ${packageVersion || ''} including frontend React code, backend Motoko source, and all assets for GitHub Pages deployment` 
                    : 'Portfolio package is being prepared. Please check back soon or contact the administrator.'}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          {/* Info text */}
          {!hasPackage && !isLoading && (
            <p className="mt-6 text-sm text-muted-foreground">
              The downloadable portfolio package will include all source code and assets
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
