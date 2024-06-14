import "./GameCardHeader.css";
export function Header({ lenguaje }) {
    return (
        <>
            <header className="game-card-header"><h1>Benkyo&copy;<strong>{lenguaje}</strong></h1></header>
        </>
    );
}
