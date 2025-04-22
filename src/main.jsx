import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { ProductDataProvider } from './context/ProductContext.jsx';
import { TokenProvider } from './context/TokenContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TokenProvider>
      <BrowserRouter>
        <ProductDataProvider>
          <App />
        </ProductDataProvider>
      </BrowserRouter>
    </TokenProvider>
  </StrictMode>
);
