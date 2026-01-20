import { useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import MyWork from './components/MyWork';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { Gamepad2 } from 'lucide-react';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function AppContent() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    contactSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className={`min-h-screen bg-background transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      {/* Game controller icon in top-left */}
      <div className="fixed top-6 left-6 z-50">
        <Gamepad2 className="w-10 h-10 text-accent-mint" strokeWidth={1.5} />
      </div>

      {/* Sticky header navigation */}
      <Header />

      <Hero onContactClick={scrollToContact} />
      
      {/* Section separator */}
      <div className="container mx-auto px-4">
        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>
      </div>

      <About />
      
      {/* Section separator */}
      <div className="container mx-auto px-4">
        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>
      </div>

      <MyWork />
      
      {/* Section separator */}
      <div className="container mx-auto px-4">
        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>
      </div>

      <Contact />
      
      {/* Section separator */}
      <div className="container mx-auto px-4">
        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>
      </div>

      <Footer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  );
}

export default App;
