import { useContext } from 'react';
import { TokenContext } from '../context/TokenContext';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const { user, authLoading } = useContext(TokenContext);

  if (authLoading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login/admin" replace />;

  return children;
};

export default ProtectedRoute;
