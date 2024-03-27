import React, { useEffect, useState } from 'react';
import { getVisitaById } from '../../../visitas/services/visitasService';
import { useSessionStorage } from '../../hooks/useSessionStorage';
import TecnicoEnSede from './TecnicoEnSede'; // Asegúrate de que la ruta de importación sea correcta
import RegisterTecnicoEnSede from './RegisterTecnicoEnSede';
import './styles/ActividadesEjecutar.css'
import EquipoDisponibilidad from './EquipoDisponibilidad';

interface ActividadesEjecutarProps {
  idVisita: string;
}

const ActividadesEjecutar: React.FC<ActividadesEjecutarProps> = ({ idVisita }) => {
  const token = useSessionStorage('sessionJWTToken');
  const [visita, setVisita] = useState<any>(null);

  useEffect(() => {
    if (token && idVisita) {
      getVisitaById(token, idVisita)
        .then(data => {
          setVisita(data);
        })
        .catch(error => {
          console.error('Error al obtener la visita por ID:', error);
        });
    }
  }, [token, idVisita]);

  // Lógica para decidir qué componente renderizar
  const renderActividad = () => {
    if (!visita || !visita.actividades || visita.actividades.length === 0) {
      // No hay actividades, mostrar componente para registrar actividad "Técnico en sede"
      return <RegisterTecnicoEnSede idVisita={idVisita} />;
    } else if (visita.actividades[0].id_protocolo.title === "Técnico en sede") {
      // La actividad en posición 0 es "Técnico en sede", mostrar componente para ver detalles y la seleccion de disponibilidad del equipo

      return (
        <>
          <TecnicoEnSede idVisita={idVisita} />
          <EquipoDisponibilidad idVisita={idVisita} /> 
        </>
      );
        
    }
    // Opcionalmente, manejar otros casos o simplemente no renderizar nada
    return null;
  };

  return (
    <div>
      <div className='ActividadesEjecutar-title'>EJECUTANDO VISITA</div>
      <div className='ActividadesEjecutar-container'>
        {renderActividad()}
      </div>
    </div>
  );
};

export default ActividadesEjecutar;
