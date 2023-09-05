import React from 'react';
import ReactDOM from 'react-dom/client';
import { GlobalStyle } from './style/GlobalStyle.tsx';
import App from './templates/App/App.tsx';
import ReactModal from 'react-modal';

const root = document.getElementById('root');

if (root !== null) {
  ReactModal.setAppElement(root);
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <GlobalStyle />
    <App />
  </React.StrictMode>
);
