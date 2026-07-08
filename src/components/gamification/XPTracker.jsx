import { useState, useEffect } from 'react';

export default function XPTracker({ xp, onXpGained }) {
  const [displayedXp, setDisplayedXp] = useState(xp);
  const [floatingXp, setFloatingXp] = useState(null);

  useEffect(() => {
    if (xp > displayedXp) {
      const diff = xp - displayedXp;
      setFloatingXp(diff);
      const timer = setTimeout(() => {
        setDisplayedXp(xp);
        setFloatingXp(null);
      }, 1500);
      return () => clearTimeout(timer);
    } else {
      setDisplayedXp(xp);
    }
  }, [xp, displayedXp]);

  return (
    <div className="xp-tracker glass-card-sm" style={{ padding: '8px 16px', display: 'flex', alignItems: 'center', gap: 12, position: 'relative' }}>
      <div style={{ color: 'var(--gold)', fontWeight: 800, fontSize: '1.2rem', fontFamily: 'Fredoka, sans-serif' }}>
        ⭐ {displayedXp} XP
      </div>
      
      {floatingXp !== null && (
        <div className="xp-float" style={{ position: 'absolute', top: -30, right: 10, color: 'var(--green-light)', fontWeight: 800, fontSize: '1.5rem', textShadow: '0 2px 4px rgba(0,0,0,0.5)', zIndex: 10 }}>
          +{floatingXp} XP
        </div>
      )}
    </div>
  );
}
