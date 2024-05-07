import './ButtonGame.css';

export function Button({ text, onClick, icon }) {
    return (
        <button className="game-button" onClick={onClick}>
            {text} {icon}
        </button>
    );
}
