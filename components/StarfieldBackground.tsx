
import React, { useState, useEffect, useRef } from 'react';

interface Star {
  id: number;
  angle: number; // Angle from center (radians)
  speedFactor: number; // Base speed factor, to be scaled by screen size
  currentRadius: number; // Current distance from center
  baseSize: number; // Base size of the star
  
  // These will be calculated dynamically
  x: number;
  y: number;
  size: number;
  opacity: number;
}

const StarfieldBackground = (): React.JSX.Element => {
  const numStars = 200;
  const [stars, setStars] = useState<Star[]>([]);
  const animationFrameId = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [dimensions, setDimensions] = useState({ 
    width: 0, 
    height: 0, 
    maxScreenRadius: 0, 
    centerX: 0, 
    centerY: 0 
  });

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        const height = containerRef.current.offsetHeight;
        setDimensions({
          width,
          height,
          // Stars should reach the actual screen edge/corners
          maxScreenRadius: Math.sqrt(width * width + height * height) / 2.0, 
          centerX: width / 2,
          centerY: height / 2,
        });
      }
    };

    updateDimensions(); // Initial call
    let resizeTimeout: number;
    const handleResize = () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = window.setTimeout(updateDimensions, 100);
    }
    window.addEventListener('resize', handleResize);
    return () => {
        clearTimeout(resizeTimeout);
        window.removeEventListener('resize', handleResize);
    }
  }, []);

  // Initialize stars once dimensions are known
  useEffect(() => {
    if (dimensions.width === 0 || dimensions.height === 0) return;

    const initialStars = Array.from({ length: numStars }).map((_, i): Star => {
      const angle = Math.random() * Math.PI * 2;
      const speedFactor = Math.random() * 1.0 + 0.3; 
      const baseSize = Math.random() * 1.5 + 0.5; 
      
      return {
        id: i,
        angle,
        speedFactor,
        currentRadius: Math.random() * dimensions.maxScreenRadius * 0.8, 
        baseSize,
        x: 0, 
        y: 0,
        size: 0,
        opacity: 0,
      };
    });
    setStars(initialStars);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dimensions.width, dimensions.height, dimensions.maxScreenRadius]);

  useEffect(() => {
    if (stars.length === 0 || dimensions.width === 0) return;

    const animate = () => {
      setStars(prevStars => 
        prevStars.map(star => {
          const progress = Math.min(1, star.currentRadius / dimensions.maxScreenRadius);

          // Star's radial speed increases as it moves away from the center (progress increases)
          const baseMovementSpeed = star.speedFactor * (dimensions.width / 1000); // Base speed scaling
          const accelerationEffect = 1 + progress * 2.5; // Stars move up to 3.5x faster at edge
          const movementIncrement = baseMovementSpeed * accelerationEffect;
          
          let newRadius = star.currentRadius + movementIncrement;
          
          let currentAngle = star.angle;
          let currentSpeedFactor = star.speedFactor;
          let currentBaseSize = star.baseSize;

          if (newRadius > dimensions.maxScreenRadius) {
            newRadius = Math.random() * 1.5 + 0.1; // Reset very close to center, but not exactly at (0,0)
            currentAngle = Math.random() * Math.PI * 2; 
            currentSpeedFactor = Math.random() * 1.0 + 0.5; // New speed factor (0.5 to 1.5 for faster average)
            currentBaseSize = Math.random() * 1.5 + 0.5; // New base size
          }

          const currentProgress = Math.min(1, newRadius / dimensions.maxScreenRadius); // Recalculate progress with newRadius

          const x = dimensions.centerX + newRadius * Math.cos(currentAngle);
          const y = dimensions.centerY + newRadius * Math.sin(currentAngle);
          
          const size = currentBaseSize * (1 + Math.pow(currentProgress, 2) * 5); 

          let opacity;
          const fadeOutThreshold = 0.95; // Start fading out at 95% of the journey

          if (currentProgress < fadeOutThreshold) {
            // Fade in and general visibility logic for stars before the fade-out zone
            opacity = Math.min(1, Math.pow(currentProgress, 0.7) * 1.2);
          } else {
            // Fade out logic for stars in the last 5% of their journey
            const progressInFadeZone = (currentProgress - fadeOutThreshold) / (1 - fadeOutThreshold);
            // Opacity at the beginning of the fade-out zone (at 95% progress)
            const opacityAtFadeStart = Math.min(1, Math.pow(fadeOutThreshold, 0.7) * 1.2);
            opacity = opacityAtFadeStart * (1 - progressInFadeZone);
          }
          
          return {
            ...star,
            angle: currentAngle,
            speedFactor: currentSpeedFactor,
            baseSize: currentBaseSize,
            currentRadius: newRadius,
            x,
            y,
            size: Math.max(0.5, size), 
            opacity: Math.max(0, opacity), // Ensure opacity is not negative
          };
        })
      );
      animationFrameId.current = requestAnimationFrame(animate);
    };

    animationFrameId.current = requestAnimationFrame(animate);
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stars.length, dimensions.width, dimensions.height, dimensions.centerX, dimensions.centerY, dimensions.maxScreenRadius]);


  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 w-full h-full pointer-events-none overflow-hidden z-0 bg-black"
      aria-hidden="true"
    >
      {stars.map(star => (
        <div
          key={star.id}
          className="absolute rounded-full bg-slate-200"
          style={{
            left: `${star.x}px`,
            top: `${star.y}px`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            transform: 'translate(-50%, -50%)', 
          }}
        />
      ))}
    </div>
  );
};

export default StarfieldBackground;
