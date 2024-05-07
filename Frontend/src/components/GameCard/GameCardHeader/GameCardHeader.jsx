import "./GameCardHeader.css";
export function Header({ lenguaje }) {
    return (
        <>
            <header className="GameCardHeader">Benkyo {lenguaje}</header>
        </>
    );
}
