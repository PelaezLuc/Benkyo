export const getAllCards = async ({ level, language }) => {
    const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_URL_RAIZ}/api/v1/card/level/language`,
        {
            method: 'GET',
            body: JSON.stringify({ level, language }),
            headers: {
                'Content-Type': 'application/json',
            },
        }
    );

    const json = await response.json();

    if (!response.ok) {
        throw new Error(json.message);
    }

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
