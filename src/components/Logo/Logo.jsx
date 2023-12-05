import { Link } from 'react-router-dom';
import './Logo.css';
import { Endpoints } from '../../utils/constants';

export default function Logo() {
  return <Link aria-label='Главная' className='logo' to={Endpoints.main} />;
}
