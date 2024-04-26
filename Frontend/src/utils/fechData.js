export async function fechData(urlObjetivo, method, opciones, dataToSend) {
    const urlRaiz = import.meta.env.VITE_REACT_APP_URL_RAIZ;
    try {
        const response = await fetch(urlRaiz + urlObjetivo, {
            method: method,
            headers: opciones,
            body: dataToSend,
        });
        if (!response.ok) {
            const data = await response.json();
            console.log(data);
            throw new Error(`Error: ${data.status} - ${data.message}`);
        }

        const data = await response.json();

        return data;
    } catch (error) {
        console.error("Error en la llamada: ", error.message);
        if (error instanceof Error) {
            throw error;
        } else {
            const data = await error.response.json();
            console.error("Error HTTP: ", data);
            throw data;
        }
    }
}
