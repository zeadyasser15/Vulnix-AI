import React, { useEffect, useRef } from 'react';

export const HackerBackground = ({
  color = '#ef4444',
  highlightColor = '#ffffff',
  fontSize = 14,
  speed = 0.8,
  className = '',
  fadeAlpha = 0.06,
  fps = 30,
  characters = '0123456789ABCDEFabcdef!@#$%^&*()_+-=[]{}|;:,.<>?/~',
}) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let isVisible = true;
    let drops = [];
    let speeds = [];
    let lastTime = 0;
    const interval = 1000 / fps;

    // Measure and set canvas dimensions properly with DPR for sharp text
    const updateDimensions = () => {
      const parent = canvas.parentElement;
      const width = parent ? parent.clientWidth : window.innerWidth;
      const height = parent ? parent.clientHeight : window.innerHeight;
      const dpr = window.devicePixelRatio || 1;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);

      const columns = Math.max(1, Math.floor(width / fontSize));
      const totalRows = Math.max(1, Math.floor(height / fontSize));
      const oldDrops = drops;
      const oldSpeeds = speeds;
      drops = new Array(columns);
      speeds = new Array(columns);
      for (let i = 0; i < columns; i++) {
        // Distribute drops vertically across canvas so rain is active immediately
        drops[i] = oldDrops[i] !== undefined ? oldDrops[i] : Math.floor(Math.random() * totalRows);
        speeds[i] = oldSpeeds[i] !== undefined ? oldSpeeds[i] : speed * (0.65 + Math.random() * 0.7);
      }
    };

    updateDimensions();

    // Use ResizeObserver for accurate container resizing
    const resizeObserver = new ResizeObserver(() => {
      updateDimensions();
    });
    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }
    window.addEventListener('resize', updateDimensions);

    // Pause animation when element is off-screen to save CPU & battery
    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    intersectionObserver.observe(canvas);

    // Pause animation when browser tab is inactive
    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const charList = characters.split('');

    const draw = (currentTime) => {
      animationFrameId = requestAnimationFrame(draw);

      if (!isVisible) return;
      if (currentTime - lastTime < interval) return;
      lastTime = currentTime;

      const parent = canvas.parentElement;
      const width = parent ? parent.clientWidth : window.innerWidth;
      const height = parent ? parent.clientHeight : window.innerHeight;

      // Semi-transparent fade overlay creating trails
      ctx.fillStyle = `rgba(0, 0, 0, ${fadeAlpha})`;
      ctx.fillRect(0, 0, width, height);

      ctx.font = `${fontSize}px "JetBrains Mono", Consolas, Monaco, monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = charList[Math.floor(Math.random() * charList.length)];
        const x = i * fontSize;
        const currentDrop = Math.floor(drops[i]);
        const y = currentDrop * fontSize;

        // Draw glowing bright lead character
        if (highlightColor) {
          ctx.fillStyle = highlightColor;
          ctx.shadowColor = color;
          ctx.shadowBlur = 8;
          ctx.fillText(char, x, y);
          ctx.shadowBlur = 0;
        }

        // Draw the colored trailing character right behind the head
        ctx.fillStyle = color;
        const prevChar = charList[Math.floor(Math.random() * charList.length)];
        ctx.fillText(prevChar, x, (currentDrop - 1) * fontSize);

        // Reset drop to top with randomized delay once it falls past bottom
        if (y > height && Math.random() > 0.96) {
          drops[i] = 0;
          speeds[i] = speed * (0.65 + Math.random() * 0.7);
        }

        drops[i] += speeds[i];
      }
    };

    animationFrameId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', updateDimensions);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
    };
  }, [color, highlightColor, fontSize, speed, fadeAlpha, fps, characters]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 block select-none ${className}`}
      aria-hidden="true"
    />
  );
};

export function HackerBackgroundDemo() {
  return (
    <div className="relative z-10 h-[500px] w-full overflow-hidden rounded-lg border border-red-500/20 bg-black/90">
      <HackerBackground color="#ef4444" fontSize={14} speed={1} />
    </div>
  );
}

export default HackerBackground;

