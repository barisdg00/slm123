import type { Person } from "@shared/schema";

interface FinalPageProps {
  persons: Person[];
  centerPhoto?: string;
  isActive: boolean;
}

export function FinalPage({ persons, centerPhoto, isActive }: FinalPageProps) {
  const angles = [0, 60, 120, 180, 240, 300];

  return (
    <section 
      className={`page final-page ${isActive ? 'active' : 'left'}`}
      data-testid="page-final"
    >
      <div className="final-content">
        <div className="circle-stage">
          {centerPhoto && (
            <div className="center-photo">
              <img src={centerPhoto} alt="Merkez" />
            </div>
          )}
          {persons.slice(0, 6).map((person, index) => (
            <div 
              key={person.id}
              className={`orbit orbit-${index + 1}`}
              style={{
                transform: `rotate(${angles[index]}deg) translateX(180px) rotate(-${angles[index]}deg)`
              }}
            >
              <img src={person.photo} alt={person.name} />
            </div>
          ))}
        </div>
        
        <p className="final-note" data-testid="text-final-note">
          Hepsi bir arada — iyi ki doğdun!
        </p>
      </div>

      <style>{`
        .final-page {
          background: linear-gradient(180deg, #000000 0%, #120000 100%);
        }

        .final-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 24px;
        }

        .circle-stage {
          position: relative;
          width: 420px;
          height: 420px;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: slowRotate 20s linear infinite;
          will-change: transform;
        }

        @keyframes slowRotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .center-photo {
          position: absolute;
          width: 140px;
          height: 140px;
          border-radius: 50%;
          overflow: hidden;
          box-shadow: 0 10px 40px rgba(0,0,0,0.6), 0 0 60px rgba(255,80,120,0.15);
          border: 3px solid rgba(255, 143, 177, 0.3);
          z-index: 10;
        }

        .center-photo img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          animation: counterRotate 20s linear infinite;
          will-change: transform;
        }

        @keyframes counterRotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }

        .orbit {
          position: absolute;
          width: 100px;
          height: 130px;
          left: 50%;
          top: 50%;
          margin-left: -50px;
          margin-top: -65px;
        }

        .orbit img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 12px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.5);
          animation: counterRotate 20s linear infinite;
          transition: filter 0.3s ease;
        }

        .final-page.active .orbit img {
          filter: drop-shadow(0 8px 30px rgba(255,60,100,0.35));
        }

        .final-note {
          font-family: 'Poppins', sans-serif;
          font-size: 22px;
          font-weight: 600;
          color: #ffdbe0;
          text-align: center;
          margin: 0;
          text-shadow: 0 2px 20px rgba(255, 77, 109, 0.3);
          animation: fadeInUp 1s ease 0.5s forwards;
          opacity: 0;
        }

        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
          from {
            opacity: 0;
            transform: translateY(20px);
          }
        }

        @media (max-width: 700px) {
          .circle-stage {
            width: 320px;
            height: 320px;
          }

          .center-photo {
            width: 100px;
            height: 100px;
          }

          .orbit {
            width: 70px;
            height: 95px;
            margin-left: -35px;
            margin-top: -47px;
          }

          .orbit img {
            border-radius: 10px;
          }

          .final-note {
            font-size: 18px;
          }
        }

        @media (max-width: 400px) {
          .circle-stage {
            width: 280px;
            height: 280px;
          }

          .orbit {
            width: 60px;
            height: 80px;
            margin-left: -30px;
            margin-top: -40px;
            transform: rotate(var(--angle)) translateX(120px) rotate(calc(-1 * var(--angle)));
          }
        }
      `}</style>
    </section>
  );
}
