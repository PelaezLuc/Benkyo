import "./GameCardHeader.css";
export function Header({ language }) {
    return (
        <>
            <header className="game-card-header"><h1>Benkyo&copy;<strong>{language}</strong></h1></header>
        </>
    );
}
