import { useContext, useState } from 'react';
import './GameHeader.css';
import defaultAvatar from '../../public/img/default-avatar.jpg';
import juniorCat from '../../public/img/junior-cat.png';
import middleCat from '../../public/img/middle-cat.png';
import seniorCat from '../../public/img/senior-cat.png';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

export function GameHeader() {
    const [selectedDifficulty, setSelectedDifficulty] = useState(['junior']);
    const [selectedLanguage, setSelectedLanguage] = useState('JavaScript');
    const { gameDifficulty, gameLanguage } = useContext(AuthContext);

    const handleLevelSelect = (difficulty) => {
        const newSelectedDifficulty = selectedDifficulty.includes(difficulty)
                                    ? selectedDifficulty.filter((lvl) => lvl !== difficulty)
                                    : [...selectedDifficulty, difficulty];
            
        setSelectedDifficulty(newSelectedDifficulty);
        gameDifficulty(newSelectedDifficulty);

        localStorage.setItem(
            'selectedDifficulty',
            JSON.stringify(newSelectedDifficulty)
        );
    };

    const handleLanguageChange = (event) => {
        if (event.target.value !== '') {
            setSelectedLanguage(event.target.value);
            gameLanguage(event.target.value);
        }
    };

    return (
        <>
            <header className="game-header">
                <nav>
                    <ul id="nav-list">
                        <li className="nav-list-item user-info">
                            <img
                                className="user-info-avatar"
                                src={defaultAvatar}
                                alt=""
                            />
                            <Link to={'/login'}>Login </Link>
                            <Link to={'/register'}>Register </Link>
                        </li>
                        <li className="nav-list-item search-input">
                            <strong id="language">Lenguaje</strong>
                            <select
                                className="language-search-input"
                                value={selectedLanguage}
                                onChange={handleLanguageChange}
                            >
                                <option value="JavaScript">JavaScript</option>
                                <option value="casa">Java</option>
                            </select>
                        </li>
                        <li className="nav-list-item">
                            <ul className="game-level">
                                <li className="game-level-item">
                                    <img
                                        className={`game-level-img ${
                                            selectedDifficulty.includes('junior')
                                                ? 'selected'
                                                : ''
                                        }`}
                                        src={juniorCat}
                                        alt=""
                                        onClick={() =>
                                            handleLevelSelect('junior')
                                        }
                                    />
                                    <p>Junior</p>
                                </li>
                                <li className="game-level-item">
                                    <img
                                        className={`game-level-img ${
                                            selectedDifficulty.includes(
                                                'middle'
                                            )
                                                ? 'selected'
                                                : ''
                                        }`}
                                        src={middleCat}
                                        alt=""
                                        onClick={() =>
                                            handleLevelSelect('middle')
                                        }
                                    />
                                    <p>Middle</p>
                                </li>
                                <li className="game-level-item">
                                    <img
                                        className={`game-level-img ${
                                            selectedDifficulty.includes('senior')
                                                ? 'selected'
                                                : ''
                                        }`}
                                        src={seniorCat}
                                        alt=""
                                        onClick={() =>
                                            handleLevelSelect('senior')
                                        }
                                    />
                                    <p>Senior</p>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </nav>
            </header>
        </>
    );
}
