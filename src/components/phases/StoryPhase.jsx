import React, { useState } from 'react';
import './StoryPhase.css';
import { storyPanels } from '../../data/storyContent';

export default function StoryPhase({ onNext, audioEnabled }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const panel = storyPanels[currentIdx];

  const handleNext = () => {
    if (currentIdx < storyPanels.length - 1) setCurrentIdx(currentIdx + 1);
    else onNext();
  };

  const handlePrev = () => {
    if (currentIdx > 0) setCurrentIdx(currentIdx - 1);
  };

  return (
    <div className="story-wrapper">
      <div className="story-header">
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${((currentIdx + 1) / storyPanels.length) * 100}%` }}></div>
        </div>
        <div className="progress-text">{currentIdx + 1} / {storyPanels.length}</div>
      </div>

      <div className="story-card-large">
        <div className="story-image-side" style={{ padding: 0 }}>
          {panel.imageUrl ? (
             <img src={panel.imageUrl} alt={panel.text} style={{ width: '100%', height: '100%', objectFit: 'contain', backgroundColor: 'transparent' }} />
          ) : (
            <div className="image-placeholder">
              <span style={{ fontSize: '4rem' }}>🖼️</span>
              <p>Visual: {panel.visual}</p>
            </div>
          )}
        </div>

        <div className="story-content-side" style={{ position: 'relative' }}>
          {/* Audio Icon placed at the top right of the content side */}
          <div className="audio-icon" style={{ position: 'absolute', top: '24px', right: '24px', fontSize: '1.5rem', opacity: audioEnabled ? 1 : 0.4 }}>
             🔊
          </div>
          
          <h2 className="story-title">{panel.title || "The School Fair"}</h2>
          <p className="story-body">{panel.text}</p>

          <div className="story-highlight-box">
            ✨ "Let's find the common factors!" ✨
          </div>

          <div className="story-mascot-row">
            <div className="avatar-circle-tiny">👱</div>
            <div className="chat-bubble-tiny">Math is fun! 🧮</div>
          </div>
        </div>
      </div>

      <div className="story-controls">
        <button className="btn-story-nav" onClick={handlePrev} disabled={currentIdx === 0}>
          ← Back
        </button>

        <div className="story-dots">
          {storyPanels.map((_, i) => (
            <span key={i} className={`dot ${i === currentIdx ? 'active' : ''}`}></span>
          ))}
        </div>

        <button className="btn-story-next" onClick={handleNext}>
          Next →
        </button>
      </div>
    </div>
  );
}
