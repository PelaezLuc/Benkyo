import { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext(null);

export const AuthContextProviderComponent = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [user, setUser] = useState(null);
    const [selectedDifficulty, setSelectedLevels] = useState(['junior']);
    const [selectedLanguage, setSelectedLanguage] = useState('JavaScript');

    useEffect(() => {
        localStorage.setItem('token', token);
    }, [token]);

    // useEffect(() => {
    //     const getUserData = async () => {
    //         try {
    //             const data = await getMyDataService(token);

    //             setUser(data);
    //         } catch (error) {
    //             setToken('');
    //             setUser(null);
    //         }
    //     };

    //     if (token) getUserData();
    // }, [token, setToken]);

    const gameDifficulty = (difficulty) => {
        setSelectedLevels(difficulty);
    };

    const gameLanguage = (language) => {
        setSelectedLanguage(language);
    };

    const logout = () => {
        setToken('');
        setUser(null);
    };

    const login = (token) => {
        setToken(token);
    };

    return (
        <AuthContext.Provider
            value={{
                token,
                user,
                login,
                logout,
                gameDifficulty,
                gameLanguage,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
