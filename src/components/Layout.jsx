import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAudio } from '../hooks/useAudio';

const PHASES = [
  { path: '/', name: 'Intro' },
  { path: '/wonder', name: 'Wonder' },
  { path: '/story', name: 'Story' },
  { path: '/learn', name: 'Learn' },
  { path: '/simulation', name: 'Simulation' },
  { path: '/practice', name: 'Practice' },
  { path: '/reflection', name: 'Reflection' },
  { path: '/completion', name: 'Completion' },
];

export default function Layout() {
  const location = useLocation();
  const navigate = useNavigate();

  const currentIndex = PHASES.findIndex(p => p.path === location.pathname) || 0;
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === PHASES.length - 1;

  // We expose a generic stopAudio via context if needed, but the hooks handle it internally on unmount.
  const handleBack = () => {
    if (!isFirst) navigate(PHASES[currentIndex - 1].path);
  };

  const handleNext = () => {
    if (!isLast) navigate(PHASES[currentIndex + 1].path);
  };

  return (
    <div className="app-container">
      <header className="top-bar">
        <div className="top-bar-left">
          <span className="top-bar-title">Common Factors & Multiples</span>
        </div>
        <div className="progress-dots">
          {PHASES.map((phase, idx) => (
            <div 
              key={phase.path} 
              className={`progress-dot ${idx === currentIndex ? 'active' : ''} ${idx < currentIndex ? 'completed' : ''}`}
              title={phase.name}
            />
          ))}
        </div>
      </header>

      <main className="phase-main" style={{ flex: 1, width: '100%', display: 'flex', flexDirection: 'column' }}>
        <Outlet />
      </main>

      <footer className="bottom-bar" style={{ display: 'flex', justifyContent: 'space-between', padding: '16px 24px', width: '100%', maxWidth: '900px', margin: '0 auto', background: 'rgba(10,10,46,0.88)' }}>
        <button className="btn btn-outline" onClick={handleBack} disabled={isFirst}>Back</button>
        <button className="btn btn-primary" onClick={handleNext} disabled={isLast}>{isLast ? 'Finish' : 'Next'}</button>
      </footer>
    </div>
  );
}
