export default function VennDiagram({ numberA, numberB, factorsA = [], factorsB = [], commonFactors = [], highlightCommon = true }) {
  const onlyA = factorsA.filter(f => !commonFactors.includes(f));
  const onlyB = factorsB.filter(f => !commonFactors.includes(f));

  return (
    <div className="venn-container" style={{ position: 'relative', width: '100%', maxWidth: 540, margin: '0 auto' }}>
      <svg viewBox="0 0 540 300" className="venn-svg">
        {/* Circle A */}
        <circle cx="200" cy="150" r="130" fill="var(--venn-a-fill)" stroke="var(--factor-a)" strokeWidth="2.5" />
        {/* Circle B */}
        <circle cx="340" cy="150" r="130" fill="var(--venn-b-fill)" stroke="var(--factor-b)" strokeWidth="2.5" />
        {/* Overlap tint */}
        <clipPath id="clipA"><circle cx="200" cy="150" r="130" /></clipPath>
        <circle cx="340" cy="150" r="130" fill="var(--venn-overlap)" clipPath="url(#clipA)" />

        {/* Labels */}
        <text x="140" y="38" textAnchor="middle" fill="var(--factor-a)" fontFamily="Fredoka, sans-serif" fontWeight="700" fontSize="16">
          Factors of {numberA}
        </text>
        <text x="400" y="38" textAnchor="middle" fill="var(--factor-b)" fontFamily="Fredoka, sans-serif" fontWeight="700" fontSize="16">
          Factors of {numberB}
        </text>
        <text x="270" y="285" textAnchor="middle" fill="var(--gold)" fontFamily="Fredoka, sans-serif" fontWeight="700" fontSize="14">
          Common
        </text>

        {/* Only A values */}
        {onlyA.map((f, i) => {
          const angle = (i / Math.max(onlyA.length, 1)) * Math.PI * 1.2 - Math.PI * 0.6;
          const cx = 160 + Math.cos(angle) * 60;
          const cy = 150 + Math.sin(angle) * 55;
          return (
            <g key={`oa-${f}`}>
              <circle cx={cx} cy={cy} r="20" fill="rgba(79,195,247,0.2)" stroke="var(--factor-a)" strokeWidth="1.5" />
              <text x={cx} y={cy + 5} textAnchor="middle" fill="var(--factor-a)" fontFamily="Fredoka, sans-serif" fontWeight="700" fontSize="15">{f}</text>
            </g>
          );
        })}

        {/* Common values */}
        {commonFactors.map((f, i) => {
          const yy = 110 + i * 38;
          return (
            <g key={`cf-${f}`}>
              <circle cx={270} cy={yy} r="20" fill={highlightCommon ? 'rgba(255,213,79,0.3)' : 'rgba(255,255,255,0.1)'} stroke={highlightCommon ? 'var(--gold)' : 'rgba(255,255,255,0.3)'} strokeWidth="2" />
              <text x={270} y={yy + 5} textAnchor="middle" fill={highlightCommon ? 'var(--gold)' : 'var(--text-primary)'} fontFamily="Fredoka, sans-serif" fontWeight="700" fontSize="15">{f}</text>
            </g>
          );
        })}

        {/* Only B values */}
        {onlyB.map((f, i) => {
          const angle = (i / Math.max(onlyB.length, 1)) * Math.PI * 1.2 - Math.PI * 0.6;
          const cx = 380 + Math.cos(angle) * 60;
          const cy = 150 + Math.sin(angle) * 55;
          return (
            <g key={`ob-${f}`}>
              <circle cx={cx} cy={cy} r="20" fill="rgba(165,214,167,0.2)" stroke="var(--factor-b)" strokeWidth="1.5" />
              <text x={cx} y={cy + 5} textAnchor="middle" fill="var(--factor-b)" fontFamily="Fredoka, sans-serif" fontWeight="700" fontSize="15">{f}</text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
