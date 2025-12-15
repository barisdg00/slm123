interface PhotoBoxProps {
  src: string;
  alt: string;
  isSpecial?: boolean;
  isVisible: boolean;
}

export function PhotoBox({ src, alt, isSpecial, isVisible }: PhotoBoxProps) {
  return (
    <div 
      className={`photo-box ${isSpecial ? 'special' : ''} ${isVisible ? 'visible' : ''}`}
      data-testid={`photo-box-${alt.toLowerCase().replace(/\s/g, '-')}`}
    >
      <img 
        src={src} 
        alt={alt}
        loading="lazy"
        className="photo-image"
      />

      <style>{`
        .photo-box {
          width: 320px;
          height: 420px;
          border-radius: 0 0 18px 18px;
          overflow: hidden;
          background: linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02));
          box-shadow: 0 10px 30px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.02);
          display: flex;
          justify-content: center;
          align-items: center;
          opacity: 0;
          transform: translateY(20px) scale(0.95);
          transition: opacity 0.9s ease, transform 0.9s ease;
          will-change: opacity, transform;
        }

        .photo-box.visible {
          opacity: 1;
          transform: translateY(0) scale(1);
        }

        .photo-box.special {
          box-shadow: 0 20px 60px rgba(255,40,90,0.15), 0 6px 20px rgba(0,0,0,0.7);
          border: 1px solid rgba(255, 80, 120, 0.15);
        }

        .photo-box.special.visible {
          animation: specialGlow 2s ease-in-out infinite alternate;
        }

        @keyframes specialGlow {
          0% { box-shadow: 0 20px 60px rgba(255,40,90,0.15), 0 6px 20px rgba(0,0,0,0.7); }
          100% { box-shadow: 0 26px 90px rgba(255,60,120,0.35), 0 8px 30px rgba(0,0,0,0.8); }
        }

        .photo-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          animation: slowZoom 18s ease-in-out infinite alternate;
          will-change: transform;
        }

        @keyframes slowZoom {
          from { transform: scale(1); }
          to { transform: scale(1.08); }
        }

        @media (max-width: 700px) {
          .photo-box {
            width: 260px;
            height: 340px;
          }
        }
      `}</style>
    </div>
  );
}
