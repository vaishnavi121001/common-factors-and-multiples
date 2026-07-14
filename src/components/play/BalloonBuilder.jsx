import { useState, useEffect } from "react";
import "./BalloonBuilder.css";
import CompletionScreen from "./CompletionScreen";
import { narrate, celebrate, say } from "../../utils/audio";

const LEVELS = [
    { total: 12, options: [5, 7, 4, 8], correct: 4, label: "12 balloons" },
    { total: 18, options: [4, 5, 6, 8], correct: 6, label: "18 balloons" },
    { total: 15, options: [2, 4, 5, 7], correct: 5, label: "15 balloons" },
    { total: 24, options: [5, 7, 8, 9], correct: 8, label: "24 balloons" },
    { total: 16, options: [3, 4, 5, 6], correct: 4, label: "16 balloons" }
];

export default function BalloonBuilder({ onComplete, onAnswer }) {
    const [level, setLevel] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedGroup, setSelectedGroup] = useState(null);
    const [wrongAttempt, setWrongAttempt] = useState(null);
    const [isFinished, setIsFinished] = useState(false);
    const [feedback, setFeedback] = useState("");

    const currentLevel = LEVELS[level];
    const { total, options, correct } = currentLevel;

    useEffect(() => {
        setSelectedGroup(null);
        setWrongAttempt(null);
        setFeedback("");
    }, [level]);

    const handleSelectGroup = (num) => {
        if (selectedGroup || wrongAttempt) return;

        if (num === correct) {
            setSelectedGroup(num);
            setScore(prev => prev + 1);
            setFeedback("Correct! Perfect equal groups!");
            narrate([celebrate("Perfect!"), say(`Yes, ${total} balloons make ${num} equal groups of ${total/num}.`)]);
            if (onAnswer) onAnswer(true);
            
            setTimeout(() => {
                if (level < LEVELS.length - 1) {
                    setLevel(prev => prev + 1);
                } else {
                    setIsFinished(true);
                }
            }, 3000);
        } else {
            setWrongAttempt(num);
            setFeedback(`Encouraging Hint: ${total} cannot be shared equally into ${num} groups.`);
            narrate([say(`Hmm, we can't divide ${total} equally into ${num} groups. Try finding a factor.`)]);
            if (onAnswer) onAnswer(false);
            
            setTimeout(() => {
                if (level < LEVELS.length - 1) {
                    setLevel(prev => prev + 1);
                } else {
                    setIsFinished(true);
                }
            }, 3000);
        }
    };

    // Calculate balloon positions
    const balloons = [];
    const containerWidth = 600;
    const containerHeight = 300;
    const balloonSize = 50;

    const groupToUse = selectedGroup || wrongAttempt || null;

    for (let i = 0; i < total; i++) {
        let left = 0;
        let top = 0;

        if (!groupToUse || groupToUse === wrongAttempt) {
            // Distribute in a messy cluster
            const cols = Math.ceil(Math.sqrt(total));
            const rows = Math.ceil(total / cols);
            const r = Math.floor(i / cols);
            const c = i % cols;
            
            const xSpacing = containerWidth / cols;
            const ySpacing = containerHeight / rows;
            
            const jitterX = (i * 17 % 20) - 10;
            const jitterY = (i * 23 % 20) - 10;

            left = c * xSpacing + xSpacing / 2 - balloonSize / 2 + jitterX;
            top = r * ySpacing + ySpacing / 2 - balloonSize / 2 + jitterY;
        } else {
            // Group them correctly
            const groups = groupToUse;
            const perGroup = total / groups;
            
            const groupIndex = Math.floor(i / perGroup);
            const itemInGroup = i % perGroup;

            const cols = Math.ceil(Math.sqrt(groups));
            const rows = Math.ceil(groups / cols);
            
            const gR = Math.floor(groupIndex / cols);
            const gC = groupIndex % cols;

            const groupW = containerWidth / cols;
            const groupH = containerHeight / rows;

            const gCenterX = gC * groupW + groupW / 2;
            const gCenterY = gR * groupH + groupH / 2;

            const angle = (itemInGroup / perGroup) * Math.PI * 2;
            const radius = Math.min(groupW, groupH) * 0.25;

            left = gCenterX + Math.cos(angle) * radius - balloonSize / 2;
            top = gCenterY + Math.sin(angle) * radius - balloonSize / 2;
        }

        balloons.push({ id: i, left, top });
    }

    if (isFinished) {
        return <CompletionScreen score={score} total={LEVELS.length} onNext={() => onComplete(score)} badgeTitle="Equalizer" />;
    }

    return (
        <div className="balloon-builder-3d animate-fade-in">
            <div className="builder-header-3d">
                <h1 className="3d-title">🎈 Balloon Group Builder</h1>
                <p className="3d-subtitle">
                    Select a group size that equally divides <b>{total} balloons</b>.
                </p>
                <div className="progress-info-3d" style={{ marginTop: 10 }}>
                    <div className="progress-bar-bg">
                        <div 
                            className="progress-bar-fill" 
                            style={{ width: `${((level) / LEVELS.length) * 100}%` }}
                        ></div>
                    </div>
                    <div className="progress-text">
                        Question {level + 1} of {LEVELS.length}
                    </div>
                </div>
            </div>

            {feedback && (
                <div className={`feedback-banner-3d ${selectedGroup ? 'success-feedback' : 'fail-feedback'}`}>
                    {feedback}
                </div>
            )}

            <div className="controls-3d">
                {options.map(num => {
                    const isCorrect = selectedGroup === num;
                    const isWrong = wrongAttempt === num;
                    return (
                        <button
                            key={num}
                            className={`group-btn-3d ${isCorrect ? 'found' : ''} ${isWrong ? 'wrong' : ''}`}
                            onClick={() => handleSelectGroup(num)}
                            disabled={selectedGroup !== null || wrongAttempt !== null}
                        >
                            {num} Groups
                        </button>
                    )
                })}
            </div>

            <div className="balloon-arena-3d">
                {balloons.map((b) => (
                    <div
                        key={b.id}
                        className={`balloon-3d ${wrongAttempt ? 'shake-balloon' : ''}`}
                        style={{
                            left: b.left,
                            top: b.top
                        }}
                    >
                        <div className="balloon-body"></div>
                        <div className="balloon-string"></div>
                    </div>
                ))}
            </div>
        </div>
    );
}