import React, { useState, useEffect } from 'react';
import { getAllEquipos } from '../services/equiposService';
import { useSessionStorage } from '../hooks/useSessionStorage';
import DashboardMenuLateral from '../../users/components/dashboard/DashboardMenulateral';

// Importa EquipoCard
import EquipoCard from '../components/equipos/EquipoCard';
import { Equipo } from '../utils/types/Equipo.type';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate

const EquiposPages: React.FC = () => {
  const loggedIn = useSessionStorage('sessionJWTToken');
  const [equipos, setEquipos] = useState<Array<Equipo>>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Agrega useNavigate para la navegación

  useEffect(() => {
    const fetchEquipos = async () => {
      try {
        const token = loggedIn;
        const result = await getAllEquipos(token);

        setEquipos(result);
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener equipos:', error);
      }
    };

    fetchEquipos();
  }, [loggedIn]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  // Define la función navigateToEquipoDetail para la navegación
  const navigateToEquipoDetail = (id: string) => {
    navigate(`/equipos/${id}`);
  };

  return (
    <div>
      <DashboardMenuLateral />
      <h1>Listado de Equipos</h1>
      <ul>
        {equipos.map((equipo) => (
          <li key={equipo._id}>
            <EquipoCard equipo={equipo} onClick={() => navigateToEquipoDetail(equipo._id)} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EquiposPages;
