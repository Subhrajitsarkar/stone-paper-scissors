import { useState } from 'react';

import ChoiceButtons from '../components/ChoiceButtons';
import Player from '../components/Player';
import RoundHistory from '../components/RoundHistory';
import ScoreBoard from '../components/ScoreBoard';

import { getRoundResult } from '../utils/gameLogic';
import { saveGame } from '../services/gameApi';

function NameGate({ onStart }) {
    const [names, setNames] = useState({
        playerOneName: '',
        playerTwoName: '',
    });

    const submitNames = (event) => {
        event.preventDefault();

        const playerOneName = names.playerOneName.trim();
        const playerTwoName = names.playerTwoName.trim();

        if (playerOneName && playerTwoName) {
            onStart({
                playerOneName,
                playerTwoName,
            });
        }
    };

    return (
        <section className="gate panel">
            <span className="eyebrow">New match / six rounds</span>

            <h1>
                Make your
                <br />
                <em>move.</em>
            </h1>

            <p className="lead">
                Two players. Six choices. One name in the history books.
            </p>

            <form onSubmit={submitNames}>
                <label>
                    Player one

                    <input
                        autoFocus
                        value={names.playerOneName}
                        onChange={(event) =>
                            setNames({
                                ...names,
                                playerOneName: event.target.value,
                            })
                        }
                        placeholder="Enter a name"
                        maxLength={80}
                    />
                </label>

                <label>
                    Player two

                    <input
                        value={names.playerTwoName}
                        onChange={(event) =>
                            setNames({
                                ...names,
                                playerTwoName: event.target.value,
                            })
                        }
                        placeholder="Enter a name"
                        maxLength={80}
                    />
                </label>

                <button className="primary-button" type="submit">
                    Start the match
                </button>
            </form>
        </section>
    );
}

export default function Game() {
    const [players, setPlayers] = useState(null);
    const [rounds, setRounds] = useState([]);
    const [choice, setChoice] = useState(null);
    const [saving, setSaving] = useState(false);
    const [savedId, setSavedId] = useState(null);
    const [error, setError] = useState('');

    const currentRound = rounds.length + 1;

    const playerOneScore = rounds.filter(
        (round) => round.result === 'player_one'
    ).length;

    const playerTwoScore = rounds.filter(
        (round) => round.result === 'player_two'
    ).length;

    const ties = rounds.filter(
        (round) => round.result === 'tie'
    ).length;

    if (!players) {
        return <NameGate onStart={setPlayers} />;
    }

    const completeRound = async (playerTwoChoice) => {
        const result = getRoundResult(choice, playerTwoChoice);

        const round = {
            roundNumber: currentRound,
            playerOneChoice: choice,
            playerTwoChoice,
            result,
        };

        const nextRounds = [...rounds, round];

        round.playerOneScore = nextRounds.filter(
            (item) => item.result === 'player_one'
        ).length;

        round.playerTwoScore = nextRounds.filter(
            (item) => item.result === 'player_two'
        ).length;

        setRounds(nextRounds);
        setChoice(null);
        setError('');

        if (nextRounds.length === 6) {
            setSaving(true);

            try {
                const saved = await saveGame({
                    ...players,
                    rounds: nextRounds,
                });

                setSavedId(saved.id);
            } catch (saveError) {
                setError(saveError.message);
            } finally {
                setSaving(false);
            }
        }
    };

    if (rounds.length === 6) {
        const winner =
            playerOneScore === playerTwoScore
                ? null
                : playerOneScore > playerTwoScore
                    ? players.playerOneName
                    : players.playerTwoName;

        return (
            <section className="result-screen">
                <div className="result-hero panel">
                    <span className="eyebrow">
                        Match complete
                    </span>

                    <h1>
                        {winner
                            ? `${winner} takes it.`
                            : 'A perfect deadlock.'}
                    </h1>

                    <p>
                        {winner
                            ? 'Six rounds, one clear winner.'
                            : 'Neither hand gave an inch.'}
                    </p>

                    {savedId && (
                        <span className="saved-note">
                            Match #{savedId} saved to history
                        </span>
                    )}

                    {error && (
                        <span className="error-note">
                            {error}
                        </span>
                    )}
                </div>

                <ScoreBoard
                    playerOne={{
                        name: players.playerOneName,
                        score: playerOneScore,
                    }}
                    playerTwo={{
                        name: players.playerTwoName,
                        score: playerTwoScore,
                    }}
                    ties={ties}
                />

                <RoundHistory
                    rounds={rounds}
                    playerOneName={players.playerOneName}
                    playerTwoName={players.playerTwoName}
                />

                <button
                    className="secondary-button"
                    type="button"
                    onClick={() => {
                        setPlayers(null);
                        setRounds([]);
                        setSavedId(null);
                    }}
                >
                    Play another match
                </button>
            </section>
        );
    }

    return (
        <section className="game-screen">
            <div className="game-topline">
                <div>
                    <span className="eyebrow">
                        Round {currentRound} of 6
                    </span>

                    <h1>Choose your hand.</h1>
                </div>

                <div className="progress-dots">
                    {Array.from({ length: 6 }, (_, index) => (
                        <span
                            key={index}
                            className={
                                index < rounds.length
                                    ? 'done'
                                    : index === rounds.length
                                        ? 'active'
                                        : ''
                            }
                        />
                    ))}
                </div>
            </div>

            <div className="players-row">
                <Player
                    name={players.playerOneName}
                    score={playerOneScore}
                    accent="coral"
                />

                <span className="versus-mark">VS</span>

                <Player
                    name={players.playerTwoName}
                    score={playerTwoScore}
                    accent="teal"
                />
            </div>

            <div className="choice-panel panel">
                <p className="turn-label">
                    {choice
                        ? 'Pass the screen to player two'
                        : `${players.playerOneName}, make your selection`}
                </p>

                {!choice ? (
                    <ChoiceButtons
                        selected={choice}
                        onSelect={setChoice}
                    />
                ) : (
                    <>
                        <div className="selected-choice">
                            Choice locked in <strong>{choice}</strong>
                        </div>

                        <p className="turn-label">
                            {players.playerTwoName}, make your selection
                        </p>

                        <ChoiceButtons onSelect={completeRound} />
                    </>
                )}
            </div>

            {rounds.length > 0 && (
                <RoundHistory
                    rounds={rounds}
                    playerOneName={players.playerOneName}
                    playerTwoName={players.playerTwoName}
                />
            )}

            {saving && (
                <p className="muted">
                    Saving your match...
                </p>
            )}
        </section>
    );
}