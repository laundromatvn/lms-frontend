import { useState, useEffect, useCallback } from 'react';

interface UseCountdownOptions {
  initialTime: number; // in seconds
  onComplete?: () => void;
  interval?: number; // in milliseconds, default 1000
}

interface UseCountdownReturn {
  timeLeft: number;
  isActive: boolean;
  start: () => void;
  pause: () => void;
  reset: () => void;
  formatTime: (seconds: number) => string;
}

export const useCountdown = ({
  initialTime,
  onComplete,
  interval = 1000,
}: UseCountdownOptions): UseCountdownReturn => {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isActive, setIsActive] = useState(false);

  const start = useCallback(() => {
    setIsActive(true);
  }, []);

  const pause = useCallback(() => {
    setIsActive(false);
  }, []);

  const reset = useCallback(() => {
    setIsActive(false);
    setTimeLeft(initialTime);
  }, [initialTime]);

  const formatTime = useCallback((seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    if (minutes > 0) {
      return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
    return `${remainingSeconds}`;
  }, []);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isActive && timeLeft > 0) {
      intervalId = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            setIsActive(false);
            onComplete?.();
            return 0;
          }
          return prevTime - 1;
        });
      }, interval);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isActive, timeLeft, interval, onComplete]);

  return {
    timeLeft,
    isActive,
    start,
    pause,
    reset,
    formatTime,
  };
};
