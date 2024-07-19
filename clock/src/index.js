import React from 'react';
import ReactDom from 'react-dom/client';
import { BrowserRouter, Routes, Route,Navigate } from "react-router-dom";
import App  from "./components/App";
import Login from './components/Login';
import Register from './components/Register';

const root= ReactDom.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Navigate to="/register" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<App />} />
      </Routes>
    </BrowserRouter>
);