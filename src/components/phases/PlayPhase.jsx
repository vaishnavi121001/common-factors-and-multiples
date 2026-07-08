import { useState, useEffect } from 'react';
import { narrate } from '../../utils/audio';
import { ask, celebrate } from '../../utils/audio';

import QuestionRenderer from '../quiz/QuestionRenderer';

import XPTracker from '../gamification/XPTracker';
import StreakCounter from '../gamification/StreakCounter';
import BadgePanel from '../gamification/BadgePanel';

import { questionBank } from '../../data/questionBank';

export default function PlayPhase({ onNext, audioEnabled }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [xp, setXp] = useState(0);
  const [streak, setStreak] = useState(0);
  const [badges, setBadges] = useState([]);

  useEffect(() => {
    if (audioEnabled) {
      narrate([
        ask("Welcome to IntelliPlay! Solve fifty exciting challenges.")
      ]);
    }
  }, [audioEnabled]);

  const handleCorrect = () => {
    setXp(prev => prev + 10);
    setStreak(prev => prev + 1);

    if (currentQuestion + 1 < questionBank.length) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      narrate([
        celebrate("Fantastic! You completed all fifty questions.")
      ]);
      onNext();
    }
  };

  const handleWrong = () => {
    setStreak(0);

    if (currentQuestion + 1 < questionBank.length) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      onNext();
    }
  };
  const missionNumber = Math.floor(currentQuestion / 10) + 1;

  const missionNames = [
    "💎 Crystal Core",
    "🌀 Portal Nexus",
    "⚡ Energy Reactor",
    "🔮 Infinity Vault",
    "👑 Final Dimension"
  ];

  return (
    <div className="phase-wrapper">

      <h1 className="text-display-lg text-blue-bright">
        🏆 IntelliPlay Challenge
      </h1>

      <p className="text-instruction">
        Complete all 50 questions to become a Common Factors Champion.
      </p>

      <div
        style={{
          display: 'flex',
          gap: 20,
          justifyContent: 'center',
          marginTop: 20,
          marginBottom: 30,
          flexWrap: 'wrap'
        }}
      >
        <XPTracker xp={xp} />

        <StreakCounter streak={streak} />

        <BadgePanel badges={badges} />
      </div>

      <div
        style={{
          textAlign: "center",
          marginBottom: 20
        }}
      >
        <div
          style={{
            fontSize: 14,
            color: "#38bdf8",
            fontWeight: 700,
            letterSpacing: 2
          }}
        >
          INTELLIPLAY MISSION {missionNumber}
        </div>

        <h2
          style={{
            color: "white",
            margin: "8px 0"
          }}
        >
          {missionNames[missionNumber - 1]}
        </h2>

        <div
          style={{
            color: "#94a3b8"
          }}
        >
          Challenge {(currentQuestion % 10) + 1} / 10
        </div>
      </div>

      <progress
        value={currentQuestion + 1}
        max={questionBank.length}
        style={{
          width: '70%',
          height: '14px',
          marginBottom: 30
        }}
      />

      <QuestionRenderer
        question={questionBank[currentQuestion]}
        onAnswer={(isCorrect) => {
          if (isCorrect) {
            handleCorrect();
          } else {
            handleWrong();
          }
        }}
      />

    </div>
  );
}