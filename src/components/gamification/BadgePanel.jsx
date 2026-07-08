import { BADGES } from '../../utils/badgeEngine';
export default function BadgePanel({ unlockedBadges = [] }) {
  return (
    <div className="badge-panel glass-card flex-col gap-16" style={{ maxWidth: 800, width: '100%', alignItems: 'center' }}>
      <h3 className="text-display-sm" style={{ color: 'var(--gold)', margin: 0 }}>Your Badges</h3>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 16, width: '100%' }}>
        {Object.entries(BADGES).map(([id, badge]) => {
          const isUnlocked = unlockedBadges.includes(id);
          return (
            <div
              key={id}
              className={`badge-item ${isUnlocked ? 'unlocked' : 'locked'}`}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                padding: 12,
                background: isUnlocked ? 'rgba(255,193,7,0.1)' : 'rgba(255,255,255,0.05)',
                border: `2px solid ${isUnlocked ? 'var(--gold)' : 'rgba(255,255,255,0.1)'}`,
                borderRadius: 16,
                opacity: isUnlocked ? 1 : 0.5,
                filter: isUnlocked ? 'none' : 'grayscale(100%)',
                transition: 'all 0.3s ease'
              }}
            >
              <div style={{ fontSize: '2.5rem', marginBottom: 8 }}>{badge.icon}</div>
              <div style={{ fontFamily: 'Fredoka, sans-serif', fontWeight: 700, fontSize: '0.9rem', color: isUnlocked ? 'var(--text-primary)' : 'var(--text-muted)' }}>
                {badge.name}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 4 }}>
                {badge.description}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
