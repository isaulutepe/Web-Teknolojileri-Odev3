import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  //İd si verilen adresi alır =  root
  //Buradki root yazısıda index html sayfasının id sidir değişebilir.
  //Strict mode güvenlik işlemlerine bakar
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
