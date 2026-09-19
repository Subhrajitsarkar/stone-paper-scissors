import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import sequelize, { ensureDatabase } from './utils/database.js';
import './models/gameModel.js';
import gameRoutes from './routes/gameRoutes.js';
import errorHandler from './middleware/errorHandler.js';

const app = express();
const port = Number(process.env.PORT || 4000);

app.use(cors({ origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173' }));
app.use(express.json());
app.get('/', (_req, res) => {
    res.json({
        message: 'Stone Paper Scissors API is running',
        health: '/api/health',
        games: '/api/games'
    });
});
app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));
app.use('/api/games', gameRoutes);
app.use(errorHandler);

async function startServer() {
    try {
        await ensureDatabase();
        await sequelize.authenticate();
        await sequelize.sync();

        app.listen(port, () => {
            console.log(`API listening on port ${port}`);
        });
    } catch (error) {
        console.error('Database initialization failed:', error.message);
        process.exitCode = 1;
    }
}

startServer();

export default app;
