import { useEffect, useState, useCallback } from 'react';

const elevenLabsCache = new Map();
let globalAudioInstance = null;
let currentAbortController = null;

export function useAudio(text, style = 'statement', autoPlay = true) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState(null);

  const stopAudio = useCallback(() => {
    if (globalAudioInstance) {
      globalAudioInstance.pause();
      globalAudioInstance.currentTime = 0;
      globalAudioInstance = null;
    }
    if (currentAbortController) {
      currentAbortController.abort();
      currentAbortController = null;
    }
    setIsPlaying(false);
  }, []);

  const playAudio = useCallback(async (forcedText) => {
    const textToPlay = forcedText || text;
    if (!textToPlay) return;

    stopAudio();
    setIsPlaying(true);
    setError(null);

    const apiKey = import.meta.env.VITE_ELEVENLABS_API_KEY;
    if (!apiKey) {
      console.warn('VITE_ELEVENLABS_API_KEY is missing. Audio playback skipped.');
      setIsPlaying(false);
      return;
    }

    const cacheKey = `${textToPlay}::${style}`;
    let url = elevenLabsCache.get(cacheKey);

    if (!url) {
      currentAbortController = new AbortController();
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
              text: textToPlay,
              model_id: 'eleven_multilingual_v2',
              voice_settings: {
                stability: 0.75,
                similarity_boost: 0.75,
                style: 0.0,
                use_speaker_boost: true
              },
            }),
            signal: currentAbortController.signal
          }
        );

        if (!response.ok) {
          throw new Error('ElevenLabs API error');
        }

        const blob = await response.blob();
        url = URL.createObjectURL(blob);
        elevenLabsCache.set(cacheKey, url);
      } catch (err) {
        if (err.name === 'AbortError') {
          // fetch aborted, ignore
        } else {
          setError(err);
        }
        setIsPlaying(false);
        return;
      }
    }

    if (!url) {
        setIsPlaying(false);
        return;
    }

    globalAudioInstance = new Audio(url);
    globalAudioInstance.onended = () => {
      setIsPlaying(false);
      globalAudioInstance = null;
    };
    globalAudioInstance.onerror = () => {
      setIsPlaying(false);
      globalAudioInstance = null;
    };
    
    globalAudioInstance.play().catch(e => {
        console.warn('Audio playback prevented by browser policy or error:', e);
        setIsPlaying(false);
    });

  }, [text, style, stopAudio]);

  useEffect(() => {
    if (autoPlay && text) {
      playAudio();
    }
    return () => {
      stopAudio();
    };
  }, [text, autoPlay, playAudio, stopAudio]);

  return { playAudio, stopAudio, isPlaying, error };
}
