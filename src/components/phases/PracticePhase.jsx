import { useAudio } from '../../hooks/useAudio';

export default function PracticePhase() {
  useAudio("Time for some practice questions! Answer correctly to build your streak and earn points.", "encouragement");
  return (
    <div className="phase-wrapper">
      <h1 className="text-display-lg text-blue-bright">Practice</h1>
      <p className="text-instruction mt-24">Solve the questions below.</p>
    </div>
  );
}
