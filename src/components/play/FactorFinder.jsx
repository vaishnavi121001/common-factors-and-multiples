import { useState, useEffect } from "react";
import "./FactorFinder.css";
import CompletionScreen from "./CompletionScreen";
import { narrate, celebrate, say } from "../../utils/audio";

const LEVELS = [
    { num1: 12, num2: 18, options: [4, 5, 6, 9], correct: 6 },
    { num1: 8,  num2: 12, options: [3, 4, 5, 6], correct: 4 },
    { num1: 15, num2: 20, options: [2, 3, 5, 6], correct: 5 },
    { num1: 10, num2: 15, options: [2, 3, 4, 5], correct: 5 },
    { num1: 24, num2: 36, options: [5, 8, 9, 12], correct: 12 }
];

export default function FactorFinder({ onComplete, onAnswer }) {
    const [level, setLevel] = useState(0);
    const [score, setScore] = useState(0);
    const [selected, setSelected] = useState(null); // the clicked option
    const [status, setStatus] = useState(""); // "correct" | "wrong" | ""
    const [isFinished, setIsFinished] = useState(false);

    const currentLevel = LEVELS[level];
    const { num1, num2, options, correct } = currentLevel;

    useEffect(() => {
        setSelected(null);
        setStatus("");
    }, [level]);

    const handleSelect = (num) => {
        if (selected) return; // Only allow one click per question

        setSelected(num);
        const isCommon = num === correct;

        if (isCommon) {
            setStatus("correct");
            setScore(prev => prev + 1);
            narrate([celebrate("Excellent work!"), say(`${num} is indeed a common factor of ${num1} and ${num2}.`)]);
            if (onAnswer) onAnswer(true);
        } else {
            setStatus("wrong");
            narrate([say(`Not quite. ${num} is not a common factor. ${correct} is a common factor of ${num1} and ${num2}.`)]);
            if (onAnswer) onAnswer(false);
        }

        // Auto load next question after feedback animation
        setTimeout(() => {
            if (level < LEVELS.length - 1) {
                setLevel(prev => prev + 1);
            } else {
                setIsFinished(true);
            }
        }, 3000);
    };

    if (isFinished) {
        return <CompletionScreen score={score} total={LEVELS.length} onNext={() => onComplete(score)} badgeTitle="Factor Finder" />;
    }

    return (
        <div className="factor-finder-3d animate-fade-in">
            <div className="finder-header">
                <h1 className="3d-title">🔍 Common Factor Match</h1>
                <p className="3d-subtitle">
                    Which of these is a <b>common factor</b> of 
                    <span className="number-badge">{num1}</span> and 
                    <span className="number-badge">{num2}</span>?
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

            {status && (
                <div className={`feedback-banner-3d ${status === 'correct' ? 'success-feedback' : 'fail-feedback'}`}>
                    {status === 'correct' ? "✨ Correct! That's a Common Factor! ✨" : "❌ Good try! That is not a common factor. ❌"}
                </div>
            )}

            <div className="number-grid-3d">
                {options.map(num => {
                    const isSelected = selected === num;
                    const isCorrect = isSelected && status === 'correct';
                    const isWrong = isSelected && status === 'wrong';

                    let cardClass = "";
                    if (isCorrect) cardClass = "correct";
                    else if (isWrong) cardClass = "wrong";

                    return (
                        <button
                            key={num}
                            className={`number-card-3d ${cardClass}`}
                            onClick={() => handleSelect(num)}
                            disabled={selected !== null}
                        >
                            <span className="card-content">{num}</span>
                            <div className="card-shadow"></div>
                            <div className="card-glow"></div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
