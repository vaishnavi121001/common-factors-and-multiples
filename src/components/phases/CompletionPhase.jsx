import { useAudio } from '../../hooks/useAudio';

export default function CompletionPhase() {
  useAudio("Congratulations! You have completed the module. You are a Common Ground Champion!", "celebration");
  return (
    <div className="phase-wrapper">
      <h1 className="text-display-lg text-gold">Completion</h1>
      <div className="completion-badge mt-40">🏆</div>
    </div>
  );
}
