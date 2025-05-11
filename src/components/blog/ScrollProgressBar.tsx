
'use client';

import { useState, useEffect } from 'react';

export function ScrollProgressBar() {
  const [scrollPercentage, setScrollPercentage] = useState(0);

  const handleScroll = () => {
    // Ensure window and document are available (client-side only)
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return;
    }

    const scrollTotal = document.documentElement.scrollHeight - window.innerHeight;
    if (scrollTotal <= 0) {
      // Handle cases where content is shorter than viewport
      setScrollPercentage(window.scrollY > 0 ? 100 : 0);
      return;
    }
    const scrolled = window.scrollY;
    const percentage = (scrolled / scrollTotal) * 100;
    setScrollPercentage(Math.min(100, Math.max(0, percentage))); // Clamp between 0 and 100
  };

  useEffect(() => {
    // Initial call to set state based on current scroll position (e.g., on page refresh)
    handleScroll(); 
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true }); // Recalculate on resize

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <div 
      className="fixed left-0 top-0 z-[60] h-screen w-1.5 bg-muted/50" // Use h-screen for full height
      aria-hidden="true" 
    >
      <div 
        className="h-full w-full bg-primary origin-top"
        style={{ transform: `scaleY(${scrollPercentage / 100})` }}
      />
    </div>
  );
}
