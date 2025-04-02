import Sidebar from './components/Sidebar';
import { Routes, Route } from 'react-router-dom';
import AddProduct from './components/AddProduct';
import ListProduct from './components/ListProduct';
import Layout from './Layouts/Layout';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const backendUrl = import.meta.env.VITE_BACKEND_URL;
const App = () => {
  return (
    <div className="flex font-rajdhani bg-base-300 h-[1300px]">
      <Sidebar />
      <ToastContainer />
      <Routes>
        <Route
          path="/addproducts"
          element={
            <Layout>
              <AddProduct />
            </Layout>
          }
        />
        <Route
          path="/listproducts"
          element={
            <Layout>
              <ListProduct />
            </Layout>
          }
        />
      </Routes>
    </div>
  );
};
export default App;
