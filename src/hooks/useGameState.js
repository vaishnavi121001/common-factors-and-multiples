import { useReducer, useCallback } from 'react';

const initialState = {
  phase: 'intro',
  storyPanel: 0,
  currentSimStation: 0,
  simStationsComplete: [false, false, false],
  simRound: 0,
  questionSet: [],
  currentQuestion: 0,
  currentWorld: 0,
  worldScores: Array(10).fill(null),
  hintsUsed: 0,
  attemptCount: 0,
  xp: 0,
  totalStars: 0,
  streak: 0,
  maxStreak: 0,
  badges: [],
  vennSortPerfect: false,
  meetingPointFound: 0,
  phaseComplete: { wonder: false, story: false, simulate: false, play: false, reflect: false },
  audioEnabled: true,
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_PHASE':
      return { ...state, phase: action.payload };
    case 'COMPLETE_PHASE':
      return { ...state, phaseComplete: { ...state.phaseComplete, [action.payload]: true } };
    case 'TOGGLE_AUDIO':
      return { ...state, audioEnabled: !state.audioEnabled };
    case 'RESET_SESSION':
      return { ...initialState };
    default:
      return state;
  }
}

export default function useGameState() {
  const [gameState, dispatch] = useReducer(reducer, initialState);

  const setPhase = useCallback((phase) => dispatch({ type: 'SET_PHASE', payload: phase }), []);
  const completePhase = useCallback((phase) => dispatch({ type: 'COMPLETE_PHASE', payload: phase }), []);
  const toggleAudio = useCallback(() => dispatch({ type: 'TOGGLE_AUDIO' }), []);
  const resetGame = useCallback(() => dispatch({ type: 'RESET_SESSION' }), []);

  return { gameState, setPhase, completePhase, toggleAudio, resetGame, dispatch };
}
