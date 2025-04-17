import React from 'react'
import ReactDOM from 'react-dom/client'
import './Form.css' // O el nombre que tengas para los estilos globales
import Form from './Form.jsx'
import ValidateContract from './ValidateContract.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <Form /> */}
    <ValidateContract />
  </React.StrictMode>
)
