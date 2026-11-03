import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  MessageSquare,
  Sparkles,
  X,
  Send,
  Mic,
  RefreshCw,
  Trash2,
  Copy,
  Check,
  Bot,
  User,
  Zap,
  Brain,
} from 'lucide-react';
import { AudioTranscriber } from './AudioTranscriber';
import { AudioRecorder } from '../lib/audioRecorder';
import { cn } from '../lib/utils';
import { DEVELOPER_INFO } from '../constants';

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: string;
  modelUsed?: string;
}

export type ModelType = 'gemini-3.1-flash-lite' | 'gemini-3.5-flash' | 'gemini-3.1-pro-preview';
export type RoleType = 'portfolio_twin' | 'tech_architect' | 'mock_interviewer';

const ROLES: { id: RoleType; name: string; icon: string; desc: string }[] = [
  {
    id: 'portfolio_twin',
    name: 'Prerna AI Twin',
    icon: '👩‍💻',
    desc: "Answers queries about Prerna's software engineering background at AV DEVS Solutions, projects & skills",
  },
  {
    id: 'tech_architect',
    name: 'Frontend Architect',
    icon: '🏛️',
    desc: 'Consults on React, TypeScript, web performance & UI systems',
  },
  {
    id: 'mock_interviewer',
    name: 'Mock Interviewer',
    icon: '🎯',
    desc: 'Conducts interactive frontend & software engineering technical interviews with feedback',
  },
];

const MODELS: { id: ModelType; name: string; speed: string; tag: string; icon: typeof Zap }[] = [
  {
    id: 'gemini-3.1-flash-lite',
    name: '3.1 Flash-Lite',
    speed: 'Fast Tasks',
    tag: '⚡ Lowest latency',
    icon: Zap,
  },
  {
    id: 'gemini-3.5-flash',
    name: '3.5 Flash',
    speed: 'General Tasks',
    tag: '⚖️ Balanced (Recommended)',
    icon: Sparkles,
  },
  {
    id: 'gemini-3.1-pro-preview',
    name: '3.1 Pro Preview',
    speed: 'Complex Tasks',
    tag: '🧠 Deep reasoning & coding',
    icon: Brain,
  },
];

const SAMPLE_PROMPTS: Record<RoleType, string[]> = {
  portfolio_twin: [
    "Tell me about Prerna's role at AV DEVS Solutions (Bhayli)",
    "What projects has Prerna built with React and TypeScript?",
    "What are her core skills in web applications and frontend architecture?",
    "How can I contact Prerna for software engineering roles?",
  ],
  tech_architect: [
    "How to optimize INP (Interaction to Next Paint) in React?",
    "Explain modular component architecture with TypeScript",
    "Best practices for large-scale Tailwind CSS design systems?",
    "How to implement virtualized list rendering efficiently?",
  ],
  mock_interviewer: [
    "Start a technical interview on JavaScript event loop & microtasks",
    "Ask me a question about React 19 hooks and state management",
    "How would you design a scalable frontend client portal?",
    "Test me on CSS specificity, flexbox, and responsive design",
  ],
};

interface GeminiChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialRole?: RoleType;
}

export function GeminiChatModal({ isOpen, onClose, initialRole = 'portfolio_twin' }: GeminiChatModalProps) {
  const [activeTab, setActiveTab] = useState<'chat' | 'transcribe'>('chat');
  const [selectedRole, setSelectedRole] = useState<RoleType>(initialRole);
  const [selectedModel, setSelectedModel] = useState<ModelType>('gemini-3.5-flash');
  const [inputMessage, setInputMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Quick mic recording in chat bar
  const [isRecordingMic, setIsRecordingMic] = useState(false);
  const [isTranscribingVoice, setIsTranscribingVoice] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const chatRecorderRef = useRef<AudioRecorder | null>(null);
  const chatTimerRef = useRef<any>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Initialize initial greeting if empty
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: 'welcome-msg',
          role: 'model',
          text: `Hello! I'm **${DEVELOPER_INFO.name}'s AI Assistant**, powered by Gemini.\n\nI can represent Prerna to share insights into her software engineering background at AV DEVS Solutions (Bhayli), showcase her web projects, provide frontend architecture consulting, or conduct an interactive technical interview.\n\nYou can also **click the microphone** to talk directly using voice transcription powered by \`gemini-3.5-transcribe\`! What would you like to explore?`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          modelUsed: 'gemini-3.5-flash',
        },
      ]);
    }
  }, [messages.length]);

  // Scroll to bottom on new messages
  useEffect(() => {
    if (activeTab === 'chat') {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isSending, isTranscribingVoice, activeTab]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text || isSending) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInputMessage('');
    setIsSending(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({
            role: m.role,
            text: m.text,
          })),
          model: selectedModel,
          role: selectedRole,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to get answer from Gemini.');
      }

      const botMessage: ChatMessage = {
        id: `bot-${Date.now()}`,
        role: 'model',
        text: data.text || 'No response generated.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        modelUsed: data.modelUsed || selectedModel,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err: any) {
      console.error(err);
      const errorMessage: ChatMessage = {
        id: `err-${Date.now()}`,
        role: 'model',
        text: `⚠️ **Error:** ${err?.message || 'Unable to connect to Gemini service.'}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        modelUsed: selectedModel,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsSending(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  // Quick Mic Recording in input bar
  const startChatVoiceRecording = async () => {
    try {
      const rec = new AudioRecorder();
      chatRecorderRef.current = rec;
      await rec.start();
      setIsRecordingMic(true);
      setRecordingSeconds(0);

      chatTimerRef.current = setInterval(() => {
        setRecordingSeconds((prev) => prev + 1);
      }, 1000);
    } catch (err: any) {
      alert(err?.message || 'Could not access microphone.');
    }
  };

  const stopChatVoiceRecording = async () => {
    if (!chatRecorderRef.current) return;
    if (chatTimerRef.current) clearInterval(chatTimerRef.current);

    setIsRecordingMic(false);
    setIsTranscribingVoice(true);

    try {
      const result = await chatRecorderRef.current.stop();
      const res = await fetch('/api/transcribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          audioData: result.base64Data,
          mimeType: result.mimeType,
          prompt: 'Transcribe this voice query verbatim into clear text.',
        }),
      });

      const data = await res.json();
      if (res.ok && data.transcription) {
        setInputMessage(data.transcription);
        if (data.transcription.trim().length > 3) {
          handleSendMessage(data.transcription);
        }
      } else {
        alert(data.error || 'Failed to transcribe audio.');
      }
    } catch (err: any) {
      console.error(err);
      alert('Transcription error: ' + err.message);
    } finally {
      setIsTranscribingVoice(false);
    }
  };

  const cancelChatVoiceRecording = () => {
    if (chatTimerRef.current) clearInterval(chatTimerRef.current);
    if (chatRecorderRef.current) chatRecorderRef.current.cancel();
    setIsRecordingMic(false);
    setRecordingSeconds(0);
  };

  const handleCopyMessage = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const clearChatHistory = () => {
    if (confirm('Clear all conversation history?')) {
      setMessages([
        {
          id: 'cleared-msg',
          role: 'model',
          text: `Conversation cleared. I am ready as **${
            ROLES.find((r) => r.id === selectedRole)?.name
          }**. How can I help you today?`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          modelUsed: selectedModel,
        },
      ]);
    }
  };

  const handleSendTranscriptionToChat = (text: string) => {
    setActiveTab('chat');
    handleSendMessage(text);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-4xl h-[90vh] max-h-[820px] rounded-2xl bg-[#0e0f15]/95 backdrop-blur-xl border border-white/10 shadow-2xl flex flex-col overflow-hidden"
        >
          {/* Top Header */}
          <div className="px-5 py-4 border-b border-white/10 bg-white/[0.03] backdrop-blur-md flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-500 to-purple-600 p-0.5 shadow-md shadow-purple-500/20">
                <div className="w-full h-full bg-[#0e0f15] rounded-[10px] flex items-center justify-center text-purple-300">
                  <Sparkles className="w-5 h-5 animate-pulse" />
                </div>
              </div>
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  Gemini AI Suite
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-500/10 border border-purple-400/20 text-purple-200 font-semibold">
                    Multi-Turn & Voice
                  </span>
                </h3>
                <p className="text-xs text-slate-400 font-normal">
                  Conversational developer twin & speech-to-text studio
                </p>
              </div>
            </div>

            {/* Navigation Tabs & Close */}
            <div className="flex items-center gap-2">
              <div className="hidden sm:flex p-1 rounded-xl bg-white/[0.04] border border-white/10 text-xs">
                <button
                  onClick={() => setActiveTab('chat')}
                  className={cn(
                    'px-3.5 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5',
                    activeTab === 'chat'
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  )}
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  Chatbot
                </button>
                <button
                  onClick={() => setActiveTab('transcribe')}
                  className={cn(
                    'px-3.5 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5',
                    activeTab === 'transcribe'
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  )}
                >
                  <Mic className="w-3.5 h-3.5" />
                  Transcribe Audio
                </button>
              </div>

              <button
                onClick={onClose}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/[0.04] border border-transparent hover:border-white/10 transition-colors"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Mobile Tab Switcher */}
          <div className="sm:hidden px-4 py-2 border-b border-white/10 bg-white/[0.02] flex gap-2">
            <button
              onClick={() => setActiveTab('chat')}
              className={cn(
                'flex-1 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 border',
                activeTab === 'chat'
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white border-transparent'
                  : 'bg-white/[0.04] border-white/10 text-slate-400'
              )}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              Gemini Chat
            </button>
            <button
              onClick={() => setActiveTab('transcribe')}
              className={cn(
                'flex-1 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 border',
                activeTab === 'transcribe'
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white border-transparent'
                  : 'bg-white/[0.04] border-white/10 text-slate-400'
              )}
            >
              <Mic className="w-3.5 h-3.5" />
              Transcribe Audio
            </button>
          </div>

          {/* Tab 1: Multi-Turn Chatbot */}
          {activeTab === 'chat' && (
            <div className="flex-1 flex flex-col min-h-0">
              {/* Controls Bar: Role Selector & Model Selector */}
              <div className="px-5 py-3 border-b border-white/10 bg-white/[0.02] flex flex-wrap items-center justify-between gap-3 text-xs">
                {/* Role Switcher */}
                <div className="flex items-center gap-2">
                  <span className="text-slate-400 uppercase tracking-wider text-[10px] font-bold">
                    Persona:
                  </span>
                  <div className="flex gap-1.5">
                    {ROLES.map((r) => (
                      <button
                        key={r.id}
                        onClick={() => setSelectedRole(r.id)}
                        className={cn(
                          'px-2.5 py-1 rounded-lg border text-xs font-medium transition-all flex items-center gap-1.5',
                          selectedRole === r.id
                            ? 'bg-purple-500/20 border-purple-400/40 text-purple-200 font-semibold shadow-sm'
                            : 'bg-white/[0.03] border-white/10 text-slate-400 hover:text-white'
                        )}
                        title={r.desc}
                      >
                        <span>{r.icon}</span>
                        <span>{r.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Model Selector */}
                <div className="flex items-center gap-2">
                  <span className="text-slate-400 uppercase tracking-wider text-[10px] font-bold">
                    Model:
                  </span>
                  <div className="flex gap-1.5">
                    {MODELS.map((m) => {
                      const Icon = m.icon;
                      return (
                        <button
                          key={m.id}
                          onClick={() => setSelectedModel(m.id)}
                          className={cn(
                            'px-2.5 py-1 rounded-lg border text-xs font-medium transition-all flex items-center gap-1.5',
                            selectedModel === m.id
                              ? 'bg-purple-500/20 border-purple-400/40 text-purple-200 font-semibold shadow-sm'
                              : 'bg-white/[0.03] border-white/10 text-slate-400 hover:text-white'
                          )}
                          title={`${m.name} (${m.speed}) - ${m.tag}`}
                        >
                          <Icon className="w-3 h-3" />
                          <span>{m.name}</span>
                        </button>
                      );
                    })}
                  </div>

                  <button
                    onClick={clearChatHistory}
                    className="p-1.5 text-slate-400 hover:text-red-400 rounded-lg hover:bg-white/[0.04] transition-colors ml-2"
                    title="Clear Chat History"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Scrollable Messages Thread */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                {messages.map((message) => {
                  const isUser = message.role === 'user';
                  return (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={cn(
                        'flex gap-3 max-w-3xl',
                        isUser ? 'ml-auto flex-row-reverse' : 'mr-auto'
                      )}
                    >
                      <div
                        className={cn(
                          'w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 text-xs font-bold border',
                          isUser
                            ? 'bg-gradient-to-tr from-blue-500 to-purple-600 text-white border-transparent'
                            : 'bg-white/[0.04] text-purple-300 border-white/10'
                        )}
                      >
                        {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                      </div>

                      <div className="space-y-1">
                        <div
                          className={cn(
                            'p-4 rounded-2xl text-sm leading-relaxed border shadow-sm relative group',
                            isUser
                              ? 'bg-gradient-to-tr from-blue-600/30 to-purple-600/30 backdrop-blur-md border-purple-400/30 text-white rounded-tr-none'
                              : 'bg-white/[0.04] backdrop-blur-md border-white/10 text-slate-200 rounded-tl-none font-normal'
                          )}
                        >
                          <div className="whitespace-pre-wrap font-sans space-y-2">
                            {message.text}
                          </div>

                          <button
                            onClick={() => handleCopyMessage(message.id, message.text)}
                            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-white rounded bg-[#0e0f15]/80 border border-white/10 transition-opacity"
                            title="Copy message"
                          >
                            {copiedId === message.id ? (
                              <Check className="w-3 h-3 text-green-400" />
                            ) : (
                              <Copy className="w-3 h-3" />
                            )}
                          </button>
                        </div>

                        <div
                          className={cn(
                            'flex items-center gap-2 text-[10px] text-slate-400 px-1',
                            isUser ? 'justify-end' : 'justify-start'
                          )}
                        >
                          <span>{message.timestamp}</span>
                          {message.modelUsed && (
                            <>
                              <span>•</span>
                              <span className="font-mono text-purple-300/80">{message.modelUsed}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}

                {isSending && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex gap-3 max-w-3xl mr-auto"
                  >
                    <div className="w-8 h-8 rounded-xl bg-white/[0.04] text-purple-300 border border-white/10 flex items-center justify-center flex-shrink-0">
                      <RefreshCw className="w-4 h-4 animate-spin" />
                    </div>
                    <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 rounded-tl-none flex items-center gap-2 text-xs text-slate-300">
                      <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping" />
                      Gemini is generating response using {selectedModel}...
                    </div>
                  </motion.div>
                )}

                {isTranscribingVoice && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3.5 rounded-xl bg-purple-500/10 border border-purple-400/30 text-xs text-purple-200 flex items-center gap-2"
                  >
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Transcribing voice query with gemini-3.5-transcribe...
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Suggested Quick Questions */}
              {messages.length <= 2 && (
                <div className="px-5 py-2 overflow-x-auto flex gap-2 border-t border-white/10 bg-white/[0.02]">
                  {SAMPLE_PROMPTS[selectedRole].map((prompt, i) => (
                    <button
                      key={i}
                      onClick={() => handleSendMessage(prompt)}
                      className="whitespace-nowrap px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs text-slate-300 hover:text-white hover:border-purple-400/30 transition-all flex-shrink-0"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              )}

              {/* Chat Input Bar */}
              <div className="p-4 border-t border-white/10 bg-white/[0.02]">
                {isRecordingMic ? (
                  <div className="p-3 rounded-xl bg-red-500/15 border border-red-500/30 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-red-500 animate-ping" />
                      <div>
                        <p className="text-xs font-bold text-red-300">Listening to your microphone...</p>
                        <p className="text-[11px] text-slate-400">
                          Speak your question. Will transcribe via gemini-3.5-transcribe.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-sm font-bold text-white">
                        00:{recordingSeconds.toString().padStart(2, '0')}
                      </span>
                      <button
                        onClick={cancelChatVoiceRecording}
                        className="text-xs text-slate-400 hover:text-red-300 underline"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={stopChatVoiceRecording}
                        className="px-3 py-1.5 rounded-lg bg-red-500 text-white font-medium text-xs hover:bg-red-600 transition-colors shadow"
                      >
                        Done & Send
                      </button>
                    </div>
                  </div>
                ) : (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSendMessage();
                    }}
                    className="flex items-end gap-2"
                  >
                    <div className="flex-1 relative rounded-xl border border-white/10 bg-white/[0.03] focus-within:border-purple-400/40 transition-colors">
                      <textarea
                        ref={inputRef}
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSendMessage();
                          }
                        }}
                        placeholder={`Message ${ROLES.find((r) => r.id === selectedRole)?.name}... (Shift+Enter for newline)`}
                        rows={1}
                        className="w-full max-h-32 p-3 bg-transparent text-sm text-white placeholder-slate-500 focus:outline-none resize-none font-sans"
                      />
                    </div>

                    <button
                      type="button"
                      onClick={startChatVoiceRecording}
                      disabled={isSending || isTranscribingVoice}
                      className="p-3 rounded-xl border border-white/10 bg-white/[0.04] text-slate-400 hover:text-purple-300 hover:border-purple-400/30 transition-all disabled:opacity-50"
                      title="Speak with Microphone (gemini-3.5-transcribe)"
                    >
                      <Mic className="w-5 h-5" />
                    </button>

                    <button
                      type="submit"
                      disabled={!inputMessage.trim() || isSending}
                      className="p-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium shadow-md shadow-purple-500/20 hover:opacity-95 active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                      aria-label="Send message"
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </form>
                )}
              </div>
            </div>
          )}

          {/* Tab 2: Dedicated Audio Transcriber Tool */}
          {activeTab === 'transcribe' && (
            <div className="flex-1 overflow-y-auto p-6">
              <AudioTranscriber onSendToChat={handleSendTranscriptionToChat} />
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

// Floating Trigger Action Button (FAB)
export function GeminiChatFab({ onOpen }: { onOpen: () => void }) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onOpen}
      className="fixed bottom-6 right-6 z-40 group flex items-center gap-3 p-3.5 pr-5 rounded-full bg-[#13131a]/90 backdrop-blur-md border border-white/10 text-white shadow-2xl hover:border-purple-400/40 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300"
      aria-label="Open Gemini AI Chat and Audio Transcriber"
    >
      <div className="relative w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-purple-500/25 group-hover:scale-110 transition-transform">
        <Sparkles className="w-5 h-5" />
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-purple-400" />
        </span>
      </div>

      <div className="text-left hidden sm:block">
        <p className="text-xs font-bold text-white flex items-center gap-1.5">
          Ask Prerna AI
          <span className="text-[9px] uppercase font-mono px-1.5 py-0.2 rounded bg-purple-500/20 text-purple-300 border border-purple-400/30">
            Voice
          </span>
        </p>
        <p className="text-[10px] text-slate-400 flex items-center gap-1">
          <Mic className="w-2.5 h-2.5 text-purple-300" />
          Gemini Multi-Turn & Transcribe
        </p>
      </div>
    </motion.button>
  );
}
