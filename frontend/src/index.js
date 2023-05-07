import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { TodosContextProvider } from './context/TodosContextProvider';
import { AuthContextProvider } from './context/AuthContextProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <TodosContextProvider>
        <App />
      </TodosContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
