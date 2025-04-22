import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { backendUrl } from '../App';

export const TokenContext = createContext();

export const TokenProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    localStorage.setItem('token', token);
  }, [token]);

  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        setUser(null);
        setAuthLoading(false);
        return;
      }

      try {
        const res = await axios.get(`${backendUrl}/api/verify`, {
          headers: { token },
        });
        console.log(res);
        setUser(res.data.user);
      } catch (err) {
        setUser(null);
        setToken('');
        localStorage.removeItem('token');
      } finally {
        setAuthLoading(false);
      }
    };

    verifyToken();
  }, [token]);

  return (
    <TokenContext.Provider value={{ token, setToken, user, authLoading }}>
      {children}
    </TokenContext.Provider>
  );
};
