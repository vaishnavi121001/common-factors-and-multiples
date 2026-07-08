import { useState, useEffect } from 'react';
import ArrayGrid from '../shared/ArrayGrid';
import { narrate, stopNarration } from '../../utils/audio';
import { stationAIntroNarration, commonFactorFoundNarration, notCommonFactorNarration } from '../../utils/narration';

const ROUNDS = [
  { a: 8, b: 12, commonFactors: [1, 2, 4] },
  { a: 12, b: 18, commonFactors: [1, 2, 3, 6] },
  { a: 15, b: 20, commonFactors: [1, 5] },
  { a: 24, b: 36, commonFactors: [1, 2, 3, 4, 6, 12] },
];

export default function ArrayYardStation({ onComplete, audioEnabled }) {
  const [roundIdx, setRoundIdx] = useState(0);
  const [rowSize, setRowSize] = useState(2);
  const [discoveredCF, setDiscoveredCF] = useState([1]); // 1 is free
  const [showBanner, setShowBanner] = useState(false);

  const round = ROUNDS[roundIdx];
  const isDivisibleA = round.a % rowSize === 0;
  const isDivisibleB = round.b % rowSize === 0;
  const isCommon = isDivisibleA && isDivisibleB;

  useEffect(() => {
    if (audioEnabled) narrate(stationAIntroNarration());
    return () => stopNarration();
  }, [roundIdx, audioEnabled]);

  const handleCheck = () => {
    if (isCommon && !discoveredCF.includes(rowSize)) {
      setDiscoveredCF(prev => [...prev, rowSize].sort((a, b) => a - b));
      setShowBanner(true);
      if (audioEnabled) narrate(commonFactorFoundNarration(rowSize));
      setTimeout(() => setShowBanner(false), 2500);
    } else if (!isCommon) {
      if (audioEnabled) narrate(notCommonFactorNarration());
    }
  };

  const remainingCF = round.commonFactors.filter(f => f !== 1 && !discoveredCF.includes(f));
  const roundDone = remainingCF.length === 0;

  const handleNextRound = () => {
    if (roundIdx < ROUNDS.length - 1) {
      setRoundIdx(roundIdx + 1);
      setRowSize(2);
      setDiscoveredCF([1]);
    } else {
      onComplete();
    }
  };

  return (
    <div className="flex-col gap-24 w-full" style={{ alignItems: 'center' }}>
      <h3 className="text-display-md">🏗️ Array Yard</h3>
      <p className="text-instruction text-center" style={{ maxWidth: 500 }}>
        Pick a row size. If it divides <strong style={{ color: 'var(--factor-a)' }}>both</strong> numbers evenly, you found a <span className="text-vocab">common factor</span>!
      </p>

      <div className="text-label">Round {roundIdx + 1} of {ROUNDS.length}: {round.a} and {round.b}</div>

      {/* Row size selector */}
      <div className="chip-row">
        {[2, 3, 4, 5, 6, 7, 8, 9, 10, 12].map(s => (
          <button
            key={s}
            className={`chip ${rowSize === s ? 'selected' : ''} ${discoveredCF.includes(s) ? 'correct' : ''}`}
            onClick={() => setRowSize(s)}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Two array grids side by side */}
      <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', justifyContent: 'center', width: '100%' }}>
        <ArrayGrid number={round.a} rowSize={rowSize} label={`${round.a} blocks`} color="factor-a" />
        <ArrayGrid number={round.b} rowSize={rowSize} label={`${round.b} blocks`} color="factor-b" />
      </div>

      {/* Check button */}
      <button className="btn btn-primary btn-sm" onClick={handleCheck} disabled={discoveredCF.includes(rowSize)}>
        {isCommon ? '✓ Common Factor!' : 'Check This Row Size'}
      </button>

      {/* Banner */}
      {showBanner && (
        <div className="cf-banner">
          <div className="cf-banner-text">🎉 {rowSize} is a Common Factor of {round.a} and {round.b}!</div>
        </div>
      )}

      {/* Discovered list */}
      <div style={{ width: '100%' }}>
        <div className="text-label text-center" style={{ marginBottom: 8 }}>Common Factors Found:</div>
        <div className="discovered-list">
          {discoveredCF.map(f => (
            <div key={f} className="discovered-badge">{f}</div>
          ))}
        </div>
      </div>

      {roundDone && (
        <button className="btn btn-green" onClick={handleNextRound}>
          {roundIdx < ROUNDS.length - 1 ? `Next Round →` : '✓ Station Complete!'}
        </button>
      )}
    </div>
  );
}
