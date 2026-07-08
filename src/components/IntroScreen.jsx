import { useEffect } from 'react';
import Mascot from './shared/Mascot';
import { narrate, stopNarration } from '../hooks/useAudio';
import { say, celebrate } from '../utils/narration';

const JOURNEY_PREVIEW = [
  { icon: '🔍', label: 'Wonder', desc: 'A curious question' },
  { icon: '📖', label: 'Story', desc: 'Learn the concept' },
  { icon: '🧪', label: 'Simulate', desc: 'Explore hands-on' },
  { icon: '🎮', label: 'Play', desc: '100 fun challenges' },
  { icon: '📓', label: 'Reflect', desc: 'What did you learn?' },
];

export default function IntroScreen({ onStart, audioEnabled }) {
  useEffect(() => {
    if (audioEnabled) {
      narrate([
        celebrate("Welcome to Common Factors and Common Multiples!"),
        say("Get ready for an exciting maths journey!"),
      ]);
    }
    return () => stopNarration();
  }, [audioEnabled]);

  return (
    <div className="phase-wrapper" style={{ justifyContent: 'center', paddingTop: 40 }}>
      <div className="glass-card flex-col gap-32 text-center" style={{ maxWidth: 700, width: '100%', alignItems: 'center' }}>

        {/* Mascot */}
        <Mascot mood="celebrating" size={110} />

        {/* Badge */}
        <div className="phase-badge simulate" style={{ marginBottom: -12 }}>
          Grade 4 Math • Lesson 5.3
        </div>

        {/* Title */}
        <h1 className="text-display-xl" style={{ lineHeight: 1.1 }}>
          Common Factors
          <br />
          <span style={{ fontSize: '0.6em', color: 'var(--text-secondary)' }}>&</span>
          <br />
          Common Multiples
        </h1>

        {/* Subtitle */}
        <p className="text-instruction text-center" style={{ maxWidth: 480 }}>
          Discover the special numbers that two numbers share!
          Find <span className="text-vocab">common factors</span> and <span className="text-vocab">common multiples</span> through
          stories, hands-on experiments, and 100 fun challenges.
        </p>

        {/* Journey Preview */}
        <div className="journey-preview" style={{ marginTop: 8 }}>
          {JOURNEY_PREVIEW.map((step, i) => (
            <div key={step.label} style={{ display: 'flex', alignItems: 'center' }}>
              <div className="journey-preview-step">
                <div className="journey-preview-dot">{step.icon}</div>
                <span className="journey-preview-label">{step.label}</span>
              </div>
              {i < JOURNEY_PREVIEW.length - 1 && <div className="journey-preview-connector" />}
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <button className="btn btn-primary btn-lg" onClick={onStart} id="start-learning-btn">
          🚀 Start Learning!
        </button>

        {/* Credit */}
        <div className="text-label" style={{ fontSize: '0.7rem' }}>
          Powered by Intellia SG • LearnFlow Engine
        </div>
      </div>
    </div>
  );
}
