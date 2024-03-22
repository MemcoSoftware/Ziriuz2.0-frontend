import React, { useState } from 'react';
import { updateVisita } from '../../../visitas/services/visitasService'; 
import { useSessionStorage } from '../../hooks/useSessionStorage';

import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import './styles/TecnicoEnSede.css'
import { CircularProgress } from '@mui/material';

const TecnicoEnSede: React.FC<{ idVisita: string }> = ({ idVisita }) => {
  const token = useSessionStorage('sessionJWTToken');
  const [idProtocolo, setIdProtocolo] = useState('');
  const [idCampo, setIdCampo] = useState('');
  const [resultado, setResultado] = useState('');
  const [idImage, setIdImage] = useState('');
  const [dateCreated, setDateCreated] = useState('');
  const [observacion, setObservacion] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Estado para manejar la carga

  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  const handleCapture = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null;
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setCapturedImage(imageUrl);
            // Aquí puedes manejar la subida de la imagen o lo que necesites hacer con ella
        }
    };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setIdProtocolo(e.target.value);
    setIsLoading(true); // Inicia la carga

    // Simula un proceso de carga antes de mostrar el contenido
    setTimeout(() => {
      setIsLoading(false); // Finaliza la carga
    }, 1000); // Ajusta el tiempo según sea necesario
  };


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const nuevaActividad = {
      actividades: [{
        id_protocolo: idProtocolo,
        ids_campos_preventivo: [{
          id_campo: idCampo,
          resultado: resultado
        }],
        id_image: idImage,
        date_created: dateCreated,
        observacion: observacion
      }]
    };

    try {
      if (token) {
        const response = await updateVisita(token, idVisita, nuevaActividad);
        console.log('Actividad agregada a la visita:', response);
        // Resetear formulario o redireccionar según sea necesario
      } else {
        console.error('No se encontró token de sesión');
      }
    } catch (error) {
      console.error('Error al actualizar la visita:', error);
    }
  };

  return (
    <form className="TecnicoEnSede-box" onSubmit={handleSubmit}>
      {/* <h2>Agregar Nueva Actividad a Visita</h2>
      <input type="text" value={idProtocolo} onChange={(e) => setIdProtocolo(e.target.value)} placeholder="ID Protocolo" required />
      <input type="text" value={idCampo} onChange={(e) => setIdCampo(e.target.value)} placeholder="ID Campo Preventivo" required />
      <input type="text" value={resultado} onChange={(e) => setResultado(e.target.value)} placeholder="Resultado" required />
      <input type="text" value={idImage} onChange={(e) => setIdImage(e.target.value)} placeholder="ID Imagen" required />
      <input type="date" value={dateCreated} onChange={(e) => setDateCreated(e.target.value)} placeholder="Fecha Creación" required />
      <textarea value={observacion} onChange={(e) => setObservacion(e.target.value)} placeholder="Observación" required />
      <button type="submit">Agregar Actividad</button> */}
      <div className="TecnicoEnSede-visita-actividad">
        <div className="TecnicoEnSede-actividad-group">
              <div className="TecnicoEnSede-overlap-group">
                <div className="TecnicoEnSede-actividad-title">ACTIVIDAD A EJECUTAR</div>
                <select
                    className="TecnicoEnSede-actividad-select"
                    value={idProtocolo}
                    onChange={handleSelectChange}
                >
                    <option value="" disabled selected>Seleccione una actividad</option>
                    <option value="65a93dd789a02ef211e75ecd">Técnico en sede</option>
                    {/* Añade más opciones según sea necesario */}
                </select>
              </div>
        </div>
      </div>

        {isLoading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px' }}>
          <CircularProgress className='TecnicoEnSede-loading-icon'/> {/* Indicador de carga */}
        </div>
      ) : (
        idProtocolo === '65a93dd789a02ef211e75ecd' && (
            <div className="TecnicoEnSede-tecnico-en-sede">
            <div className="TecnicoEnSede-en-sede-group">
              <div className="TecnicoEnSede-overlap-group2">
                <div className="TecnicoEnSede-tecsede-title">TÉCNICO EN SEDE</div>
              </div>
              <label htmlFor="observacion" className="TecnicoEnSede-observacion-t">Observación</label>
                <textarea
                    id="observacion"
                    className="TecnicoEnSede-observacion-text"
                    value={observacion}
                    onChange={(e) => setObservacion(e.target.value)}
                    placeholder="Escribe tu observación aquí..."
                />
              {/* Botón para activar la captura de la imagen */}
              <label htmlFor="capture" className="TecnicoEnSede-image-input-label">
                        <AddAPhotoIcon className="TecnicoEnSede-image-input" />
                    </label>
                    {/* Input para capturar la imagen */}
                    <input
                        id="capture"
                        type="file"
                        accept="image/*"
                        capture="environment" // Usa 'environment' para preferir la cámara trasera
                        onChange={handleCapture}
                        style={{ display: 'none' }} // Oculta el input real
                    />
                    {/* Muestra la imagen capturada */}
                    {capturedImage && 
                                        
                    <img src={capturedImage} alt="Captura" style={{ width: '100px', height: '100px', top: '227px', left: '174px' , position: 'absolute' }} />}

              <div className="TecnicoEnSede-crear-actividad" />
            </div>
          </div>
        )
      )}


    </form>
  );
};

export default TecnicoEnSede;
