import React, { useEffect, useState, useRef } from "react";
import "./EnvioFlujos.css";

const EnvioFlujos = ({ archivos = [], onArchivosChange, onBase64Change }) => {
  const [error, setError] = useState("");
  const [nombres, setNombres] = useState({});
  const [archivosBase64, setArchivosBase64] = useState([]);
  const inputRefs = useRef([]);
  const extensionesValidas = ["jpg", "jpeg", "png", "gif", "pdf"];

  // Llamada a la función al recibir archivos
  useEffect(() => {
    if (Array.isArray(archivos)) {
      onArchivosChange(archivos.length);
    } else {
      setError("La lista de archivos recibida no es válida.");
    }
  }, [archivos, onArchivosChange]);

  const handleFileSelect = (e, label) => {
    const file = e.target.files[0];
    if (!file) return;

    const extension = file.name.split(".").pop().toLowerCase();
    if (!extensionesValidas.includes(extension)) {
      alert("Solo se permiten archivos JPG, JPEG, PNG, GIF o PDF.");
      e.target.value = "";
      return;
    }

    const nombreFinal = `${label.toLowerCase().replace(/\s/g, "_")}.${extension}`;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result.split(",")[1];

      const archivo = {
        campo: label,
        nombre: nombreFinal,
        tipo: `.${extension}`,
        contenido: base64
      };

      const nuevos = [...archivosBase64.filter(a => a.campo !== label), archivo];
      setArchivosBase64(nuevos);
      if (onBase64Change) onBase64Change(nuevos);
      setNombres(prev => ({ ...prev, [label]: nombreFinal }));
    };

    reader.readAsDataURL(file);
  };

  return (
    <>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!error && archivos.map((nombreCampo, index) => {
        const archivoCargado = !!nombres[nombreCampo];
        return (
          <div className="file-input-wrapper" key={index}>
            <label>{nombreCampo}</label>
            <div className="file-button-container">
              <button
                type="button"
                className={`file-button ${archivoCargado ? "cargado" : ""}`}
                onClick={() => inputRefs.current[index]?.click()}
              >
                {archivoCargado ? "Archivo cargado" : "Seleccionar archivo"}
              </button>
              <span className="file-name">
                {archivoCargado ? nombres[nombreCampo] : "Ningún archivo seleccionado"}
              </span>
              <input
                type="file"
                accept=".jpg,.jpeg,.png,.gif,.pdf"
                ref={(el) => (inputRefs.current[index] = el)}
                name={`archivo_${index}`}
                className="hidden-file-input"
                onChange={(e) => handleFileSelect(e, nombreCampo)}
              />
            </div>
          </div>
        );
      })}
    </>
  );
};

export default EnvioFlujos;




