import { motion } from 'motion/react';
import { DEVELOPER_INFO } from '../constants';
import { Quote, Sparkles } from 'lucide-react';

export function About() {
  return (
    <section id="about" className="py-28 px-6 bg-[#0e0f15] relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 -left-32 w-[500px] h-[500px] rounded-full blur-3xl opacity-20 bg-gradient-to-tr from-blue-600 to-purple-600 pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-[400px] h-[400px] rounded-full blur-3xl opacity-15 bg-gradient-to-tr from-purple-600 to-indigo-600 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs font-bold uppercase tracking-[0.2em] bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                About Me
              </span>
              <div className="h-px flex-1 bg-white/10" />
            </div>

            <h2 className="text-4xl md:text-5xl font-black mb-8 text-white tracking-tight leading-tight">
              Building for the{' '}
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-300 bg-clip-text text-transparent">
                future of the web
              </span>.
            </h2>

            <div className="space-y-6 text-base md:text-lg text-slate-400 leading-relaxed font-normal">
              <p>
                {DEVELOPER_INFO.about}
              </p>
              <p>
                At AV DEVS Solutions and previously at TenUp Software, I've contributed to scalable
                web platforms, mission-critical client solutions, and high-performance UI systems. My focus is
                delivering pixel-perfect, accessible, and fast software applications.
              </p>

              {/* Glassmorphic Stat Cards */}
              <div className="grid grid-cols-2 gap-6 pt-4">
                <div className="bg-white/[0.04] backdrop-blur-md border border-white/10 rounded-2xl p-6 text-center hover:border-purple-400/30 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300">
                  <h3 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    04+
                  </h3>
                  <p className="text-[11px] text-slate-400 uppercase tracking-widest font-semibold mt-2">
                    Years Exp
                  </p>
                </div>
                <div className="bg-white/[0.04] backdrop-blur-md border border-white/10 rounded-2xl p-6 text-center hover:border-purple-400/30 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300">
                  <h3 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    10+
                  </h3>
                  <p className="text-[11px] text-slate-400 uppercase tracking-widest font-semibold mt-2">
                    Projects
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Quote Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="absolute -inset-2 bg-gradient-to-tr from-blue-500/10 to-purple-500/10 rounded-3xl blur-2xl" />
            
            <div className="relative p-8 md:p-10 bg-white/[0.04] backdrop-blur-md border border-white/10 rounded-2xl hover:border-purple-400/30 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300">
              <Quote className="w-10 h-10 text-purple-400/40 mb-6" />
              <p className="text-lg md:text-xl text-slate-200 leading-relaxed mb-8 font-light italic">
                "I don't just write code; I architect experiences. My goal is to bridge the gap between complex backend logic and intuitive, accessible frontend interfaces."
              </p>
              
              <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-blue-500 to-purple-600 flex items-center justify-center font-bold text-white text-sm shadow-md shadow-purple-500/20">
                  PG
                </div>
                <div>
                  <p className="font-bold text-white text-base">{DEVELOPER_INFO.name}</p>
                  <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">{DEVELOPER_INFO.location}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
