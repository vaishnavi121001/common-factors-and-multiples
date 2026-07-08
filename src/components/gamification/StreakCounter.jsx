import { useState, useEffect } from 'react';

export default function StreakCounter({ streak }) {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (streak > 0) {
      setAnimate(true);
      const timer = setTimeout(() => setAnimate(false), 500);
      return () => clearTimeout(timer);
    }
  }, [streak]);

  if (streak === 0) return null;

  return (
    <div className={`streak-counter ${animate ? 'pulse' : ''}`} style={{
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      background: 'linear-gradient(135deg, #ff9800, #f44336)',
      padding: '6px 12px',
      borderRadius: 20,
      color: 'white',
      fontWeight: 800,
      boxShadow: '0 4px 10px rgba(244, 67, 54, 0.4)',
      fontFamily: 'Fredoka, sans-serif'
    }}>
      <span style={{ fontSize: '1.2rem' }}>🔥</span>
      <span>{streak} Streak!</span>
    </div>
  );
}
