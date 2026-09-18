import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { fetchGame } from '../services/gameApi';
import RoundHistory from '../components/RoundHistory';
import ScoreBoard from '../components/ScoreBoard';

export default function GameDetails() {
    const { id } = useParams();

    const [game, setGame] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchGame(id)
            .then(setGame)
            .catch((requestError) => {
                setError(requestError.message);
            });
    }, [id]);

    if (error) {
        return (
            <section className="empty-state panel">
                <h2>{error}</h2>

                <Link to="/games" className="secondary-button">
                    Back to history
                </Link>
            </section>
        );
    }

    if (!game) {
        return <p className="muted">Loading match...</p>;
    }

    return (
        <section className="detail-screen">
            <Link className="back-link" to="/games">
                Back to all matches
            </Link>

            <div className="page-heading">
                <div>
                    <span className="eyebrow">
                        Match #{game.id} /{' '}
                        {new Date(game.createdAt).toLocaleString()}
                    </span>

                    <h1>
                        {game.winnerName
                            ? `${game.winnerName} won.`
                            : 'A tie game.'}
                    </h1>
                </div>
            </div>

            <ScoreBoard
                playerOne={{
                    name: game.playerOneName,
                    score: game.playerOneScore,
                }}
                playerTwo={{
                    name: game.playerTwoName,
                    score: game.playerTwoScore,
                }}
                ties={game.ties}
            />

            <RoundHistory
                rounds={game.rounds}
                playerOneName={game.playerOneName}
                playerTwoName={game.playerTwoName}
            />
        </section>
    );
}