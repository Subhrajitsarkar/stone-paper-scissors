# Hand Clash

A two-player, six-round Stone Paper Scissors game built with React, Express, Sequelize, and MySQL. It includes named players, per-round scoring, persisted game history, and individual match details. Authentication is not included.

## Project structure

- `frontend/` - Vite + React single-page application
- `backend/` - Express API with Sequelize and MySQL persistence

## Run locally

Prerequisite: Node.js 18+.

Start the backend:

```bash
cd stone-paper-scissors/backend
npm install
npm start
```

In another terminal, start the frontend:

```bash
cd stone-paper-scissors/frontend
npm install
npm run dev
```

Open `http://localhost:5173`. The API runs at `http://localhost:4000`.

## Database

The backend uses a local MySQL database named `stone`. Make sure MySQL is running, then update `backend/.env` with your local database username and password if they differ from the defaults.
