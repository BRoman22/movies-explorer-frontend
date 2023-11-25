import { Link } from 'react-router-dom';
import './Logo.css';
import { routes } from '../../utils/constants';

export default function Logo() {
  return <Link aria-label='Главная' className='logo' to={routes.main} />;
}
