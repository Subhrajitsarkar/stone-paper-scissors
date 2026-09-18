import 'dotenv/config';
import { Sequelize } from 'sequelize';

const databaseName = process.env.DB_NAME || 'stone';

const sequelize = new Sequelize({
    dialect: 'mysql',
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT || 3306),
    database: databaseName,
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD,
    logging: false
});

export async function ensureDatabase() {
    if (!/^[A-Za-z0-9_$]+$/.test(databaseName)) {
        throw new Error('DB_NAME contains unsupported characters.');
    }

    const adminConnection = new Sequelize({
        dialect: 'mysql',
        host: process.env.DB_HOST || 'localhost',
        port: Number(process.env.DB_PORT || 3306),
        database: 'mysql',
        username: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD,
        logging: false
    });

    try {
        await adminConnection.query(`CREATE DATABASE IF NOT EXISTS \`${databaseName}\``);
    } finally {
        await adminConnection.close();
    }
}

export default sequelize;
