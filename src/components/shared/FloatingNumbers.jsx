import { useEffect, useState } from 'react';

export default function FloatingNumbers() {
  const [numbers, setNumbers] = useState([]);

  useEffect(() => {
    // Generate random numbers that float in the background
    const newNumbers = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      value: Math.floor(Math.random() * 50) + 1,
      left: Math.random() * 100,
      animationDuration: 15 + Math.random() * 20,
      animationDelay: Math.random() * -20,
      fontSize: 20 + Math.random() * 40
    }));
    setNumbers(newNumbers);
  }, []);

  return (
    <div className="floating-numbers-container" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', overflow: 'hidden', pointerEvents: 'none', zIndex: 0, opacity: 0.06 }}>
      {numbers.map(num => (
        <div key={num.id} className="floating-number" style={{
          position: 'absolute',
          left: `${num.left}%`,
          bottom: '-10%',
          fontSize: `${num.fontSize}px`,
          fontFamily: 'Fredoka, sans-serif',
          fontWeight: 900,
          color: '#fff',
          animation: `floatUp ${num.animationDuration}s linear infinite`,
          animationDelay: `${num.animationDelay}s`
        }}>
          {num.value}
        </div>
      ))}
      <style>{`
        @keyframes floatUp {
          0% { transform: translateY(0) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-120vh) rotate(360deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
