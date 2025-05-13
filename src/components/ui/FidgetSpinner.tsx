
'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';

const FidgetSpinner: React.FC = () => {
  const [rotation, setRotation] = useState(0);
  const [velocity, setVelocity] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const spinnerRef = useRef<SVGSVGElement>(null);
  const animationFrameId = useRef<number | null>(null);

  const friction = 0.985; // Controls how quickly the spinner slows down
  const minVelocityToStop = 0.05; // Spinner stops when velocity is below this
  const initialSpinForce = 25 + Math.random() * 20; // Initial force for a click spin

  // Animation loop
  const animate = useCallback(() => {
    if (!isSpinning) return;

    setVelocity((prevVelocity) => {
      const newVelocity = prevVelocity * friction;
      // Update rotation based on the new velocity
      setRotation((prevRotation) => (prevRotation + newVelocity) % 360);

      if (Math.abs(newVelocity) < minVelocityToStop) {
        setIsSpinning(false); // Stop spinning
        return 0;
      }
      return newVelocity;
    });

    animationFrameId.current = requestAnimationFrame(animate);
  }, [isSpinning, friction, minVelocityToStop]); // Added dependencies

  useEffect(() => {
    if (isSpinning) {
      animationFrameId.current = requestAnimationFrame(animate);
    } else {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    }
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [isSpinning, animate]);

  // Handle click on "SPIN" button or spinner itself
  const handleSpin = () => {
    if (!isSpinning) {
      setIsSpinning(true);
      // Apply a new random velocity
      setVelocity(initialSpinForce * (Math.random() > 0.5 ? 1 : -1));
    } else {
      // If already spinning, add some more velocity (a 'nudge')
      setVelocity(prev => prev + (initialSpinForce / 3) * (Math.random() > 0.5 ? 1 : -1));
    }
  };
  
  // Define colors for the spinner parts, using CSS HSL variables for theme compatibility
  const armColor = "hsl(var(--primary))"; 
  const bearingColor = "hsl(var(--accent))"; 
  const armAccentOuterColor = "hsl(var(--primary) / 0.7)";
  const armAccentInnerColor = "hsl(var(--card))"; // Use card background for inner part

  return (
    <div className="flex flex-col items-center justify-center py-6 px-4" data-ai-hint="interactive game">
      <svg
        ref={spinnerRef}
        width="200"
        height="200"
        viewBox="-55 -55 110 110" // Adjusted viewBox for a bit more padding
        className="cursor-pointer active:cursor-grabbing drop-shadow-lg"
        style={{ transform: `rotate(${rotation}deg)`, touchAction: 'none' }} // Added touchAction
        onClick={handleSpin} // Spin on click
        role="button" // Accessibility
        tabIndex={0} // Accessibility
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleSpin(); }} // Accessibility
        aria-label="Fidget Spinner, click or press Enter to spin"
      >
        {/* Spinner Arms */}
        {[0, 120, 240].map((angle) => (
          <g key={angle} transform={`rotate(${angle})`}>
            {/* Main arm shape: A rounded rectangle extending outwards */}
            <rect x="-10" y="-45" width="20" height="35" rx="10" ry="10" fill={armColor} />
            {/* Bearing on arm */}
            <circle cx="0" cy="-30" r="10" fill={armAccentOuterColor} />
            <circle cx="0" cy="-30" r="6" fill={armAccentInnerColor} stroke="hsl(var(--border))" strokeWidth="1"/>
          </g>
        ))}
        {/* Central Bearing */}
        <circle cx="0" cy="0" r="15" fill={bearingColor} />
        <circle cx="0" cy="0" r="10" fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth="1.5"/>
         {/* Small dot in center for visual accent */}
        <circle cx="0" cy="0" r="3" fill={bearingColor} />
      </svg>
      <Button onClick={handleSpin} className="mt-8 px-10 py-3 text-lg font-semibold shadow-md">
        SPIN
      </Button>
    </div>
  );
};

export default FidgetSpinner;
