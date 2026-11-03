import React, { useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'motion/react';
import { PROJECTS } from '../constants';
import { ExternalLink, Github, ArrowUpRight, Sparkles, X, CheckCircle2, Layers } from 'lucide-react';
import { Project } from '../types';
import { ProjectMockupUI } from './ProjectMockupUI';

function ProjectCard({ 
  project, 
  index,
  onOpenModal 
}: { 
  project: Project; 
  index: number;
  onOpenModal: (p: Project) => void;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="group flex flex-col h-full bg-white/[0.04] backdrop-blur-md border border-white/10 rounded-2xl p-5 md:p-6 hover:border-purple-400/40 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300 relative"
    >
      {/* Live Realistic Web App UI Mockup Container */}
      <div 
        style={{ transform: "translateZ(35px)" }}
        className="relative aspect-[16/10] rounded-xl overflow-hidden mb-6 border border-white/10 bg-[#0a0c14] shadow-2xl group/mockup cursor-pointer"
        onClick={() => onOpenModal(project)}
      >
        <ProjectMockupUI 
          projectId={project.id} 
          onExpand={() => onOpenModal(project)} 
        />

        {/* Hover Hint Overlay */}
        <div className="absolute inset-0 bg-[#0e0f15]/30 opacity-0 group-hover/mockup:opacity-100 transition-opacity flex items-center justify-center pointer-events-none backdrop-blur-[1px]">
          <span className="px-3 py-1.5 rounded-full bg-slate-900/90 border border-purple-400/40 text-purple-200 text-xs font-medium shadow-lg flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            Interactive Web App UI
          </span>
        </div>
      </div>

      <div 
        style={{ transform: "translateZ(20px)" }}
        className="flex flex-col flex-grow"
      >
        <div className="flex flex-wrap gap-1.5 mb-3">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-md bg-white/[0.06] border border-white/10 text-purple-200"
            >
              {tech}
            </span>
          ))}
        </div>

        <h3 className="text-xl font-bold text-white mb-2 leading-tight group-hover:text-purple-200 transition-colors">
          {project.title}
        </h3>
        
        <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-grow font-normal line-clamp-3">
          {project.description}
        </p>

        <div className="pt-4 border-t border-white/10 flex items-center justify-between">
          <button
            onClick={() => onOpenModal(project)}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-purple-300 hover:text-white transition-colors uppercase tracking-wider group-hover:translate-x-0.5"
          >
            Explore Case Study
            <ArrowUpRight className="w-3.5 h-3.5 text-purple-400" />
          </button>
          
          <div className="flex gap-2">
            <a 
              href={project.githubUrl} 
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/[0.06] transition-colors"
              title="GitHub Repository"
            >
              <Github className="w-4 h-4" />
            </a>
            <a 
              href={project.liveUrl} 
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/[0.06] transition-colors"
              title="Live Demo"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="py-28 px-6 bg-[#0e0f15] overflow-hidden text-slate-100 relative">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 -left-20 w-[500px] h-[500px] rounded-full blur-3xl opacity-20 bg-gradient-to-tr from-blue-600 to-purple-600 pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[450px] rounded-full blur-3xl opacity-15 bg-gradient-to-tr from-purple-600 to-indigo-600 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs font-bold uppercase tracking-[0.2em] bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                Portfolio Showcase
              </span>
              <div className="h-px w-20 bg-white/10" />
            </div>

            <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tight text-white">
              Featured{' '}
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-300 bg-clip-text text-transparent">
                Projects
              </span>
            </h2>

            <p className="text-slate-400 text-base md:text-lg font-normal">
              Production web applications engineered with high performance, modular component architecture, and realistic enterprise UX.
            </p>
          </motion.div>

          <motion.a
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 text-purple-300 font-semibold tracking-tight hover:text-white transition-colors"
          >
            <span>View all work on GitHub</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </motion.a>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 perspective-1000">
          {PROJECTS.map((project, idx) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              index={idx}
              onOpenModal={(p) => setSelectedProject(p)}
            />
          ))}
        </div>
      </div>

      {/* High-Fidelity Interactive Case Study Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="bg-[#0f121d] border border-white/15 rounded-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl relative"
            >
              {/* Modal Topbar */}
              <div className="px-6 py-4 bg-[#141826] border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-purple-500/80 animate-pulse" />
                  <div>
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      {selectedProject.title}
                      <span className="text-xs px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 font-normal">
                        Live Web App UI
                      </span>
                    </h3>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 overflow-y-auto space-y-6 flex-1">
                {/* Full-width realistic UI Mockup preview container */}
                <div className="aspect-[16/10] w-full rounded-xl overflow-hidden border border-white/15 bg-[#0a0c13] shadow-2xl">
                  <ProjectMockupUI projectId={selectedProject.id} />
                </div>

                {/* Details Breakdown */}
                <div className="grid md:grid-cols-3 gap-6 pt-2">
                  <div className="md:col-span-2 space-y-4">
                    <h4 className="text-base font-semibold text-white flex items-center gap-2">
                      <Layers className="w-4 h-4 text-purple-400" />
                      Engineering Architecture &amp; Solution
                    </h4>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      {selectedProject.description}
                    </p>

                    <div className="space-y-2 pt-2">
                      <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        Key Features Delivered
                      </h5>
                      <div className="grid sm:grid-cols-2 gap-2 text-xs text-slate-300">
                        <div className="flex items-center gap-2 bg-white/[0.03] p-2.5 rounded-lg border border-white/5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span>Responsive enterprise data tables with sort &amp; filter</span>
                        </div>
                        <div className="flex items-center gap-2 bg-white/[0.03] p-2.5 rounded-lg border border-white/5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span>Dynamic KPI calculations &amp; real-time visual charts</span>
                        </div>
                        <div className="flex items-center gap-2 bg-white/[0.03] p-2.5 rounded-lg border border-white/5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span>Modular state management with clean UI reactivity</span>
                        </div>
                        <div className="flex items-center gap-2 bg-white/[0.03] p-2.5 rounded-lg border border-white/5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span>High-contrast dark mode design adhering to WCAG 2.1</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5 space-y-4 h-fit">
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-2">
                        Tech Stack
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedProject.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="text-xs font-mono px-2 py-1 rounded bg-purple-500/10 border border-purple-500/20 text-purple-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-white/10 space-y-2">
                      <button
                        onClick={() => setSelectedProject(null)}
                        className="w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium text-xs shadow-md shadow-purple-500/20 hover:opacity-95 transition-all text-center"
                      >
                        Close Preview
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
