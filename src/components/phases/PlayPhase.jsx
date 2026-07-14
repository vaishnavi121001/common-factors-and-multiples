import { useState, useEffect } from 'react';
import { narrate } from '../../utils/audio';
import { ask, celebrate } from '../../utils/audio';

import BalloonBuilder from "../play/BalloonBuilder";
import FactorFinder from "../play/FactorFinder";
import MultipleTracker from "../play/MultipleTracker";
import FactorMaster from "../play/FactorMaster";
import FinalChallenge from "../play/FinalChallenge";
import XPTracker from '../gamification/XPTracker';
import StreakCounter from '../gamification/StreakCounter';
import BadgePanel from '../gamification/BadgePanel';
import MissionGrid from "../play/MissionGrid";

import { missions } from '../../data/missions';

export default function PlayPhase({ onNext, onBack, audioEnabled }) {
  const [localMissions, setLocalMissions] = useState(missions);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [xp, setXp] = useState(0);
  const [streak, setStreak] = useState(0);
  const [badges, setBadges] = useState([]);
  const [selectedMission, setSelectedMission] = useState(null);

  useEffect(() => {
    if (audioEnabled) {
      narrate([
        ask("Welcome to IntelliPlay! Solve twenty-five exciting challenges.")
      ]);
    }
  }, [audioEnabled]);

  const handleAnswer = (isCorrect) => {
    if (isCorrect) {
      setXp(prev => prev + 10);
      setStreak(prev => prev + 1);
    } else {
      setStreak(0);
    }
    // Update global question index
    setCurrentQuestion(prev => prev + 1);
  };

  const handleMissionComplete = (score = 5) => {
    const stars = score === 5 ? 3 : score >= 3 ? 2 : score >= 1 ? 1 : 0;
    
    // Update localMissions state (unlock next, update stars)
    setLocalMissions(prev =>
      prev.map(m => {
        if (m.id === selectedMission.id) {
          return { ...m, stars };
        }
        if (m.id === selectedMission.id + 1) {
          return { ...m, locked: false };
        }
        return m;
      })
    );

    const nextMissionId = selectedMission.id + 1;
    if (nextMissionId <= 5) {
      const nextMission = missions.find(m => m.id === nextMissionId);
      setSelectedMission(nextMission);
      setCurrentQuestion(nextMission.start);
    } else {
      narrate([
        celebrate("All Challenges Complete!")
      ]);
      onNext(); // Proceed to Reflect phase
    }
  };

  if (!selectedMission) {
    return (
      <div className="phase-wrapper">
        <div style={{ padding: '20px' }}>
          <button onClick={onBack} style={{ padding: '10px 20px', borderRadius: '8px', border: 'none', background: 'rgba(255,255,255,0.1)', color: 'white', cursor: 'pointer', fontSize: '16px' }}>← Back</button>
        </div>
        <MissionGrid
          missions={localMissions}
          onMissionSelect={(mission) => {
            setSelectedMission(mission);
            setCurrentQuestion(mission.start);
          }}
        />
      </div>
    );
  }

  // Calculate current question within the 5 questions of the current mission
  const activeQuestionIndex = (currentQuestion % 5) + 1;

  return (
    <div className="phase-wrapper">
      <div style={{ padding: '20px', display: 'flex', justifyContent: 'space-between' }}>
        <button onClick={() => setSelectedMission(null)} style={{ padding: '10px 20px', borderRadius: '8px', border: 'none', background: 'rgba(255,255,255,0.1)', color: 'white', cursor: 'pointer', fontSize: '16px' }}>← Back to Missions</button>
      </div>

      <h1 className="text-display-lg text-blue-bright">
        🏆 Play Challenge
      </h1>

      <p className="text-instruction">
        Complete all 25 questions to become a Common Factors Champion.
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
          PLAY {selectedMission.id}
        </div>

        <h2
          style={{
            color: "white",
            margin: "8px 0"
          }}
        >
          {selectedMission.title}
        </h2>

        <div
          style={{
            color: "#94a3b8"
          }}
        >
          Question {Math.min(activeQuestionIndex, 5)} / 5
        </div>
      </div>

      <progress
        value={Math.min(activeQuestionIndex, 5)}
        max={5}
        style={{
          width: '70%',
          height: '14px',
          marginBottom: 30
        }}
      />

      {selectedMission?.id === 1 && (
        <BalloonBuilder onComplete={handleMissionComplete} onAnswer={handleAnswer} />
      )}

      {selectedMission?.id === 2 && (
        <FactorFinder onComplete={handleMissionComplete} onAnswer={handleAnswer} />
      )}

      {selectedMission?.id === 3 && (
        <MultipleTracker onComplete={handleMissionComplete} onAnswer={handleAnswer} />
      )}

      {selectedMission?.id === 4 && (
        <FactorMaster onComplete={handleMissionComplete} onAnswer={handleAnswer} />
      )}

      {selectedMission?.id === 5 && (
        <FinalChallenge onComplete={handleMissionComplete} onAnswer={handleAnswer} />
      )}

    </div>
  );
}