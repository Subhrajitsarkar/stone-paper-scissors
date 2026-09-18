import { NavLink, Route, Routes } from 'react-router-dom';
import Game from './pages/Game';
import Games from './pages/Games';
import GameDetails from './pages/GameDetails';
import './styles.css';

export default function App() {
    return (
        <div className="app-shell">
            <header className="site-header">
                <NavLink className="brand" to="/">
                    <span>Hand Clash</span>
                </NavLink>
                <nav>
                    <NavLink className={({ isActive }) => isActive ? 'active' : ''} to="/games">
                        Match archive
                    </NavLink>
                </nav>
            </header>
            <main>
                <Routes>
                    <Route path="/" element={<Game />} />
                    <Route path="/games" element={<Games />} />
                    <Route path="/games/:id" element={<GameDetails />} />
                </Routes>
            </main>
            <footer>
                <span>STONE / PAPER / SCISSORS</span>
                <span>Best of six rounds</span>
            </footer>
        </div>
    );
}
