import React, { useEffect } from 'react';
import './WonderPhase.css';
import { narrate } from '../../utils/audio';
import { wonderNarration } from '../../utils/narration';

export default function WonderPhase({ onNext, onBack, audioEnabled }) {

  useEffect(() => {
    if (audioEnabled) {
      narrate(wonderNarration());
    }
  }, [audioEnabled]);

  return (
    <div className="wonder-container">

      <div className="wonder-icon-circle">✨</div>

      <div className="avatar-section-small">
        <div className="avatar-circle-small">👱</div>
        <div className="chat-bubble-small">
          Hmm... I wonder how we can arrange these into equal groups. 🤔
        </div>
      </div>

      <div className="wonder-card">

        <div className="wonder-card-image">
          <img
            src="/assets/images/balloons-3d.png"
            alt="3D Balloons"
            className="balloon-image"
          />
        </div>

        <h2 className="wonder-text">
          Emma has <span className="highlight">12 balloons</span> and Liam has
          <span className="highlight"> 18 balloons</span>.
          <br /><br />
          What group sizes can both of them use without any balloons left over?
        </h2>

        <p className="wonder-subtext">
          Let's discover <strong>Common Factors</strong> and
          <strong> Common Multiples</strong> together!
        </p>

      </div>

      <div className="wonder-buttons">
        <button className="btn-back" onClick={onBack}>
          ← Back
        </button>

        <button className="btn-discover" onClick={onNext}>
          ✨ Let's Discover! ✨
        </button>
      </div>
    </div>
  );
}