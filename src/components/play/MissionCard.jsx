import "./MissionGrid.css";

export default function MissionCard({ mission, onSelect }) {
    return (
        <div
            className={`mission-card ${mission.locked ? "locked" : ""}`}
            onClick={() => !mission.locked && onSelect(mission)}
            style={{
                borderColor: mission.color
            }}
        >
            <div className="mission-icon">
                {mission.icon}
            </div>

            <h2
                className="mission-title"
                style={{ color: mission.color }}
            >
                {mission.title}
            </h2>

            <p className="mission-subtitle">
                {mission.subtitle}
            </p>

            <div className="mission-footer">

                <div className="stars">
                    ⭐ {mission.stars}/3
                </div>

                {mission.locked ? (
                    <span className="lock">🔒 Locked</span>
                ) : (
                    <button
                        className="play-btn"
                        onClick={(e) => {
                            e.stopPropagation();
                            onSelect(mission);
                        }}
                    >
                        ▶ Play
                    </button>
                )}

            </div>
        </div>
    );
}