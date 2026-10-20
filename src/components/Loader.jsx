
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import vulnixLogo from '../assets/Logo.png';

export default function Loader({
  onComplete,
  duration = 2400,
  fullscreen = true,
}) {
  const [progress, setProgress] = useState(0);
  const hasFinishedRef = useRef(false);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    let animationFrame;
    let completionTimeout;
    const startTime = performance.now();

    const updateProgress = (currentTime) => {
      if (hasFinishedRef.current) return;

      const elapsed = currentTime - startTime;
      const nextProgress = Math.min(
        100,
        Math.floor((elapsed / duration) * 100)
      );

      setProgress(nextProgress);

      if (nextProgress < 100) {
        animationFrame = requestAnimationFrame(updateProgress);
      } else {
        hasFinishedRef.current = true;

        completionTimeout = setTimeout(() => {
          onCompleteRef.current?.();
        }, 300);
      }
    };

    animationFrame = requestAnimationFrame(updateProgress);

    return () => {
      cancelAnimationFrame(animationFrame);
      clearTimeout(completionTimeout);
    };
  }, [duration]);

  const containerClasses = fullscreen
    ? 'fixed inset-0 z-[9999] flex items-center justify-center bg-[#030305] text-white'
    : 'relative min-h-[400px] w-full flex items-center justify-center bg-[#030305] text-white rounded-2xl';

  return (
    <AnimatePresence>
      <motion.div
        key="vulnix-loader"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{
          opacity: 0,
          transition: { duration: 0.4 },
        }}
        className={containerClasses}
      >
        {/* Background Glow */}
        <div className="absolute w-64 h-64 sm:w-80 sm:h-80 rounded-full bg-red-600/10 blur-[100px] pointer-events-none" />

        {/* Logo and Loader */}
        <div className="relative z-10 flex flex-col items-center w-full max-w-xs px-6">

          {/* Logo */}
          <motion.img
            src={vulnixLogo}
            alt="Vulnix AI"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="w-28 h-28 sm:w-36 sm:h-36 object-contain mb-8 drop-shadow-[0_0_25px_rgba(239,68,68,0.3)]"
          />

          {/* Progress Bar */}
          <div className="w-full">
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-red-700 via-red-500 to-red-400"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Percentage */}
            <div className="mt-3 flex justify-center">
              <span className="font-mono text-xs tracking-[0.2em] text-red-400">
                {String(progress).padStart(3, '0')}%
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
