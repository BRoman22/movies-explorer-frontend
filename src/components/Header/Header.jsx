import { useLocation } from 'react-router-dom';
import './Header.css';
import { routes } from '../../utils/constants.js';
import Navigation from './Navigation/Navigation';

export default function Header({ loggedIn, handleTogglePopup }) {
  const mainRoute = useLocation().pathname === routes.main;

  return (
    <header className={`header ${mainRoute ? 'header_theme-blue' : ''}`}>
      <Navigation loggedIn={loggedIn} handleTogglePopup={handleTogglePopup} />
    </header>
  );
}
