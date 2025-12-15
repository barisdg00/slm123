interface NavigationButtonProps {
  onClick: () => void;
  isLastPage?: boolean;
  isFirstPage?: boolean;
  showBackButton?: boolean;
  onBack?: () => void;
}

export function NavigationButton({ 
  onClick, 
  isLastPage, 
  isFirstPage,
  showBackButton,
  onBack 
}: NavigationButtonProps) {
  if (isLastPage) return null;

  return (
    <>
      {showBackButton && !isFirstPage && (
        <button
          className="back-btn"
          onClick={onBack}
          aria-label="Geri"
          data-testid="button-back"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
          </svg>
        </button>
      )}
      
      <button
        className="next-btn"
        onClick={onClick}
        data-testid="button-continue"
      >
        {isFirstPage ? 'Başla' : 'Devam Et'}
        <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
          <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>
        </svg>
      </button>

      <style>{`
        .next-btn {
          position: fixed;
          right: 28px;
          bottom: 28px;
          z-index: 9999;
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 14px 28px;
          border-radius: 40px;
          border: none;
          background: linear-gradient(135deg, #5a0014 0%, #8a0020 100%);
          color: white;
          font-family: 'Poppins', sans-serif;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          box-shadow: 0 6px 20px rgba(90,0,20,0.35);
          transform: skewX(-6deg);
          transition: transform 0.25s ease, box-shadow 0.25s ease;
          animation: breath 3s ease-in-out infinite;
          will-change: transform, box-shadow;
          -webkit-tap-highlight-color: transparent;
          touch-action: manipulation;
        }

        @keyframes breath {
          0%, 100% {
            box-shadow: 0 6px 20px rgba(90,0,20,0.25);
            transform: skewX(-6deg) scale(1);
          }
          50% {
            box-shadow: 0 12px 34px rgba(255,40,80,0.18);
            transform: skewX(-6deg) scale(1.02);
          }
        }

        .next-btn:hover {
          transform: skewX(-6deg) scale(1.05);
        }

        .next-btn:active {
          transform: skewX(-6deg) scale(0.98);
        }

        .next-btn svg {
          transform: skewX(6deg);
        }

        .back-btn {
          position: fixed;
          left: 20px;
          bottom: 32px;
          z-index: 9999;
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 50%;
          color: rgba(255, 255, 255, 0.6);
          cursor: pointer;
          transition: all 0.25s ease;
          -webkit-tap-highlight-color: transparent;
          touch-action: manipulation;
        }

        .back-btn:hover {
          background: rgba(255, 255, 255, 0.15);
          color: rgba(255, 255, 255, 0.9);
        }

        .back-btn:active {
          transform: scale(0.95);
        }

        @media (max-width: 700px) {
          .next-btn {
            right: 20px;
            bottom: 20px;
            padding: 12px 24px;
            font-size: 14px;
          }

          .back-btn {
            left: 16px;
            bottom: 24px;
            width: 40px;
            height: 40px;
          }
        }
      `}</style>
    </>
  );
}
