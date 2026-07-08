import { useEffect, useState } from 'react';

export default function FeedbackOverlay({ isCorrect, xpEarned = 0, message, explanation, onContinue }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
  }, []);

  return (
    <div className="feedback-overlay" onClick={onContinue}>
      <div className={`feedback-card ${isCorrect ? 'correct-card' : 'incorrect-card'}`} onClick={e => e.stopPropagation()}>
        <div className="feedback-emoji">
          {isCorrect ? '🎉' : '💪'}
        </div>
        <div className="text-feedback" style={{ color: isCorrect ? 'var(--green-light)' : 'var(--gold-light)', marginBottom: 12 }}>
          {message || (isCorrect ? 'Amazing! That\'s correct!' : 'Not quite — keep trying!')}
        </div>
        {explanation && (
          <div className="text-instruction" style={{ marginBottom: 16 }}>
            {explanation}
          </div>
        )}
        {isCorrect && xpEarned > 0 && (
          <div className="feedback-xp-float" style={{ position: 'relative', animation: 'floatUp 1.5s ease forwards' }}>
            +{xpEarned} XP
          </div>
        )}
        <button className={`btn ${isCorrect ? 'btn-green' : 'btn-primary'}`} onClick={onContinue} style={{ marginTop: 16 }}>
          {isCorrect ? 'Continue →' : 'Try Again'}
        </button>
      </div>
    </div>
  );
}
