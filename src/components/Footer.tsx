import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative py-12">
      <div className="container mx-auto px-4">
        {/* Copyright and attribution */}
        <div className="text-center text-muted-foreground text-sm space-y-2">
          <p className="flex items-center justify-center gap-2">
            © 2025. Built with{' '}
            <Heart className="w-4 h-4 text-accent-mint fill-accent-mint" />{' '}
            using{' '}
            <a 
              href="https://caffeine.ai" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-accent-mint hover:text-accent-mint/80 transition-colors duration-300 font-medium"
            >
              caffeine.ai
            </a>
          </p>
          <p className="text-xs text-muted-foreground/70">
            Version 5
          </p>
        </div>
      </div>
    </footer>
  );
}
