export default function Mascot({ mood = 'idle', size = 150 }) {
  // Mapping mood to visual
  // Ideally, these point to distinct SVGs or trigger CSS classes.
  const src = `/assets/images/mascot-${mood}.svg`;
  
  return (
    <div className={`mascot-container mascot-${mood}`} style={{ width: size, height: size }}>
      {/* Fallback to simple circle if image not found during dev */}
      <img 
        src={src} 
        alt={`Mascot looking ${mood}`} 
        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
        onError={(e) => {
          e.target.style.display = 'none';
          e.target.nextSibling.style.display = 'flex';
        }}
      />
      <div className="mascot-fallback" style={{ display: 'none', width: '100%', height: '100%', borderRadius: '50%', backgroundColor: '#3f51b5', color: '#fff', alignItems: 'center', justifyContent: 'center', fontSize: size * 0.4 }}>
        🤖
      </div>
    </div>
  );
}
