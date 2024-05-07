import './App.css';

import { Routes, Route } from 'react-router-dom';
import { GamePage } from './pages/GamePage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
// import UserProfilePage from "./pages/UserProfilePage";

function App() {
    // Yo introducidiria un handleClick o algo similar en el header para volver a la pagina principal con useNavigate

    return (
        <>
            <Routes>
                <Route path="/" element={<GamePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                {/* <Route path="/user-profile" element={<UserProfilePage />} /> */}
            </Routes>
        </>
    );
}

export default App;
