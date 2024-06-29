export const getPlayerDeck = async ({ language }) => {
    console.log(language)
    const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_ROOT_URL}deck/player/${language}`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }
    );

    const json = await response.json();

    if (!response.ok) {
        throw new Error(json.message);
    }

    console.log(json.data);

    return json.data;
};

export const registerUserService = async ({
    name,
    username,
    description,
    email,
    password,
}) => {
    const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_URL_RAIZ}/api/v1/user/register`,
        {
            method: 'POST',
            body: JSON.stringify({
                name,
                username,
                description,
                email,
                password,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        }
    );

    const json = await response.json();

    if (!response.ok) {
        throw new Error(json.message);
    }
};

export const logInUserService = async ({ email, password }) => {
    const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_URL_RAIZ}/api/v1/user/login`,
        {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: {
                'Content-Type': 'application/json',
            },
        }
    );

    const json = await response.json();

    if (!response.ok) {
        throw new Error(json.message);
    }

    return json.authToken;
};
