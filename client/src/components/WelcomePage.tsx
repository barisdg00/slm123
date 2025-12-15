interface WelcomePageProps {
  isActive: boolean;
}

export function WelcomePage({ isActive }: WelcomePageProps) {
  return (
    <section 
      className={`page welcome-page ${isActive ? 'active' : 'left'}`}
      data-testid="page-welcome"
    >
      <div className="welcome-content">
        <h1 className="welcome-text" data-testid="text-welcome">
          Merhaba
        </h1>
        <p className="welcome-subtitle">
          Seni çok özel bir yolculuğa çıkarmak istiyoruz...
        </p>
      </div>

      <style>{`
        .welcome-page {
          background: linear-gradient(180deg, #3a0a1f 0%, #12060c 100%);
        }

        .welcome-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
          text-align: center;
          padding: 32px;
        }

        .welcome-text {
          font-family: 'Poppins', sans-serif;
          font-size: clamp(48px, 12vw, 72px);
          font-weight: 700;
          color: #ffdcdc;
          margin: 0;
          letter-spacing: 2px;
          text-shadow: 0 4px 30px rgba(255, 77, 109, 0.3);
          animation: welcomeFade 1.2s ease forwards;
          will-change: opacity, transform;
        }

        @keyframes welcomeFade {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .welcome-subtitle {
          font-family: 'Poppins', sans-serif;
          font-size: clamp(16px, 4vw, 20px);
          color: rgba(255, 220, 220, 0.7);
          margin: 0;
          animation: welcomeFade 1.2s ease 0.3s forwards;
          opacity: 0;
        }
      `}</style>
    </section>
  );
}
