interface NameCardProps {
  name: string;
  isSpecial?: boolean;
  isVisible: boolean;
}

export function NameCard({ name, isSpecial, isVisible }: NameCardProps) {
  return (
    <div 
      className={`name-card ${isVisible ? 'visible' : ''} ${isSpecial ? 'special' : ''}`}
      data-testid={`name-card-${name.toLowerCase().replace(/\s/g, '-')}`}
    >
      <div className="name-card-content">
        <span className="name-card-icon">
          {isSpecial ? (
            <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          )}
        </span>
        <span className="name-text">{name}</span>
        <span className="name-card-icon">
          {isSpecial ? (
            <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          )}
        </span>
      </div>

      <style>{`
        .name-card {
          width: 100%;
          max-width: 320px;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(90, 0, 20, 0.6);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border-radius: 12px 12px 0 0;
          margin-bottom: -10px;
          z-index: 10;
          opacity: 0;
          transform: translateY(-20px);
          transition: opacity 0.6s ease, transform 0.6s ease;
          will-change: opacity, transform;
          border: 1px solid rgba(255, 143, 177, 0.15);
          border-bottom: none;
          box-shadow: 0 -4px 20px rgba(255, 77, 109, 0.1);
        }

        .name-card.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .name-card.special {
          background: rgba(90, 0, 40, 0.7);
          border-color: rgba(255, 77, 109, 0.3);
          box-shadow: 0 -4px 30px rgba(255, 77, 109, 0.2);
        }

        .name-card-content {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .name-card-icon {
          color: #ff8fb1;
          display: flex;
          align-items: center;
          animation: iconFloat 2s ease-in-out infinite;
          will-change: transform;
        }

        .name-card.special .name-card-icon {
          color: #ffd700;
          filter: drop-shadow(0 0 8px rgba(255, 215, 0, 0.5));
        }

        @keyframes iconFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }

        .name-text {
          font-family: 'Poppins', sans-serif;
          font-size: 20px;
          font-weight: 600;
          color: #ffdcdc;
          letter-spacing: 0.6px;
        }

        .name-card.special .name-text {
          background: linear-gradient(90deg, #ffdcdc, #ffd700);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        @media (max-width: 700px) {
          .name-card {
            max-width: 260px;
            height: 50px;
          }

          .name-text {
            font-size: 18px;
          }
        }
      `}</style>
    </div>
  );
}
