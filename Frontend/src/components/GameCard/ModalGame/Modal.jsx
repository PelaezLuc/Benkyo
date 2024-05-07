import './Modal.css';

export function Modal({ isVisible, message, onAnimationEnd }) {
    if (!isVisible) return null;

    return (
        <div className="modal" onAnimationEnd={onAnimationEnd}>
            <p>{message}</p>
        </div>
    );
}
