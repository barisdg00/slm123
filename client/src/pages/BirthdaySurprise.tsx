import { useState, useCallback, useEffect } from "react";
import { defaultPersons } from "@shared/schema";
import { LoadingScreen } from "@/components/LoadingScreen";
import { WelcomePage } from "@/components/WelcomePage";
import { PersonPage } from "@/components/PersonPage";
import { FinalPage } from "@/components/FinalPage";
import { NavigationButton } from "@/components/NavigationButton";
import { Particles, HeartRain } from "@/components/Particles";
import { StarBurst } from "@/components/StarBurst";
import { useAudio } from "@/hooks/useAudio";
import { useFullscreen } from "@/hooks/useFullscreen";

const bgGradients: Record<number, string> = {
  1: "linear-gradient(180deg, #3a0a1f 0%, #12060c 100%)",
  2: "linear-gradient(180deg, #4b0f2b 0%, #14070f 100%)",
  3: "linear-gradient(180deg, #2e0d3a 0%, #0e0614 100%)",
  4: "linear-gradient(180deg, #4a1010 0%, #120606 100%)",
  5: "linear-gradient(180deg, #3d0d1a 0%, #100608 100%)",
  6: "linear-gradient(180deg, #2a0a0a 0%, #080303 100%)",
  7: "linear-gradient(180deg, #5a0f2f 0%, #1a050d 100%)",
  8: "linear-gradient(180deg, #000000 0%, #120000 100%)",
};

export default function BirthdaySurprise() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [showHeartRain, setShowHeartRain] = useState(false);
  const [showStarBurst, setShowStarBurst] = useState(false);
  
  const totalPages = defaultPersons.length + 2;
  const { play, stop, unlock, vibrate } = useAudio({ volume: 0.5 });
  const { enterFullscreen } = useFullscreen();

  const imagesToPreload = defaultPersons.map(p => p.photo);

  const handleLoadComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  const handleNextPage = useCallback(async () => {
    if (currentPage >= totalPages) return;

    if (currentPage === 1) {
      unlock();
      enterFullscreen();
    }

    // önce mevcut sesi durdur ve bitmesini bekle
    await stop();
    vibrate(30);

    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);

    if (nextPage >= 2 && nextPage <= totalPages - 1) {
      const personIndex = nextPage - 2;
      const person = defaultPersons[personIndex];
      if (person?.audioSrc) {
        await play(person.audioSrc);
      }
    }

    if (nextPage === 7) {
      setShowStarBurst(true);
      setTimeout(() => setShowStarBurst(false), 2000);
    }

    if (nextPage === totalPages) {
      // Son sayfa aktif olduğunda özel bir merkez şarkısı çal
      if ("/audio/center.mp3") {
        await play("/audio/center.mp3");
      }

      setTimeout(() => setShowHeartRain(true), 900);
      setTimeout(() => setShowHeartRain(false), 3000);
    }
  }, [currentPage, totalPages, play, stop, unlock, vibrate, enterFullscreen]);

  const handlePrevPage = useCallback(async () => {
    if (currentPage <= 1) return;
    
    // önce mevcut sesi durdur ve bitmesini bekle
    await stop();
    vibrate(20);
    
    const prevPage = currentPage - 1;
    setCurrentPage(prevPage);

    if (prevPage >= 2 && prevPage <= totalPages - 1) {
      const personIndex = prevPage - 2;
      const person = defaultPersons[personIndex];
      if (person?.audioSrc) {
        await play(person.audioSrc);
      }
    }
  }, [currentPage, totalPages, play, stop, vibrate]);

  useEffect(() => {
    let lastShake = 0;
    
    const handleDeviceMotion = (e: DeviceMotionEvent) => {
      const a = e.accelerationIncludingGravity;
      if (!a) return;
      
      const power = Math.abs(a.x || 0) + Math.abs(a.y || 0) + Math.abs(a.z || 0);
      if (power > 28 && Date.now() - lastShake > 1200) {
        setShowHeartRain(true);
        setTimeout(() => setShowHeartRain(false), 2000);
        lastShake = Date.now();
        vibrate([50, 50, 50]);
      }
    };

    window.addEventListener("devicemotion", handleDeviceMotion);
    return () => window.removeEventListener("devicemotion", handleDeviceMotion);
  }, [vibrate]);

  if (isLoading) {
    return <LoadingScreen imagesToPreload={imagesToPreload} onLoadComplete={handleLoadComplete} />;
  }

  return (
    <div className="birthday-app" data-testid="birthday-app">
      <Particles isReduced={true} />
      
      <WelcomePage isActive={currentPage === 1} />
      
      {defaultPersons.map((person, index) => (
        <PersonPage
          key={person.id}
          person={person}
          pageNumber={index + 2}
          isActive={currentPage === index + 2}
          bgGradient={bgGradients[index + 2] || bgGradients[2]}
        />
      ))}
      
      <FinalPage
        persons={defaultPersons}
        centerPhoto="/photos/center.jpg"
        isActive={currentPage === totalPages}
      />

      <NavigationButton
        onClick={handleNextPage}
        onBack={handlePrevPage}
        isLastPage={currentPage === totalPages}
        isFirstPage={currentPage === 1}
        showBackButton={currentPage > 1}
      />

      {showHeartRain && <HeartRain count={14} />}
      <StarBurst trigger={showStarBurst} />

      <style>{`
        .birthday-app {
          position: fixed;
          inset: 0;
          overflow: hidden;
          font-family: 'Poppins', sans-serif;
          background: #0b0003;
          color: #fff;
          touch-action: manipulation;
          -webkit-tap-highlight-color: transparent;
          user-select: none;
          -webkit-user-select: none;
        }

        .page {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 30px;
          padding-bottom: 100px;
          opacity: 0;
          transform: translateX(100%);
          transition: all 0.8s cubic-bezier(0.2, 0.9, 0.3, 1);
          will-change: transform, opacity;
          z-index: 2;
        }

        .page.active {
          transform: translateX(0);
          opacity: 1;
        }

        .page.left {
          transform: translateX(-100%);
          opacity: 0;
        }

        @media (max-width: 700px) {
          .page {
            padding: 20px;
            padding-bottom: 90px;
          }
        }
      `}</style>
    </div>
  );
}
