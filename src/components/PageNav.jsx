import { Link, NavLink } from 'react-router-dom';
import style from './PageNav.module.css';
import Logo from './Logo';
function PageNav() {
    return (
        <nav className={style.nav}>
            <Logo />
            <ul>
                <li>
                    <NavLink to='/product'>Product</NavLink>
                </li>

                <li>
                    <NavLink to='/price' >Pricing</NavLink>
                </li>

                <li>
                    <Link className='cta' to='/login'>Login</Link>
                </li>
            </ul>
        </nav>
    );
}

export default PageNav;
