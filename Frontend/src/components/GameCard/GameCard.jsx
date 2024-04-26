import { useState, useEffect } from 'react';
import { P } from './P/P';
import './GameCard.css';
import { Button } from './ButtonGame/ButtonGame';
import { Header } from './GameCardHeader/GameCardHeader';
import { fechData } from '../../utils/fechData';

const fechCard_Body = { level: 'intermidate', language: 'JavaScript' };

export function GameCard() {
    const [isFlipped, setIsFlipped] = useState(false);

    useEffect(() => {
        fechData('/api/v1/card/level/language', POST, '', fechCard_Body);
    }, []);

    const handleCardClick = () => {
        setIsFlipped(!isFlipped);
    };

    return (
        <>
            <main>
                <Header lenguaje="JavaScript"></Header>
                <div className={`card ${isFlipped ? 'flipped' : ''}`}>
                    <div className="content">
                        <section className="front">
                            <section className="question-section">
                                <P text="hola Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit praesentium, alias deserunt repellendus minima cumque sequi accusamus voluptatem aliquam consectetur"></P>
                            </section>
                            <section className="answer-section">
                                <section className="answer-item">
                                    <P text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit praesentium, alias deserunt repellendus minima"></P>
                                    <Button
                                        text="Respuesta A"
                                        onClick={handleCardClick}
                                    ></Button>
                                </section>

                                <section className="answer-item">
                                    <P text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit praesentium, alias deserunt repellendus minima"></P>
                                    <Button
                                        text="Respuesta B"
                                        onClick={handleCardClick}
                                    ></Button>
                                </section>
                            </section>
                        </section>
                        <section className="back">
                            <P text="hola Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit praesentium, alias deserunt repellendus minima cumque sequi accusamus voluptatem aliquam consectetur"></P>
                            <P text="Respuesta correcta"></P>
                        </section>
                    </div>
                </div>
            </main>
        </>
    );
}
