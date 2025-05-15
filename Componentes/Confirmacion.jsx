import React from "react";
import "./Confirmacion.css";

const Confirmacion = ({ data, onConfirm, onCancel }) => {
  return (
    <div className="confirmation-modal">
      <div className="confirmation-box">
        <h3>¿Está seguro de enviar la siguiente información?</h3>
        <ul>
          <li><strong>Nombres:</strong> {data.nombres}</li>
          <li><strong>Apellido Paterno:</strong> {data.apellidoPaterno}</li>
          <li><strong>Apellido Materno:</strong> {data.apellidoMaterno}</li>
          <li><strong>Teléfono:</strong> ({data.telefono})</li>
          <li><strong>Identificación:</strong> {data.identificacion}</li>
          <li><strong>Fecha Nacimiento:</strong> {data.fechaNacimiento}</li>
          <li><strong>Dirección:</strong> {data.direccion}</li>
        </ul>
        <div className="button-row">
          <button onClick={onConfirm} className="btn-confirm">Confirmar Envío</button>
          <button onClick={onCancel} className="btn-cancel">Cancelar</button>
        </div>
        <img
          src="https://prod-26.brazilsouth.logic.azure.com:443/workflows/5cabd87481574a1699cda8924bf8bc39/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=ZNP0yaN6HcEZ-aGOvauIdFUfJnWUNJC3-UWhd99H4Iw&path=/Poolso.jpg"
          alt="Logo"
          className="confirmation-logo"
        />
      </div>
    </div>
  );
};

export default Confirmacion;
