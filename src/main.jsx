import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// StrictMode dinonaktifkan sementara untuk mencegah double-fetching API saat development
createRoot(document.getElementById('root')).render(
  <App />
)
