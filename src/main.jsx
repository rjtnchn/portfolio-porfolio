import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';

// TODO 1 (done): <App /> is wrapped in <BrowserRouter> so that every component
// rendered anywhere inside the tree can use routing features (Routes, Route,
// Link, NavLink, useParams). BrowserRouter creates the router context and uses
// the HTML5 History API, which is what lets the URL change without the browser
// making a new document request to the server.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
