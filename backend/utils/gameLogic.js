const beats = { stone: 'scissors', scissors: 'paper', paper: 'stone' };

export function getRoundResult(playerOneChoice, playerTwoChoice) {
    if (playerOneChoice === playerTwoChoice) return 'tie';
    return beats[playerOneChoice] === playerTwoChoice ? 'player_one' : 'player_two';
}

export function getWinner(playerOneName, playerTwoName, playerOneScore, playerTwoScore) {
    if (playerOneScore === playerTwoScore) return null;
    return playerOneScore > playerTwoScore ? playerOneName : playerTwoName;
}
