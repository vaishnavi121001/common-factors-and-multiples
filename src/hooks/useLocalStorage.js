import { useEffect } from 'react';

const SESSION_KEY = 'intellia_common_factors_multiples_v1';
const EXPIRY_MS = 86400000; // 24 hours

export function saveSession(state) {
  try {
    const payload = {
      phase: state.phase,
      storyPanel: state.storyPanel,
      simStationsComplete: state.simStationsComplete,
      currentQuestion: state.currentQuestion,
      currentWorld: state.currentWorld,
      xp: state.xp,
      streak: state.streak,
      maxStreak: state.maxStreak,
      badges: state.badges,
      worldScores: state.worldScores,
      phaseComplete: state.phaseComplete,
      timestamp: Date.now(),
    };
    localStorage.setItem(SESSION_KEY, JSON.stringify(payload));
  } catch { /* Ignore storage errors */ }
}

export function loadSession() {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const saved = JSON.parse(raw);
    if (Date.now() - saved.timestamp > EXPIRY_MS) {
      localStorage.removeItem(SESSION_KEY);
      return null;
    }
    return saved;
  } catch {
    return null;
  }
}

export function clearSession() {
  try { localStorage.removeItem(SESSION_KEY); } catch { /* ignore */ }
}

/**
 * Hook: auto-saves state on every change
 */
export function useSessionPersistence(state) {
  useEffect(() => {
    saveSession(state);
  }, [state]);
}
