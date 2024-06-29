import './GeneralHeader.css';
import { Link } from 'react-router-dom';

export function GeneralHeader() {
    return (
        <header>
            <Link to={'/'}>
                <h1>Benkyo&copy;</h1>
            </Link>
        </header>
    );
}
