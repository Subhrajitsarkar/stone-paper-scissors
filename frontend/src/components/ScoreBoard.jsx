export default function ScoreBoard({ playerOne, playerTwo, ties }) {
    return (
        <div className="score-board" aria-label="Current score">
            <div><span>{playerOne.name}</span><strong>{playerOne.score}</strong></div>
            <div className="score-ties"><span>Ties</span><strong>{ties}</strong></div>
            <div><span>{playerTwo.name}</span><strong>{playerTwo.score}</strong></div>
        </div>
    );
}
