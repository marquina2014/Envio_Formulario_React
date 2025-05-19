import React, { useState, useEffect } from "react";
import "./Form.css";
import Enviado from "../Componentes/Enviado";
import Loader from "../Componentes/Loader";
import Confirmacion from "../Componentes/Confirmacion";

// Función para validar RUT chileno
const validarRut = (rut) => {
  rut = rut.replace(/[^0-9kK]/g, "").toUpperCase();
  if (rut.length < 2) return false;
  const cuerpo = rut.slice(0, -1);
  let dv = rut.slice(-1);
  let suma = 0;
  let multiplo = 2;

  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += parseInt(cuerpo[i]) * multiplo;
    multiplo = multiplo < 7 ? multiplo + 1 : 2;
  }

  let dvEsperado = 11 - (suma % 11);
  dvEsperado = dvEsperado === 11 ? "0" : dvEsperado === 10 ? "K" : dvEsperado.toString();
  return dv === dvEsperado;
};

const countryCodes = [
  { label: "USA +1", value: "+1" },
  { label: "PR +1787", value: "+1787" },
  { label: "RD +1809", value: "+1809" },
  { label: "GUA +502", value: "+502" },
  { label: "SAL +503", value: "+503" },
  { label: "HON +504", value: "+504" },
  { label: "NIC +505", value: "+505" },
  { label: "CRC +506", value: "+506" },
  { label: "PAN +507", value: "+507" },
  { label: "PER +51", value: "+51" },
  { label: "MEX +52", value: "+52" },
  { label: "CU +53", value: "+53" },
  { label: "ARG +54", value: "+54" },
  { label: "BRA +55", value: "+55" },
  { label: "CL +56", value: "+56" },
  { label: "COL +57", value: "+57" },
  { label: "VEN +58", value: "+58" },
  { label: "BOL +591", value: "+591" },
  { label: "ECU +593", value: "+593" },
  { label: "PAR +595", value: "+595" },
  { label: "URU +598", value: "+598" },
];

const Form = () => {
  const [formData, setFormData] = useState({
    nombres: "",
    apellidoPaterno: "",
    apellidoMaterno: "",
    identificacion: "",
    fechaNacimiento: "",
    direccion: "",
    email: "",
    telefonoCodigo: "+1",
    telefonoNumero: "",
    guid: "",
  });

  const [rutError, setRutError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [confirmData, setConfirmData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const key = query.get("key");
    if (key) {
      setFormData((prev) => ({ ...prev, guid: key }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "identificacion" && !/^[0-9kK\-\.]*$/.test(value)) return;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "identificacion") {
      setRutError(""); // Limpiar mensaje mientras escribe
    }
  };

  const validateForm = () => {
    const requiredFields = [
      "nombres",
      "apellidoPaterno",
      "apellidoMaterno",
      "telefonoNumero",
      "identificacion",
      "fechaNacimiento",
      "direccion",
    ];

    for (let field of requiredFields) {
      if (!formData[field].trim()) {
        alert("Por favor completa todos los campos requeridos.");
        return false;
      }
    }

    if (!validarRut(formData.identificacion)) {
      alert("El RUT ingresado no es válido.");
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const previewData = {
      ...formData,
      telefono: `${formData.telefonoCodigo}${formData.telefonoNumero}`,
    };

    setConfirmData(previewData);
  };

  const sendData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("https://prod-11.brazilsouth.logic.azure.com:443/workflows/3c107311999e4a5a95844cb94b7ca510/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=GSHOjhmcbYb5CHQ4iB9dobXxTq3bhl9t4vn9mja7CeQ&path=/submit_ficha", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(confirmData),
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
          telefonoCodigo: "+1",
          telefonoNumero: "",
          guid: prev.guid,
        }));
      } else {
        console.error("Error al enviar:", await response.text());
      }
    } catch (error) {
      console.error("Error de red:", error);
    } finally {
      setIsLoading(false);
      setConfirmData(null);
    }
  };

  return (
    <div className="form-page">
      <div className="form-box">
        {isLoading && <Loader />}
        {showModal ? (
          <Enviado onClose={() => setShowModal(false)} />
        ) : (
          <>
            <h2 className="form-title">Ficha Empleado</h2>
            <form onSubmit={handleSubmit}>
              <div className="input-row">
                <Input label="Nombres" name="nombres" value={formData.nombres} onChange={handleChange} />
                <Input label="Apellido Paterno" name="apellidoPaterno" value={formData.apellidoPaterno} onChange={handleChange} />
              </div>

              <div className="input-row">
                <Input label="Apellido Materno" name="apellidoMaterno" value={formData.apellidoMaterno} onChange={handleChange} />
              </div>

              <div className="input-group">
                <label>Número de Teléfono</label>
                <div className="phone-row">
                  <div className="input-group phone-code">
                    <select name="telefonoCodigo" value={formData.telefonoCodigo} onChange={handleChange}>
                      {countryCodes.map((item) => (
                        <option key={item.value} value={item.value}>{item.label}</option>
                      ))}
                    </select>
                  </div>
                  <div className="input-group phone-number">
                    <input type="text" name="telefonoNumero" value={formData.telefonoNumero} onChange={handleChange} required />
                  </div>
                </div>
              </div>

              <div className="input-row">
                <div className="input-group">
                  <label htmlFor="identificacion">Número de Identificación</label>
                  <input
                    type="text"
                    id="identificacion"
                    name="identificacion"
                    value={formData.identificacion}
                    onChange={handleChange}
                    onBlur={() => {
                      if (!validarRut(formData.identificacion)) {
                        setRutError("Ingrese formato RUT con punto y digito verificador.");
                      } else {
                        setRutError("");
                      }
                    }}
                    required
                  />
                  {rutError && <span className="error-message">{rutError}</span>}
                </div>
              </div>

              <div className="input-row">
                <Input label="Fecha Nacimiento" name="fechaNacimiento" type="date" value={formData.fechaNacimiento} onChange={handleChange} />
              </div>

              <div className="input-row">
                <div className="input-group full-width">
                  <label htmlFor="direccion">Dirección</label>
                  <textarea id="direccion" name="direccion" rows="4" value={formData.direccion} onChange={handleChange} required />
                </div>
              </div>

              <div className="submit-container">
                <button type="submit" className="submit-btn">Enviar</button>
              </div>

              <div className="submit-logo-container">
                <img src="https://prod-26.brazilsouth.logic.azure.com:443/workflows/5cabd87481574a1699cda8924bf8bc39/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=ZNP0yaN6HcEZ-aGOvauIdFUfJnWUNJC3-UWhd99H4Iw&path=/Poolso.jpg" alt="Logo" className="logo-img" />
              </div>
            </form>

            {confirmData && (
              <Confirmacion
                data={confirmData}
                onConfirm={sendData}
                onCancel={() => setConfirmData(null)}
              />
            )}
          </>
        )}
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







