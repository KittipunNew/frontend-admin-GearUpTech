import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';
import { backendUrl } from '../App';
import { AuthContext } from './AuthContext';

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orderList, setOrderList] = useState();

  const { getToken } = useContext(AuthContext);

  const fetchOrder = async () => {
    try {
      const token = await getToken();
      const response = await axios.get(`${backendUrl}/api/order`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setOrderList(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, []);

  const updateOrderStatus = async (orderId, newStatus) => {
    console.log('Update button clicked');
    try {
      const token = await getToken();
      const res = await axios.patch(
        `${backendUrl}/api/order/${orderId}/status`,
        {
          orderStatus: newStatus,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data;
    } catch (error) {
      throw error.response?.data || { message: 'Update failed' };
    }
  };

  return (
    <OrderContext.Provider value={{ orderList, updateOrderStatus, fetchOrder }}>
      {children}
    </OrderContext.Provider>
  );
};
