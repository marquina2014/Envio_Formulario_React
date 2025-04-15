import React, { useState } from "react";
import "./Form.css";

const FormularioEmpleado = () => {
  const [formData, setFormData] = useState({
    nombres: "",
    apellidoPaterno: "",
    apellidoMaterno: "",
    identificacion: "",
    fechaNacimiento: "",
    direccion: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos enviados:", formData);
    // Aquí podrías guardar en SharePoint, API, etc.
  };

  return (
    <div className="form-page">
      <div className="form-box">
        <h2 className="form-title">Ficha Empleado</h2>

        <form onSubmit={handleSubmit}>
          <Input label="Nombres" name="nombres" value={formData.nombres} onChange={handleChange} />
          <Input label="Apellido Paterno" name="apellidoPaterno" value={formData.apellidoPaterno} onChange={handleChange} />
          <Input label="Apellido Materno" name="apellidoMaterno" value={formData.apellidoMaterno} onChange={handleChange} />
          <Input label="Numero de Identificación" name="identificacion" value={formData.identificacion} onChange={handleChange} />
          <Input label="Fecha Nacimiento" name="fechaNacimiento" type="date" value={formData.fechaNacimiento} onChange={handleChange} />
          <Input label="Dirección" name="direccion" value={formData.direccion} onChange={handleChange} />
          <Input label="Email" name="email" type="email" value={formData.email} onChange={handleChange} />

          <button type="submit" className="submit-btn">Enviar</button>
        </form>
      </div>
    </div>
  );
};

const Input = ({ label, name, value, onChange, type = "text" }) => (
  <div className="input-group">
    <label htmlFor={name}>{label}</label>
    <input type={type} id={name} name={name} value={value} onChange={onChange} required />
  </div>
);

export default FormularioEmpleado;
