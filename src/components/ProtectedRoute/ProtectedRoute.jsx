import { Navigate } from 'react-router-dom';
import { ENDPOINT } from '../../utils/constants';

export default function ProtectedRoute({ loggedIn, children }) {
  return loggedIn ? children : <Navigate to={ENDPOINT.MAIN} replace />;
}
