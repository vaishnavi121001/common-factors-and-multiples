import React from 'react';

export default function DualListDiagram({ a, b, factorsA, factorsB }) {
  const common = factorsA.filter(f => factorsB.includes(f));

  return (
    <div className="dual-list-container" style={{ display: 'flex', justifyContent: 'center', gap: '40px', marginTop: '40px' }}>
      <div className="list-column">
        <h3 className="text-display-lg" style={{ color: '#4fc3f7', marginBottom: '24px' }}>Factors of {a}</h3>
        <div className="factor-list" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {factorsA.map(f => (
            <div key={`a-${f}`} className={`factor-chip ${common.includes(f) ? 'common' : ''}`} style={{
              background: common.includes(f) ? '#ffd54f' : 'rgba(255,255,255,0.1)',
              color: common.includes(f) ? '#000' : '#fff',
              padding: '12px 32px',
              borderRadius: '24px',
              fontFamily: 'Fredoka, sans-serif',
              fontSize: '2rem',
              fontWeight: 900,
              textAlign: 'center',
              boxShadow: common.includes(f) ? '0 0 15px rgba(255, 213, 79, 0.6)' : 'none'
            }}>
              {f}
            </div>
          ))}
        </div>
      </div>
      
      <div className="list-column">
        <h3 className="text-display-lg" style={{ color: '#81c784', marginBottom: '24px' }}>Factors of {b}</h3>
        <div className="factor-list" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {factorsB.map(f => (
            <div key={`b-${f}`} className={`factor-chip ${common.includes(f) ? 'common' : ''}`} style={{
              background: common.includes(f) ? '#ffd54f' : 'rgba(255,255,255,0.1)',
              color: common.includes(f) ? '#000' : '#fff',
              padding: '12px 32px',
              borderRadius: '24px',
              fontFamily: 'Fredoka, sans-serif',
              fontSize: '2rem',
              fontWeight: 900,
              textAlign: 'center',
              boxShadow: common.includes(f) ? '0 0 15px rgba(255, 213, 79, 0.6)' : 'none'
            }}>
              {f}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
