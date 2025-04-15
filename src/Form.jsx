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
  };

  return (
    <div className="form-page">
      <div className="form-box">
        <h2 className="form-title">Ficha Empleado</h2>

        <form onSubmit={handleSubmit}>
          <div className="input-row">
            <Input label="Nombres" name="nombres" value={formData.nombres} onChange={handleChange} />
            <Input label="Número de Identificación" name="identificacion" value={formData.identificacion} onChange={handleChange} />
          </div>

          <div className="input-row">
            <Input label="Apellido Paterno" name="apellidoPaterno" value={formData.apellidoPaterno} onChange={handleChange} />
            <Input label="Apellido Materno" name="apellidoMaterno" value={formData.apellidoMaterno} onChange={handleChange} />
          </div>

          <div className="input-row">
            <Input label="Fecha Nacimiento" name="fechaNacimiento" type="date" value={formData.fechaNacimiento} onChange={handleChange} />
            <Input label="Email" name="email" type="email" value={formData.email} onChange={handleChange} />
          </div>

          <div className="input-row">
            <div className="input-group full-width">
              <label htmlFor="direccion">Dirección</label>
              <textarea
                id="direccion"
                name="direccion"
                rows="4"
                value={formData.direccion}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="submit-container">
                <button type="submit" className="submit-btn">Enviar</button>
            </div>
            <div className="submit-logo-container">
                <img src="/public/Poolso.jpg" alt="Logo" className="logo-img" />
            </div>
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

