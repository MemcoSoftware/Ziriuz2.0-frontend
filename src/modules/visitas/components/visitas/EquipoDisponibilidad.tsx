import React, { useEffect, useState } from 'react';
import { CircularProgress } from '@mui/material';
import { getVisitaById } from '../../services/visitasService'; // Asegúrate de que la ruta sea correcta
import './styles/EquipoDisponibilidad.css';
import { useSessionStorage } from '../../hooks/useSessionStorage'; // Asegúrate de que la ruta sea correcta
import EquipoDisponibleRegistrar from './EquipoDisponibilidadRegistrar';
import EquipoDisponibleEsperaRegistrar from './EquipoDisponibilidadEsperaRegistrar';

interface EquipoDisponibilidadProps {
  idVisita: string;
}

const EquipoDisponibilidad: React.FC<EquipoDisponibilidadProps> = ({ idVisita }) => {
  const [idProtocolo, setIdProtocolo] = useState('');
  const [isLoading, setIsLoading] = useState(true); // Inicializado en true para mostrar carga inicialmente
  const [actividades, setActividades] = useState<any[]>([]);
  const token = useSessionStorage('sessionJWTToken');

  useEffect(() => {
    getVisitaById(token, idVisita).then(data => {
      setActividades(data.actividades || []);
      setIsLoading(false);
    });
  }, [token, idVisita]);

  const actividadExistente = actividades.some(actividad => 
    actividad.id_protocolo.title === 'Equipo disponible' || 
    actividad.id_protocolo.title === 'En espera de disponibilidad'
  );

  if (actividadExistente) {
    return null; // Si alguna actividad cumple con la condición, no renderizamos el componente
  }

  // Revisa si ya existe la actividad "Equipo Disponible"
  const equipoDisponibleExistente = actividades.some(actividad => actividad.id_protocolo.title === 'Equipo Disponible');
  
  // Revisa si ya existe la actividad "En Espera de Disponibilidad"
  const esperaDisponibilidadExistente = actividades.some(actividad => actividad.id_protocolo.title === 'En Espera de Disponibilidad');

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setIdProtocolo(e.target.value);
    setIsLoading(true); // Simula la carga al cambiar de opción

    // Simula un retraso para mostrar el indicador de carga
    setTimeout(() => {
      setIsLoading(false); // Finaliza la carga
    }, 1000);
  }; 

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px', top: '200px', position: 'relative' }}>
        <CircularProgress className='EquipoDisponibilidad-loading-icon' />
      </div>
    );
  }

  return (
    <div className="EquipoDisponibilidad-visita-actividad">
      <div className="EquipoDisponibilidad-actividad-group">
        <div className="EquipoDisponibilidad-overlap-group">
          <div className="EquipoDisponibilidad-actividad-title">ACTIVIDAD A EJECUTAR</div>
          <select
            className="EquipoDisponibilidad-actividad-select"
            value={idProtocolo}
            onChange={handleSelectChange}
          >
            <option value="" disabled selected>Seleccione una opción</option>
            {!equipoDisponibleExistente && <option value="65a93df489a02ef211e75ed3">Equipo Disponible</option>}
            {!esperaDisponibilidadExistente && <option value="65a93dec89a02ef211e75ed1">En Espera de Disponibilidad</option>}
          </select>
        </div>
      </div>
      {idProtocolo === '65a93df489a02ef211e75ed3' && <EquipoDisponibleRegistrar idVisita={idVisita} />}
      {idProtocolo === '65a93dec89a02ef211e75ed1' && <EquipoDisponibleEsperaRegistrar idVisita={idVisita} />}
      <div className='EquipoDisponibilidad-separator'></div>
    </div>
  );
};

export default EquipoDisponibilidad;
