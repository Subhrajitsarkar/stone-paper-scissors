export const choices = [
    { id: 'stone', label: 'Stone', icon: '✊', description: 'Steady & strong' },
    { id: 'paper', label: 'Paper', icon: '✋', description: 'Clever cover' },
    { id: 'scissors', label: 'Scissors', icon: '✌', description: 'Sharp move' }
];

const beats = { stone: 'scissors', scissors: 'paper', paper: 'stone' };

export function getRoundResult(playerOneChoice, playerTwoChoice) {
    if (playerOneChoice === playerTwoChoice) return 'tie';
    return beats[playerOneChoice] === playerTwoChoice ? 'player_one' : 'player_two';
}

export function choiceLabel(choice) {
    return choices.find((item) => item.id === choice)?.label || choice;
}
