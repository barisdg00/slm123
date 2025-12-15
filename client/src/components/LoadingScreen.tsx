import { useEffect, useState } from "react";

interface LoadingScreenProps {
  onLoadComplete: () => void;
  imagesToPreload: string[];
}

export function LoadingScreen({ onLoadComplete, imagesToPreload }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [loadedCount, setLoadedCount] = useState(0);

  useEffect(() => {
    let loaded = 0;
    const total = imagesToPreload.length;

    if (total === 0) {
      setProgress(100);
      setTimeout(onLoadComplete, 800);
      return;
    }

    const preloadImage = (src: string) => {
      return new Promise<void>((resolve) => {
        const img = new Image();
        img.onload = () => {
          loaded++;
          setLoadedCount(loaded);
          setProgress(Math.round((loaded / total) * 100));
          resolve();
        };
        img.onerror = () => {
          loaded++;
          setLoadedCount(loaded);
          setProgress(Math.round((loaded / total) * 100));
          resolve();
        };
        img.src = src;
      });
    };

    Promise.all(imagesToPreload.map(preloadImage)).then(() => {
      setTimeout(onLoadComplete, 800);
    });
  }, [imagesToPreload, onLoadComplete]);

  return (
    <div 
      className="loading-screen"
      data-testid="loading-screen"
    >
      <div className="loading-content">
        <div className="heart-container">
          <svg 
            className="heart-icon" 
            viewBox="0 0 24 24" 
            fill="currentColor"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </div>
        <h2 className="loading-title" data-testid="text-loading-title">
          Sürprizin Hazırlanıyor...
        </h2>
        <div className="progress-container">
          <div 
            className="progress-bar"
            style={{ width: `${progress}%` }}
            data-testid="progress-bar"
          />
        </div>
        <p className="progress-text" data-testid="text-progress">
          {progress}%
        </p>
      </div>

      <style>{`
        .loading-screen {
          position: fixed;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(180deg, #3a0a1f 0%, #12060c 100%);
          z-index: 9999;
          will-change: opacity;
        }

        .loading-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 24px;
          padding: 32px;
        }

        .heart-container {
          width: 80px;
          height: 80px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .heart-icon {
          width: 60px;
          height: 60px;
          color: #ff4d6d;
          filter: drop-shadow(0 0 20px rgba(255, 77, 109, 0.6));
          animation: heartPulse 1.5s ease-in-out infinite;
          will-change: transform;
        }

        @keyframes heartPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.15); }
        }

        .loading-title {
          font-family: 'Poppins', sans-serif;
          font-size: 22px;
          font-weight: 600;
          color: #ffdcdc;
          text-align: center;
          letter-spacing: 0.5px;
          margin: 0;
        }

        .progress-container {
          width: 200px;
          height: 6px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 3px;
          overflow: hidden;
        }

        .progress-bar {
          height: 100%;
          background: linear-gradient(90deg, #ff4d6d, #ff8fb1);
          border-radius: 3px;
          transition: width 0.3s ease;
          will-change: width;
        }

        .progress-text {
          font-family: 'Poppins', sans-serif;
          font-size: 14px;
          color: rgba(255, 220, 220, 0.7);
          margin: 0;
        }
      `}</style>
    </div>
  );
}
