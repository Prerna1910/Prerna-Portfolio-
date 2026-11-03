/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Experience } from './components/Experience';
import { Projects } from './components/Projects';
import { AiShowcaseSection } from './components/AiShowcaseSection';
import { Achievements, Contact, Footer } from './components/ContactFooter';
import { GeminiChatModal, GeminiChatFab, RoleType } from './components/GeminiChatModal';

export default function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [activeRole, setActiveRole] = useState<RoleType>('portfolio_twin');

  const handleOpenChat = (role: RoleType = 'portfolio_twin') => {
    setActiveRole(role);
    setIsChatOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#0e0f15] text-slate-100 selection:bg-purple-500/25 selection:text-purple-200 transition-colors duration-300 overflow-x-hidden relative">
      {/* Ambient Gemini Background Glows */}
      <div className="fixed top-0 left-1/4 w-[500px] h-[500px] rounded-full blur-3xl opacity-20 bg-gradient-to-tr from-blue-600 to-purple-600 pointer-events-none z-0" />
      <div className="fixed top-1/2 -right-20 w-[600px] h-[600px] rounded-full blur-3xl opacity-15 bg-gradient-to-tr from-purple-600 to-indigo-600 pointer-events-none z-0" />
      <div className="fixed bottom-10 left-10 w-[550px] h-[550px] rounded-full blur-3xl opacity-15 bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 pointer-events-none z-0" />

      <div className="relative z-10">
        <Navbar onOpenChat={() => handleOpenChat('portfolio_twin')} />
        
        <main>
          <Hero onOpenChat={() => handleOpenChat('portfolio_twin')} />
          <About />
          <Skills />
          <Experience />
          <Projects />
          <AiShowcaseSection onOpenChat={handleOpenChat} />
          <Achievements />
          <Contact />
        </main>

        <Footer />

        {/* Floating Action Button */}
        <GeminiChatFab onOpen={() => handleOpenChat('portfolio_twin')} />

        {/* Multi-turn Chat & Audio Transcription Modal */}
        <GeminiChatModal
          isOpen={isChatOpen}
          onClose={() => setIsChatOpen(false)}
          initialRole={activeRole}
        />
      </div>
    </div>
  );
}
