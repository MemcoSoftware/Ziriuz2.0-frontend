import React, { useEffect, useState } from 'react';
import { getPresignedUrl, getVisitaById, updateVisita } from '../../../visitas/services/visitasService'; 
import { useSessionStorage } from '../../hooks/useSessionStorage';

import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import './styles/TecnicoEnSede.css'
import { CircularProgress } from '@mui/material';
import DateRangeIcon from '@mui/icons-material/DateRange';


const TecnicoEnSede: React.FC<{ idVisita: string }> = ({ idVisita }) => {
  const token = useSessionStorage('sessionJWTToken');
  const [idProtocolo, setIdProtocolo] = useState('');
  const [idCampo, setIdCampo] = useState('');
  const [resultado, setResultado] = useState('');
  const [idImage, setIdImage] = useState('');
  const [dateCreated, setDateCreated] = useState('');
  const [observacion, setObservacion] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Estado para manejar la carga
  

  // TECNICO EN SEDE STATES
  const [mostrarTecnicoEnSede, setMostrarTecnicoEnSede] = useState(false);
  const [visita, setVisita] = useState<any>(null);


  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isImageUploaded, setIsImageUploaded] = useState(false);

  const handleCapture = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file && token) {
        const imageUrl = URL.createObjectURL(file);
        setCapturedImage(imageUrl);

        try {
            setIsLoading(true);
            const response = await getPresignedUrl(token, file.name);
            const presignedUrl = response.presignedUrl;

            await fetch(presignedUrl, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'image/jpg', // Ajusta según el tipo de archivo
                },
                body: file,
            });

            const uploadedImageUrl = presignedUrl.split('?')[0];
            setIdImage(uploadedImageUrl); // Esta es la línea crucial
            setIsImageUploaded(true);
            setIsLoading(false);
        } catch (error) {
            console.error('Error al subir la imagen:', error);
            setIsLoading(false);
        }
    }
};

  
  const validateForm = () => {
    const missingFields = [];
    if (!idProtocolo) missingFields.push("Actividad");
    if (!observacion) missingFields.push("Observación");
    // Cambia esta validación a idImage ya que esa será la URL final de la imagen en S3
    if (!idImage) missingFields.push("Imagen Capturada");
  
    if (missingFields.length > 0) {
      alert(`Por favor, complete los siguientes campos: ${missingFields.join(", ")}`);
      return false;
    }
    return true;
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
    if (!validateForm()) return;
    console.log("idImage:", idImage);
    setIsLoading(true);

    // Obtener la fecha y hora actual en el formato deseado
     const formattedDateCreated = new Date().toISOString().replace('T', ' ').slice(0, 19);

    const nuevaActividad = {
      actividades: [{
        id_protocolo: idProtocolo,
        id_image: idImage,
        observacion: observacion,
        date_created: formattedDateCreated,
      }]
    };

    try {
      if (token && idVisita) {
        await updateVisita(token, idVisita, nuevaActividad);
        alert('Actividad agregada a la visita con éxito.');
        setIsLoading(false);
      } else {
        alert('No se encontró token de sesión.');
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error al actualizar la visita:', error);
      alert('Error al actualizar la visita.');
      setIsLoading(false);
    }
  };


  useEffect(() => {
    if (token && idVisita) {
      setIsLoading(true);
      getVisitaById(token, idVisita)
        .then(data => {
          setVisita(data);
          setIsLoading(false);
        })
        .catch(error => {
          console.error('Error al obtener la visita por ID:', error);
          setIsLoading(false);
        });
    }
  }, [token, idVisita]);

  const renderActividadOFormulario = () => {
    // Si ya hay una actividad en la posición 0, mostrar detalles de la actividad
    if (visita && visita.actividades && visita.actividades.length > 0) {
      const actividad = visita.actividades[0];
      return (
      <div className="TecnicoEnSede-en-sede-view">
        <div className="TecnicoEnSede-tecnico-en-sede-view-2">
          <div className="TecnicoEnSede-tecsede-title-2">{actividad.id_protocolo.title || ''}</div>
          <div className="TecnicoEnSede-observacion-t">Observación: </div>
          <div className="TecnicoEnSede-observacion-text">{actividad.observacion || ''}</div>
          <DateRangeIcon className='TecnicoEnSede-date-icon'/>
          <p className='TecnicoEnSede-date-value'>{actividad.date_created || 'N/A'}</p>
          {actividad.id_image && <img className='TecnicoEnSede-img-value' src={actividad.id_image} alt="Imagen de la actividad" />}
          <div className='TecnicoEnSede-div-separator'/>
        </div>
      </div>
      );
    } else {
      // De lo contrario, mostrar el formulario para crear una nueva actividad
      return (
        <form  onSubmit={handleSubmit}>
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
                <label htmlFor="observacion" className="TecnicoEnSede-observacion-t">Observación: *</label>
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
  
                <button type='submit' className="TecnicoEnSede-crear-actividad">CREAR ACTIVIDAD</button>
              </div>
            </div>
          )
        )}
  
  
      </form>
      );
    }
  };
  
  return (

  <div className="TecnicoEnSede-box">
    {/* Renderizar Actividad o Formulario basado en la existencia de la actividad */ }
    
    {renderActividadOFormulario()}
  </div>
  );
};

export default TecnicoEnSede;
