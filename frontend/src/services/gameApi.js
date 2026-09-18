import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4000/api'
});

export async function saveGame(game) {
    const response = await api.post('/games', game);
    return response.data;
}

export async function fetchGames() {
    const response = await api.get('/games');
    return response.data;
}

export async function fetchGame(id) {
    const response = await api.get(`/games/${id}`);
    return response.data;
}
