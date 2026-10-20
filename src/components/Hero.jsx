import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Layers,
  Bot,
  BarChart3,
  Puzzle,
  Sparkles,
  Play,
} from 'lucide-react';
import { HackerBackground } from './HackerBackground';

const features = [
  {
    title: 'AI Models',
    description: 'Access state-of-the-art AI models in one place.',
    Icon: Layers,
  },
  {
    title: 'Automation',
    description: 'Automate workflows and save hours daily.',
    Icon: Bot,
  },
  {
    title: 'Analytics',
    description: 'Gain actionable insights from intelligent data.',
    Icon: BarChart3,
  },
  {
    title: 'Integrations',
    description: 'Seamlessly connect with your favorite tools.',
    Icon: Puzzle,
  },
];

const metrics = [
  { value: '99.9%', label: 'Uptime' },
  { value: '10K+', label: 'Active Users' },
  { value: '50+', label: 'Integrations' },
  { value: '24/7', label: 'Support' },
];

const ease = [0.16, 1, 0.3, 1];

// Time (ms) each card stays before the mobile slider moves to the next one
const AUTO_SLIDE_MS = 3000;

function getDesktopConfigs(features) {
  const cardBase =
    'absolute z-20 hidden w-[190px] lg:block xl:w-[200px]';

  return [
    {
      feature: features[0],
      initial: { opacity: 0, x: -100, y: -45, scale: 0.85 },
      delay: 0.25,
      float: {
        y: [0, -9, 0],
        x: [0, 4, 0],
        transition: {
          duration: 5.6,
          repeat: Infinity,
          ease: 'easeInOut',
        },
      },
      position: `${cardBase} left-[0] -top-[60px]`,
    },
    {
      feature: features[1],
      initial: { opacity: 0, x: -90, y: 65, scale: 0.85 },
      delay: 0.4,
      float: {
        y: [0, 8, 0],
        x: [0, -3, 0],
        transition: {
          duration: 6.4,
          repeat: Infinity,
          ease: 'easeInOut',
        },
      },
      position: `${cardBase} left-[0] top-[170px]`,
    },
    {
      feature: features[2],
      initial: { opacity: 0, x: 100, y: -45, scale: 0.85 },
      delay: 0.3,
      float: {
        y: [0, -8, 0],
        x: [0, -4, 0],
        transition: {
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        },
      },
      position: `${cardBase} right-[0] -top-[55px]`,
    },
    {
      feature: features[3],
      initial: { opacity: 0, x: 90, y: 65, scale: 0.85 },
      delay: 0.45,
      float: {
        y: [0, 9, 0],
        x: [0, 3, 0],
        transition: {
          duration: 6.8,
          repeat: Infinity,
          ease: 'easeInOut',
        },
      },
      position: `${cardBase} right-[0] top-[150px]`,
    },
  ];
}

function FeatureCard({ feature, onClick }) {
  const Icon = feature.Icon;

  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{
        y: -5,
        scale: 1.025,
        borderColor: 'rgba(239,68,68,0.45)',
      }}
      whileTap={{ scale: 0.98 }}
      className="group relative w-full overflow-hidden rounded-2xl border border-white/10 bg-[#0d0b0c]/90 p-4 text-left shadow-[0_12px_40px_rgba(0,0,0,0.45)] backdrop-blur-xl transition-colors duration-300 hover:bg-[#140b0d]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-red-600/10 blur-2xl transition-colors duration-300 group-hover:bg-red-500/20"
      />

      <div className="relative z-10">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-red-500/20 bg-red-500/10 text-red-400 transition-colors duration-300 group-hover:bg-red-500/20">
            <Icon className="h-5 w-5" />
          </div>

          <ArrowRight className="h-4 w-4 text-neutral-600 transition-all duration-300 group-hover:translate-x-1 group-hover:text-red-400" />
        </div>

        <h3 className="text-sm font-semibold tracking-tight text-white">
          {feature.title}
        </h3>

        <p className="mt-2 text-xs leading-5 text-neutral-400">
          {feature.description}
        </p>

        {/* <div className="mt-4 flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-[0.12em] text-neutral-500 transition-colors group-hover:text-red-400">
          <Sparkles className="h-3 w-3" />
          Explore feature
        </div> */}
      </div>
    </motion.button>
  );
}

function CtaButtons({ onStartFree, onExploreFeatures, className = '' }) {
  return (
    <div className={className}>
      <motion.button
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        type="button"
        onClick={onStartFree}
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-b from-red-500 to-red-600 px-6 py-3 text-sm font-semibold text-white shadow-[0_8px_30px_rgba(239,68,68,0.4)] transition hover:from-red-400 hover:to-red-500 focus:outline-none focus:ring-2 focus:ring-red-400/50 sm:w-auto"
      >
        Start for free
        <ArrowRight className="h-4 w-4" />
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.96 }}
        type="button"
        onClick={onExploreFeatures}
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium text-neutral-100 backdrop-blur-sm transition hover:border-red-500/40 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/20 sm:w-auto"
      >
        <Play className="h-3.5 w-3.5 fill-current" />
        View demo
      </motion.button>
    </div>
  );
}

export default function Hero({ onStartFree, onExploreFeatures }) {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [activeCard, setActiveCard] = useState(0);
  const sliderRef = useRef(null);
  const indexRef = useRef(0);
  const pausedRef = useRef(false);

  const handleSliderScroll = () => {
    const el = sliderRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    if (max <= 0) return;
    const index = Math.round((el.scrollLeft / max) * (features.length - 1));
    indexRef.current = index;
    setActiveCard(index);
  };

  // Auto-advance the mobile cards slider, one card after another
  useEffect(() => {
    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (reduceMotion) return undefined;

    const timer = setInterval(() => {
      const el = sliderRef.current;
      // Slider is hidden on desktop (display: none) or paused by the user
      if (!el || el.offsetParent === null || pausedRef.current) return;

      const next = (indexRef.current + 1) % features.length;
      const child = el.children[next];
      if (!child) return;

      const paddingLeft = parseFloat(getComputedStyle(el).paddingLeft) || 0;
      const left =
        el.scrollLeft +
        (child.getBoundingClientRect().left - el.getBoundingClientRect().left) -
        paddingLeft;

      indexRef.current = next;
      el.scrollTo({ left, behavior: 'smooth' });
    }, AUTO_SLIDE_MS);

    return () => clearInterval(timer);
  }, []);

  const desktopConfigs = getDesktopConfigs(features);

  return (
    <section
      id="home"
      className="relative isolate overflow-hidden bg-transparent px-4 pb-3 pt-20 text-white sm:px-6 sm:pb-4 sm:pt-24 lg:pb-[90px]"
    >
      {/* Background effects with Hacker Matrix Rain */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <HackerBackground
          color="#ef4444"
          highlightColor="#ffffff"
          fontSize={13}
          speed={0.85}
          fadeAlpha={0.06}
          className="opacity-55"
        />

        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.025)_1px,transparent_1px)] [background-size:28px_28px]" />

        {/* Ambient red cyber glows on sides */}
        <div className="absolute inset-y-0 left-0 w-[35%] bg-[radial-gradient(ellipse_at_left,rgba(200,25,35,0.25),transparent_70%)]" />
        <div className="absolute inset-y-0 right-0 w-[35%] bg-[radial-gradient(ellipse_at_right,rgba(200,25,35,0.25),transparent_70%)]" />

        {/* Center radial vignette keeping typography & planet focal and high-contrast */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(5,5,8,0.75)_85%)]" />

        {/* Smooth top and bottom gradients */}
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#050505] via-[#050505]/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/70" />
      </div>

      <div className="relative mx-auto max-w-[1280px]">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease }}
          className="relative z-20 mx-auto max-w-3xl  text-center"
        >
          

          <h1 className="text-3xl font-semibold leading-[1.1] tracking-[-0.045em] sm:text-4xl lg:text-5xl">
            Build the Future
            <span className="mt-1 block">
              with{' '}
              <span className="text-red-500">
                Artificial Intelligence
              </span>
            </span>
          </h1>

          

          {/* Mobile / tablet buttons (desktop buttons sit under the planet) */}
          <CtaButtons
            onStartFree={onStartFree}
            onExploreFeatures={onExploreFeatures}
            className="mx-auto mt-5 flex w-full max-w-sm flex-col gap-3 sm:max-w-none sm:flex-row sm:justify-center lg:hidden"
          />
        </motion.div>

        {/* Globe + Feature Cards */}
        <div className="relative mt-2 min-h-[200px] sm:min-h-[300px] lg:mt-3 lg:min-h-[500px]">
          {/* Ambient glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2 lg:top-[70%]"
          >
            <motion.div
              animate={{
                scale: [1, 1.12, 1],
                opacity: [0.35, 0.55, 0.35],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="h-[300px] w-[300px] rounded-full bg-red-600/25 blur-[85px] sm:h-[380px] sm:w-[380px] lg:h-[560px] lg:w-[560px]"
            />
          </div>

          {/* Planet video */}
          <div className="pointer-events-none absolute left-1/2 top-[calc(50%-10px)] z-0 w-[125%] -translate-x-[49.3%] -translate-y-1/2 sm:w-[85%] lg:top-[80%] lg:w-[1000px] lg:-translate-y-[70%]">
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{
                opacity: videoLoaded ? 1 : 0.85,
                scale: 1,
              }}
              transition={{ duration: 1.1, ease }}
            >
              <video
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                onLoadedData={() => {
                  setVideoLoaded(true);
                  setVideoError(false);
                }}
                onCanPlay={() => {
                  setVideoLoaded(true);
                  setVideoError(false);
                }}
                onError={() => {
                  setVideoError(true);
                }}
                aria-label="Animated red planet"
                className="block h-auto w-full select-none mix-blend-screen"
              >
                <source
                  src="/planet-transparent.webm"
                  type="video/webm"
                />
                <source
                  src="/hero-bg.mp4"
                  type="video/mp4"
                />
              </video>
            </motion.div>

            {videoError && (
              <p className="absolute bottom-2 left-1/2 -translate-x-1/2 rounded-lg bg-black/80 px-3 py-2 text-xs text-red-300">
                Unable to load video. Check the file path.
              </p>
            )}
          </div>

          {/* Desktop cards */}
          {desktopConfigs.map((c) => (
            <motion.div
              key={c.feature.title}
              initial={c.initial}
              animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
              transition={{
                duration: 0.95,
                delay: c.delay,
                ease,
              }}
              className={c.position}
            >
              <motion.div animate={c.float}>
                <FeatureCard
                  feature={c.feature}
                  onClick={onExploreFeatures}
                />
              </motion.div>
            </motion.div>
          ))}

          {/* Desktop buttons under the planet, above the metrics bar */}
          <CtaButtons
            onStartFree={onStartFree}
            onExploreFeatures={onExploreFeatures}
            className="absolute inset-x-0 bottom-[112px] z-30 hidden items-center justify-center gap-3 lg:flex"
          />
        </div>

        {/* Mobile / tablet cards: horizontal swipe slider */}
        <div className="relative z-20 -mt-5 sm:-mt-4 lg:hidden">
          <div
            ref={sliderRef}
            onScroll={handleSliderScroll}
            onTouchStart={() => {
              pausedRef.current = true;
            }}
            onTouchEnd={() => {
              pausedRef.current = false;
            }}
            onMouseEnter={() => {
              pausedRef.current = true;
            }}
            onMouseLeave={() => {
              pausedRef.current = false;
            }}
            className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 pt-2 [scrollbar-width:none] sm:-mx-6 sm:px-6 [&::-webkit-scrollbar]:hidden"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 35, scale: 0.92 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  duration: 0.7,
                  delay: 0.2 + index * 0.1,
                  ease,
                }}
                className="w-[72%] shrink-0 snap-start sm:w-[45%]"
              >
                <FeatureCard
                  feature={feature}
                  onClick={onExploreFeatures}
                />
              </motion.div>
            ))}
          </div>

          <div className="mt-3 flex justify-center gap-1.5" aria-hidden="true">
            {features.map((feature, index) => (
              <span
                key={feature.title}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === activeCard
                    ? 'w-5 bg-red-500'
                    : 'w-1.5 bg-white/20'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Metrics bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.5, ease }}
          className="relative z-30 mx-auto mt-3 max-w-2xl rounded-2xl border border-white/10 bg-[#100c0d]/40 px-4 py-4 backdrop-blur-xl sm:px-6 lg:-mt-[100px]"        >
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {[
                  'photo-1534528741775-53994a69daeb',
                  'photo-1507003211169-0a1dd7228f2d',
                  'photo-1517841905240-472988babdf9',
                  'photo-1500648767791-00dcc994a43e',
                ].map((photo) => (
                  <img
                    key={photo}
                    src={`https://images.unsplash.com/${photo}?w=64&h=64&fit=crop&crop=faces&auto=format&q=80`}
                    alt=""
                    loading="lazy"
                    className="h-7 w-7 rounded-full border-2 border-[#100c0d] object-cover"
                  />
                ))}
              </div>

              <p className="max-w-[125px] text-[10px] leading-relaxed text-neutral-400">
                Trusted by{' '}
                <span className="font-semibold text-white">
                  10,000+ teams
                </span>{' '}
                worldwide
              </p>
            </div>

            <div className="grid w-full grid-cols-2 gap-y-4 sm:w-auto sm:grid-cols-4 sm:gap-y-0">
              {metrics.map(({ value, label }) => (
                <div
                  key={label}
                  className="px-2 text-center sm:px-4"
                >
                  <p className="text-sm font-semibold text-red-500 sm:text-base">
                    {value}
                  </p>
                  <p className="mt-1 text-[9px] text-neutral-400 sm:text-[10px]">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom gradient */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-28 bg-gradient-to-t from-[#070405] to-transparent"
      />
    </section>
  );
}
