import { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, MessageSquare, Mic, Bot, Brain } from 'lucide-react';
import { AudioTranscriber } from './AudioTranscriber';
import { RoleType } from './GeminiChatModal';

interface AiShowcaseSectionProps {
  onOpenChat: (role?: RoleType) => void;
}

export function AiShowcaseSection({ onOpenChat }: AiShowcaseSectionProps) {
  return (
    <section id="ai-assistant" className="py-28 px-6 bg-[#0e0f15] relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 -left-32 w-[550px] h-[550px] rounded-full blur-3xl opacity-20 bg-gradient-to-tr from-blue-600 to-purple-600 pointer-events-none" />
      <div className="absolute bottom-0 -right-32 w-[500px] h-[500px] rounded-full blur-3xl opacity-15 bg-gradient-to-tr from-purple-600 to-indigo-600 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] backdrop-blur-md border border-white/10 text-xs font-semibold uppercase tracking-[0.2em] mb-4">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-300 bg-clip-text text-transparent">
              Gemini AI Studio
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
            Interactive AI Twin &{' '}
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-300 bg-clip-text text-transparent">
              Voice Studio
            </span>
          </h2>
          
          <p className="text-slate-400 max-w-2xl mx-auto text-base sm:text-lg font-normal">
            Experience multi-turn conversational AI grounded in software engineering expertise at AV DEVS Solutions, and test live speech-to-text powered by <span className="text-purple-300 font-medium">gemini-3.5-transcribe</span>.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Quick Features & Launchers */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-7 rounded-2xl bg-white/[0.04] backdrop-blur-md border border-white/10 hover:border-purple-400/30 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300 space-y-5">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-blue-500 to-purple-600 flex items-center justify-center text-white shadow-md shadow-purple-500/20">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Multi-Turn Gemini Chatbot</h3>
                  <p className="text-xs text-slate-400">Contextual multi-turn dialogue memory</p>
                </div>
              </div>

              <p className="text-sm text-slate-400 leading-relaxed font-normal">
                Connect with my digital twin to discuss frontend architecture, review code, or simulate a mock interview. Choose your reasoning level between fast tasks, general Q&A, and complex tasks.
              </p>

              {/* Models Available badge pills */}
              <div className="space-y-2 pt-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  Configured Gemini Models:
                </span>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/10 text-slate-300 font-mono flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    3.1 Flash-Lite <span className="text-[10px] text-slate-400">(Fast)</span>
                  </span>
                  <span className="text-xs px-2.5 py-1 rounded-lg bg-purple-500/10 border border-purple-400/30 text-purple-200 font-mono flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                    3.5 Flash <span className="text-[10px] text-purple-300">(General)</span>
                  </span>
                  <span className="text-xs px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/10 text-slate-300 font-mono flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                    3.1 Pro <span className="text-[10px] text-slate-400">(Complex)</span>
                  </span>
                </div>
              </div>

              <div className="pt-3 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => onOpenChat('portfolio_twin')}
                  className="flex-1 px-5 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium text-xs uppercase tracking-wider shadow-md shadow-purple-500/20 hover:opacity-95 active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  Chat With Prerna AI
                </button>
                <button
                  onClick={() => onOpenChat('mock_interviewer')}
                  className="px-4 py-3 rounded-xl bg-white/[0.04] backdrop-blur-md border border-white/10 text-slate-200 font-medium text-xs uppercase tracking-wider hover:border-purple-400/30 transition-all flex items-center justify-center gap-2"
                >
                  Mock Interview
                </button>
              </div>
            </div>

            {/* Quick stats / Highlights */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-white/[0.04] backdrop-blur-md border border-white/10 hover:border-purple-400/30 transition-all">
                <span className="text-2xl font-black bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent font-mono">100%</span>
                <p className="text-xs font-semibold text-white mt-1">Multi-Turn History</p>
                <p className="text-[11px] text-slate-400">Contextual state memory</p>
              </div>
              <div className="p-5 rounded-2xl bg-white/[0.04] backdrop-blur-md border border-white/10 hover:border-purple-400/30 transition-all">
                <span className="text-2xl font-black bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent font-mono">Audio</span>
                <p className="text-xs font-semibold text-white mt-1">Microphone Input</p>
                <p className="text-[11px] text-slate-400">gemini-3.5-transcribe</p>
              </div>
            </div>
          </div>

          {/* Right Column: Live Audio Transcriber Studio */}
          <div className="lg:col-span-7">
            <div className="p-6 md:p-8 rounded-2xl bg-white/[0.04] backdrop-blur-md border border-white/10 shadow-xl">
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                <div className="flex items-center gap-2.5">
                  <Mic className="w-5 h-5 text-purple-400" />
                  <h3 className="text-base font-bold text-white">Live Microphone Transcriber</h3>
                </div>
                <span className="text-[11px] font-mono uppercase px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-semibold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Ready
                </span>
              </div>

              {/* Embedded Audio Transcriber Component */}
              <AudioTranscriber onSendToChat={(text) => onOpenChat('portfolio_twin')} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
