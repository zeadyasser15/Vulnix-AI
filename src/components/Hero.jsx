import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Layers,
  Bot,
  BarChart3,
  Puzzle,
  Sparkles,
} from 'lucide-react';

import heroVideo from '../assets/video_2026-10-09_22-49-12.mp4';

export default function Hero({ onStartFree, onExploreFeatures }) {
  const [videoLoaded, setVideoLoaded] = useState(false);

  const features = [
    {
      title: 'AI Models',
      description: 'Access state-of-the-art AI models in one place.',
      Icon: Layers,
      tag: 'Neural Core',
      flowDirection: 'to-right',
    },
    {
      title: 'Automation',
      description: 'Automate workflows and save hours daily.',
      Icon: Bot,
      tag: 'Auto Flow',
      flowDirection: 'to-right',
    },
    {
      title: 'Analytics',
      description: 'Gain actionable insights from intelligent data.',
      Icon: BarChart3,
      tag: 'Live Metric',
      flowDirection: 'to-left',
    },
    {
      title: 'Integrations',
      description: 'Seamlessly connect with your favorite tools.',
      Icon: Puzzle,
      tag: '50+ APIs',
      flowDirection: 'to-left',
    },
  ];

  const metrics = [
    { value: '99.9%', label: 'Uptime' },
    { value: '10K+', label: 'Active Users' },
    { value: '50+', label: 'Integrations' },
    { value: '24/7', label: 'Support' },
  ];

  // Desktop card animation configurations: entrance glide towards the center video + idle floating
  const desktopConfigs = [
    {
      feature: features[0],
      // Left Top -> flows in toward center video
      initial: { opacity: 0, x: -100, y: -45, scale: 0.85, rotate: -3 },
      animate: { opacity: 1, x: 0, y: 0, scale: 1, rotate: 0 },
      transition: { duration: 0.95, delay: 0.25, ease: [0.16, 1, 0.3, 1] },
      float: {
        y: [0, -9, 0],
        x: [0, 4, 0],
        rotate: [0, 0.8, 0],
        transition: { duration: 5.6, repeat: Infinity, ease: 'easeInOut' },
      },
      containerClass: 'absolute left-0 top-[10%] z-20 hidden w-[210px] lg:block xl:w-[225px]',
      anchorSide: 'right',
    },
    {
      feature: features[1],
      // Left Bottom -> flows in toward center video
      initial: { opacity: 0, x: -90, y: 65, scale: 0.85, rotate: 2 },
      animate: { opacity: 1, x: 0, y: 0, scale: 1, rotate: 0 },
      transition: { duration: 0.95, delay: 0.4, ease: [0.16, 1, 0.3, 1] },
      float: {
        y: [0, 8, 0],
        x: [0, -3, 0],
        rotate: [0, -0.7, 0],
        transition: { duration: 6.4, repeat: Infinity, ease: 'easeInOut' },
      },
      containerClass: 'absolute bottom-[10%] left-[4%] z-20 hidden w-[210px] lg:block xl:w-[225px]',
      anchorSide: 'right',
    },
    {
      feature: features[2],
      // Right Top -> flows in toward center video
      initial: { opacity: 0, x: 100, y: -45, scale: 0.85, rotate: 3 },
      animate: { opacity: 1, x: 0, y: 0, scale: 1, rotate: 0 },
      transition: { duration: 0.95, delay: 0.3, ease: [0.16, 1, 0.3, 1] },
      float: {
        y: [0, -8, 0],
        x: [0, -4, 0],
        rotate: [0, -0.9, 0],
        transition: { duration: 6.0, repeat: Infinity, ease: 'easeInOut' },
      },
      containerClass: 'absolute right-0 top-[10%] z-20 hidden w-[210px] lg:block xl:w-[225px]',
      anchorSide: 'left',
    },
    {
      feature: features[3],
      // Right Bottom -> flows in toward center video
      initial: { opacity: 0, x: 90, y: 65, scale: 0.85, rotate: -2 },
      animate: { opacity: 1, x: 0, y: 0, scale: 1, rotate: 0 },
      transition: { duration: 0.95, delay: 0.45, ease: [0.16, 1, 0.3, 1] },
      float: {
        y: [0, 9, 0],
        x: [0, 3, 0],
        rotate: [0, 0.6, 0],
        transition: { duration: 6.8, repeat: Infinity, ease: 'easeInOut' },
      },
      containerClass: 'absolute bottom-[10%] right-[4%] z-20 hidden w-[210px] lg:block xl:w-[225px]',
      anchorSide: 'left',
    },
  ];

  const FeatureCard = ({ feature, anchorSide }) => {
    const { title, description, Icon, tag } = feature;

    return (
      <motion.button
        type="button"
        onClick={onExploreFeatures}
        whileHover={{
          scale: 1.04,
          y: -5,
          borderColor: 'rgba(239, 68, 68, 0.45)',
          // boxShadow: '0 20px 35px -10px rgba(239, 68, 68, 0.28), 0 0 25px rgba(239, 68, 68, 0.12)',
        }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: 'spring', stiffness: 380, damping: 22 }}
        className="group relative w-full overflow-hidden rounded-2xl border border-white/10 bg-[#0d0b0c]/90 p-4 text-left shadow-[0_12px_40px_rgba(0,0,0,0.45)] backdrop-blur-xl transition-colors duration-300 hover:bg-[#140b0d]"
      >
        {/* Dynamic ambient highlight on hover */}
        <div className="pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-br from-red-500/10 via-transparent to-red-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        {/* Header row: Icon & Tag */}
        <div className="relative mb-3 flex items-center justify-between">
          <motion.div
            whileHover={{ rotate: 8, scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-red-500/25 bg-red-500/10 text-red-400 shadow-[0_0_12px_rgba(239,68,68,0.15)] transition-colors group-hover:border-red-500/40 group-hover:bg-red-500/20 group-hover:text-red-300"
          >
            <Icon className="h-4 w-4" />
          </motion.div>

          <span className="inline-flex items-center gap-1 rounded-full border border-white/5 bg-white/[0.04] px-2 py-0.5 text-[9px] font-medium tracking-wide text-neutral-400 backdrop-blur-sm group-hover:border-red-500/20 group-hover:text-red-300">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-red-500" />
            </span>
            {tag}
          </span>
        </div>

        {/* Title */}
        <h3 className="relative text-sm font-semibold tracking-tight text-white group-hover:text-white">
          {title}
        </h3>

        {/* Description */}
        <p className="relative mt-1.5 text-xs leading-relaxed text-neutral-400 transition-colors group-hover:text-neutral-300">
          {description}
        </p>

        {/* Bottom row: flow indicator & arrow */}
        <div className="relative mt-3.5 flex items-center justify-between border-t border-white/[0.06] pt-2.5">
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-medium text-neutral-500 transition-colors group-hover:text-red-400">
              Flow into Core
            </span>
          </div>

          <span className="flex h-6 w-6 items-center justify-center rounded-full border border-white/10 bg-black/60 text-neutral-400 transition-all duration-200 group-hover:border-red-500/40 group-hover:bg-red-500 group-hover:text-white group-hover:shadow-[0_0_12px_rgba(239,68,68,0.5)]">
            <ArrowRight className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5" />
          </span>
        </div>

        {/* Connection node indicator on the side facing the video */}
        {anchorSide && (
          <div
            className={`pointer-events-none absolute top-1/2 -translate-y-1/2 ${anchorSide === 'right' ? '-right-1' : '-left-1'
              }`}
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-500 shadow-[0_0_8px_#ef4444]" />
            </span>
          </div>
        )}
      </motion.button>
    );
  };

  return (
    <section
      id="home"
      className="relative isolate overflow-hidden bg-transparent px-4 pb-16 pt-28 text-white sm:px-6 sm:pb-20 sm:pt-32"
    >
      {/* Background Grid & Gradient */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.025)_1px,transparent_1px)] [background-size:28px_28px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />
      </div>

      <div className="relative mx-auto max-w-[1280px]">
        {/* Heading & Intro */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-20 mx-auto max-w-3xl text-center"
        >
      

          <h1 className="text-4xl font-semibold leading-[1.08] tracking-[-0.045em] sm:text-5xl lg:text-6xl">
            Build the Future
            <span className="mt-1 block">
              with{' '}
              <span className="text-red-500">
                Artificial Intelligence
              </span>
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-lg text-xs leading-5 text-neutral-400 sm:text-sm">
            VulnixAI helps you integrate powerful AI models and automation
            <span className="block">
              into your products and workflows.
            </span>
          </p>

          {/* Buttons */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              type="button"
              onClick={onStartFree}
              className="inline-flex items-center gap-2 rounded-full bg-red-600 px-5 py-2.5 text-xs font-semibold text-white shadow-[0_0_20px_rgba(239,68,68,0.35)] transition hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-400/50"
            >
              Get Started
              <ArrowRight className="h-3.5 w-3.5" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              type="button"
              onClick={onExploreFeatures}
              className="rounded-full border border-white/15 bg-black/50 px-5 py-2.5 text-xs font-medium text-neutral-200 backdrop-blur-sm transition hover:border-white/30 hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-white/20"
            >
              Explore Features
            </motion.button>
          </div>
        </motion.div>

        {/* Globe Video + Animated Floating Flow Cards */}
        <div className="relative mx-auto mt-5 min-h-[490px] max-w-[1120px] sm:min-h-[530px] lg:min-h-[500px]">

          {/* Central Ambient Glow behind Video */}
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
            className="pointer-events-none absolute left-1/2 top-[42%] -z-0 h-[380px] w-[380px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-600/20 blur-[85px]"
          />

          {/* Central Earth Video with Framer Motion Entrance */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{
              opacity: videoLoaded ? 1 : 0.85,
              scale: 1,
            }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-1/2 top-[42%] z-10 w-[110%] max-w-[850px] -translate-x-1/2 -translate-y-1/2 sm:w-full"
          >
            <video
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              onLoadedData={() => setVideoLoaded(true)}
              onCanPlay={() => setVideoLoaded(true)}
              aria-label="Animated Earth globe"
              className="block aspect-[16/9] w-full select-none object-contain"
            >
              <source src={heroVideo} type="video/mp4" />
              <source src="/hero-bg.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </motion.div>

       

            {/* Path 1: Top-Left Card -> Central Video */}
            <path
              d="M 215 150 C 330 150, 390 175, 440 180"
              stroke="#ef4444"
              strokeWidth="1.2"
              strokeOpacity="0.2"
              strokeDasharray="3 4"
            />
            <motion.path
              d="M 215 150 C 330 150, 390 175, 440 180"
              stroke="url(#streamGradLeft)"
              strokeWidth="2"
              strokeDasharray="8 16"
              animate={{ strokeDashoffset: [48, 0] }}
              transition={{ repeat: Infinity, duration: 2.2, ease: 'linear' }}
            />
            {/* Stream pulse packet 1 */}
            <circle r="3" fill="#fca5a5" filter="url(#glowEffect)">
              <animateMotion
                path="M 215 150 C 330 150, 390 175, 440 180"
                dur="2.4s"
                repeatCount="indefinite"
              />
            </circle>

            {/* Path 2: Bottom-Left Card -> Central Video */}
            <path
              d="M 271 375 C 360 375, 410 310, 460 260"
              stroke="#ef4444"
              strokeWidth="1.2"
              strokeOpacity="0.2"
              strokeDasharray="3 4"
            />
            <motion.path
              d="M 271 375 C 360 375, 410 310, 460 260"
              stroke="url(#streamGradLeft)"
              strokeWidth="2"
              strokeDasharray="8 16"
              animate={{ strokeDashoffset: [48, 0] }}
              transition={{ repeat: Infinity, duration: 2.6, ease: 'linear' }}
            />
            {/* Stream pulse packet 2 */}
            <circle r="3" fill="#fca5a5" filter="url(#glowEffect)">
              <animateMotion
                path="M 271 375 C 360 375, 410 310, 460 260"
                dur="2.8s"
                repeatCount="indefinite"
              />
            </circle>

            {/* Path 3: Top-Right Card -> Central Video */}
            <path
              d="M 905 155 C 790 155, 730 175, 680 180"
              stroke="#ef4444"
              strokeWidth="1.2"
              strokeOpacity="0.2"
              strokeDasharray="3 4"
            />
            <motion.path
              d="M 905 155 C 790 155, 730 175, 680 180"
              stroke="url(#streamGradRight)"
              strokeWidth="2"
              strokeDasharray="8 16"
              animate={{ strokeDashoffset: [-48, 0] }}
              transition={{ repeat: Infinity, duration: 2.3, ease: 'linear' }}
            />
            {/* Stream pulse packet 3 */}
            <circle r="3" fill="#fca5a5" filter="url(#glowEffect)">
              <animateMotion
                path="M 905 155 C 790 155, 730 175, 680 180"
                dur="2.5s"
                repeatCount="indefinite"
              />
            </circle>




            {/* Desktop Feature Cards (Flow in + Float orbits around Video) */}
            {desktopConfigs.map((config) => (
              <motion.div
                key={config.feature.title}
                initial={config.initial}
                animate={config.animate}
                transition={config.transition}
                className={config.containerClass}
              >
                {/* Inner continuous harmonic float */}
                <motion.div animate={config.float}>
                  <FeatureCard
                    feature={config.feature}
                    anchorSide={config.anchorSide}
                  />
                </motion.div>
              </motion.div>
            ))}

            {/* Mobile Cards (Stagger flow in from bottom) */}
            <div className="absolute inset-x-0 bottom-0 z-20 grid grid-cols-2 gap-3 lg:hidden">
              {features.map((feature, idx) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 35, scale: 0.92 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    duration: 0.7,
                    delay: 0.2 + idx * 0.1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <FeatureCard feature={feature} />
                </motion.div>
              ))}
            </div>
        </div>

        {/* Bottom Metrics Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-30 mx-auto -mt-1 max-w-3xl rounded-2xl border border-white/10 bg-[#100c0d]/95 px-4 py-4 backdrop-blur-xl sm:px-6"
        >
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
            {/* Trust Label */}
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
                    className="h-7 w-7 rounded-full border-2 border-[#100c0d] object-cover"
                    loading="lazy"
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

            {/* Metrics */}
            <div className="grid w-full grid-cols-4 divide-x divide-white/10 sm:w-auto">
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
    </section>
  );
}
