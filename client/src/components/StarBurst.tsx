import { useEffect, useRef } from "react";

interface StarBurstProps {
  trigger: boolean;
}

export function StarBurst({ trigger }: StarBurstProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!trigger) return;
    
    const container = containerRef.current;
    if (!container) return;

    for (let i = 0; i < 20; i++) {
      const star = document.createElement("div");
      star.className = "burst-star";
      
      star.style.cssText = `
        left: ${Math.random() * 100}vw;
        top: ${Math.random() * 100}vh;
        animation-delay: ${Math.random() * 0.3}s;
      `;
      
      container.appendChild(star);
      setTimeout(() => star.remove(), 2000);
    }
  }, [trigger]);

  return (
    <div ref={containerRef} className="star-burst-container">
      <style>{`
        .star-burst-container {
          position: fixed;
          inset: 0;
          pointer-events: none;
          overflow: hidden;
          z-index: 99;
        }

        .burst-star {
          position: fixed;
          width: 6px;
          height: 6px;
          background: white;
          border-radius: 50%;
          box-shadow: 0 0 16px white, 0 0 32px rgba(255, 215, 0, 0.8);
          animation: starPop 1.5s ease-out forwards;
          will-change: transform, opacity;
        }

        @keyframes starPop {
          0% {
            transform: scale(0);
            opacity: 1;
          }
          50% {
            transform: scale(1.5);
            opacity: 1;
          }
          100% {
            transform: scale(2);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
