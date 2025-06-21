// src/App.tsx
import React, { useState, useEffect, useRef } from 'react';
import { MY_PROJECTS_DATA, USEFUL_LINKS_DATA } from './constants';
import BubbleLink from './components/BubbleLink';
import CountdownTimer from './components/CountdownTimer';
// import StarfieldBackground from './components/StarfieldBackground';

function App(): React.JSX.Element {
  const [isMegaGlitching, setIsMegaGlitching] = useState(false);
  const megaGlitchTimeoutRef = useRef<number | null>(null);
  const megaGlitchDurationTimeoutRef = useRef<number | null>(null);
  const appContainerRef = useRef<HTMLDivElement>(null);

  /* --- список CSS-переменных, которые трогаем во время «мега-глитча» --- */
  const megaGlitchCSSProperties = [
    '--mega-tx-1', '--mega-ty-1', '--mega-skew-x-1', '--mega-skew-y-1', '--mega-op-1', '--mega-invert-1', '--mega-bright-1', '--mega-contrast-1', '--mega-hue-1', '--mega-gray-1',
    '--mega-tx-2', '--mega-ty-2', '--mega-skew-x-2', '--mega-skew-y-2', '--mega-invert-2', '--mega-bright-2', '--mega-contrast-2', '--mega-hue-2', '--mega-gray-2',
    '--mega-tx-3', '--mega-ty-3', '--mega-skew-x-3', '--mega-skew-y-3', '--mega-op-2', '--mega-invert-3', '--mega-bright-3', '--mega-contrast-3', '--mega-hue-3', '--mega-gray-3',
    '--mega-tx-4', '--mega-ty-4', '--mega-skew-x-4', '--mega-skew-y-4', '--mega-invert-4', '--mega-bright-4', '--mega-contrast-4', '--mega-hue-4', '--mega-gray-4',
    '--mega-tx-5', '--mega-ty-5', '--mega-skew-x-5', '--mega-skew-y-5', '--mega-op-3', '--mega-invert-5', '--mega-bright-5', '--mega-contrast-5', '--mega-hue-5', '--mega-gray-5',
    '--mega-tx-6', '--mega-ty-6', '--mega-skew-x-6', '--mega-skew-y-6', '--mega-invert-6', '--mega-bright-6', '--mega-contrast-6', '--mega-hue-6', '--mega-gray-6',
    '--mega-tx-7', '--mega-ty-7', '--mega-skew-x-7', '--mega-skew-y-7', '--mega-op-4', '--mega-invert-7', '--mega-bright-7', '--mega-contrast-7', '--mega-hue-7', '--mega-gray-7',
    '--mega-tx-8', '--mega-ty-8', '--mega-skew-x-8', '--mega-skew-y-8', '--mega-invert-8', '--mega-bright-8', '--mega-contrast-8', '--mega-hue-8', '--mega-gray-8',
    '--mega-tx-9', '--mega-ty-9', '--mega-skew-x-9', '--mega-skew-y-9', '--mega-op-5', '--mega-invert-9', '--mega-bright-9', '--mega-contrast-9', '--mega-hue-9', '--mega-gray-9',
  ];

  /* -------------------------------------------------------------------- */
  /*  Логика «мега-глитча»                                                */
  /* -------------------------------------------------------------------- */

  useEffect(() => {
    let currentScheduleMegaGlitch: (() => void) | null = null;

    /** Сбрасываем все ранее выставленные CSS-переменные */
    const clearProperties = () => {
      if (!appContainerRef.current) return;
      megaGlitchCSSProperties.forEach(prop =>
        appContainerRef.current!.style.removeProperty(prop),
      );
    };

    /** Выставляем случайные значения переменных и запускаем анимацию */
    const applyPropertiesAndStartGlitch = () => {
      if (appContainerRef.current) {
        for (let i = 1; i <= 9; i++) {
          appContainerRef.current.style.setProperty(`--mega-tx-${i}`, (Math.random() * 40 - 20).toFixed(1) + 'px');
          appContainerRef.current.style.setProperty(`--mega-ty-${i}`, (Math.random() * 40 - 20).toFixed(1) + 'px');
          appContainerRef.current.style.setProperty(`--mega-skew-x-${i}`, (Math.random() * 6 - 3).toFixed(1) + 'deg');
          appContainerRef.current.style.setProperty(`--mega-skew-y-${i}`, (Math.random() * 6 - 3).toFixed(1) + 'deg');
          appContainerRef.current.style.setProperty(`--mega-invert-${i}`, (Math.random() * 0.6).toFixed(2));
          appContainerRef.current.style.setProperty(`--mega-bright-${i}`, (Math.random() * 1 + 0.5).toFixed(2));
          appContainerRef.current.style.setProperty(`--mega-contrast-${i}`, (Math.random() * 1 + 0.5).toFixed(2));
          appContainerRef.current.style.setProperty(`--mega-hue-${i}`, Math.floor(Math.random() * 360) + 'deg');
          appContainerRef.current.style.setProperty(`--mega-gray-${i}`, (Math.random() * 0.5).toFixed(2));
        }
        for (let i = 1; i <= 5; i++) {
          appContainerRef.current.style.setProperty(`--mega-op-${i}`, (Math.random() * 0.4 + 0.6).toFixed(2));
        }
      }

      setIsMegaGlitching(true);

      /* длительность мега-глитча — 300 мс */
      if (megaGlitchDurationTimeoutRef.current) {
        clearTimeout(megaGlitchDurationTimeoutRef.current);
      }
      megaGlitchDurationTimeoutRef.current = window.setTimeout(() => {
        setIsMegaGlitching(false);
        clearProperties();
        currentScheduleMegaGlitch?.(); // планируем следующий глитч
      }, 300);
    };

    /** Случайным образом планируем следующий запуск */
    const scheduleMegaGlitch = () => {
      const randomInterval = Math.random() * (10_000 - 6_000) + 6_000;
      if (megaGlitchTimeoutRef.current) {
        clearTimeout(megaGlitchTimeoutRef.current);
      }
      megaGlitchTimeoutRef.current = window.setTimeout(
        applyPropertiesAndStartGlitch,
        randomInterval,
      );
    };

    currentScheduleMegaGlitch = scheduleMegaGlitch;
    scheduleMegaGlitch(); // запускаем при монтировании

    /* --- очистка --- */
    return () => {
      if (megaGlitchTimeoutRef.current) {
        clearTimeout(megaGlitchTimeoutRef.current);
      }
      if (megaGlitchDurationTimeoutRef.current) {
        clearTimeout(megaGlitchDurationTimeoutRef.current);
      }
      clearProperties();
      currentScheduleMegaGlitch = null;
    };
  }, []);

  /* -------------------------------------------------------------------- */
  /*  Разметка                                                            */
  /* -------------------------------------------------------------------- */

  return (
    <div
      ref={appContainerRef}
      className={`relative min-h-screen p-4 sm:p-8 flex flex-col items-center 
                  text-slate-200 font-sans 
                  selection:bg-slate-500 selection:text-slate-100 overflow-y-auto overflow-x-hidden
                  ${isMegaGlitching ? 'mega-glitch-active' : ''}`}
    >
      {/* <StarfieldBackground /> */}

      <div className="relative z-10 w-full max-w-6xl mx-auto flex-grow flex flex-col">
        {/* ТАЙМЕР */}
        <section className="my-10 sm:my-16 flex flex-col items-center">
          <CountdownTimer />
        </section>

        {/* ССЫЛКИ */}
        <section className="my-10 sm:my-16">
          <div className="flex flex-wrap justify-center items-start gap-x-6 gap-y-12 sm:gap-x-10 sm:gap-y-16 px-2 pt-8 sm:pt-12">
            {MY_PROJECTS_DATA.map(item => (
              <BubbleLink key={item.id} item={item} />
            ))}
            {USEFUL_LINKS_DATA.map(item => (
              <BubbleLink key={item.id} item={item} />
            ))}
          </div>
        </section>

        {/* ПОДВАЛ */}
        <footer className="w-full text-center py-8 mt-auto text-sm text-neutral-500 font-serif italic">
          Bello, non pace
        </footer>
      </div>
    </div>
  );
}

export default App;