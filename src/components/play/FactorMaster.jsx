import { useState, useEffect } from "react";
import "./FactorMaster.css";
import CompletionScreen from "./CompletionScreen";
import { narrate, celebrate, ask, say } from "../../utils/audio";

const LEVELS = [
    {
        type: "GCF",
        title: "Greatest Common Factor",
        num1: 12,
        num2: 18,
        options: [2, 3, 4, 6, 9, 12],
        correct: 6,
        prompt: "Find the LARGEST factor they both share."
    },
    {
        type: "LCM",
        title: "Least Common Multiple",
        num1: 4,
        num2: 6,
        options: [8, 12, 16, 18, 24, 30],
        correct: 12,
        prompt: "Find the SMALLEST multiple they both share."
    },
    {
        type: "GCF",
        title: "Greatest Common Factor",
        num1: 16,
        num2: 24,
        options: [4, 6, 8, 12, 16, 24],
        correct: 8,
        prompt: "Find the LARGEST factor they both share."
    },
    {
        type: "LCM",
        title: "Least Common Multiple",
        num1: 3,
        num2: 5,
        options: [5, 10, 15, 20, 25, 30],
        correct: 15,
        prompt: "Find the SMALLEST multiple they both share."
    },
    {
        type: "GCF",
        title: "Greatest Common Factor",
        num1: 15,
        num2: 20,
        options: [2, 3, 4, 5, 10, 15],
        correct: 5,
        prompt: "Find the LARGEST factor they both share."
    }
];

export default function FactorMaster({ onComplete, onAnswer }) {
    const [level, setLevel] = useState(0);
    const [score, setScore] = useState(0);
    const [selected, setSelected] = useState(null);
    const [wrongAttempts, setWrongAttempts] = useState([]);
    const [status, setStatus] = useState(""); // "correct" | "wrong" | ""
    const [isFinished, setIsFinished] = useState(false);

    const currentLevel = LEVELS[level];

    useEffect(() => {
        setSelected(null);
        setWrongAttempts([]);
        setStatus("");
        narrate([ask(currentLevel.prompt)]);
    }, [level]);

    const handleSelect = (num) => {
        if (selected || status !== "") return;
        
        setSelected(num);
        if (num === currentLevel.correct) {
            setStatus("correct");
            setScore(prev => prev + 1);
            narrate([celebrate("You are a Master!")]);
            if (onAnswer) onAnswer(true);
            
            setTimeout(() => {
                if (level < LEVELS.length - 1) {
                    setLevel(prev => prev + 1);
                } else {
                    setIsFinished(true);
                }
            }, 3000);
        } else {
            setStatus("wrong");
            if (!wrongAttempts.includes(num)) {
                setWrongAttempts(prev => [...prev, num]);
            }
            narrate([say(`Not quite. The correct answer is ${currentLevel.correct}.`)]);
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

    if (isFinished) {
        return <CompletionScreen score={score} total={LEVELS.length} onNext={() => onComplete(score)} badgeTitle="Factor Master" />;
    }

    return (
        <div className="factor-master animate-fade-in">
            <div className="master-header">
                <h1 className="3d-title">🧙‍♂️ Factor Master</h1>
                <h2>{currentLevel.title}</h2>
                <p>
                    Numbers: <b>{currentLevel.num1}</b> & <b>{currentLevel.num2}</b>
                </p>
                <p className="master-prompt">{currentLevel.prompt}</p>
                
                <div className="progress-info-3d" style={{ marginTop: 15 }}>
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

            {status && (
                <div className={`feedback-banner-3d ${status === 'correct' ? 'success-feedback' : 'fail-feedback'}`}>
                    {status === 'correct' ? "✨ Correct! Master Unlocked! ✨" : `❌ Wrong! The correct answer is ${currentLevel.correct}. ❌`}
                </div>
            )}

            <div className="runes-grid">
                {currentLevel.options.map(num => {
                    const isSelected = selected === num;
                    const isWrong = isSelected && status === 'wrong';
                    const isCorrect = (isSelected && status === 'correct') || (status !== "" && num === currentLevel.correct);

                    return (
                        <button
                            key={num}
                            className={`rune-card ${isSelected ? 'selected' : ''} ${isWrong ? 'wrong' : ''} ${isCorrect ? 'correct' : ''}`}
                            onClick={() => handleSelect(num)}
                            disabled={selected !== null || status !== ""}
                        >
                            <span className="rune-glow"></span>
                            {num}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
