import React, { useEffect, useRef } from 'react';

/**
 * HackerBackground (Enhanced & Bug-fixed version of EldoraUI Hacker Background)
 *
 * Fixes included:
 * 1. High-DPI / Retina display crisp rendering (no blurry characters).
 * 2. Proper container bounds & ResizeObserver (doesn't assume window.innerWidth).
 * 3. Dynamic columns recalculation on resize (prevents blank canvas gaps).
 * 4. Battery / GPU saver: auto-pauses when tab is hidden or element is off-screen.
 * 5. Customizable head character highlight (classic Matrix/cyber rain effect).
 * 6. React 19 / JSX compatibility with zero TypeScript lint errors.
 */
export const HackerBackground = ({
  color = '#ef4444',
  highlightColor = '#f00a02ff',
  fontSize = 14,
  speed = 1,
  className = '',
  fadeAlpha = 5,
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
      const oldDrops = drops;
      drops = new Array(columns);
      for (let i = 0; i < columns; i++) {
        // Keep existing drop positions when resizing, or initialize random offsets
        drops[i] = oldDrops[i] !== undefined ? oldDrops[i] : Math.floor(Math.random() * -30);
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
        const y = drops[i] * fontSize;

        // Draw glowing bright lead character
        if (highlightColor) {
          ctx.fillStyle = highlightColor;
          ctx.shadowColor = color;
          ctx.shadowBlur = 6;
          ctx.fillText(char, x, y);
          ctx.shadowBlur = 0;
        }

        // Draw the colored trailing character right behind the head
        ctx.fillStyle = color;
        const prevChar = charList[Math.floor(Math.random() * charList.length)];
        ctx.fillText(prevChar, x, (drops[i] - 1) * fontSize);

        // Reset drop to top with randomized delay once it falls past bottom
        if (y > height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        drops[i] += speed;
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

