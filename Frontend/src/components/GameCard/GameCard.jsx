import { useState, useEffect } from 'react';
import { P } from './P/P';
import './GameCard.css';
import { Button } from './ButtonGame/ButtonGame';
import { Header } from './GameCardHeader/GameCardHeader';
import { getAllCards } from '../../utils/services';
import { GrLinkNext } from 'react-icons/gr';
import confetti from 'canvas-confetti';
import { Modal } from './ModalGame/Modal';

export function GameCard() {
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState();
    const [isFlipped, setIsFlipped] = useState(false);
    const [card, setCard] = useState();
    const [cards, setCards] = useState([]);
    const [point, setPoint] = useState(0);
    const [currentCardIndex, setCurrentCardIndex] = useState(0);

    useEffect(() => {
        const fetchCards = async ({ level, language }) => {
            try {
                const data = await getAllCards({ level, language });
                const shuffledData = shuffleArray([...data]);
                setCards(shuffledData);
            } catch (error) {
                console.log(error);
            }
        };
        fetchCards({ level: 'easy', language: 'JavaScript' });
    }, []);

    useEffect(() => {
        if (cards.length > currentCardIndex) {
            const preguntaActual = cards[currentCardIndex];
            const respuestasMezcladas = shuffleArray([
                { texto: preguntaActual.true_answer, esCorrecta: true },
                { texto: preguntaActual.false_answer, esCorrecta: false },
            ]);
            setCard({ ...preguntaActual, respuestas: respuestasMezcladas });
        }
    }, [cards, currentCardIndex]);

    const shuffleArray = (array) => {
        let currentIndex = array.length,
            temporaryValue,
            randomIndex;

        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    };

    const handleCardClick = (respuesta) => {
        setIsFlipped(!isFlipped);
        if (respuesta.esCorrecta) {
            setModalMessage('¡Correcto!');
            confetti();
            setModalVisible(true);
            setTimeout(() => setModalVisible(false), 3000);
        } else {
            setModalMessage('¡UPS! fallaste 😅');
            setModalVisible(true);
            setTimeout(() => setModalVisible(false), 3000);
        }
    };
    const handleNextClick = () => {
        setIsFlipped(!isFlipped);
        setCurrentCardIndex(currentCardIndex + 1);
    };

    return (
        <>
            <main>
                <Header lenguaje="JavaScript"></Header>
                <div className={`card ${isFlipped ? 'flipped' : ''}`}>
                    <div className="content">
                        <section className="front">
                            <section className="question-section">
                                <P text={card?.question}></P>
                            </section>
                            <section className="answer-section">
                                {card?.respuestas.map((respuesta, index) => (
                                    <div key={index} className="border">
                                        {' '}
                                        <section className="answer-item">
                                            <P text={respuesta.texto}></P>
                                            <Button
                                                text={`Respuesta ${index + 1}`}
                                                onClick={() =>
                                                    handleCardClick(respuesta)
                                                }
                                            ></Button>
                                        </section>
                                    </div>
                                ))}
                            </section>
                        </section>
                        <section className="back">
                            <P text={card?.question}></P>
                            <div className="true_answer">
                                {card?.respuestas.map((respuesta, index) => (
                                    <div key={index}>
                                        {respuesta.esCorrecta && (
                                            <P text={respuesta.texto}></P>
                                        )}
                                    </div>
                                ))}
                                <Button
                                    text="Next"
                                    icon={
                                        <GrLinkNext
                                            style={{ paddingTop: '5px' }}
                                        />
                                    }
                                    onClick={handleNextClick}
                                ></Button>
                            </div>
                        </section>
                    </div>
                </div>
            </main>
            <Modal
                isVisible={modalVisible}
                message={modalMessage}
                onAnimationEnd={() => setModalVisible(false)}
            />
        </>
    );
}
