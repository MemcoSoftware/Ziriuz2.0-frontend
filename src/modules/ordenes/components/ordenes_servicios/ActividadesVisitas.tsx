import React, { useEffect, useState } from 'react';
import { getVisitaById } from '../../../visitas/services/visitasService';
import { useSessionStorage } from '../../hooks/useSessionStorage';
import TecnicoEnSede from '../../../visitas/components/visitas/TecnicoEnSede';
import './styles/ActividadesVisitas.css'
import EquipoDisponibilidadVer from '../../../visitas/components/visitas/EquipoDisponibilidadVer';
import EquipoDisponibilidadEsperaVer from '../../../visitas/components/visitas/EquipoDisponibilidadEsperaVer';

interface ActividadesVisitasProps {
  idVisita: string;
}

const ActividadesVisitas: React.FC<ActividadesVisitasProps> = ({ idVisita }) => {
  const token = useSessionStorage('sessionJWTToken');
  const [visita, setVisita] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (token && idVisita) {
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

  if (isLoading) {
    return <div className='ActividadesVisitas-set-loading'>Cargando detalles de la visita...</div>;
  }

  if (!visita || visita.actividades.length === 0) {
    return <div></div>;
  }

  // Verificamos si la actividad en la posición 0 es "Técnico en sede"
  const esTecnicoEnSede = visita.actividades[0].id_protocolo.title === "Técnico en sede";
  const equipoDisponibleVer = visita.actividades.find((act: any) => act.id_protocolo.title === "Equipo disponible");
  const equipoEseperaDisponibleVer = visita.actividades.find((act: any) => act.id_protocolo.title === "En espera de disponibilidad");

  return (
    <div>
      <div className='ActividadesVisitas-title'>ACTIVIDADES</div>
      <div className="ActividadesVisitas-container">
        {esTecnicoEnSede && <TecnicoEnSede idVisita={idVisita} />}
        {equipoDisponibleVer && <EquipoDisponibilidadVer idVisita={idVisita} />}
        {equipoEseperaDisponibleVer && <EquipoDisponibilidadEsperaVer idVisita={idVisita} />}
      </div>

      {/* Aquí puedes renderizar más componentes de actividades según sea necesario */}
    </div>
  );
};

export default ActividadesVisitas;
