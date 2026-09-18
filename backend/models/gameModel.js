import { DataTypes } from 'sequelize';
import sequelize from '../utils/database.js';

const Game = sequelize.define('Game', {
    playerOneName: {
        type: DataTypes.STRING(80),
        allowNull: false
    },
    playerTwoName: {
        type: DataTypes.STRING(80),
        allowNull: false
    },
    rounds: {
        type: DataTypes.TEXT,
        allowNull: false,
        get() {
            const value = this.getDataValue('rounds');
            return value ? JSON.parse(value) : [];
        },
        set(value) {
            this.setDataValue('rounds', JSON.stringify(value));
        }
    },
    playerOneScore: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    playerTwoScore: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    ties: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    winnerName: {
        type: DataTypes.STRING(80),
        allowNull: true
    }
}, {
    tableName: 'games'
});

export default Game;
