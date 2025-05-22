import React, { useEffect, useState, useRef } from "react";
import "./EnvioFlujos.css";

const EnvioFlujos = ({ onArchivosChange, onBase64Change, setCargando }) => {
  const [archivos, setArchivos] = useState([]);
  const [error, setError] = useState("");
  const [nombres, setNombres] = useState({});
  const [archivosBase64, setArchivosBase64] = useState([]);
  const inputRefs = useRef([]);
  const extensionesValidas = ["jpg", "jpeg", "png", "gif", "pdf"];

  useEffect(() => {
    const obtenerArchivos = async () => {
      try {
        const queryParams = new URLSearchParams(window.location.search);
        const key = queryParams.get("key");

        if (!key) {
          setError("No se encontró el parámetro 'key' en la URL.");
          if (setCargando) setCargando(false);
          return;
        }

        const url = `https://prod-10.brazilsouth.logic.azure.com:443/workflows/16a27eba30024fd89596e5b806f546d5/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=qW9I-ARv0RLEg3o9jp3CZqO1CAtmCx9YNNkzbJe6DOw&key=${key}`;
        const response = await fetch(url);
        const data = await response.json();
        const lista = JSON.parse(data.Archivos);

        if (Array.isArray(lista)) {
          setArchivos(lista);
          onArchivosChange(lista.length);
        } else {
          setError("La respuesta no contiene un array válido.");
        }
      } catch (err) {
        console.error("Error:", err);
        setError("Error al obtener los archivos.");
      } finally {
        if (setCargando) setCargando(false);
      }
    };

    obtenerArchivos();
  }, [onArchivosChange, setCargando]);

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
        tipo: `.${extension}`,  // ← extensión como tipo
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
      {!error &&
        archivos.map((nombreCampo, index) => {
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



