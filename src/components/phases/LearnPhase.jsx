import { useEffect } from "react";
import { narrate } from "../../utils/audio";
import { reflectNarration } from "../../utils/narration";

export default function ReflectPhase({
  onComplete,
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
        justifyContent: "center",
        alignItems: "center",
        padding: 30
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 700,
          textAlign: "center",
          background: "#ffffff",
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
            color: "#2563EB",
            marginBottom: 15,
            fontSize: "2.5rem"
          }}
        >
          Congratulations!
        </h1>

        <p
          style={{
            fontSize: "1.2rem",
            color: "#555",
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
            background: "#F3F4F6",
            borderRadius: 16,
            padding: 20,
            marginBottom: 35
          }}
        >
          <h3 style={{ color: "#111827", marginBottom: 10 }}>
            🌟 What You Learned
          </h3>

          <p style={{ color: "#4B5563", margin: 0 }}>
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