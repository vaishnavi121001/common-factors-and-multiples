import { useState, useEffect, useRef } from "react";
import "./MultipleTracker.css";
import CompletionScreen from "./CompletionScreen";
import { narrate, celebrate, say } from "../../utils/audio";

const LEVELS = [
    { num1: 2, num2: 3, max: 6 },
    { num1: 3, num2: 4, max: 12 },
    { num1: 2, num2: 5, max: 10 },
    { num1: 3, num2: 5, max: 15 },
    { num1: 4, num2: 5, max: 20 }
];

export default function MultipleTracker({ onComplete, onAnswer }) {
    const [level, setLevel] = useState(0);
    const [score, setScore] = useState(0);
    const [pos1, setPos1] = useState(0);
    const [pos2, setPos2] = useState(0);
    const [status, setStatus] = useState(""); // "correct" | "wrong" | ""
    const [isFinished, setIsFinished] = useState(false);
    
    // For 3D camera effect
    const [cameraX, setCameraX] = useState(0);
    const trackRef = useRef(null);

    const currentLevel = LEVELS[level];
    const { num1, num2, max } = currentLevel;

    useEffect(() => {
        setPos1(0);
        setPos2(0);
        setStatus("");
        setCameraX(0);
    }, [level]);

    // Update camera to follow the leading character
    useEffect(() => {
        const leadPos = Math.max(pos1, pos2);
        const slotWidth = 40; // width per slot
        const offset = Math.min(leadPos * slotWidth, max * slotWidth - 300);
        setCameraX(-offset * 0.5);
    }, [pos1, pos2, max]);

    const handleJump1 = () => {
        if (status) return;
        if (pos1 + num1 <= max) {
            setPos1(prev => prev + num1);
        }
    };

    const handleJump2 = () => {
        if (status) return;
        if (pos2 + num2 <= max) {
            setPos2(prev => prev + num2);
        }
    };

    // Check meeting point
    useEffect(() => {
        if (status) return;

        if (pos1 > 0 && pos1 === pos2) {
            setStatus("correct");
            setScore(prev => prev + 1);
            narrate([celebrate("Fantastic!"), say(`They both met at ${pos1}! That's a Common Multiple.`)]);
            if (onAnswer) onAnswer(true);
            
            setTimeout(() => {
                if (level < LEVELS.length - 1) {
                    setLevel(prev => prev + 1);
                } else {
                    setIsFinished(true);
                }
            }, 3000);
        } else if ((pos1 >= max && pos2 >= max) || (pos1 + num1 > max && pos2 + num2 > max && pos1 !== pos2)) {
            // Missed the meeting point
            setStatus("wrong");
            narrate([say(`Oops, they missed each other! The common multiple is ${max}.`)]);
            if (onAnswer) onAnswer(false);
            
            setTimeout(() => {
                if (level < LEVELS.length - 1) {
                    setLevel(prev => prev + 1);
                } else {
                    setIsFinished(true);
                }
            }, 3000);
        }
    }, [pos1, pos2, status, max, num1, num2, level]);

    const renderTrack = (currentPos, step, color, charType) => {
        const slots = [];
        for (let i = 0; i <= max; i++) {
            const isMultiple = i > 0 && i % step === 0;
            const isCommon = i === max; // The end/meeting point
            
            slots.push(
                <div 
                    key={i} 
                    className={`track-slot-3d ${isMultiple ? 'is-multiple' : ''} ${isCommon ? 'is-common' : ''}`}
                    style={{ '--slot-color': color }}
                >
                    <div className="slot-number">{i}</div>
                    {isCommon && <div className="slot-glow"></div>}
                </div>
            );
        }

        return (
            <div className="track-line-3d">
                {slots}
                <div 
                    className={`character-3d ${charType}`} 
                    style={{ 
                        transform: `translateX(${currentPos * 48}px) translateZ(10px)`, 
                        backgroundColor: color
                    }}
                >
                    <div className="char-shadow"></div>
                    <div className="char-body"></div>
                </div>
            </div>
        );
    };

    if (isFinished) {
        return <CompletionScreen score={score} total={LEVELS.length} onNext={() => onComplete(score)} badgeTitle="Multiple Racer" />;
    }

    return (
        <div className="multiple-tracker-3d animate-fade-in">
            <div className="tracker-header-3d">
                <h1 className="3d-title">🛤️ Common Multiple Race</h1>
                <p className="3d-subtitle">
                    Jump forward by <b>{num1}</b> and <b>{num2}</b>. Find where they meet!
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
                    {status === 'correct' ? `✨ Correct! They met at ${pos1}! ✨` : `❌ Missed! They didn't meet. ❌`}
                </div>
            )}

            <div className="race-arena">
                <div className="camera-view" style={{ transform: `translateX(${cameraX}px)` }}>
                    <div className="track-container" ref={trackRef}>
                        {renderTrack(pos1, num1, '#3b82f6', 'char-blue')}
                        {renderTrack(pos2, num2, '#ec4899', 'char-pink')}
                    </div>
                </div>
            </div>

            <div className="controls-3d">
                <button 
                    className="jump-btn-3d btn-blue" 
                    onClick={handleJump1} 
                    disabled={pos1 + num1 > max || status !== ""}
                >
                    Jump +{num1}
                </button>
                <button 
                    className="jump-btn-3d btn-pink" 
                    onClick={handleJump2} 
                    disabled={pos2 + num2 > max || status !== ""}
                >
                    Jump +{num2}
                </button>
            </div>
        </div>
    );
}
