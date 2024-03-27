import React, { useEffect, useState } from 'react';
import { getVisitaById } from '../../../visitas/services/visitasService';
import { useSessionStorage } from '../../hooks/useSessionStorage';
import './styles/TecnicoEnSede.css';
import DateRangeIcon from '@mui/icons-material/DateRange';

interface TecnicoEnSedeProps {
  idVisita: string;
}

const TecnicoEnSede: React.FC<TecnicoEnSedeProps> = ({ idVisita }) => {
  const token = useSessionStorage('sessionJWTToken');
  const [visita, setVisita] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

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

  if (!visita || visita.actividades.length === 0) {
    return <div></div>;
  }

  const actividad = visita.actividades[0]; // Asumiendo que queremos mostrar la primera actividad

  return (
    <div className="TecnicoEnSede-box"> 
      <div className="TecnicoEnSede-en-sede-view">
        <div className="TecnicoEnSede-tecnico-en-sede-view-2">
          <div className="TecnicoEnSede-tecsede-title-2">{actividad.id_protocolo.title || 'N/A'}</div>
          <div className="TecnicoEnSede-observacion-t">Observación:</div>
          <div className="TecnicoEnSede-observacion-text">{actividad.observacion || 'N/A'}</div>
          <DateRangeIcon className='TecnicoEnSede-date-icon'/>
          <p className='TecnicoEnSede-date-value'>{actividad.date_created || 'N/A'}</p>
          {actividad.id_image && <img className='TecnicoEnSede-img-value' src={actividad.id_image} alt="Imagen de la actividad" />}
        </div>
      </div>
    </div>
  );
};

export default TecnicoEnSede;
