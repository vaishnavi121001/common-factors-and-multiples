import React, { useEffect } from 'react';
import './IntroPhase.css';
import { narrate } from '../../utils/audio';
import { say } from '../../utils/audio';

export default function IntroPhase({ onStart, audioEnabled }) {
  useEffect(() => {
    if (audioEnabled) {
      narrate([say("Welcome! Let's explore common factors and common multiples.")]);
    }
  }, [audioEnabled]);

  return (
    <div className="intro-container">
      <div className="grade-chip">✨ Grade 4 Maths</div>
      <h1 className="main-title">
        Common Factors <span className="highlight">and</span> Common Multiples
      </h1>
      <p className="subtitle">Lesson 5.3 • Understanding Common Factors</p>

      <div className="avatar-section">
        <div className="avatar-circle">👱</div>
        <div className="chat-bubble">Let's explore numbers! 🧮</div>
      </div>

      <p className="description">
        Learn to identify <strong>common factors</strong> and <strong>common multiples</strong>, group items, and solve problems like a pro!
      </p>

      <div className="journey-card">
        <h3 className="journey-title">YOUR LEARNING JOURNEY</h3>
        <div className="journey-steps">
          <div className="step-item">
            <div className="step-icon">🔍</div>
            <div className="step-text">
              <span className="step-name">Wonder</span>
              <span className="step-desc">A number mystery!</span>
            </div>
          </div>
          <div className="step-arrow">→</div>
          <div className="step-item">
            <div className="step-icon">📖</div>
            <div className="step-text">
              <span className="step-name">Story</span>
              <span className="step-desc">Visit the fun fair</span>
            </div>
          </div>
          <div className="step-arrow">→</div>
          <div className="step-item">
            <div className="step-icon">🧪</div>
            <div className="step-text">
              <span className="step-name">Simulate</span>
              <span className="step-desc">Build with blocks</span>
            </div>
          </div>
          <div className="step-arrow">→</div>
          <div className="step-item">
            <div className="step-icon">🎮</div>
            <div className="step-text">
              <span className="step-name">Play</span>
              <span className="step-desc">Gamified challenges</span>
            </div>
          </div>
          <div className="step-arrow">→</div>
          <div className="step-item">
            <div className="step-icon">📓</div>
            <div className="step-text">
              <span className="step-name">Reflect</span>
              <span className="step-desc">What did you learn?</span>
            </div>
          </div>
        </div>
      </div>

      <button className="btn-begin" onClick={onStart}>🚀 Begin Your Journey!</button>

      <div className="feature-cards">
        <div className="feature-card">
          <span className="feature-icon">🔢</span>
          Common Factors
        </div>
        <div className="feature-card">
          <span className="feature-icon">✖️</span>
          Common Multiples
        </div>
        <div className="feature-card">
          <span className="feature-icon">✨</span>
          Badges & XP
        </div>
      </div>
    </div>
  );
}
