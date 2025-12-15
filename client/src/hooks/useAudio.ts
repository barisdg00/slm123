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
  const audioContextRef = useRef<AudioContext | null>(null);
  const fadeIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const unlock = useCallback(() => {
    if (isUnlocked) return;
    
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContextClass && !audioContextRef.current) {
        audioContextRef.current = new AudioContextClass();
        if (audioContextRef.current.state === 'suspended') {
          audioContextRef.current.resume();
        }
      }
    } catch (e) {
      console.log("AudioContext not supported");
    }

    const audio = new Audio();
    audio.volume = 0.01;
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
    } else {
      setIsUnlocked(true);
    }
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
      try {
        audio.volume = Math.min(volumeStep * currentStep, targetVolume);
      } catch (e) {}
      
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
      if (startVolume === 0) {
        audio.pause();
        audio.currentTime = 0;
        resolve();
        return;
      }

      const steps = 20;
      const stepTime = duration / steps;
      const volumeStep = startVolume / steps;
      let currentStep = 0;

      fadeIntervalRef.current = setInterval(() => {
        currentStep++;
        try {
          audio.volume = Math.max(startVolume - (volumeStep * currentStep), 0);
        } catch (e) {}
        
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

    const audio = new Audio();
    audio.volume = 0;
    audio.preload = "auto";
    audioRef.current = audio;

    audio.src = src;

    try {
      await audio.play();
      fadeIn(audio, volume, fadeInDuration);
      setIsPlaying(true);
    } catch (error) {
      console.log("Audio play failed, trying with user interaction:", error);
      audio.addEventListener('canplaythrough', async () => {
        try {
          await audio.play();
          fadeIn(audio, volume, fadeInDuration);
          setIsPlaying(true);
        } catch (e) {
          console.log("Audio still failed:", e);
        }
      }, { once: true });
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
    try {
      if ('vibrate' in navigator) {
        navigator.vibrate(pattern);
      }
    } catch (e) {
      console.log("Vibration not supported");
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
