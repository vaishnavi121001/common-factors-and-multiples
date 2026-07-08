import { useRef, useEffect } from 'react';
import StarRating from './StarRating';

const WORLDS = [
  { id: 1, name: 'Sunny Schoolyard', theme: 'school' },
  { id: 2, name: 'Bake Sale Basics', theme: 'food' },
  { id: 3, name: 'Sports Day Sprint', theme: 'sports' },
  { id: 4, name: 'Factory Floor', theme: 'industry' },
  { id: 5, name: 'Space Station', theme: 'space' },
  { id: 6, name: 'Magic Market', theme: 'magic' },
  { id: 7, name: 'Dino Dig', theme: 'history' },
  { id: 8, name: 'Deep Sea Dive', theme: 'ocean' },
  { id: 9, name: 'Robot Relay', theme: 'tech' },
  { id: 10, name: 'Grand Common Ground', theme: 'grand' },
];

export default function WorldMap({ currentWorld, worldScores, onSelectWorld }) {
  const scrollRef = useRef(null);

  useEffect(() => {
    // Scroll to active world on mount
    if (scrollRef.current) {
      const activeElement = scrollRef.current.querySelector('.world-node.active');
      if (activeElement) {
        activeElement.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      }
    }
  }, [currentWorld]);

  return (
    <div className="world-map-container" style={{ width: '100%', overflowX: 'auto', padding: '24px 0' }} ref={scrollRef}>
      <div className="world-map-track" style={{ display: 'flex', gap: 40, padding: '0 40px', minWidth: 'max-content', alignItems: 'center' }}>
        {WORLDS.map((world, idx) => {
          const isUnlocked = idx === 0 || (worldScores[idx - 1] !== undefined && worldScores[idx - 1] >= 6);
          const isActive = currentWorld === idx + 1;
          const isCompleted = worldScores[idx] !== undefined;
          
          return (
            <div key={world.id} style={{ display: 'flex', alignItems: 'center' }}>
              <div 
                className={`world-node ${isActive ? 'active' : ''} ${isUnlocked ? 'unlocked' : 'locked'}`}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 8,
                  cursor: isUnlocked ? 'pointer' : 'not-allowed',
                  opacity: isUnlocked ? 1 : 0.5,
                  transform: isActive ? 'scale(1.1)' : 'scale(1)',
                  transition: 'all 0.3s ease'
                }}
                onClick={() => {
                  if (isUnlocked && onSelectWorld) onSelectWorld(idx + 1);
                }}
              >
                <div 
                  className="world-circle"
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    background: isCompleted ? 'var(--green)' : isActive ? 'var(--blue-bright)' : 'rgba(255,255,255,0.1)',
                    border: `4px solid ${isActive ? 'var(--gold)' : isUnlocked ? 'var(--text-primary)' : 'rgba(255,255,255,0.2)'}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '2rem',
                    boxShadow: isActive ? '0 0 20px rgba(255,193,7,0.4)' : 'none'
                  }}
                >
                  {isCompleted ? '✓' : !isUnlocked ? '🔒' : world.id}
                </div>
                
                <div style={{ fontFamily: 'Fredoka, sans-serif', fontWeight: 700, fontSize: '1rem', textAlign: 'center', width: 120 }}>
                  {world.name}
                </div>
                
                {isCompleted && (
                  <StarRating score={worldScores[idx]} maxScore={10} />
                )}
              </div>

              {/* Connecting line (except for last node) */}
              {idx < WORLDS.length - 1 && (
                <div 
                  style={{
                    width: 60,
                    height: 4,
                    background: worldScores[idx] !== undefined && worldScores[idx] >= 6 ? 'var(--green)' : 'rgba(255,255,255,0.1)',
                    margin: '0 -10px',
                    zIndex: -1
                  }}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
