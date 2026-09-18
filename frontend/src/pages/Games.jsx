import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { fetchGames } from '../services/gameApi';

export default function Games() {
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const load = () => {
        setLoading(true);
        setError('');

        fetchGames()
            .then(setGames)
            .catch((requestError) => {
                setError(requestError.message);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    useEffect(load, []);

    return (
        <section className="history-screen">
            <div className="page-heading">
                <div>
                    <span className="eyebrow">Archive</span>

                    <h1>Past matches.</h1>

                    <p>
                        Every hand, every score, kept in one place.
                    </p>
                </div>

                <button
                    className="secondary-button"
                    onClick={load}
                >
                    Refresh
                </button>
            </div>

            {loading && (
                <p className="muted">
                    Loading matches...
                </p>
            )}

            {!loading && error && (
                <div className="empty-state panel">
                    <h2>
                        History could not load.
                    </h2>

                    <p>{error}</p>
                </div>
            )}

            {!loading && !error && games.length === 0 && (
                <div className="empty-state panel">
                    <h2>
                        No matches yet.
                    </h2>

                    <p>
                        Play your first six-round match and it will
                        be saved in the database.
                    </p>

                    <Link
                        className="primary-button inline-button"
                        to="/"
                    >
                        Start a match
                    </Link>
                </div>
            )}

            {!loading && !error && games.length > 0 && (
                <div className="game-table">
                    {games.map((game) => (
                        <Link
                            className="game-card"
                            to={`/games/${game.id}`}
                            key={game.id}
                        >
                            <div>
                                <span className="eyebrow">
                                    Match #{game.id}
                                </span>

                                <h2>
                                    {game.playerOneName}{' '}
                                    <span>vs</span>{' '}
                                    {game.playerTwoName}
                                </h2>

                                <small>
                                    {new Date(
                                        game.createdAt
                                    ).toLocaleDateString()}
                                </small>
                            </div>

                            <div className="card-score">
                                <strong>
                                    {game.playerOneScore} —{' '}
                                    {game.playerTwoScore}
                                </strong>

                                <span>
                                    {game.winnerName
                                        ? `${game.winnerName} won`
                                        : 'Tie game'}
                                </span>
                            </div>

                        </Link>
                    ))}
                </div>
            )}
        </section>
    );
}