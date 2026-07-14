import { useEffect } from 'react';
import './CompletionScreen.css';
import { celebrate } from '../../utils/audio';

export default function CompletionScreen({ score, total, onNext, nextLabel = "Next Game →", badgeTitle = "Master" }) {
  const stars = score === total ? 3 : score >= Math.ceil(total / 2) ? 2 : 1;
  const xp = score * 20;

  useEffect(() => {
    celebrate("Great job!");
  }, []);

  return (
    <div className="completion-screen-3d">
      <div className="certificate-card-3d">
        <div className="trophy-3d">🏆</div>
        <h1 className="cert-title">Challenge Cleared!</h1>
        <p className="cert-subtitle">You completed this play section!</p>
        
        <div className="stars-container-3d">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className={`star-3d ${i < stars ? 'earned' : ''}`}>
              <div className="star-inner">★</div>
            </div>
          ))}
        </div>
        
        <div className="stats-box-3d">
          <div className="stat-item">
            <span className="stat-label">Score</span>
            <span className="stat-value">{score} / {total}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">XP Earned</span>
            <span className="stat-value xp-color">+{xp}</span>
          </div>
        </div>
        
        <div className="badges-display">
          <div className="badge-3d">🏅 {badgeTitle}</div>
        </div>

        <button className="finish-btn-3d" onClick={onNext}>
          {nextLabel}
        </button>
        
        <div className="confetti-container">
          {[...Array(20)].map((_, i) => (
            <div key={i} className={`confetti c${i}`}></div>
          ))}
        </div>
      </div>
    </div>
  );
}
