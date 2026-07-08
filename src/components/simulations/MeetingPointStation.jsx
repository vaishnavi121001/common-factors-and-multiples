import { useState, useEffect } from 'react';
import DualNumberLine from '../shared/DualNumberLine';
import { getCommonMultiples } from '../../utils/mathHelpers';
import { narrate, stopNarration } from '../../utils/audio';
import { stationCIntroNarration, commonMultipleFoundNarration } from '../../utils/narration';

const ROUNDS = [
  { a: 3, b: 4, maxSteps: 8 },
  { a: 4, b: 6, maxSteps: 8 },
  { a: 5, b: 6, maxSteps: 8 },
];

export default function MeetingPointStation({ onComplete, onFoundCommon, audioEnabled }) {
  const [roundIdx, setRoundIdx] = useState(0);
  const [stepsRevealed, setStepsRevealed] = useState(0);
  const [discoveredCM, setDiscoveredCM] = useState([]);
  const [showBanner, setShowBanner] = useState(null);

  const round = ROUNDS[roundIdx];
  const allCommon = getCommonMultiples(round.a, round.b, 4, round.maxSteps * Math.max(round.a, round.b));

  useEffect(() => {
    if (audioEnabled) narrate(stationCIntroNarration());
    return () => stopNarration();
  }, [roundIdx, audioEnabled]);

  const handleStep = () => {
    if (stepsRevealed < round.maxSteps) {
      setStepsRevealed(s => s + 1);
    }
  };

  const handleTapCommon = (val) => {
    if (!discoveredCM.includes(val)) {
      setDiscoveredCM(prev => [...prev, val]);
      setShowBanner(val);
      if (onFoundCommon) onFoundCommon();
      if (audioEnabled) narrate(commonMultipleFoundNarration(val));
      setTimeout(() => setShowBanner(null), 2500);
    }
  };

  // Round is done when all common multiples visible on the line have been tapped
  const visibleCommon = allCommon.filter(cm => cm <= stepsRevealed * Math.max(round.a, round.b));
  const roundDone = visibleCommon.length > 0 && visibleCommon.every(cm => discoveredCM.includes(cm)) && stepsRevealed === round.maxSteps;

  const handleNextRound = () => {
    if (roundIdx < ROUNDS.length - 1) {
      setRoundIdx(roundIdx + 1);
      setStepsRevealed(0);
      setDiscoveredCM([]);
      setShowBanner(null);
    } else {
      onComplete();
    }
  };

  return (
    <div className="flex-col gap-24 w-full" style={{ alignItems: 'center' }}>
      <h3 className="text-display-md">⏱️ Meeting Point</h3>
      <p className="text-instruction text-center" style={{ maxWidth: 520 }}>
        Step through the number lines. When <strong style={{ color: 'var(--gold)' }}>both</strong> lines light up at the same number, tap it — that is a <span className="text-vocab">common multiple</span>!
      </p>

      <div className="text-label">Round {roundIdx + 1} of {ROUNDS.length}: Multiples of {round.a} and {round.b}</div>

      {/* Number Line */}
      <div style={{ width: '100%', overflowX: 'auto' }}>
        <DualNumberLine
          numberA={round.a}
          numberB={round.b}
          stepsRevealed={stepsRevealed}
          commonMultiples={allCommon}
          maxSteps={round.maxSteps}
          onTapCommon={handleTapCommon}
        />
      </div>

      {/* Step button */}
      <button
        className="btn btn-primary btn-sm"
        onClick={handleStep}
        disabled={stepsRevealed >= round.maxSteps}
      >
        {stepsRevealed >= round.maxSteps ? 'All steps revealed' : `⏩ Step Forward (${stepsRevealed}/${round.maxSteps})`}
      </button>

      {/* Banner */}
      {showBanner && (
        <div className="cf-banner">
          <div className="cf-banner-text">🎉 {showBanner} is a Common Multiple of {round.a} and {round.b}!</div>
        </div>
      )}

      {/* Discovered list */}
      <div style={{ width: '100%' }}>
        <div className="text-label text-center" style={{ marginBottom: 8 }}>Common Multiples Found:</div>
        <div className="discovered-list">
          {discoveredCM.map(m => (
            <div key={m} className="discovered-badge">{m}</div>
          ))}
          {discoveredCM.length === 0 && (
            <div style={{ color: 'var(--text-muted)', fontStyle: 'italic', fontSize: '0.9rem' }}>Step through and tap the glowing dots...</div>
          )}
        </div>
      </div>

      {roundDone && (
        <button className="btn btn-green" onClick={handleNextRound}>
          {roundIdx < ROUNDS.length - 1 ? 'Next Round →' : '✓ Station Complete!'}
        </button>
      )}
    </div>
  );
}
