import { useEffect } from 'react';
import ProgressMap from './components/ProgressMap';
import IntroPhase from './components/phases/IntroPhase';
import WonderPhase from './components/phases/WonderPhase';
import StoryPhase from './components/phases/StoryPhase';
import SimulatePhase from './components/phases/SimulatePhase';
import PlayPhase from './components/phases/PlayPhase';
import ReflectPhase from './components/phases/ReflectPhase';
import useGameState from './hooks/useGameState';
import { stopNarration } from './utils/audio';

export default function App() {
  const { gameState, setPhase, completePhase, toggleAudio } = useGameState();
  const { phase, audioEnabled, phaseComplete } = gameState;

  // Stop narration on unmount or phase change
  useEffect(() => {
    return () => {
      stopNarration();
    };
  }, [phase]);

  const handleStart = () => setPhase('wonder');
  const handleWonderNext = () => { completePhase('wonder'); setPhase('story'); };
  const handleStoryNext = () => { completePhase('story'); setPhase('simulate'); };
  const handleSimulateNext = () => { completePhase('simulate'); setPhase('play'); };
  const handlePlayNext = () => { completePhase('play'); setPhase('reflect'); };
  const handleReflectComplete = () => { completePhase('reflect'); };

  const renderPhaseContent = () => {
    switch (phase) {
      case 'intro': return <IntroPhase onStart={handleStart} audioEnabled={audioEnabled} />;
      case 'wonder': return <WonderPhase onNext={handleWonderNext} audioEnabled={audioEnabled} />;
      case 'story': return <StoryPhase onNext={handleStoryNext} audioEnabled={audioEnabled} />;
      case 'simulate': return <SimulatePhase onNext={handleSimulateNext} audioEnabled={audioEnabled} />;
      case 'play': return <PlayPhase onNext={handlePlayNext} audioEnabled={audioEnabled} />;
      case 'reflect': return <ReflectPhase onComplete={handleReflectComplete} audioEnabled={audioEnabled} />;
      default: return <IntroPhase onStart={handleStart} audioEnabled={audioEnabled} />;
    }
  };

  const showTopBar = phase !== 'intro';

  return (
    <div className="app-container">
      {showTopBar && (
        <header className="top-bar">
          <div className="top-bar-left">
            <span className="top-bar-title">Common Factors & Multiples</span>
          </div>
          <ProgressMap currentPhase={phase} phaseComplete={phaseComplete} />
          <div className="top-bar-right">
            <button
              className="btn btn-outline btn-sm"
              onClick={toggleAudio}
              title={audioEnabled ? 'Mute' : 'Unmute'}
            >
              {audioEnabled ? '🔊' : '🔇'}
            </button>
          </div>
        </header>
      )}

      <main className="phase-main" key={phase}>
        {renderPhaseContent()}
      </main>
    </div>
  );
}
