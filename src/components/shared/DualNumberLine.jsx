export default function DualNumberLine({ numberA, numberB, stepsRevealed = 0, commonMultiples = [], maxSteps = 8, onTapCommon }) {
  const dotsA = Array.from({ length: maxSteps }, (_, i) => numberA * (i + 1));
  const dotsB = Array.from({ length: maxSteps }, (_, i) => numberB * (i + 1));
  const commonSet = new Set(commonMultiples);

  const renderLine = (dots, label, colorClass, labelClass) => (
    <div className="number-line-track">
      <div className={`number-line-label ${labelClass}`}>{label}</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 0, flex: 1, overflowX: 'auto', padding: '4px 0' }}>
        {dots.map((val, i) => {
          const isLit = i < stepsRevealed;
          const isCommon = isLit && commonSet.has(val);
          const dotClass = isCommon ? 'common' : isLit ? colorClass : 'unlit';

          return (
            <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
              <div
                className={`nl-dot ${dotClass}`}
                onClick={isCommon && onTapCommon ? () => onTapCommon(val) : undefined}
                style={{ animationDelay: isLit ? `${i * 0.08}s` : undefined }}
              >
                {isLit ? val : '?'}
              </div>
              {i < dots.length - 1 && <div className="nl-connector" />}
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="number-line-container">
      {renderLine(dotsA, `×${numberA}`, 'lit-a', 'nl-label-a')}
      {renderLine(dotsB, `×${numberB}`, 'lit-b', 'nl-label-b')}
    </div>
  );
}
