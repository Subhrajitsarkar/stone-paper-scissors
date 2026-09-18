import { getRoundResult, getWinner } from '../utils/gameLogic.js';
import Game from '../models/gameModel.js';

export async function createGame(req, res, next) {
    try {
        const { playerOneName, playerTwoName, rounds } = req.body;
        if (!playerOneName?.trim() || !playerTwoName?.trim() || !Array.isArray(rounds) || rounds.length !== 6) {
            return res.status(400).json({ message: 'Enter both names and play six rounds.' });
        }

        const validChoices = ['stone', 'paper', 'scissors'];
        const validRounds = rounds.every((round, index) => (
            round.roundNumber === index + 1
            && validChoices.includes(round.playerOneChoice)
            && validChoices.includes(round.playerTwoChoice)
            && round.result === getRoundResult(round.playerOneChoice, round.playerTwoChoice)
        ));

        if (!validRounds) {
            return res.status(400).json({ message: 'Each round must contain valid choices and a matching result.' });
        }

        const playerOneScore = rounds.filter((round) => round.result === 'player_one').length;
        const playerTwoScore = rounds.filter((round) => round.result === 'player_two').length;
        const ties = rounds.filter((round) => round.result === 'tie').length;
        const winnerName = getWinner(playerOneName.trim(), playerTwoName.trim(), playerOneScore, playerTwoScore);

        const game = await Game.create({
            playerOneName: playerOneName.trim(),
            playerTwoName: playerTwoName.trim(),
            rounds,
            playerOneScore,
            playerTwoScore,
            ties,
            winnerName
        });

        return res.status(201).json(game);
    } catch (error) {
        return next(error);
    }
}

export async function listGames(_req, res, next) {
    try {
        res.json(await Game.findAll({ order: [['createdAt', 'DESC']] }));
    } catch (error) {
        next(error);
    }
}

export async function getGame(req, res, next) {
    try {
        const game = await Game.findByPk(req.params.id);
        if (!game) return res.status(404).json({ message: 'Game not found.' });
        return res.json(game);
    } catch (error) {
        next(error);
    }
}
