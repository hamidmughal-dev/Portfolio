import { useEffect, useState, useRef } from 'react';

export default function About() {
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
    <section id="about" className="py-20 md:py-32 relative" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Section title with fade-in animation */}
          <h2 
            className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-12 text-center transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            About <span className="text-accent-mint">Hamid Mughal</span>
          </h2>

          {/* Content grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Profile image */}
            <div className="flex justify-center md:justify-end order-2 md:order-1">
              <div className="relative">
                <div className="absolute inset-0 bg-accent-mint/20 rounded-2xl blur-2xl"></div>
                <img 
                  src="/assets/generated/hamid-profile.dim_400x400.jpg"
                  alt="Hamid Mughal"
                  className="relative w-64 h-64 md:w-80 md:h-80 rounded-2xl object-cover border border-accent-mint/30 shadow-lg"
                />
              </div>
            </div>

            {/* Bio text */}
            <div className="order-1 md:order-2">
              <p className="text-base md:text-lg leading-relaxed text-muted-foreground">
                I am a Unity Game Developer with 4+ years of experience building free-to-play mobile games, 
                specializing in simulation and hyper-casual mechanics. I focus on creating smooth gameplay systems, 
                optimizing performance, and developing LiveOps-driven features that improve player retention and monetization.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
