import { Navigate } from 'react-router-dom';
import { Endpoints } from '../../utils/constants';

export default function ProtectedRoute({ loggedIn, children }) {
  return loggedIn ? children : <Navigate to={Endpoints.main} replace />;
}
