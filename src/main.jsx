import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { ProductDataProvider } from './context/ProductContext.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { OrderProvider } from './context/OrderContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <ProductDataProvider>
          <OrderProvider>
            <App />
          </OrderProvider>
        </ProductDataProvider>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>
);
