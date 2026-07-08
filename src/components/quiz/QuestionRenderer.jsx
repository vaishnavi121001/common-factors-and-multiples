import { useState } from 'react';
import DualListDiagram from '../shared/DualListDiagram';

export default function QuestionRenderer({ question, onAnswer, hintsUsed }) {
  const [selected, setSelected] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [showHint, setShowHint] = useState(0);

  const handleSelect = (opt) => {
    if (submitted) return;
    setSelected(opt);
  };

  const handleSubmit = () => {
    if (selected === null) return;

    setSubmitted(true);

    const isCorrect =
      String(selected) === String(question.correctAnswer);

    setTimeout(() => {

      onAnswer(isCorrect);

      setSelected(null);
      setSubmitted(false);
      setShowHint(0);

    }, 1800);
  };

  const handleHint = () => {
    if (showHint < 3) setShowHint(showHint + 1);
  };

  const q = question;
  const isCorrect = submitted && String(selected) === String(q.correctAnswer);
  const isWrong = submitted && String(selected) !== String(q.correctAnswer);

  // Render True/False layout
  if (q.type === 'true_false_common') {
    return (
      <div className="flex-col gap-24 w-full" style={{ alignItems: 'center' }}>
        <div className="text-question">{q.questionText}</div>

        {showHint >= 1 && <div className="hint-box"><div className="hint-box-label">💡 Hint 1</div><div className="hint-box-text">{q.hint1}</div></div>}
        {showHint >= 2 && <div className="hint-box"><div className="hint-box-label">💡 Hint 2</div><div className="hint-box-text">{q.hint2}</div></div>}

        <div className="tf-options">
          {q.options.map(opt => {
            let cls = opt === 'True' ? 'tf-btn true-btn' : 'tf-btn false-btn';
            if (submitted && String(opt) === String(q.correctAnswer)) cls += ' correct';
            else if (submitted && String(opt) === String(selected) && String(opt) !== String(q.correctAnswer)) cls += ' incorrect';
            else if (!submitted && String(opt) === String(selected)) cls += ' selected';
            return (
              <button key={opt} className={cls} onClick={() => handleSelect(opt)}>
                {opt === 'True' ? '✓ True' : '✗ False'}
              </button>
            );
          })}
        </div>

        <div style={{ display: 'flex', gap: 12 }}>
          {!submitted && <button className="btn btn-outline btn-sm" onClick={handleHint} disabled={showHint >= 3}>💡 Hint</button>}
          {!submitted && <button className="btn btn-primary" onClick={handleSubmit} disabled={selected === null}>Submit</button>}
        </div>
      </div>
    );
  }

  // Render MCQ / Venn Placement / general
  return (
    <div
      className="glass-card"
      style={{
        width: "100%",
        maxWidth: 900,
        padding: 30,
        borderRadius: 24,
        textAlign: "center",
        background:
          "linear-gradient(180deg,#0f172a 0%, #111827 100%)",
        border: "2px solid rgba(0,255,255,.25)"
      }}
    >
      {/* Header */}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 25
        }}
      >
        <div>
          <div
            style={{
              color: "#67e8f9",
              fontWeight: 700,
              fontSize: 14
            }}
          >
            ⚡ INTELLIPLAY
          </div>

          <h2
            style={{
              color: "white",
              marginTop: 6
            }}
          >
            Crystal Core Mission
          </h2>
        </div>

        <div
          style={{
            background: "#1e293b",
            padding: "10px 18px",
            borderRadius: 16,
            color: "#38bdf8",
            fontWeight: 700
          }}
        >
          Mission
        </div>
      </div>

      {/* Crystal Area */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          margin: "40px 0",
          position: "relative"
        }}
      >
        {/* Left Crystal */}

        <div
          style={{
            width: 170,
            height: 170,
            borderRadius: "50%",
            background:
              "radial-gradient(circle,#67e8f9,#0f172a)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            boxShadow:
              "0 0 40px rgba(0,255,255,.6)",
            animation: "floatCrystal 3s ease-in-out infinite"
          }}
        >
          <div style={{ fontSize: 55 }}>💎</div>

          <h1 style={{ color: "white", margin: 0 }}>
            {q.numberA || q.a}
          </h1>
        </div>

        {/* Energy Beam */}

        <div
          style={{
            width: 180,
            height: 8,
            borderRadius: 20,
            background:
              "linear-gradient(90deg,#00e5ff,#38bdf8,#00e5ff)",
            boxShadow:
              "0 0 30px cyan",
            animation: "pulseBeam 1.5s infinite"
          }}
        />

        {/* Right Crystal */}

        <div
          style={{
            width: 170,
            height: 170,
            borderRadius: "50%",
            background:
              "radial-gradient(circle,#818cf8,#0f172a)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            boxShadow:
              "0 0 40px rgba(99,102,241,.7)",
            animation: "floatCrystal 3s ease-in-out infinite"
          }}
        >
          <div style={{ fontSize: 55 }}>💎</div>

          <h1 style={{ color: "white", margin: 0 }}>
            {q.numberB || q.b}
          </h1>
        </div>
      </div>

      {/* Question */}

      <h2
        style={{
          color: "white",
          marginBottom: 10
        }}
      >
        {q.questionText || q.text}
      </h2>

      <p
        style={{
          color: "#cbd5e1",
          marginBottom: 30
        }}
      >
        Restore the crystal energy by choosing the correct answer.
      </p>

      {/* Options */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2,1fr)",
          gap: 20
        }}
      >
        {(q.options || []).map((opt) => {

          const optStr = String(opt);

          let glow = "#334155";
          let bg = "#16213e";

          if (!submitted && String(selected) === optStr) {
            glow = "#00E5FF";
            bg = "#0f3460";
          }

          if (submitted && optStr === String(q.correctAnswer)) {
            glow = "#00ff88";
            bg = "#114b2c";
          }

          if (
            submitted &&
            optStr === String(selected) &&
            optStr !== String(q.correctAnswer)
          ) {
            glow = "#ff3b3b";
            bg = "#4b1111";
          }

          return (

            <button
              key={optStr}
              onClick={() => handleSelect(opt)}
              style={{
                background: bg,
                border: `3px solid ${glow}`,
                borderRadius: 24,
                padding: 22,
                cursor: "pointer",
                transition: ".35s",
                boxShadow: `0 0 25px ${glow}`,
                position: "relative",
                overflow: "hidden"
              }}
            >

              <div
                style={{
                  position: "absolute",
                  top: -20,
                  right: -20,
                  width: 70,
                  height: 70,
                  borderRadius: "50%",
                  background: "rgba(255,255,255,.08)"
                }}
              />

              <div
                style={{
                  fontSize: 50,
                  marginBottom: 10
                }}
              >
                💎
              </div>

              <div
                style={{
                  color: "white",
                  fontSize: 28,
                  fontWeight: 800
                }}
              >
                {opt}
              </div>

              <div
                style={{
                  color: "#9CA3AF",
                  marginTop: 8,
                  fontSize: 13
                }}
              >
                Energy Crystal
              </div>

            </button>

          );

        })}

      </div>

      {/* Hint */}

      {showHint > 0 && (
        <div
          style={{
            marginTop: 30,
            padding: 20,
            borderRadius: 18,
            background: "#172554",
            color: "white"
          }}
        >
          {showHint === 1 && q.hint1}

          {showHint === 2 && q.hint2}

          {showHint === 3 && q.explanation}
        </div>
      )}

      {/* Buttons */}

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 20,
          marginTop: 30
        }}
      >
        <button
          className="btn btn-outline"
          onClick={handleHint}
          disabled={showHint === 3}
        >
          💡 Hint
        </button>

        <button
          className="btn btn-primary"
          onClick={handleSubmit}
          disabled={selected == null}
        >
          ⚡ Activate Crystal
        </button>
      </div>
      {submitted && isCorrect && (

        <div className="success-box">

          <div className="success-icon">

            ⚡💎⚡

          </div>

          <h2>Crystal Activated!</h2>

          <p>

            Energy successfully restored.

          </p>

        </div>

      )}

      {submitted && isWrong && (

        <div className="fail-box">

          <div className="fail-icon">

            💥

          </div>

          <h2>Energy Failed</h2>

          <p>

            Try a better crystal.

          </p>

        </div>

      )}
    </div>
  );
}
