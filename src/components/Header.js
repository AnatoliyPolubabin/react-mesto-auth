import logo from '../images/logo.svg';
import { useLocation, Link } from 'react-router-dom';

export default function Header(props) {
    const location = useLocation();
    return (
        <header className="header">
            <img className="header__logo" src={logo} alt="Логотип проекта Ьесто" />
            {location.pathname === '/signin' && (
                <div className='header__information'>
                    <Link to="/signup" className="header__link">Регистрация</Link>
                </div>
            )}
            {location.pathname === '/signup' && (
                <div className='header__information'>
                    <Link to="/signin" className="header__link">Войти</Link>
                </div>
            )}
            {location.pathname === '/' && (
                <nav className='header__information'>
                    <p className='header__mail'>{props.mail}</p>
                    <Link to="/signin" className="header__link" onClick={props.onClick}>Выйти</Link>
                </nav>
            )}
        </header>
    )
}