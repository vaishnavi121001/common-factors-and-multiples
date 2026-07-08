export default function ArrayGrid({ number, rowSize, label, color = 'factor-a' }) {
  const fullRows = Math.floor(number / rowSize);
  const remainder = number % rowSize;
  const isDivisible = remainder === 0;

  return (
    <div className="array-yard">
      <div className="array-yard-label" style={{ color: `var(--${color})` }}>
        {label || `${number} blocks`}
      </div>
      <div style={{ fontSize: '0.85rem', fontWeight: 700, color: isDivisible ? 'var(--green)' : 'var(--array-invalid)', marginBottom: 4 }}>
        {number} ÷ {rowSize} = {isDivisible ? `${fullRows} (exact!)` : `${fullRows} remainder ${remainder}`}
      </div>
      <div className={isDivisible ? 'array-grid-valid' : 'array-grid-invalid'}>
        <div className="array-grid">
          {Array.from({ length: fullRows }, (_, r) => (
            <div key={`row-${r}`} className="array-row">
              {Array.from({ length: rowSize }, (_, c) => (
                <div key={`b-${r}-${c}`} className={`array-block ${isDivisible ? 'valid' : 'invalid'}`} />
              ))}
            </div>
          ))}
          {remainder > 0 && (
            <div className="array-row">
              {Array.from({ length: remainder }, (_, c) => (
                <div key={`rem-${c}`} className="array-block remainder" />
              ))}
            </div>
          )}
        </div>
      </div>
      <div style={{ fontSize: '0.85rem', fontWeight: 700, marginTop: 4, color: isDivisible ? 'var(--green)' : 'var(--text-muted)' }}>
        {isDivisible ? `✓ ${rowSize} is a factor of ${number}` : `✗ ${rowSize} is NOT a factor of ${number}`}
      </div>
    </div>
  );
}
