import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const PrivateRoute = ({ children }) => {
  const { userData } = useContext(AuthContext);

  return userData && userData.role === 'admin' ? (
    children
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;
