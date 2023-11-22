import { Navigate } from 'react-router-dom';
import { routes } from '../../utils/constants';

export default function ProtectedRoute({ loggedIn, children }) {
  return loggedIn ? children : <Navigate to={routes.main} replace />;
}
