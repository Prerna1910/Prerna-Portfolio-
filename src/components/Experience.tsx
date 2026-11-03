import { motion } from 'motion/react';
import { EXPERIENCES } from '../constants';
import { Sparkles, Briefcase } from 'lucide-react';

export function Experience() {
  return (
    <section id="experience" className="py-28 px-6 bg-[#0e0f15] text-slate-100 overflow-hidden relative">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/4 -left-20 w-[450px] h-[450px] rounded-full blur-3xl opacity-20 bg-gradient-to-tr from-blue-600 to-purple-600 pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-[480px] h-[480px] rounded-full blur-3xl opacity-15 bg-gradient-to-tr from-purple-600 to-indigo-600 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-[1fr,2fr] gap-16">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs font-bold uppercase tracking-[0.2em] bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                History
              </span>
              <div className="h-px flex-1 bg-white/10" />
            </div>

            <h2 className="text-4xl md:text-5xl font-black mb-6 text-white tracking-tight">
              Work{' '}
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-300 bg-clip-text text-transparent">
                Experience
              </span>
            </h2>

            <p className="text-slate-400 text-base md:text-lg mb-8 leading-relaxed font-normal">
              A proven track record of engineering scalable web applications, responsive user interfaces, and robust client portals at AV DEVS Solutions and TenUp Software.
            </p>

            <div className="p-6 rounded-2xl bg-white/[0.04] backdrop-blur-md border border-white/10 hidden lg:block">
              <div className="flex items-center gap-3 text-purple-300 text-sm font-semibold mb-2">
                <Briefcase className="w-4 h-4 text-blue-400" />
                <span>Career Highlights</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Currently Software Engineer at AV DEVS Solutions (Bhayli, Vadodara). Specialized in React, TypeScript, responsive client solutions, REST APIs, and modern frontend ecosystems.
              </p>
            </div>
          </motion.div>

          <div className="flex flex-col gap-6">
            {EXPERIENCES.map((exp, idx) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group p-8 rounded-2xl bg-white/[0.04] backdrop-blur-md border border-white/10 hover:border-purple-400/30 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300"
              >
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-white tracking-tight">
                      {exp.role}
                    </h3>
                    <div className="flex items-center gap-3 mt-2 text-xs font-semibold uppercase tracking-wider">
                      <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                        {exp.company}
                      </span>
                      <span className="w-1 h-1 rounded-full bg-white/20" />
                      <span className="text-slate-400 font-mono text-[11px]">{exp.duration}</span>
                    </div>
                  </div>
                </div>

                <ul className="space-y-3.5">
                  {exp.description.map((item, i) => (
                    <li key={i} className="flex gap-3.5 text-slate-400 text-sm leading-relaxed font-normal">
                      <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 mt-2 shadow-[0_0_8px_rgba(155,114,207,0.5)]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
