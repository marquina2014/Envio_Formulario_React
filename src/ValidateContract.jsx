import React, { useState, useEffect } from "react";
import "./Form.css";
import Enviado from "../Componentes/Enviado";
import Loader from "../Componentes/Loader"; // <--- IMPORTANTE

const ValidateContract = () => {
  const [formData, setFormData] = useState({
    nombres: "",
    apellidoPaterno: "",
    apellidoMaterno: "",
    identificacion: "",
    fechaNacimiento: "",
    direccion: "",
    email: "",
    guid: "",
  });

  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // <--- NUEVO

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const key = query.get("key");
    if (key) {
      setFormData((prev) => ({ ...prev, guid: key }));
    }
  }, []);

  /* const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }; */

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // <--- Mostramos loader

    try {
      const response = await fetch("https://prod-11.brazilsouth.logic.azure.com:443/workflows/3c107311999e4a5a95844cb94b7ca510/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=GSHOjhmcbYb5CHQ4iB9dobXxTq3bhl9t4vn9mja7CeQ&path=/submit_ficha", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setShowModal(true);
        setFormData((prev) => ({
          nombres: "",
          apellidoPaterno: "",
          apellidoMaterno: "",
          identificacion: "",
          fechaNacimiento: "",
          direccion: "",
          email: "",
          guid: prev.guid,
        }));
      } else {
        console.error("Error al enviar:", await response.text());
      }
    } catch (error) {
      console.error("Error de red:", error);
    } finally {
      setIsLoading(false); // <--- Ocultamos loader
    }
  };

  return (
    <div className="form-page">
      <div className="form-box">
        {isLoading && <Loader />} {/* LOADER MIENTRAS CARGA */}

        {!showModal ? (
          <>
            <h2 className="form-title">Validar Contrato</h2>
            <form onSubmit={handleSubmit}>
              <div className="input-row">
                {/* <Input label="Nombres" name="nombres" value={formData.nombres} onChange={handleChange} /> */}
                
                <div className="input-group">
                    <label htmlFor="aprobacion">Finalizar Contratacion</label>
                    <select>
                    <option value="Aceptar">Aceptar Contrato</option>
                    <option value="Rechazar">Rechazar Contrato</option>
                </select>
                </div>
                
              </div>

              <div className="submit-container">
                <button type="submit" className="submit-btn">Enviar</button>
              </div>

              <div className="submit-logo-container">
                <img src="/public/Poolso.jpg" alt="Logo" className="logo-img" />
              </div>
            </form>
          </>
        ) : (
          <Enviado onClose={() => setShowModal(false)} />
        )}
      </div>
    </div>
  );
};

const Input = ({ label, name, value, onChange, type = "text", pattern }) => (
  <div className="input-group">
    <label htmlFor={name}>{label}</label>
    <input pattern={pattern} type={type} id={name} name={name} value={value} onChange={onChange} required />
  </div>
);

export default ValidateContract;


