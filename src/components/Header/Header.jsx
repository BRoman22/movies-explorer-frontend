import './Header.css';
import useLocationState from '../../hooks/useLocationState';
import Navigation from './Navigation/Navigation';

export default function Header({ loggedIn, handleOpenSideBar }) {
  const { mainRoute } = useLocationState();

  return (
    <header className={`header ${mainRoute ? 'header_theme-blue' : ''}`}>
      <Navigation loggedIn={loggedIn} handleOpenSideBar={handleOpenSideBar} />
    </header>
  );
}
