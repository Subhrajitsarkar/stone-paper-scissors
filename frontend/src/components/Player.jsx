export default function Player({ name, score, accent }) {
    return (
        <div className={`player-chip ${accent}`}>
            <div className="player-avatar">{name.slice(0, 1).toUpperCase()}</div>
            <div>
                <span className="eyebrow">Player</span>
                <strong>{name}</strong>
            </div>
            <div className="player-score">{score}</div>
        </div>
    );
}
