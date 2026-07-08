import { useState } from 'react';

import ArrayYardStation from '../simulations/ArrayYardStation';
import VennSortStation from '../simulations/VennSortStation';
import MeetingPointStation from '../simulations/MeetingPointStation';

export default function SimulatePhase({ onNext, audioEnabled }) {
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

  return (
    <div className="phase-wrapper">




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