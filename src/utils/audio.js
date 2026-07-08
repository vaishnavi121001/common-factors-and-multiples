import { audioMap } from './audioMap';

const elevenLabsCache = new Map();
let currentQueue = Symbol('queue');
let globalAudioInstance = null;

const STYLE_SETTINGS = {
  celebration: { stability: 0.12, similarity_boost: 0.45, style: 0.75, use_speaker_boost: true },
  encouragement: { stability: 0.16, similarity_boost: 0.50, style: 0.65, use_speaker_boost: true },
  question: { stability: 0.20, similarity_boost: 0.55, style: 0.55, use_speaker_boost: true },
  emphasis: { stability: 0.16, similarity_boost: 0.50, style: 0.60, use_speaker_boost: true },
  thinking: { stability: 0.24, similarity_boost: 0.60, style: 0.35, use_speaker_boost: true },
  statement: { stability: 0.20, similarity_boost: 0.55, style: 0.50, use_speaker_boost: true },
  instruction: { stability: 0.20, similarity_boost: 0.55, style: 0.50, use_speaker_boost: true },
};

export async function getAudioUrl(text, style = 'statement', apiKey = import.meta.env.VITE_ELEVENLABS_API_KEY) {
  if (audioMap && audioMap[text]) {
    return audioMap[text];
  }

  const cacheKey = `${text}::${style}`;
  if (elevenLabsCache.has(cacheKey)) {
    return elevenLabsCache.get(cacheKey);
  }

  if (!apiKey) return null;

  const styleSettings = STYLE_SETTINGS[style] || STYLE_SETTINGS.statement;
  try {
    const response = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/Xb7hH8MSUJpSbSDYk0k2`,
      {
        method: 'POST',
        headers: {
          'xi-api-key': apiKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text,
          model_id: 'eleven_multilingual_v2',
          voice_settings: styleSettings,
        }),
      }
    );

    if (!response.ok) return null;

    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    elevenLabsCache.set(cacheKey, url);
    return url;
  } catch (e) {
    console.error("Dynamic audio fetch failed:", e);
    return null;
  }
}

export async function playAudio(url) {
  return new Promise((resolve) => {
    if (globalAudioInstance) {
      globalAudioInstance.pause();
    }
    globalAudioInstance = new Audio(url);
    globalAudioInstance.onended = resolve;
    globalAudioInstance.onerror = resolve;
    globalAudioInstance.play().catch(resolve);
  });
}

export function stopNarration() {
  currentQueue = Symbol('queue');
  if (globalAudioInstance) {
    globalAudioInstance.pause();
    globalAudioInstance.currentTime = 0;
    globalAudioInstance = null;
  }
}

export async function narrate(segments, onSegmentStart) {
  const apiKey = import.meta.env.VITE_ELEVENLABS_API_KEY;
  const myQueue = Symbol('queue');
  currentQueue = myQueue;

  for (let i = 0; i < segments.length; i++) {
    if (currentQueue !== myQueue) break;

    const { text, style } = segments[i];
    const url = await getAudioUrl(text, style, apiKey);
    
    if (currentQueue !== myQueue) break;

    // Eager preload
    if (i + 1 < segments.length) {
      getAudioUrl(segments[i + 1].text, segments[i + 1].style, apiKey).catch(() => {});
    }

    if (url) {
      if (onSegmentStart) onSegmentStart(i);
      await playAudio(url);
    }
  }
}

// Helpers
export const say = (text) => ({ text, style: 'statement' });
export const ask = (text) => ({ text, style: 'question' });
export const cheer = (text) => ({ text, style: 'celebration' });
export const emphasize = (text) => ({ text, style: 'emphasis' });
export const think = (text) => ({ text, style: 'thinking' });
export const celebrate = (text) => ({ text, style: 'celebration' });
export const instruct = (text) => ({ text, style: 'instruction' });
