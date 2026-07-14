import { useEffect } from 'react';
import ProgressMap from './components/ProgressMap';
import IntroPhase from './components/phases/IntroPhase';
import WonderPhase from './components/phases/WonderPhase';
import StoryPhase from './components/phases/StoryPhase';
import SimulatePhase from './components/phases/SimulatePhase';
import PlayPhase from './components/phases/PlayPhase';
import ReflectPhase from './components/phases/ReflectPhase';
import useGameState from './hooks/useGameState';
import { stopNarration, narrate } from './utils/audio';
import { landingNarration } from './utils/narration';

export default function App() {
  const { gameState, setPhase, completePhase, toggleAudio } = useGameState();
  const { phase, audioEnabled, phaseComplete } = gameState;

  useEffect(() => {
    return () => {
      stopNarration();
    };
  }, [phase]);

  useEffect(() => {
    if (!audioEnabled) {
      stopNarration();
    }
  }, [audioEnabled]);

  useEffect(() => {
    if (phase === 'intro' && audioEnabled) {
      narrate(landingNarration());
    }
  }, [phase, audioEnabled]);

  const handleStart = () => setPhase('wonder');
  const handleWonderBack = () => setPhase('intro');
  const handleStoryBack = () => setPhase('wonder');
  const handleSimulateBack = () => setPhase('story');
  const handlePlayBack = () => setPhase('simulate');
  const handleReflectBack = () => setPhase('play');

  const handleWonderNext = () => { completePhase('wonder'); setPhase('story'); };
  const handleStoryNext = () => { completePhase('story'); setPhase('simulate'); };
  const handleSimulateNext = () => { completePhase('simulate'); setPhase('play'); };
  const handlePlayNext = () => { completePhase('play'); setPhase('reflect'); };
  const handleReflectComplete = () => { completePhase('reflect'); };

  const renderPhaseContent = () => {
    switch (phase) {
      case 'intro': return <IntroPhase onStart={handleStart} audioEnabled={audioEnabled} />;
      case 'wonder': return <WonderPhase onNext={handleWonderNext} onBack={handleWonderBack} audioEnabled={audioEnabled} />;
      case 'story': return <StoryPhase onNext={handleStoryNext} onBack={handleStoryBack} audioEnabled={audioEnabled} />;
      case 'simulate': return <SimulatePhase onNext={handleSimulateNext} onBack={handleSimulateBack} audioEnabled={audioEnabled} />;
      case 'play': return <PlayPhase onNext={handlePlayNext} onBack={handlePlayBack} audioEnabled={audioEnabled} />;
      case 'reflect': return <ReflectPhase onComplete={handleReflectComplete} onBack={handleReflectBack} audioEnabled={audioEnabled} />;
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
            {/* The audio button is now global floating, so we don't need it here */}
          </div>
        </header>
      )}

      <main className="phase-main" key={phase}>
        {renderPhaseContent()}
      </main>

      {/* Floating Audio Button in corner */}
      <button
        onClick={toggleAudio}
        title={audioEnabled ? 'Mute' : 'Unmute'}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          background: audioEnabled ? '#38bdf8' : '#94a3b8',
          border: 'none',
          borderRadius: '50%',
          width: '60px',
          height: '60px',
          fontSize: '28px',
          cursor: 'pointer',
          boxShadow: '0 4px 15px rgba(0,0,0,0.4)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.3s ease'
        }}
        onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
        onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
      >
        {audioEnabled ? '🔊' : '🔇'}
      </button>
    </div>
  );
}
