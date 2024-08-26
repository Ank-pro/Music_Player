import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { SongContextProvider } from './context/songContext.jsx'

createRoot(document.getElementById('root')).render(
  
    <SongContextProvider>
    <App />
    </SongContextProvider>
  ,
)
