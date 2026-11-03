import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, ChevronDown, Sparkles, Mic } from 'lucide-react';
import { DEVELOPER_INFO } from '../constants';
import { ThreeBackground } from './ThreeBackground';

interface HeroProps {
  onOpenChat?: () => void;
}

export function Hero({ onOpenChat }: HeroProps) {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 180]);
  const opacity = useTransform(scrollY, [0, 320], [1, 0]);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 px-6 bg-[#0e0f15]">
      {/* High-visibility White Dot Grid Pattern */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none opacity-40 [mask-image:radial-gradient(ellipse_75%_65%_at_50%_50%,black_40%,transparent_100%)]"
      />

      {/* Three.js 3D White Floating Dots Layer */}
      <ThreeBackground />

      {/* Gemini Ambient Glow Circles */}
      <div className="absolute top-1/4 -left-20 w-[420px] h-[420px] rounded-full blur-3xl opacity-20 bg-gradient-to-tr from-blue-600 to-purple-600 pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-[460px] h-[460px] rounded-full blur-3xl opacity-20 bg-gradient-to-tr from-purple-600 to-indigo-600 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl opacity-10 bg-gradient-to-tr from-blue-500 via-purple-500 to-sky-400 pointer-events-none" />

      <motion.div 
        style={{ y: y1, opacity }}
        className="relative z-10 max-w-4xl mx-auto text-center"
      >
        {/* Role Pill */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] backdrop-blur-md border border-white/10 text-slate-200 text-xs font-semibold uppercase tracking-[0.25em] mb-8 shadow-sm"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-gradient-to-r from-blue-400 to-purple-400"></span>
          </span>
          <span className="bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent font-bold">
            {DEVELOPER_INFO.role}
          </span>
        </motion.div>

        {/* Gemini Gradient Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-6xl md:text-8xl font-black mb-8 tracking-tighter text-white leading-[0.92] lg:leading-[0.88]"
        >
          <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-300 bg-clip-text text-transparent">
            {DEVELOPER_INFO.name.split(' ')[0]}
          </span>
          <span className="text-purple-400">.</span>
          <br />
          <span className="text-white">
            {DEVELOPER_INFO.name.split(' ').slice(1).join(' ')}
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-2xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed font-normal"
        >
          Building responsive, high-performance web applications with  
          <span className="text-white font-medium">clean architecture  </span> and{' '}
          <span className="text-white font-medium">modern frontend engineering</span>.
        </motion.p>

        {/* CTA Buttons with Gemini Styling */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 flex-wrap"
        >
          {/* Primary CTA */}
          <a
            href="#projects"
            className="group px-7 py-3.5 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-xl shadow-md shadow-purple-500/20 hover:opacity-95 transition-all flex items-center gap-2 active:scale-95"
          >
            <span>View Projects</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>

          {/* AI Twin Voice CTA */}
          {onOpenChat && (
            <button
              onClick={onOpenChat}
              className="px-6 py-3.5 bg-white/[0.04] backdrop-blur-md border border-white/10 rounded-xl text-white font-medium hover:border-purple-400/30 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300 flex items-center gap-2 active:scale-95"
            >
              <Sparkles className="w-4 h-4 text-purple-300" />
              <span>Ask AI Twin</span>
              <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded-md bg-purple-500/20 text-purple-200 border border-purple-400/30 flex items-center gap-1">
                <Mic className="w-2.5 h-2.5" />
                Voice
              </span>
            </button>
          )}

          {/* Secondary CTA */}
          <a
            href="#contact"
            className="px-6 py-3.5 bg-white/[0.04] backdrop-blur-md border border-white/10 text-slate-300 hover:text-white rounded-xl font-medium hover:border-purple-400/30 transition-all active:scale-95"
          >
            Get In Touch
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 pointer-events-none"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="w-6 h-6 text-slate-500" />
        </motion.div>
      </motion.div>
    </section>
  );
}
