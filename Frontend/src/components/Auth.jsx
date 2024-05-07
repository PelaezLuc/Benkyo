import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import defaultAvatar from '../../public/img/default-avatar.jpg';

export const Auth = () => {
    const { user, logout } = useContext(AuthContext);

    return user ? (
        <section>
            Logged in as {user.email}
            <button onClick={() => logout()}>Logout</button>
        </section>
    ) : (
        <ul>
            <li className="nav-list-item user-info">
                <img className="user-info-avatar" src={defaultAvatar} alt="" />
                <Link to={'/login'}>Login </Link>
                <Link to={'/register'}>Register </Link>
            </li>
        </ul>
    );
};
