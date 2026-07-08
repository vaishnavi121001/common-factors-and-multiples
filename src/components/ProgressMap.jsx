const PHASES = [
  { id: 'wonder', label: 'Wonder' },
  { id: 'story', label: 'Story' },
  { id: 'simulate', label: 'Simulate' },
  { id: 'play', label: 'Play' },
  { id: 'reflect', label: 'Reflect' }
];

export default function ProgressMap({ currentPhase, phaseComplete }) {
  return (
    <div className="journey-bar">
      {PHASES.map((phase, idx) => {
        const isActive = currentPhase === phase.id;
        const isCompleted = phaseComplete[phase.id];
        
        return (
          <div key={phase.id} className={`journey-step ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}>
            <div className="journey-step-dot">{idx + 1}</div>
            <div className="journey-step-label">{phase.label}</div>
            {idx < PHASES.length - 1 && (
              <div className={`journey-connector ${isCompleted ? 'filled' : ''}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}
