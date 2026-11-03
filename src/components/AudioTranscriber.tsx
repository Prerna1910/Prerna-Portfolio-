import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Mic,
  Square,
  Upload,
  Check,
  Copy,
  Sparkles,
  RefreshCw,
  AlertCircle,
  MessageSquare,
  Volume2,
} from 'lucide-react';
import { AudioRecorder, RecordingResult } from '../lib/audioRecorder';

interface AudioTranscriberProps {
  onSendToChat?: (text: string) => void;
}

export function AudioTranscriber({ onSendToChat }: AudioTranscriberProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [recordedAudio, setRecordedAudio] = useState<RecordingResult | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileBase64, setFileBase64] = useState<string | null>(null);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [transcription, setTranscription] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const recorderRef = useRef<AudioRecorder | null>(null);
  const timerRef = useRef<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (recorderRef.current) recorderRef.current.cancel();
      if (audioUrl) URL.revokeObjectURL(audioUrl);
    };
  }, [audioUrl]);

  const startRecording = async () => {
    setError(null);
    try {
      const recorder = new AudioRecorder();
      recorderRef.current = recorder;
      await recorder.start();
      setIsRecording(true);
      setRecordingDuration(0);
      setRecordedAudio(null);
      setSelectedFile(null);
      setFileBase64(null);

      timerRef.current = setInterval(() => {
        setRecordingDuration((prev) => prev + 1);
      }, 1000);
    } catch (err: any) {
      console.error(err);
      setError(err?.message || 'Could not access microphone. Please grant permission.');
    }
  };

  const stopRecording = async () => {
    if (!recorderRef.current) return;
    if (timerRef.current) clearInterval(timerRef.current);

    try {
      const result = await recorderRef.current.stop();
      setIsRecording(false);
      setRecordedAudio(result);
      if (audioUrl) URL.revokeObjectURL(audioUrl);
      const url = URL.createObjectURL(result.blob);
      setAudioUrl(url);

      // Auto-trigger transcription
      await transcribeAudioData(result.base64Data, result.mimeType);
    } catch (err: any) {
      console.error(err);
      setError(err?.message || 'Failed to finish audio recording.');
      setIsRecording(false);
    }
  };

  const cancelRecording = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (recorderRef.current) recorderRef.current.cancel();
    setIsRecording(false);
    setRecordingDuration(0);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);
    setSelectedFile(file);
    setRecordedAudio(null);
    if (audioUrl) URL.revokeObjectURL(audioUrl);
    const url = URL.createObjectURL(file);
    setAudioUrl(url);

    const reader = new FileReader();
    reader.onload = async () => {
      const base64 = reader.result as string;
      setFileBase64(base64);
      await transcribeAudioData(base64, file.type || 'audio/mp3');
    };
    reader.onerror = () => {
      setError('Failed to read the audio file.');
    };
    reader.readAsDataURL(file);
  };

  const transcribeAudioData = async (base64String: string, mimeType: string) => {
    setIsTranscribing(true);
    setError(null);

    try {
      const res = await fetch('/api/transcribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          audioData: base64String,
          mimeType: mimeType || 'audio/webm',
          prompt: 'Transcribe this spoken audio verbatim with natural punctuation and capitalization.',
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to transcribe audio.');
      }

      setTranscription(data.transcription || 'No speech detected in the audio.');
    } catch (err: any) {
      console.error(err);
      setError(err?.message || 'Error communicating with transcription service.');
    } finally {
      setIsTranscribing(false);
    }
  };

  const handleCopy = () => {
    if (!transcription) return;
    navigator.clipboard.writeText(transcription);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      {/* Header Info Banner */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-white/[0.04] backdrop-blur-md border border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-500/20 to-purple-500/20 border border-purple-400/30 flex items-center justify-center text-purple-300">
            <Mic className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              Microphone Audio Transcriber
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-purple-500/10 border border-purple-400/20 text-purple-300 font-semibold">
                gemini-3.5-transcribe
              </span>
            </h4>
            <p className="text-xs text-slate-400">
              Speak into your microphone or upload audio to generate accurate text transcriptions.
            </p>
          </div>
        </div>
      </div>

      {/* Recording Control Box */}
      <div className="relative p-8 rounded-2xl bg-white/[0.04] backdrop-blur-md border border-white/10 hover:border-purple-400/30 transition-all duration-300 text-center overflow-hidden">
        {isRecording && (
          <motion.div
            className="absolute inset-0 bg-red-500/10 pointer-events-none"
            animate={{ opacity: [0.1, 0.25, 0.1] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          />
        )}

        <div className="relative z-10 flex flex-col items-center gap-4">
          {!isRecording ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={startRecording}
              disabled={isTranscribing}
              className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white flex flex-col items-center justify-center shadow-lg shadow-purple-500/25 hover:opacity-95 transition-all disabled:opacity-50"
              aria-label="Start recording"
            >
              <Mic className="w-8 h-8" />
            </motion.button>
          ) : (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={stopRecording}
              className="w-20 h-20 rounded-full bg-red-500 text-white flex flex-col items-center justify-center shadow-lg shadow-red-500/30 hover:opacity-95 transition-all"
              aria-label="Stop recording"
            >
              <Square className="w-7 h-7 fill-current" />
            </motion.button>
          )}

          <div>
            {isRecording ? (
              <div className="space-y-1">
                <div className="flex items-center justify-center gap-2 text-red-400 font-bold text-sm">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
                  Recording in progress...
                </div>
                <div className="text-3xl font-mono font-bold text-white">
                  {formatTime(recordingDuration)}
                </div>
                <button
                  onClick={cancelRecording}
                  className="text-xs text-slate-400 hover:text-red-400 underline mt-2"
                >
                  Cancel recording
                </button>
              </div>
            ) : (
              <div className="space-y-1">
                <p className="text-sm font-semibold text-white">
                  {isTranscribing ? 'Processing audio with Gemini...' : 'Click the microphone to start speaking'}
                </p>
                <p className="text-xs text-slate-400">
                  Transcribes natural speech, multi-speaker dialogue, and code terms
                </p>
              </div>
            )}
          </div>

          {!isRecording && (
            <div className="flex items-center gap-3 pt-2">
              <input
                ref={fileInputRef}
                type="file"
                accept="audio/*"
                onChange={handleFileUpload}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isTranscribing}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl border border-white/10 bg-white/[0.03] text-xs font-medium text-slate-300 hover:text-white hover:border-purple-400/30 transition-colors"
              >
                <Upload className="w-3.5 h-3.5 text-purple-400" />
                Or upload audio file (.mp3, .wav, .m4a)
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Audio Playback Player */}
      {audioUrl && (
        <div className="p-4 rounded-2xl bg-white/[0.04] backdrop-blur-md border border-white/10 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 overflow-hidden">
            <Volume2 className="w-5 h-5 text-purple-400 flex-shrink-0" />
            <div className="truncate">
              <p className="text-xs font-semibold text-white truncate">
                {selectedFile ? selectedFile.name : 'Recorded Microphone Audio'}
              </p>
              <p className="text-[10px] text-slate-400">
                {recordedAudio ? `${recordedAudio.durationSeconds}s duration` : 'Audio clip loaded'}
              </p>
            </div>
          </div>
          <audio controls src={audioUrl} className="h-8 max-w-[200px] sm:max-w-[260px]" />
        </div>
      )}

      {/* Loading State */}
      {isTranscribing && (
        <div className="p-6 rounded-2xl bg-white/[0.04] backdrop-blur-md border border-purple-400/30 flex flex-col items-center gap-3 text-center">
          <RefreshCw className="w-6 h-6 text-purple-400 animate-spin" />
          <div>
            <p className="text-sm font-bold text-white">Transcribing with gemini-3.5-transcribe...</p>
            <p className="text-xs text-slate-400 mt-0.5">
              Processing speech patterns, punctuation, and terminology
            </p>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-start gap-3 text-red-300 text-xs">
          <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="font-semibold text-red-200">Transcription Notice</p>
            <p>{error}</p>
          </div>
        </div>
      )}

      {/* Transcription Results */}
      {transcription && !isTranscribing && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 rounded-2xl bg-white/[0.04] backdrop-blur-md border border-white/10 space-y-3.5 shadow-lg"
        >
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-300 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Transcribed Text
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/[0.04] text-xs font-medium text-slate-300 hover:text-white border border-white/10 hover:border-purple-400/30 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Copied' : 'Copy'}
              </button>

              {onSendToChat && (
                <button
                  onClick={() => onSendToChat(transcription)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs font-medium hover:opacity-95 transition-all shadow-md shadow-purple-500/20"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  Ask Gemini
                </button>
              )}
            </div>
          </div>

          <p className="text-sm text-slate-200 leading-relaxed whitespace-pre-wrap font-sans">
            {transcription}
          </p>

          <div className="pt-2 flex items-center justify-between text-[11px] text-slate-400 border-t border-white/10">
            <span>{transcription.split(/\s+/).filter(Boolean).length} words</span>
            <span className="font-mono">{transcription.length} characters</span>
          </div>
        </motion.div>
      )}
    </div>
  );
}
