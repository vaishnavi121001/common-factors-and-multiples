import { useState, useEffect } from 'react';
import { getFactors, getCommonFactors } from '../../utils/mathHelpers';
import { narrate, stopNarration } from '../../utils/audio';
import { stationBIntroNarration } from '../../utils/narration';
import { shuffleArray } from '../../utils/shuffle';

const ROUNDS = [
  { a: 8, b: 12 },
  { a: 18, b: 24 },
  { a: 30, b: 45 },
];

function classifyFactor(val, a, b) {
  const divA = a % val === 0;
  const divB = b % val === 0;
  if (divA && divB) return 'common';
  if (divA) return 'onlyA';
  if (divB) return 'onlyB';
  return 'neither';
}

export default function VennSortStation({ onComplete, onPerfectSort, audioEnabled }) {
  const [roundIdx, setRoundIdx] = useState(0);
  const round = ROUNDS[roundIdx];

  const [tiles, setTiles] = useState([]);
  const [placements, setPlacements] = useState({});
  const [checked, setChecked] = useState(false);
  const [mistakes, setMistakes] = useState(0);
  const [selectedTile, setSelectedTile] = useState(null);

  // Generate tiles on round change
  useEffect(() => {
    const factorsA = getFactors(round.a);
    const factorsB = getFactors(round.b);
    const allVals = new Set([...factorsA, ...factorsB]);
    // Add 1-2 distractor values
    let distractor = round.a + 1;
    while (allVals.has(distractor) || distractor > 50) distractor++;
    allVals.add(distractor);
    if (round.b + 2 <= 50) {
      let d2 = round.b + 2;
      while (allVals.has(d2)) d2++;
      if (d2 <= 50) allVals.add(d2);
    }
    setTiles(shuffleArray([...allVals]));
    setPlacements({});
    setChecked(false);
    setMistakes(0);
    setSelectedTile(null);
  }, [roundIdx, round.a, round.b]);

  useEffect(() => {
    if (audioEnabled) narrate(stationBIntroNarration());
    return () => stopNarration();
  }, [roundIdx, audioEnabled]);

  const handleZoneClick = (zone) => {
    if (selectedTile === null || checked) return;
    setPlacements(prev => ({ ...prev, [selectedTile]: zone }));
    setSelectedTile(null);
  };

  const handleCheck = () => {
    setChecked(true);
    let roundMistakes = 0;
    tiles.forEach(val => {
      const correct = classifyFactor(val, round.a, round.b);
      if (placements[val] !== correct) roundMistakes++;
    });
    setMistakes(roundMistakes);
    if (roundMistakes === 0 && onPerfectSort) onPerfectSort();
  };

  const handleNextRound = () => {
    if (roundIdx < ROUNDS.length - 1) {
      setRoundIdx(roundIdx + 1);
    } else {
      onComplete();
    }
  };

  const allPlaced = tiles.every(t => placements[t] !== undefined);
  const factorsA = getFactors(round.a);
  const factorsB = getFactors(round.b);
  const common = getCommonFactors(round.a, round.b);

  return (
    <div className="flex-col gap-24 w-full" style={{ alignItems: 'center' }}>
      <h3 className="text-display-md">🎯 Venn Sort</h3>
      <p className="text-instruction text-center" style={{ maxWidth: 520 }}>
        Tap a number, then tap the zone where it belongs. Numbers that divide <strong style={{ color: 'var(--gold)' }}>both</strong> go in the middle!
      </p>

      <div className="text-label">Round {roundIdx + 1} of {ROUNDS.length}: Factors of {round.a} and {round.b}</div>

      {/* Venn Zones (tap targets) */}
      <div style={{ position: 'relative', width: '100%', maxWidth: 560, margin: '0 auto' }}>
        <svg viewBox="0 0 560 280" style={{ width: '100%' }}>
          {/* Circle A */}
          <circle cx="200" cy="140" r="120" fill="var(--venn-a-fill)" stroke="var(--factor-a)" strokeWidth="2" style={{ cursor: 'pointer' }} onClick={() => handleZoneClick('onlyA')} />
          {/* Circle B */}
          <circle cx="360" cy="140" r="120" fill="var(--venn-b-fill)" stroke="var(--factor-b)" strokeWidth="2" style={{ cursor: 'pointer' }} onClick={() => handleZoneClick('onlyB')} />
          {/* Overlap zone */}
          <clipPath id="clipVennA"><circle cx="200" cy="140" r="120" /></clipPath>
          <circle cx="360" cy="140" r="120" fill="var(--venn-overlap)" clipPath="url(#clipVennA)" style={{ cursor: 'pointer' }} onClick={() => handleZoneClick('common')} />

          {/* Labels */}
          <text x="140" y="30" textAnchor="middle" fill="var(--factor-a)" fontFamily="Fredoka, sans-serif" fontWeight="700" fontSize="14">Only {round.a}</text>
          <text x="420" y="30" textAnchor="middle" fill="var(--factor-b)" fontFamily="Fredoka, sans-serif" fontWeight="700" fontSize="14">Only {round.b}</text>
          <text x="280" y="270" textAnchor="middle" fill="var(--gold)" fontFamily="Fredoka, sans-serif" fontWeight="700" fontSize="13">Common</text>

          {/* Placed tiles inside zones */}
          {tiles.filter(t => placements[t] === 'onlyA').map((t, i) => (
            <text key={t} x={130 + (i % 3) * 40} y={100 + Math.floor(i / 3) * 30} textAnchor="middle" fill="var(--factor-a)" fontFamily="Fredoka" fontWeight="700" fontSize="16">{t}</text>
          ))}
          {tiles.filter(t => placements[t] === 'common').map((t, i) => (
            <text key={t} x={260 + (i % 2) * 40} y={110 + Math.floor(i / 2) * 30} textAnchor="middle" fill="var(--gold)" fontFamily="Fredoka" fontWeight="700" fontSize="16">{t}</text>
          ))}
          {tiles.filter(t => placements[t] === 'onlyB').map((t, i) => (
            <text key={t} x={380 + (i % 3) * 40} y={100 + Math.floor(i / 3) * 30} textAnchor="middle" fill="var(--factor-b)" fontFamily="Fredoka" fontWeight="700" fontSize="16">{t}</text>
          ))}
        </svg>
        {/* Neither zone outside */}
        <button
          className="btn btn-outline btn-sm"
          onClick={() => handleZoneClick('neither')}
          style={{ position: 'absolute', bottom: -8, right: 0, fontSize: '0.8rem', minWidth: 100 }}
        >
          ❌ Neither
        </button>
      </div>

      {/* Tile tray */}
      <div className="venn-tray">
        {tiles.filter(t => placements[t] === undefined).map(t => {
          const isSelected = selectedTile === t;
          return (
            <button
              key={t}
              className={`venn-tile unplaced ${isSelected ? 'selected' : ''}`}
              style={isSelected ? { border: '2px solid var(--gold)', background: 'rgba(255,193,7,0.2)', color: 'var(--gold)' } : {}}
              onClick={() => setSelectedTile(isSelected ? null : t)}
            >
              {t}
            </button>
          );
        })}
        {tiles.every(t => placements[t] !== undefined) && !checked && (
          <div className="text-label" style={{ width: '100%', textAlign: 'center' }}>All placed! Check your sort.</div>
        )}
      </div>

      {/* Check / Results */}
      {!checked && allPlaced && (
        <button className="btn btn-primary" onClick={handleCheck}>
          ✓ Check My Sorting
        </button>
      )}

      {checked && (
        <div className="flex-col gap-12 text-center" style={{ alignItems: 'center' }}>
          {mistakes === 0 ? (
            <div className="cf-banner">
              <div className="cf-banner-text">🎉 Perfect Sort!</div>
            </div>
          ) : (
            <div className="hint-box" style={{ maxWidth: 400 }}>
              <div className="hint-box-label">⚠️ {mistakes} tile{mistakes > 1 ? 's' : ''} misplaced</div>
              <div className="hint-box-text">Common factors of {round.a} and {round.b}: {common.join(', ')}</div>
            </div>
          )}
          <button className="btn btn-green" onClick={handleNextRound}>
            {roundIdx < ROUNDS.length - 1 ? 'Next Round →' : '✓ Station Complete!'}
          </button>
        </div>
      )}
    </div>
  );
}
