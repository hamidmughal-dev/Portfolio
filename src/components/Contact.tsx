import { useEffect, useState, useRef } from 'react';
import { Mail } from 'lucide-react';
import { SiLinkedin } from 'react-icons/si';
import { Button } from '@/components/ui/button';

export default function Contact() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section id="contact" className="py-20 md:py-32 relative" ref={sectionRef}>
      <div className="container mx-auto px-4">
        {/* Section header with fade-in animation */}
        <div className="text-center mb-16">
          <h2 
            className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-4 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <span className="text-accent-mint">Contact</span>
          </h2>
        </div>

        {/* Contact buttons */}
        <div className="max-w-2xl mx-auto flex flex-col sm:flex-row gap-6 justify-center items-center">
          {/* Email button */}
          <Button 
            variant="outline" 
            size="lg"
            className="group w-full sm:w-auto border-2 border-accent-mint/50 text-accent-mint hover:bg-accent-mint hover:text-background transition-all duration-300 px-8 py-6 rounded-full"
            asChild
          >
            <a href="mailto:your.email@example.com" className="flex items-center gap-3">
              <Mail className="w-5 h-5" />
              <span className="text-base font-medium">Email Me</span>
            </a>
          </Button>

          {/* LinkedIn button */}
          <Button 
            variant="outline" 
            size="lg"
            className="group w-full sm:w-auto border-2 border-accent-mint/50 text-accent-mint hover:bg-accent-mint hover:text-background transition-all duration-300 px-8 py-6 rounded-full"
            asChild
          >
            <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3">
              <SiLinkedin className="w-5 h-5" />
              <span className="text-base font-medium">LinkedIn</span>
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
