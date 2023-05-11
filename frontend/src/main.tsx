import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import "./sass/base/reset.scss"
import "./sass/typography/typography.scss"
import "./sass/abstracts/darkMode.scss"

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
