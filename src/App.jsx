import Sidebar from './components/Sidebar';
import { Routes, Route, Navigate } from 'react-router-dom';
import AddProduct from './components/AddProduct';
import ListProduct from './pages/ListProduct';
import Layout from './Layouts/Layout';
import Login from './pages/Login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useContext } from 'react';
import { TokenContext } from './context/TokenContext';
import ProtectedRoute from './components/ProtectedRoute';

export const backendUrl = import.meta.env.VITE_BACKEND_URL;

const App = () => {
  const { token, user, authLoading } = useContext(TokenContext);

  if (authLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-xl">
        กำลังโหลด...
      </div>
    );
  }

  return (
    <div className="flex font-rajdhani bg-base-300 min-h-screen">
      <ToastContainer />
      <Routes>
        {/* เส้นทางเข้าสู่ระบบ */}
        <Route path="/login/admin" element={<Login />} />

        {/* เส้นทางหลังเข้าสู่ระบบ */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <div className="w-full flex">
                <Sidebar />
                <div className="w-full">
                  <Layout>
                    <ListProduct />
                  </Layout>
                </div>
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/addproducts"
          element={
            <ProtectedRoute>
              <div className="w-full flex">
                <Sidebar />
                <div className="w-full">
                  <Layout>
                    <AddProduct />
                  </Layout>
                </div>
              </div>
            </ProtectedRoute>
          }
        />

        {/* เส้นทางไม่รู้จัก → ส่งกลับไปหน้า login */}
        {/* <Route path="*" element={<Navigate to="/login/admin" />} /> */}
      </Routes>
    </div>
  );
};

export default App;
