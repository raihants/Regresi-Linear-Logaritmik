import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Index from './Index.jsx';
import "bootstrap-icons/font/bootstrap-icons.css";

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Index />
    </StrictMode>,
)
