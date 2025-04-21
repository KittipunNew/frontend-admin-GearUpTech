import Sidebar from './components/Sidebar';
import { Routes, Route } from 'react-router-dom';
import AddProduct from './components/AddProduct';
import ListProduct from './pages/ListProduct';
import Layout from './Layouts/Layout';
import Login from './pages/Login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useContext } from 'react';
import { ProductDataContext } from './context/ProductContext';
import { TokenContext } from './context/TokenContext';

export const backendUrl = import.meta.env.VITE_BACKEND_URL;

const App = () => {
  const { token } = useContext(TokenContext);
  return (
    <div className="flex font-rajdhani bg-base-300 min-h-screen">
      <ToastContainer />
      {token === '' ? (
        <Routes>
          <Route path="/login/admin" element={<Login />} />
        </Routes>
      ) : (
        <div className="w-full flex">
          <Sidebar />
          <div className="w-full">
            <Routes>
              <Route
                path="/"
                element={
                  <Layout>
                    <ListProduct />
                  </Layout>
                }
              />
              <Route
                path="/addproducts"
                element={
                  <Layout>
                    <AddProduct />
                  </Layout>
                }
              />
            </Routes>
          </div>
        </div>
      )}
    </div>
  );
};
export default App;
