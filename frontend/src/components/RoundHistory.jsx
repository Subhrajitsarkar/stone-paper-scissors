import { choiceLabel } from '../utils/gameLogic';

export default function RoundHistory({ rounds, playerOneName, playerTwoName }) {
    return (
        <div className="round-list">
            {rounds.map((round) => (
                <div className="round-row" key={round.roundNumber}>
                    <span className="round-number">{String(round.roundNumber).padStart(2, '0')}</span>
                    <span>{choiceLabel(round.playerOneChoice)}</span>
                    <span className="versus">vs</span>
                    <span>{choiceLabel(round.playerTwoChoice)}</span>
                    <strong className={round.result === 'tie' ? 'result-tie' : ''}>
                        {round.result === 'tie' ? 'Tie' : round.result === 'player_one' ? playerOneName : playerTwoName}
                    </strong>
                    {round.playerOneScore !== undefined && <span className="round-score">{round.playerOneScore} - {round.playerTwoScore}</span>}
                </div>
            ))}
        </div>
    );
}
