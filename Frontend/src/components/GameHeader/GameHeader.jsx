import { useContext, useState } from 'react';
import './GameHeader.css';
import defaultAvatar from '../../public/img/default-avatar.jpg';
import juniorCat from '../../public/img/junior-cat.png';
import middleCat from '../../public/img/middle-cat.png';
import seniorCat from '../../public/img/senior-cat.png';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

export function GameHeader() {
    const [selectedLevels, setSelectedLevels] = useState(['easy']);
    const [selectedLanguage, setSelectedLanguage] = useState('JavaScript');
    const { levelGame, lenguage } = useContext(AuthContext);

    const handleLevelSelect = (level) => {
        const newSelectedLevels = selectedLevels.includes(level)
            ? selectedLevels.filter((lvl) => lvl !== level)
            : [...selectedLevels, level];
        setSelectedLevels(newSelectedLevels);
        levelGame(newSelectedLevels);

        localStorage.setItem(
            'selectedLevels',
            JSON.stringify(newSelectedLevels)
        );
    };

    const handleLanguageChange = (event) => {
        if (event.target.value !== '') {
            setSelectedLanguage(event.target.value);
            lenguage(event.target.value);
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
                                <option value="casa">casa</option>
                            </select>
                        </li>
                        <li className="nav-list-item">
                            <ul className="game-level">
                                <li className="game-level-item">
                                    <img
                                        className={`game-level-img ${
                                            selectedLevels.includes('easy')
                                                ? 'selected'
                                                : ''
                                        }`}
                                        src={juniorCat}
                                        alt=""
                                        onClick={() =>
                                            handleLevelSelect('easy')
                                        }
                                    />
                                    <p>Junior</p>
                                </li>
                                <li className="game-level-item">
                                    <img
                                        className={`game-level-img ${
                                            selectedLevels.includes(
                                                'intermidate'
                                            )
                                                ? 'selected'
                                                : ''
                                        }`}
                                        src={middleCat}
                                        alt=""
                                        onClick={() =>
                                            handleLevelSelect('intermidate')
                                        }
                                    />
                                    <p>Middle</p>
                                </li>
                                <li className="game-level-item">
                                    <img
                                        className={`game-level-img ${
                                            selectedLevels.includes('difficult')
                                                ? 'selected'
                                                : ''
                                        }`}
                                        src={seniorCat}
                                        alt=""
                                        onClick={() =>
                                            handleLevelSelect('difficult')
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
