import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Index from './Index.jsx';
import "bootstrap-icons/font/bootstrap-icons.css";
import { MathJaxContext } from "better-react-mathjax";

createRoot(document.getElementById('root')).render(
    <MathJaxContext>
        <StrictMode>
            <Index />
        </StrictMode>
    </MathJaxContext>,
)
