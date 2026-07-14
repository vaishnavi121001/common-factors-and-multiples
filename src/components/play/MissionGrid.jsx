import { missions } from "../../data/missions";
import MissionCard from "./MissionCard";
import "./MissionGrid.css";

export default function MissionGrid({ missions: propMissions, onMissionSelect }) {
    const displayMissions = propMissions || missions;
    return (
        <div
            style={{
                width: "100%",
                minHeight: "100vh",
                background:
                    "linear-gradient(180deg,#090b23 0%, #11153b 100%)",
                padding: "40px 20px"
            }}
        >
            <div
                style={{
                    textAlign: "center",
                    marginBottom: 40
                }}
            >
                <h1
                    style={{
                        color: "white",
                        fontSize: 44,
                        marginBottom: 12
                    }}
                >
                    🎮 Play Missions
                </h1>

                <p
                    style={{
                        color: "#94a3b8",
                        fontSize: 18
                    }}
                >
                    Select a mission to begin your Common Factors adventure.
                </p>
            </div>

            <div className="mission-grid">
                {displayMissions.map((mission) => (
                    <MissionCard
                        key={mission.id}
                        mission={mission}
                        onSelect={() => onMissionSelect(mission)}
                    />
                ))}
            </div>
        </div>
    );
}

