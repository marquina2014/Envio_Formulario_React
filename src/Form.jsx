import React, { useState } from "react";
import "./Form.css";

const Form = () => {
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

  /*const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos enviados:", formData);
  };*/
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const payload = {
      ...formData,
      guid: "8cb9339b-0ace-48a0-9634-318492e85641"
    };
  
    try {
      const response = await fetch(
        "https://prod-11.brazilsouth.logic.azure.com:443/workflows/3c107311999e4a5a95844cb94b7ca510/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=GSHOjhmcbYb5CHQ4iB9dobXxTq3bhl9t4vn9mja7CeQ&path=/submit_ficha",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(payload)
        }
      );
  
      if (response.ok) {
        alert("Formulario enviado correctamente ✅");
        console.log("Respuesta:", await response.json());
      } else {
        alert("Error al enviar ❌");
        console.error("Error en respuesta:", response.status, response.statusText);
      }
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      alert("Error de conexión ❌");
    }
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

export default Form;

