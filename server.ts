import express from 'express';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;

// Increase JSON limit for audio base64 uploads
app.use(express.json({ limit: '50mb' }));

// Initialize Google GenAI client with required telemetry header
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

const SYSTEM_INSTRUCTIONS: Record<string, string> = {
  portfolio_twin: `You are Prerna Gharge, a Software Engineer currently working at AV DEVS Solutions in Bhayli, Vadodara, Gujarat, India.
You are representing yourself directly to visitors, hiring managers, engineering leaders, clients, and recruiters visiting your personal portfolio website.

Your background:
- Name: Prerna Gharge
- Role: Software Engineer (3+ years experience)
- Current Company: AV DEVS Solutions (Vasna-Bhayli Road, Bhayli, Vadodara, Gujarat, India)
- Previous Company: TenUp Software (Vadodara) as Frontend Engineer
- Location: Vadodara, Gujarat, India
- Core Competencies: React, TypeScript, JavaScript (ES6+), Next.js, Redux / Redux Toolkit, REST API Integration, HTML5, CSS3, Tailwind CSS, SCSS, Responsive Web Design, Component Architecture, Vite, Web Performance, Core Web Vitals, Cross-Browser Compatibility, Gemini AI & Voice Transcriber Integration.
- Work History:
  1. AV DEVS Solutions (2023 - Present) as Software Engineer (Bhayli, Vadodara):
     - Engineered scalable web applications, enterprise client portals, and interactive dashboards using React, TypeScript, and Tailwind CSS.
     - Architected modular, reusable UI components and client solutions adhering to strict maintainability and accessibility standards.
     - Collaborated closely with backend engineers, designers, and project managers to integrate complex REST APIs and optimize asynchronous state flows.
     - Tuned frontend build processes and performance, achieving sub-second page loads and outstanding Lighthouse metrics.
  2. TenUp Software (2022 - 2023) as Frontend Engineer (Vadodara):
     - Developed interactive, responsive web user interfaces for client-facing products with React, JavaScript, and Tailwind CSS.
     - Implemented dynamic data charts, client routing, and robust API integrations.
     - Performed comprehensive mobile and cross-browser testing for uniform user experience.
     - Refactored legacy UI components into clean, maintainable modern functional components.
  3. Web Development & Engineering (2021 - 2022) as Junior Web Developer / Intern:
     - Built semantic HTML5/CSS3 web layouts, landing pages, and interactive client widgets.
     - Implemented frontend form validations and asynchronous data fetching.
- Featured Projects:
  - AV DEVS Client Portal & Analytics (React, TypeScript, Tailwind CSS, Recharts, REST APIs): Centralized enterprise web portal for operational analytics and client workflows.
  - ShopPulse E-Commerce Suite (React, Next.js, Redux Toolkit, Tailwind CSS): High-performance shopping UI with real-time catalog filters and quick checkout.
  - DevSync Collaborative Platform (React, TypeScript, Tailwind CSS): Collaborative task and sprint workspace with interactive Kanban boards and activity feeds.
- Contact: prerugharge19@gmail.com, based in Vadodara, India.

Tone & Personality:
- Friendly, professional, sharp, articulate, and passionate about software engineering.
- Be technically precise, offering real insights into software architecture, frontend optimization, component design, and problem solving.
- Keep answers concise, clear, and well-structured with markdown when helpful.
- When asked about collaboration, hiring, or projects, warmly invite them to connect via email at prerugharge19@gmail.com or via the Contact section.`,

  tech_architect: `You are an elite Senior Frontend Architect & Technical Consultant.
You assist developers, engineers, and tech leaders with:
- React architecture (React 19, hooks lifecycle, server components, state management libraries, rendering optimizations).
- Angular best practices (Signals, standalone components, RxJS patterns, reactive state).
- Modern TypeScript (type gymnastics, type-safe APIs, utility types, strict typing).
- CSS Architecture & Design Systems (Tailwind CSS, tokens, fluid typography, dark mode, accessible components).
- Frontend Performance & Core Web Vitals (INP/FID, LCP, CLS, virtualization, code splitting, memoization, tree-shaking).

Guidelines:
- Provide actionable, clean, modern code snippets.
- Explain "why" behind architectural choices and trade-offs.
- Keep explanations structured, elegant, and directly applicable.`,

  mock_interviewer: `You are a Principal Frontend Engineering Interviewer conducting a mock technical interview for a frontend engineering position (mid-to-senior level).
Your task:
- Evaluate the candidate's understanding of modern frontend technologies (JavaScript/TypeScript, React/Angular, CSS/Layout, Web Performance, Browser Internals, and Frontend System Design).
- Ask clear, thought-provoking questions one or two at a time.
- After the user answers, provide constructive, encouraging feedback, highlight any nuances they missed, and ask a relevant follow-up question.
- Keep the interview interactive, engaging, and supportive.`,
};

// 1. Multi-turn Chat API using Gemini
app.post('/api/chat', async (req, res) => {
  try {
    const { messages, model = 'gemini-3.5-flash', role = 'portfolio_twin' } = req.body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'Messages array is required.' });
    }

    // Select model according to prompt specifications:
    // - gemini-3.1-pro-preview for particularly complex tasks
    // - gemini-3.5-flash for general tasks
    // - gemini-3.1-flash-lite for tasks that should happen fast
    let selectedModel = 'gemini-3.5-flash';
    if (model === 'gemini-3.1-pro-preview') {
      selectedModel = 'gemini-3.1-pro-preview';
    } else if (model === 'gemini-3.1-flash-lite') {
      selectedModel = 'gemini-3.1-flash-lite';
    } else {
      selectedModel = 'gemini-3.5-flash';
    }

    const systemInstruction = SYSTEM_INSTRUCTIONS[role] || SYSTEM_INSTRUCTIONS.portfolio_twin;

    // Convert messages to Gemini SDK contents format
    const contents = messages.map((m: any) => ({
      role: m.role === 'model' || m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: String(m.text || m.content || '') }],
    }));

    const response = await ai.models.generateContent({
      model: selectedModel,
      contents,
      config: {
        systemInstruction,
      },
    });

    const reply = response.text || 'I did not receive an answer from the model.';

    return res.json({
      text: reply,
      modelUsed: selectedModel,
      roleUsed: role,
    });
  } catch (error: any) {
    console.error('Chat error:', error);
    let errMsg = error?.message || 'Failed to process chat message with Gemini.';
    try {
      const parsed = JSON.parse(errMsg);
      if (parsed?.error?.message) {
        errMsg = parsed.error.message;
      }
    } catch {
      // not JSON string
    }
    return res.status(500).json({
      error: errMsg,
    });
  }
});

// 2. Audio Transcription API using gemini-3.5-transcribe
app.post('/api/transcribe', async (req, res) => {
  try {
    const { audioData, mimeType = 'audio/webm', prompt } = req.body;

    if (!audioData) {
      return res.status(400).json({ error: 'Audio data is required for transcription.' });
    }

    // Strip data URL scheme if included
    const base64Data = audioData.includes('base64,')
      ? audioData.split('base64,')[1]
      : audioData;

    const audioPart = {
      inlineData: {
        mimeType: mimeType || 'audio/webm',
        data: base64Data,
      },
    };

    const textPrompt =
      prompt || 'Please accurately transcribe this audio recording into text. Preserve punctuation and language.';

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-transcribe',
      contents: {
        parts: [audioPart, { text: textPrompt }],
      },
    });

    const transcription = response.text || '';

    return res.json({
      transcription,
      modelUsed: 'gemini-3.5-transcribe',
    });
  } catch (error: any) {
    console.error('Transcription error:', error);
    let errMsg = error?.message || 'Failed to transcribe audio with gemini-3.5-transcribe.';
    try {
      const parsed = JSON.parse(errMsg);
      if (parsed?.error?.message) {
        errMsg = parsed.error.message;
      }
    } catch {
      // not JSON string
    }
    return res.status(500).json({
      error: errMsg,
    });
  }
});

// Server setup: Vite middlewares in dev, static files in production
async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

startServer();
