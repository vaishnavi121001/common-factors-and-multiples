import { useState } from 'react';

import ArrayYardStation from '../simulations/ArrayYardStation';
import VennSortStation from '../simulations/VennSortStation';
import MeetingPointStation from '../simulations/MeetingPointStation';

export default function SimulatePhase({ onNext, onBack, audioEnabled }) {
  const [station, setStation] = useState(0);

  const stations = [
    {
      title: '🏗️ Array Yard',

    },
    {
      title: '⭕ Venn Sort',
      subtitle: 'Place numbers correctly'
    },
    {
      title: '📍 Meeting Point',
      subtitle: 'Find Common Multiples'
    }
  ];

  const handleBack = () => {
    if (station > 0) setStation(station - 1);
    else onBack();
  };

  return (
    <div className="phase-wrapper">
      <div style={{ padding: '20px' }}>
        <button onClick={handleBack} style={{ padding: '10px 20px', borderRadius: '8px', border: 'none', background: 'rgba(255,255,255,0.1)', color: 'white', cursor: 'pointer', fontSize: '16px' }}>
          ← Back
        </button>
      </div>

      {/* Station */}

      {station === 0 && (
        <ArrayYardStation
          audioEnabled={audioEnabled}
          onComplete={() => setStation(1)}
        />
      )}

      {station === 1 && (
        <VennSortStation
          audioEnabled={audioEnabled}
          onComplete={() => setStation(2)}
        />
      )}

      {station === 2 && (
        <MeetingPointStation
          audioEnabled={audioEnabled}
          onComplete={onNext}
        />
      )}

    </div>
  );
}