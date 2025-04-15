import React from 'react'
import ReactDOM from 'react-dom/client'
import './Form.css' // O el nombre que tengas para los estilos globales
import FormularioEmpleado from './Form.jsx' // Asegúrate que el nombre del archivo esté bien

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <FormularioEmpleado />
  </React.StrictMode>
)
