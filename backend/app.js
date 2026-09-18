import express from 'express';
import cors from 'cors';
import sequelize from './utils/database.js';
import { ensureDatabase } from './utils/database.js';
import './models/gameModel.js';
import gameRoutes from './routes/gameRoutes.js';
import errorHandler from './middleware/errorHandler.js';

const app = express();

app.use(cors({ origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173' }));
app.use(express.json({ limit: '1mb' }));
app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));
app.use('/api/games', gameRoutes);
app.use(errorHandler);

export async function initializeDatabase() {
    await ensureDatabase();
    await sequelize.authenticate();
    await sequelize.sync();
}

export default app;