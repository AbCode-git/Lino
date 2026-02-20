import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Header from './Header';
import Footer from './Footer';
import Lenis from 'lenis';

// Dynamically import the cursor to avoid SSR issues and improve initial load time
const OptimizedCursor = dynamic(() => import('../ui/OptimizedCursor'), {
  ssr: false, // Don't render on server side
});

// Dynamically import the ScrollHighlighter component
const ScrollHighlighter = dynamic(() => import('../ui/ScrollHighlighter'), {
  ssr: false, // Don't render on server side to avoid hydration issues
});

export default function Layout({ children }) {
  const [isMounted, setIsMounted] = useState(false);

  // Only enable custom cursor on client-side to avoid hydration issues
  useEffect(() => {
    setIsMounted(true);

    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4ba6
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="layout-wrapper">
      {isMounted && <OptimizedCursor />}
      {isMounted && <ScrollHighlighter />}
      <Header />
      <main suppressHydrationWarning>
        <div suppressHydrationWarning>{children}</div>
      </main>
      <Footer />
    </div>
  );
}