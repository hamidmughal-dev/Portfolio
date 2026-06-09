import { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Image } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  gifUrl?: string;
  link?: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'Cake Sort',
    gifUrl: '/assets/Playing a new game called Cake Sort cakesort games likesharesubscribe.gif',
    link: 'https://play.google.com/store/apps/details?id=com.cake.sort.puzzle.sortinggames'
  },
  {
    id: 2,
    title: 'City Builder',
    gifUrl: '/assets/Playing a new game called Cake Sort cakesort games likesharesubscribe-1.gif'
  },
  {
    id: 3,
    title: 'Racing Game',
    gifUrl: '/assets/Playing a new game called Cake Sort cakesort games likesharesubscribe-2.gif'
  },
  {
    id: 4,
    title: 'Puzzle Adventure',
    gifUrl: '/assets/generated/placeholder-puzzle-game.dim_400x225.gif'
  },
  {
    id: 5,
    title: 'Action RPG',
    gifUrl: '/assets/generated/placeholder-rpg-game.dim_400x225.gif'
  }
];

export default function MyWork() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
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

  const ProjectCard = ({ project }: { project: Project }) => {
    const cardContent = (
      <Card
        className={`group relative overflow-hidden bg-card/50 backdrop-blur-sm border border-border/50 hover:border-accent-mint/50 transition-all duration-300 rounded-2xl ${
          hoveredId === project.id ? 'shadow-glow-mint' : ''
        } ${project.link ? 'cursor-pointer' : ''}`}
        onMouseEnter={() => setHoveredId(project.id)}
        onMouseLeave={() => setHoveredId(null)}
      >
        <CardContent className="p-0 relative">
          {/* GIF or Placeholder */}
          <div className="aspect-video bg-accent/10 flex items-center justify-center relative overflow-hidden rounded-t-2xl">
            {project.gifUrl ? (
              <img
                src={project.gifUrl}
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <Image className="w-16 h-16 text-muted-foreground/30 group-hover:text-accent-mint/50 transition-colors duration-300" />
            )}
          </div>

          {/* Project title */}
          <div className="p-6">
            <h3 className="text-xl md:text-2xl font-semibold text-foreground group-hover:text-accent-mint transition-colors duration-300">
              {project.title}
            </h3>
          </div>
        </CardContent>
      </Card>
    );

    if (project.link) {
      return (
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="block"
        >
          {cardContent}
        </a>
      );
    }

    return cardContent;
  };

  return (
    <section id="work" className="py-20 md:py-32 relative" ref={sectionRef}>
      <div className="container mx-auto px-4">
        {/* Section header with fade-in animation */}
        <div className="text-center mb-16">
          <h2 
            className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-4 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            My <span className="text-accent-mint">Work</span>
          </h2>
        </div>

        {/* Projects grid */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
