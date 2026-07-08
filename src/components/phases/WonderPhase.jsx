import React, { useEffect } from 'react';
import './WonderPhase.css';

export default function WonderPhase({ onNext, audioEnabled }) {

  const speak = (text) => {
    if (!audioEnabled || !window.speechSynthesis) return;

    // Clear any previous speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 0.9;     // Comfortable speed for kids
    utterance.pitch = 1.0;
    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    if (audioEnabled) {
      const message = "Hi there! John has 12 candles and Sarah has 18 stickers. Can you help them figure out how to arrange them into equal rows? Let's go on an adventure to learn about common factors!";

      // Short delay so the user is ready
      const timer = setTimeout(() => speak(message), 500);
      return () => clearTimeout(timer);
    }
  }, [audioEnabled]);

  return (
    <div className="wonder-container">
      <div className="wonder-icon-circle">✨</div>

      <div className="avatar-section-small">
        <div className="avatar-circle-small">👱</div>
        <div className="chat-bubble-small">"Hmm... I wonder how we can share these equally? 🤔"</div>
      </div>

      <div className="wonder-card">
        <div className="wonder-card-icon">🏫</div>
        <h2 className="wonder-text">
          John has 12 candles and Sarah has 18 stickers. How can they set up their tables with equal rows?
        </h2>
        <p className="wonder-subtext">
          Let's learn how to find **Common Factors** to help them out!
        </p>
      </div>

      <button className="btn-discover" onClick={onNext}>
        ✨ Let's Discover! ✨
      </button>
    </div>
  );
}