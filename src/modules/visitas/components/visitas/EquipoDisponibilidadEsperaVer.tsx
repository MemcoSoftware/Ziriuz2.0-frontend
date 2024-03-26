import React, { useEffect, useState } from 'react';
import { getVisitaById } from '../../../visitas/services/visitasService'; 
import { useSessionStorage } from '../../hooks/useSessionStorage'; 
import './styles/TecnicoEnSede.css'; // Asegúrate de que el estilo sea apropiado para este componente
import DateRangeIcon from '@mui/icons-material/DateRange';

interface EquipoDisponibilidadEsperaVerProps {
  idVisita: string;
}

const EquipoDisponibilidadEsperaVer: React.FC<EquipoDisponibilidadEsperaVerProps> = ({ idVisita }) => {
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
    return <div>No se encontraron actividades para esta visita.</div>;
  }

  // Buscar la actividad de "En espera de disponibilidad" si existe
  const actividad = visita.actividades.find((act: any) => act.id_protocolo.title === "En espera de disponibilidad");

  if (!actividad) {
    return <div>No se encontró la actividad de "En espera de disponibilidad".</div>;
  }

  return (
    <div className="TecnicoEnSede-box"> 
      <div className="TecnicoEnSede-en-sede-view">
        <div className="TecnicoEnSede-tecnico-en-sede-view-2">
          <div className="TecnicoEnSede-tecsede-title-2">{actividad.id_protocolo.title || 'N/A'}</div>
          <div className="TecnicoEnSede-observacion-t">Observación:</div>
          <div className="TecnicoEnSede-observacion-text">{actividad.observacion || 'N/A'}</div>
          <DateRangeIcon className='TecnicoEnSede-date-icon'/>
          <p className='TecnicoEnSede-date-value'>{actividad.date_created || 'N/A'}</p>
        </div>
      </div>
      <div className='TecnicoEnSede-div-separator'></div>
    </div>
  );
};

export default EquipoDisponibilidadEsperaVer;
