import { useState, useEffect } from 'react';
import './Timer.css';

export function Timer() {
    const [remainingTimer, setRemainingTimer] = useState(10);

    useEffect(() => {
        const timerInterval = setInterval(() => {
            if (remainingTimer <= 0) {
                clearInterval(timerInterval);
                // Aquí puedes realizar cualquier acción cuando el tiempo se agote
                console.log('¡Tiempo agotado!');
            } else {
                setRemainingTimer((prevTime) => prevTime - 1);
            }
        }, 1000);

        // Limpiar el intervalo cuando el componente se desmonte
        return () => clearInterval(timerInterval);
    }, [remainingTimer]);

    return (
        <>
            <div className="timer">
                <h4>Temporizador</h4>
                <strong>{remainingTimer} segundos</strong>
            </div>
        </>
    );
}
