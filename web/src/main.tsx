import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './app';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div className="dark flex justify-center items-center h-screen bg-gray-100">
      <App />
    </div>
  </StrictMode>
);
