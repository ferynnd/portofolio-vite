import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { ThemeProvider } from './components/theme-provider'
import { BrowserRouter } from 'react-router-dom';
import App from './App';

createRoot(document.getElementById('root')).render(
  <StrictMode>
       <ThemeProvider defaultTheme="dark">
        <BrowserRouter>
            <App />
          </BrowserRouter>
       </ThemeProvider>
  </StrictMode>,
)
