import app, { initializeDatabase } from './app.js';

const port = Number(process.env.PORT || 4000);

initializeDatabase()
    .then(() => {
        app.listen(port, () => console.log(`API listening on port ${port}`));
    })
    .catch((error) => {
        console.error('Database initialization failed:', error);
        process.exitCode = 1;
    });
