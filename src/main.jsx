import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Index from './Routes/Index';
import { Provider } from 'react-redux';
import { store } from './redux/store';


createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <Router>
      <Provider store={store}>
        <Index />
      </Provider>
    </Router>
  // </StrictMode>
)

