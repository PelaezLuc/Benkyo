/* eslint-disable react/prop-types */
import { useEffect } from 'react';
import './Timer.css';

export function Timer({ timeOver, remainingTimer, setRemainingTimer }) {
    useEffect(() => {
        let timerInterval = setInterval(() => {
            if (remainingTimer <= 0) {
                clearInterval(timerInterval);

                console.log('¡Tiempo agotado!');
                timeOver();
                setRemainingTimer(10);
            } else {
                console.log(remainingTimer);
                setRemainingTimer((prevTime) => prevTime - 1); // Asegura que uses el valor más reciente
            }
        }, 1000);

        return () => clearInterval(timerInterval);
    }, [remainingTimer, timeOver, setRemainingTimer]);
    return (
        <>
            <div className="timer">
                <h4>Temporizador</h4>
                <strong>{remainingTimer} segundos</strong>
            </div>
        </>
    );
}
