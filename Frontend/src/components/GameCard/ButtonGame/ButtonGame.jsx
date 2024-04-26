import "./ButtonGame.css";

export function Button({ text, onClick }) {
    return (
        <button className="game-button" onClick={onClick}>
            {text}
        </button>
    );
}
