import { useRef, useCallback, useState } from "react";

interface UseAudioOptions {
  volume?: number;
  fadeInDuration?: number;
  fadeOutDuration?: number;
}

export function useAudio(options: UseAudioOptions = {}) {
  const { 
    volume = 0.5, 
    fadeInDuration = 500, 
    fadeOutDuration = 800 
  } = options;
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const unlock = useCallback(() => {
    if (isUnlocked) return;
    
    const audio = new Audio();
    audio.volume = 0;
    audio.src = "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA";
    
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          audio.pause();
          setIsUnlocked(true);
        })
        .catch(() => {
          setIsUnlocked(true);
        });
    }
    setIsUnlocked(true);
  }, [isUnlocked]);

  const fadeIn = useCallback((audio: HTMLAudioElement, targetVolume: number, duration: number) => {
    if (fadeIntervalRef.current) {
      clearInterval(fadeIntervalRef.current);
    }

    audio.volume = 0;
    const steps = 20;
    const stepTime = duration / steps;
    const volumeStep = targetVolume / steps;
    let currentStep = 0;

    fadeIntervalRef.current = setInterval(() => {
      currentStep++;
      audio.volume = Math.min(volumeStep * currentStep, targetVolume);
      
      if (currentStep >= steps) {
        if (fadeIntervalRef.current) {
          clearInterval(fadeIntervalRef.current);
          fadeIntervalRef.current = null;
        }
      }
    }, stepTime);
  }, []);

  const fadeOut = useCallback((audio: HTMLAudioElement, duration: number): Promise<void> => {
    return new Promise((resolve) => {
      if (fadeIntervalRef.current) {
        clearInterval(fadeIntervalRef.current);
      }

      const startVolume = audio.volume;
      const steps = 20;
      const stepTime = duration / steps;
      const volumeStep = startVolume / steps;
      let currentStep = 0;

      fadeIntervalRef.current = setInterval(() => {
        currentStep++;
        audio.volume = Math.max(startVolume - (volumeStep * currentStep), 0);
        
        if (currentStep >= steps) {
          if (fadeIntervalRef.current) {
            clearInterval(fadeIntervalRef.current);
            fadeIntervalRef.current = null;
          }
          audio.pause();
          audio.currentTime = 0;
          resolve();
        }
      }, stepTime);
    });
  }, []);

  const play = useCallback(async (src: string) => {
    if (audioRef.current) {
      await fadeOut(audioRef.current, fadeOutDuration);
    }

    const audio = new Audio(src);
    audio.volume = 0;
    audioRef.current = audio;

    try {
      await audio.play();
      fadeIn(audio, volume, fadeInDuration);
      setIsPlaying(true);
    } catch (error) {
      console.log("Audio play failed:", error);
    }
  }, [fadeIn, fadeOut, fadeInDuration, fadeOutDuration, volume]);

  const stop = useCallback(async () => {
    if (audioRef.current) {
      await fadeOut(audioRef.current, fadeOutDuration);
      audioRef.current = null;
      setIsPlaying(false);
    }
  }, [fadeOut, fadeOutDuration]);

  const vibrate = useCallback((pattern: number | number[] = 50) => {
    if (navigator.vibrate) {
      navigator.vibrate(pattern);
    }
  }, []);

  return {
    play,
    stop,
    unlock,
    vibrate,
    isUnlocked,
    isPlaying,
  };
}
