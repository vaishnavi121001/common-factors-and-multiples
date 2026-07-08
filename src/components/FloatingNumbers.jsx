import { useMemo } from 'react';

const NUMBERS = [1, 2, 3, 4, 6, 8, 9, 10, 12, 15, 16, 18, 20, 24];

export default function FloatingNumbers() {
  const items = useMemo(() => {
    return NUMBERS.map((n, i) => ({
      n,
      top: `${(i * 7.1 + 3) % 95}%`,
      left: `${(i * 13.7 + 5) % 93}%`,
      size: `${2.2 + (i % 4) * 0.7}rem`,
      duration: `${16 + (i % 7) * 4}s`,
      delay: `${-(i * 2.3)}s`,
    }));
  }, []);

  return (
    <div className="floating-numbers" aria-hidden="true">
      {items.map((item, i) => (
        <div
          key={i}
          className="floating-number"
          style={{
            top: item.top,
            left: item.left,
            fontSize: item.size,
            animationDuration: item.duration,
            animationDelay: item.delay,
          }}
        >
          {item.n}
        </div>
      ))}
    </div>
  );
}
