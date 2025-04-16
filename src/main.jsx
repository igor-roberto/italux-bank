import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './index.css';
import App from './App.jsx';
import FormPage from './components/section/Register.jsx';
import LogIn from './components/section/Login.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/abrir-conta" element={<FormPage />} />
        <Route path="/acessar-conta" element={<LogIn />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
