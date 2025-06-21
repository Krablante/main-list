import React, { useState, useEffect, useRef, CSSProperties } from 'react';

interface GlitchTextProps {
  text: string;
  className?: string;
  style?: CSSProperties;
  glitchChars?: string;
  intervalMin?: number;
  intervalMax?: number;
  glitchDuration?: number;
  glitchCharacterProbability?: number; // New prop
}

const GlitchText = ({
  text,
  className = '',
  style = {},
  glitchChars = '█▓▒░▀▄¦§†‡※►◄◊■□●○01XY?!ABXYZ$%', // Expanded default
  intervalMin = 1500, 
  intervalMax = 3500, 
  glitchDuration = 250, 
  glitchCharacterProbability = 0.35, // Default 35% chance
}: GlitchTextProps): React.JSX.Element => {
  const [displayText, setDisplayText] = useState(text);
  const [isGlitching, setIsGlitching] = useState(false); // New state for parent animation
  const originalTextRef = useRef(text);
  const animationFrameId = useRef<number | null>(null);
  const timeoutId = useRef<number | null>(null);

  useEffect(() => {
    originalTextRef.current = text;
    setDisplayText(text);
  }, [text]);

  useEffect(() => {
    const triggerGlitch = () => {
      let startTime: number | null = null;
      const original = originalTextRef.current; // Use the ref for the most current text
      const length = original.length;
      
      setIsGlitching(true); // Activate parent glitch effect

      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = timestamp - startTime;

        if (progress < glitchDuration) {
          let newText = '';
          for (let i = 0; i < length; i++) {
            if (Math.random() < glitchCharacterProbability) { 
              newText += glitchChars[Math.floor(Math.random() * glitchChars.length)];
            } else {
              newText += original[i];
            }
          }
          setDisplayText(newText);
          animationFrameId.current = requestAnimationFrame(animate);
        } else {
          setDisplayText(original); // Restore original text
          setIsGlitching(false); // Deactivate parent glitch effect
          scheduleNextGlitch();
        }
      };
      animationFrameId.current = requestAnimationFrame(animate);
    };
    
    const scheduleNextGlitch = () => {
        if (timeoutId.current) clearTimeout(timeoutId.current);
        const nextGlitchTime = Math.random() * (intervalMax - intervalMin) + intervalMin;
        timeoutId.current = window.setTimeout(triggerGlitch, nextGlitchTime);
    }

    scheduleNextGlitch(); // Initial schedule

    return () => { // Cleanup
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
      if (timeoutId.current) clearTimeout(timeoutId.current);
      setIsGlitching(false); // Ensure glitch state is reset on unmount
    };
  // MODIFIED LINE: Removed 'text' from dependency array
  }, [glitchChars, intervalMin, intervalMax, glitchDuration, glitchCharacterProbability]); 

  const combinedClassName = `${className} ${isGlitching ? 'glitch-active-parent' : ''}`.trim();

  return (
    <h2 
      className={combinedClassName} 
      style={style} 
      aria-label={text} 
      role="heading" 
      aria-live="polite" 
    >
      {displayText.split('').map((char, index) => (
        <span key={`${char}-${index}`} className="glitch-char" style={{ display: 'inline-block' }}>
          {char}
        </span>
      ))}
    </h2>
  );
};

export default GlitchText;