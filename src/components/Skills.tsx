import { motion } from 'motion/react';
import { SKILLS } from '../constants';
import { Sparkles } from 'lucide-react';

export function Skills() {
  return (
    <section id="skills" className="py-28 px-6 bg-[#0e0f15] relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/3 -right-24 w-[450px] h-[450px] rounded-full blur-3xl opacity-20 bg-gradient-to-tr from-blue-600 to-purple-600 pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] rounded-full blur-3xl opacity-15 bg-gradient-to-tr from-purple-600 to-indigo-600 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] backdrop-blur-md border border-white/10 text-xs font-semibold uppercase tracking-[0.2em] text-slate-300 mb-4"
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Capabilities</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black mb-4 text-white tracking-tight"
          >
            Technical{' '}
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-300 bg-clip-text text-transparent">
              Arsenal
            </span>
          </motion.h2>

          <p className="text-slate-400 max-w-xl mx-auto text-base">
            Engineered for high performance, responsive interfaces, and accessible design systems.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SKILLS.map((group, groupIdx) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: groupIdx * 0.1 }}
              className="p-7 rounded-2xl bg-white/[0.04] backdrop-blur-md border border-white/10 hover:border-purple-400/30 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <h3 className="text-xs font-bold text-slate-300 uppercase tracking-[0.2em] mb-7 pb-3 border-b border-white/10 flex items-center justify-between">
                  <span>{group.category}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400/60" />
                </h3>
                
                <div className="space-y-6">
                  {group.skills.map((skill) => (
                    <div key={skill.name}>
                      <div className="flex justify-between items-center mb-2 text-sm">
                        <span className="font-medium text-white">{skill.name}</span>
                        <span className="text-xs font-mono text-purple-300 font-semibold">{skill.level}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-white/[0.06] rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: groupIdx * 0.1 + 0.2 }}
                          className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-full shadow-[0_0_12px_rgba(155,114,207,0.4)]"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
