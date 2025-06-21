
import React, { useState, useEffect } from 'react';
import GlitchText from './GlitchText'; // Import GlitchText

const CountdownTimer = (): React.JSX.Element => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [currentDate, setCurrentDate] = useState(getFormattedDate());

  function calculateTimeLeft() {
    const now = new Date();
    const endOfDay = new Date(now);
    endOfDay.setHours(23, 59, 59, 999); 

    const difference = endOfDay.getTime() - now.getTime();

    let newTimeLeft = {
      hours: '00',
      minutes: '00',
      seconds: '00',
    };

    if (difference > 0) {
      newTimeLeft = {
        hours: String(Math.floor((difference / (1000 * 60 * 60)) % 24)).padStart(2, '0'),
        minutes: String(Math.floor((difference / (1000 * 60) % 60))).padStart(2, '0'),
        seconds: String(Math.floor((difference / 1000) % 60)).padStart(2, '0'),
      };
    }
    return newTimeLeft;
  }

  function getDaysInMonth(year: number, month: number) {
    return new Date(year, month + 1, 0).getDate();
  }

  function getFormattedDate() {
    const now = new Date();
    const year = now.getFullYear();
    const monthIndex = now.getMonth(); 
    const dayOfMonth = now.getDate();
    
    const daysInCurrentMonth = getDaysInMonth(year, monthIndex);

    const lang = typeof navigator !== 'undefined' ? navigator.language : undefined;
    let weekdayStr, monthStr;

    try {
      weekdayStr = now.toLocaleDateString(lang, { weekday: 'short' });
      monthStr = now.toLocaleDateString(lang, { month: 'long' });
    } catch (e) {
      weekdayStr = now.toLocaleDateString(undefined, { weekday: 'short' });
      monthStr = now.toLocaleDateString(undefined, { month: 'long' });
    }
    
    // Use non-breaking spaces (\u00A0) to ensure they are rendered
    return `${weekdayStr}\u00A0${dayOfMonth}/${daysInCurrentMonth}\u00A0${monthStr}`;
  }

  useEffect(() => {
    const timerId = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);

      const now = new Date();
      if (now.getHours() === 0 && now.getMinutes() === 0 && (now.getSeconds() >=0 && now.getSeconds() <=2) ) {
         const newFormattedDate = getFormattedDate();
         if (newFormattedDate !== currentDate) { 
            setCurrentDate(newFormattedDate);
         }
      }
    }, 1000);

    const initialFormattedDate = getFormattedDate();
    if (initialFormattedDate !== currentDate) {
        setCurrentDate(initialFormattedDate);
    }

    return () => clearInterval(timerId);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 

  const timeString = `${timeLeft.hours}:${timeLeft.minutes}:${timeLeft.seconds}`;

  return (
    <div className="text-center mb-10 sm:mb-12 animate-subtle-waver">
      <GlitchText
        text={timeString}
        className="text-5xl sm:text-7xl font-mono font-bold text-slate-100 animate-eerie-glow"
        glitchChars="█▓▒░▀▄¦§†‡※►◄◊■□●○01XY?!"
        intervalMin={1500} // More frequent glitches
        intervalMax={3500}
        glitchDuration={250} // Longer glitch duration for more visual impact
        glitchCharacterProbability={0.35} // 35% chance to glitch each char
      />
      <GlitchText
        text={currentDate}
        className="text-lg sm:text-xl text-slate-300/90 mt-3 font-serif"
        glitchChars="█▓▒░." // Simpler glitch characters for date
        intervalMin={4000} // Less frequent glitches for date
        intervalMax={8000}
        glitchDuration={150} // Shorter glitch duration
        glitchCharacterProbability={0.15} // Lower chance to glitch chars
      />
    </div>
  );
};

export default CountdownTimer;
