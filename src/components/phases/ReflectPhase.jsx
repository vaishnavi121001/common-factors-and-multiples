import { useEffect } from "react";
import { narrate } from "../../utils/audio";
import { reflectNarration } from "../../utils/narration";

export default function ReflectPhase({
  onComplete,
  onBack,
  audioEnabled
}) {
  useEffect(() => {
    if (audioEnabled) {
      narrate(reflectNarration());
    }
  }, [audioEnabled]);

  return (
    <div
      className="phase-wrapper"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: 30
      }}
    >
      <div style={{ alignSelf: 'flex-start', marginBottom: '20px' }}>
        <button onClick={onBack} style={{ padding: '10px 20px', borderRadius: '8px', border: 'none', background: 'rgba(255,255,255,0.1)', color: 'white', cursor: 'pointer', fontSize: '16px' }}>← Back</button>
      </div>
      <div
        style={{
          width: "100%",
          maxWidth: 700,
          textAlign: "center",
          background: "#2a2e6cff",
          borderRadius: 24,
          padding: 50,
          boxShadow: "0 10px 30px rgba(0,0,0,0.15)"
        }}
      >
        <div
          style={{
            fontSize: 80,
            marginBottom: 20
          }}
        >
          🎉🏆
        </div>

        <h1
          style={{
            color: "#ffff",
            marginBottom: 15,
            fontSize: "2.5rem"
          }}
        >
          Congratulations!
        </h1>

        <p
          style={{
            fontSize: "1.2rem",
            color: "#c1bcbcff",
            lineHeight: 1.7,
            marginBottom: 35
          }}
        >
          You have successfully completed the
          <strong> Common Factors & Common Multiples </strong>
          lesson.
          <br />
          Great job! Keep practicing and continue learning new math concepts.
        </p>

        <div
          style={{
            background: "#0d224dff",
            borderRadius: 16,
            padding: 20,
            marginBottom: 35
          }}
        >
          <h3 style={{ color: "#98b4f0ff", marginBottom: 10 }}>
            🌟 What You Learned
          </h3>

          <p style={{ color: "#ffffff", margin: 0 }}>
            ✔ Identify Common Factors
            <br />
            ✔ Find Common Multiples
            <br />
            ✔ Solve Real-life Problems
            <br />
            ✔ Complete Interactive Challenges
          </p>
        </div>

        <button
          className="btn btn-primary"
          onClick={onComplete}
          style={{
            padding: "14px 40px",
            fontSize: "1rem"
          }}
        >
          Finish Lesson
        </button>
      </div>
    </div>
  );
}