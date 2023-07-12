import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { Provider } from 'react-redux';
import './index.css';
import store from './store/index.ts';
import { ToastContainer } from 'react-toastify';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
            <ToastContainer />
        </Provider>
    </React.StrictMode>,
);
