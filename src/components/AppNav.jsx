import style from './AppNav.module.css';
import { NavLink } from 'react-router-dom';
const AppNav = () => {
    return (
        <nav className={style.nav}>
            <ul>
                <li>
                    <NavLink to='cites'>Cites</NavLink>
                </li>
                <li>
                    <NavLink to='countries'>Countries</NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default AppNav;