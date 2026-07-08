export default function StarRating({ score, maxScore = 10 }) {
  const percentage = score / maxScore;
  let stars = 0;
  if (percentage >= 0.6) stars = 1;
  if (percentage >= 0.8) stars = 2;
  if (percentage === 1.0) stars = 3;

  return (
    <div className="star-rating" style={{ display: 'flex', gap: 4 }}>
      {[1, 2, 3].map(i => (
        <span key={i} style={{ 
          fontSize: '1.5rem', 
          color: i <= stars ? 'var(--gold)' : 'rgba(255, 255, 255, 0.2)',
          textShadow: i <= stars ? '0 0 10px rgba(255, 193, 7, 0.5)' : 'none'
        }}>
          ★
        </span>
      ))}
    </div>
  );
}
