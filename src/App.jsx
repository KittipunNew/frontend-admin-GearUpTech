import { Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Sidebar from './components/Sidebar';
import AddProduct from './components/AddProduct';
import Layout from './Layouts/Layout';

import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';

import PrivateRoute from './components/PrivateRoute';
import ListProduct from './pages/ListProduct';
import Login from './pages/Login';

export const backendUrl = import.meta.env.VITE_BACKEND_URL;

const App = () => {
  const { userData } = useContext(AuthContext);
  return (
    <div className="flex font-rajdhani bg-base-300 min-h-screen">
      <ToastContainer />
      <Routes>
        <Route
          path="/login"
          element={
            userData && userData.role === 'admin' ? (
              <Navigate to="/" />
            ) : (
              <Login />
            )
          }
        />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <div className="w-full flex">
                <Sidebar />
                <div className="w-full">
                  <Layout>
                    <ListProduct />
                  </Layout>
                </div>
              </div>
            </PrivateRoute>
          }
        />
        <Route
          path="/addproducts"
          element={
            <PrivateRoute>
              <div className="w-full flex">
                <Sidebar />
                <div className="w-full">
                  <Layout>
                    <AddProduct />
                  </Layout>
                </div>
              </div>
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
