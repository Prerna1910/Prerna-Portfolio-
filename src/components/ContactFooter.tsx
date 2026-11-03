import { motion } from 'motion/react';
import { ACHIEVEMENTS, DEVELOPER_INFO } from '../constants';
import * as Icons from 'lucide-react';
import { Mail, MessageSquare, Send, Sparkles } from 'lucide-react';

export function Achievements() {
  return (
    <section className="py-24 px-6 bg-[#0e0f15] relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-3xl opacity-15 bg-gradient-to-tr from-blue-600 to-purple-600 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex items-center gap-2 mb-12 justify-center">
          <div className="h-px w-12 bg-white/10" />
          <span className="text-xs font-bold uppercase tracking-[0.2em] bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            Key Highlights
          </span>
          <div className="h-px w-12 bg-white/10" />
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {ACHIEVEMENTS.map((ach, idx) => {
            const Icon = (Icons as any)[ach.icon] || Sparkles;
            return (
              <motion.div
                key={ach.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="text-center p-8 bg-white/[0.04] backdrop-blur-md border border-white/10 rounded-2xl hover:border-purple-400/30 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300"
              >
                <div className="inline-flex p-4 rounded-xl bg-gradient-to-tr from-blue-500/20 to-purple-500/20 border border-purple-400/30 text-purple-300 mb-6">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold mb-3 text-white tracking-tight">{ach.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed font-normal">{ach.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function Contact() {
  return (
    <section id="contact" className="py-28 px-6 bg-[#0e0f15] relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/4 -right-20 w-[500px] h-[500px] rounded-full blur-3xl opacity-20 bg-gradient-to-tr from-purple-600 to-indigo-600 pointer-events-none" />
      <div className="absolute bottom-0 -left-20 w-[450px] h-[450px] rounded-full blur-3xl opacity-15 bg-gradient-to-tr from-blue-600 to-purple-600 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs font-bold uppercase tracking-[0.2em] bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                Get In Touch
              </span>
              <div className="h-px w-20 bg-white/10" />
            </div>

            <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight text-white leading-tight">
              Let's build something{' '}
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-300 bg-clip-text text-transparent">
                extraordinary
              </span>.
            </h2>
            
            <p className="text-lg text-slate-400 mb-10 leading-relaxed font-normal">
              I'm always open to discussing new opportunities, frontend architectural challenges, or collaborative product launches.
            </p>
            
            <div className="space-y-6">
              <a href={`mailto:${DEVELOPER_INFO.email}`} className="flex items-center gap-5 group">
                <div className="w-13 h-13 rounded-2xl bg-white/[0.04] backdrop-blur-md flex items-center justify-center text-purple-300 group-hover:bg-purple-500/20 group-hover:text-white transition-all duration-300 border border-white/10 group-hover:border-purple-400/30">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Email</p>
                  <p className="text-base font-bold text-white group-hover:text-purple-300 transition-colors tracking-tight">{DEVELOPER_INFO.email}</p>
                </div>
              </a>

              <div className="flex items-center gap-5 group">
                <div className="w-13 h-13 rounded-2xl bg-white/[0.04] backdrop-blur-md flex items-center justify-center text-blue-300 border border-white/10">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Location</p>
                  <p className="text-base font-bold text-white tracking-tight">{DEVELOPER_INFO.location}</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-8 md:p-10 bg-white/[0.04] backdrop-blur-md border border-white/10 rounded-2xl relative shadow-xl hover:border-purple-400/30 transition-all duration-300"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Your Name</label>
                  <input
                    type="text"
                    placeholder="Jane Doe"
                    className="w-full h-13 px-4 bg-white/[0.03] rounded-xl border border-white/10 focus:border-purple-400 focus:outline-none transition-all font-normal text-white placeholder-slate-500 text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Email Address</label>
                  <input
                    type="email"
                    placeholder="jane@example.com"
                    className="w-full h-13 px-4 bg-white/[0.03] rounded-xl border border-white/10 focus:border-purple-400 focus:outline-none transition-all font-normal text-white placeholder-slate-500 text-sm"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Message</label>
                <textarea
                  placeholder="Tell me about your project or opportunity..."
                  rows={4}
                  className="w-full p-4 bg-white/[0.03] rounded-xl border border-white/10 focus:border-purple-400 focus:outline-none transition-all font-normal text-white placeholder-slate-500 text-sm resize-none"
                ></textarea>
              </div>

              <button className="w-full h-14 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-xl shadow-md shadow-purple-500/20 hover:opacity-95 flex items-center justify-center gap-2.5 transition-all active:scale-[0.98] text-sm">
                <span>Send Message</span>
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-12 border-t border-white/10 bg-[#0e0f15] text-slate-400">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <p className="font-bold text-lg mb-6 tracking-tight flex items-center justify-center gap-2 text-white">
          <span className="w-2.5 h-2.5 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full" />
          {DEVELOPER_INFO.name.split(' ')[0]}
          <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-300 bg-clip-text text-transparent">.</span>
        </p>

        <div className="flex justify-center gap-8 mb-8">
          {([
            { label: 'LinkedIn', href: DEVELOPER_INFO.linkedin },
            { label: 'GitHub', href: DEVELOPER_INFO.github },
            { label: 'Resume', href: DEVELOPER_INFO.resumeUrl },
          ]).map(({ label, href }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-400 hover:text-white transition-colors">
              {label}
            </a>
          ))}
        </div>

        <p className="text-xs tracking-wider text-slate-500 font-normal">
          © {currentYear} {DEVELOPER_INFO.name}. Designed with Google Gemini Modern Aesthetic.
        </p>
      </div>
    </footer>
  );
}
