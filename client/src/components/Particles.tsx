import { useEffect, useRef, useState } from "react";

interface ParticlesProps {
  isReduced?: boolean;
}

export function Particles({ isReduced = false }: ParticlesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const heartIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const starIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReduced(mediaQuery.matches);
    
    const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const shouldReduce = isReduced || prefersReduced;
    const heartDelay = shouldReduce ? 1400 : 850;
    const starDelay = shouldReduce ? 400 : 250;

    const createHeart = () => {
      const heart = document.createElement("div");
      heart.className = "particle-heart";
      heart.innerHTML = `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>`;
      
      const size = 14 + Math.random() * 30;
      const left = Math.random() * 100;
      const duration = 8 + Math.random() * 6;
      const hue = 340 + Math.random() * 30;
      
      heart.style.cssText = `
        left: ${left}vw;
        width: ${size}px;
        height: ${size}px;
        color: hsl(${hue}, 80%, 65%);
        animation-duration: ${duration}s;
        filter: drop-shadow(0 0 ${size/3}px hsl(${hue}, 80%, 50%));
      `;
      
      container.appendChild(heart);
      setTimeout(() => heart.remove(), duration * 1000 + 300);
    };

    const createStar = () => {
      const star = document.createElement("div");
      star.className = "particle-star";
      
      const size = 2 + Math.random() * 2;
      const left = Math.random() * 100;
      const duration = 6 + Math.random() * 6;
      
      star.style.cssText = `
        left: ${left}vw;
        width: ${size}px;
        height: ${size}px;
        animation-duration: ${duration}s;
        opacity: ${0.4 + Math.random() * 0.4};
      `;
      
      container.appendChild(star);
      setTimeout(() => star.remove(), duration * 1000);
    };

    heartIntervalRef.current = setInterval(createHeart, heartDelay);
    starIntervalRef.current = setInterval(createStar, starDelay);

    return () => {
      if (heartIntervalRef.current) clearInterval(heartIntervalRef.current);
      if (starIntervalRef.current) clearInterval(starIntervalRef.current);
    };
  }, [isReduced]);

  return (
    <div ref={containerRef} className="particles-container" data-testid="particles-container">
      <style>{`
        .particles-container {
          position: fixed;
          inset: 0;
          pointer-events: none;
          overflow: hidden;
          z-index: 1;
        }

        .particle-heart {
          position: absolute;
          top: -50px;
          opacity: 0.15;
          mix-blend-mode: screen;
          animation: heartFall linear forwards;
          will-change: transform, opacity;
        }

        .particle-heart svg {
          width: 100%;
          height: 100%;
        }

        @keyframes heartFall {
          0% {
            transform: translateY(0) rotate(10deg);
            opacity: 0.15;
          }
          100% {
            transform: translateY(110vh) rotate(45deg);
            opacity: 0;
          }
        }

        .particle-star {
          position: absolute;
          top: -10px;
          background: white;
          border-radius: 50%;
          filter: drop-shadow(0 0 6px rgba(255,255,255,0.8));
          animation: starFall linear forwards;
          will-change: transform, opacity;
        }

        @keyframes starFall {
          0% {
            transform: translateY(0) scale(1);
          }
          100% {
            transform: translateY(110vh) scale(0.6);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}

export function HeartRain({ count = 12 }: { count?: number }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let i = 0;
    const interval = setInterval(() => {
      const heart = document.createElement("div");
      heart.className = "rain-heart";
      heart.innerHTML = `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>`;
      
      const size = 32 + Math.random() * 40;
      const left = Math.random() * 100;
      const duration = 2 + Math.random() * 1.6;
      const hue = 340 + Math.random() * 30;
      
      heart.style.cssText = `
        left: ${left}vw;
        width: ${size}px;
        height: ${size}px;
        color: hsl(${hue}, 85%, 60%);
        animation-duration: ${duration}s;
        filter: drop-shadow(0 0 20px hsl(${hue}, 85%, 50%));
      `;
      
      container.appendChild(heart);
      setTimeout(() => heart.remove(), duration * 1000 + 200);

      i++;
      if (i >= count) clearInterval(interval);
    }, 100);

    return () => clearInterval(interval);
  }, [count]);

  return (
    <div ref={containerRef} className="heart-rain-container">
      <style>{`
        .heart-rain-container {
          position: fixed;
          inset: 0;
          pointer-events: none;
          overflow: hidden;
          z-index: 100;
        }

        .rain-heart {
          position: absolute;
          top: -60px;
          animation: rainFall linear forwards;
          will-change: transform, opacity;
        }

        .rain-heart svg {
          width: 100%;
          height: 100%;
        }

        @keyframes rainFall {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(110vh) rotate(30deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
