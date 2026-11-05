import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  try {
    const { audioData, mimeType = 'audio/webm', prompt } = req.body;

    if (!audioData) {
      return res.status(400).json({ error: 'Audio data is required for transcription.' });
    }

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
    return res.status(500).json({ error: errMsg });
  }
}
