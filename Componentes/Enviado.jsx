import React from "react";
import "../src/Form.css";
import { FaCheckCircle } from "react-icons/fa";

const Enviado = () => {
  return (


     <div>  
        <h2 className="enviado-title">¡Formulario enviado correctamente!</h2>
        <p className="enviado-msg">Gracias por completar la ficha del empleado.</p>
        <p className="enviado-msg">Ya puedes cerrar esta página.</p>
        <div className="enviado-icon">
          <FaCheckCircle size={60} color="#01ab8b" />
        </div>
        <div className="submit-logo-container">
            <img src="https://prod-26.brazilsouth.logic.azure.com:443/workflows/5cabd87481574a1699cda8924bf8bc39/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=ZNP0yaN6HcEZ-aGOvauIdFUfJnWUNJC3-UWhd99H4Iw&path=/Poolso.jpg" alt="Logo" className="logo-img" />
          </div>
      </div> 

    
  );
};

export default Enviado;

