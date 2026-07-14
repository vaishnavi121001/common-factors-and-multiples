import { useState, useEffect } from "react";
import "./FinalChallenge.css";
import CompletionScreen from "./CompletionScreen";
import { narrate, celebrate, say } from "../../utils/audio";

const ALL_QUESTIONS = [
    {
        id: 'q1',
        type: 'multiple-choice',
        q: "What is the Greatest Common Factor of 16 and 24?",
        options: [4, 6, 8, 12],
        correct: 8
    },
    {
        id: 'q2',
        type: 'multiple-choice',
        q: "What is the Least Common Multiple of 3 and 5?",
        options: [8, 10, 15, 30],
        correct: 15
    },
    {
        id: 'q3',
        type: 'sorting',
        q: "Sort these multiples of 4 from smallest to largest.",
        options: [16, 4, 12, 8],
        correctOrder: [4, 8, 12, 16]
    },
    {
        id: 'q4',
        type: 'matching',
        q: "Match the pairs: Number to its LCM with 2.",
        pairs: [
            { id: 'a', left: "3", right: "6" },
            { id: 'b', left: "5", right: "10" }
        ],
        leftItems: [{id:'a', val:"3"}, {id:'b', val:"5"}],
        rightItems: [{id:'b', val:"10"}, {id:'a', val:"6"}]
    },
    {
        id: 'q5',
        type: 'multiple-choice',
        q: "Which of the following is a common factor of 18 and 27?",
        options: [4, 6, 9, 12],
        correct: 9
    }
];

export default function FinalChallenge({ onComplete, onAnswer }) {
    const [questions, setQuestions] = useState([]);
    const [currentQ, setCurrentQ] = useState(0);
    const [score, setScore] = useState(0);
    const [isFinished, setIsFinished] = useState(false);
    const [status, setStatus] = useState(""); // "correct" | "wrong" | ""
    
    // For multiple choice
    const [selectedOpt, setSelectedOpt] = useState(null);

    // For sorting
    const [sortedItems, setSortedItems] = useState([]);
    
    // For matching
    const [selectedLeft, setSelectedLeft] = useState(null);
    const [selectedRight, setSelectedRight] = useState(null);
    const [matchedPairs, setMatchedPairs] = useState([]);

    useEffect(() => {
        const shuffled = [...ALL_QUESTIONS].sort(() => Math.random() - 0.5);
        setQuestions(shuffled);
    }, []);

    useEffect(() => {
        if (questions.length === 0) return;
        
        narrate([say(questions[currentQ].q)]);
        setSelectedOpt(null);
        setSortedItems([]);
        setSelectedLeft(null);
        setSelectedRight(null);
        setMatchedPairs([]);
        setStatus("");
    }, [currentQ, questions]);

    if (questions.length === 0) return null;

    const question = questions[currentQ];

    const nextQuestion = (isCorrect) => {
        if (isCorrect) {
            setStatus("correct");
            setScore(prev => prev + 1);
            narrate([celebrate("Correct!")]);
            if (onAnswer) onAnswer(true);
        } else {
            setStatus("wrong");
            narrate([say("Let's try the next one.")]);
            if (onAnswer) onAnswer(false);
        }

        setTimeout(() => {
            if (currentQ < questions.length - 1) {
                setCurrentQ(prev => prev + 1);
            } else {
                setIsFinished(true);
            }
        }, 2500);
    };

    // Multiple Choice
    const handleMCAnswer = (opt) => {
        if (selectedOpt !== null || status !== "") return;
        setSelectedOpt(opt);
        const isCorrect = opt === question.correct;
        nextQuestion(isCorrect);
    };

    // Sorting
    const handleSortClick = (opt) => {
        if (sortedItems.includes(opt) || status !== "") return;
        const newSorted = [...sortedItems, opt];
        setSortedItems(newSorted);

        if (newSorted.length === question.correctOrder.length) {
            const isCorrect = newSorted.every((val, index) => val === question.correctOrder[index]);
            nextQuestion(isCorrect);
        }
    };

    // Matching
    const handleMatchClick = (side, item) => {
        if (matchedPairs.includes(item.id) || status !== "") return;

        if (side === 'left') {
            setSelectedLeft(item);
        } else {
            setSelectedRight(item);
        }
    };

    useEffect(() => {
        if (selectedLeft && selectedRight) {
            if (selectedLeft.id === selectedRight.id) {
                setMatchedPairs(prev => [...prev, selectedLeft.id]);
                setSelectedLeft(null);
                setSelectedRight(null);
            } else {
                narrate([say("Try a different pair.")]);
                setTimeout(() => {
                    setSelectedLeft(null);
                    setSelectedRight(null);
                }, 800);
            }
        }
    }, [selectedLeft, selectedRight]);

    useEffect(() => {
        if (question?.type === 'matching' && matchedPairs.length === question.pairs.length && status === "") {
            nextQuestion(true);
        }
    }, [matchedPairs, question, status]);

    if (isFinished) {
        return <CompletionScreen score={score} total={questions.length} onNext={() => onComplete(score)} nextLabel="Finish Challenge 🏁" badgeTitle="Ultimate Champion" />;
    }

    return (
        <div className="final-challenge-3d animate-fade-in">
            <div className="quiz-header-3d">
                <h1 className="3d-title">⚔️ Ultimate Challenge</h1>
                <div className="progress-bar-3d">
                    <div className="progress-fill" style={{width: `${(currentQ / questions.length) * 100}%`}}></div>
                </div>
                <p>Question {currentQ + 1} of {questions.length}</p>
            </div>

            {status && (
                <div className={`feedback-banner-3d ${status === 'correct' ? 'success-feedback' : 'fail-feedback'}`}>
                    {status === 'correct' ? "✨ Correct Answer! ✨" : "❌ Wrong Answer! ❌"}
                </div>
            )}

            <div className="quiz-card-3d">
                <h2 className="question-text">{question.q}</h2>

                {question.type === 'multiple-choice' && (
                    <div className="options-grid-3d">
                        {question.options.map((opt, i) => {
                            const isSelected = selectedOpt === opt;
                            const isCorrect = isSelected && status === 'correct';
                            const isWrong = isSelected && status === 'wrong';
                            let btnClass = "";
                            if (isCorrect) btnClass = "correct";
                            else if (isWrong) btnClass = "wrong";

                            return (
                                <button
                                    key={i}
                                    className={`mc-btn-3d ${btnClass}`}
                                    onClick={() => handleMCAnswer(opt)}
                                    disabled={selectedOpt !== null || status !== ""}
                                >
                                    <span className="btn-front">{opt}</span>
                                </button>
                            );
                        })}
                    </div>
                )}

                {question.type === 'sorting' && (
                    <div className="sorting-container-3d">
                        <p className="hint-text">Click the numbers in order</p>
                        <div className="sort-items">
                            {question.options.map((opt, i) => {
                                const isSelected = sortedItems.includes(opt);
                                const sortIndex = sortedItems.indexOf(opt) + 1;
                                return (
                                    <button
                                        key={i}
                                        className={`sort-btn-3d ${isSelected ? 'selected' : ''}`}
                                        onClick={() => handleSortClick(opt)}
                                        disabled={status !== ""}
                                    >
                                        <span className="btn-front">{opt}</span>
                                        {isSelected && <div className="sort-badge">{sortIndex}</div>}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                )}

                {question.type === 'matching' && (
                    <div className="matching-container-3d">
                        <div className="match-column">
                            {question.leftItems.map((item, i) => {
                                const isSelected = selectedLeft?.id === item.id;
                                const isMatched = matchedPairs.includes(item.id);
                                return (
                                    <button
                                        key={`l-${i}`}
                                        className={`match-btn-3d ${isSelected ? 'selected' : ''} ${isMatched ? 'matched' : ''}`}
                                        onClick={() => handleMatchClick('left', item)}
                                        disabled={isMatched || status !== ""}
                                    >
                                        <span className="btn-front">{item.val}</span>
                                    </button>
                                );
                            })}
                        </div>
                        <div className="match-divider"></div>
                        <div className="match-column">
                            {question.rightItems.map((item, i) => {
                                const isSelected = selectedRight?.id === item.id;
                                const isMatched = matchedPairs.includes(item.id);
                                return (
                                    <button
                                        key={`r-${i}`}
                                        className={`match-btn-3d ${isSelected ? 'selected' : ''} ${isMatched ? 'matched' : ''}`}
                                        onClick={() => handleMatchClick('right', item)}
                                        disabled={isMatched || status !== ""}
                                    >
                                        <span className="btn-front">{item.val}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
