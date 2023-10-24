import React, { useState, useEffect } from 'react';
import { useSessionStorage } from '../hooks/useSessionStorage';
import { getAreaEquipoById, deleteAreaEquipoById } from '../services/areasEquiposService';
import DashboardMenuLateral from '../../users/components/dashboard/DashboardMenulateral';
import { useNavigate, useParams } from 'react-router-dom';
import EditAreaEquipoButton from '../components/areasEquipos/EditAreaEquipoButton';
import DeleteAreaEquipoButton from '../components/areasEquipos/DeleteAreaEquipoButton';

const AreaEquipoDetailPage = () => {
  const { id } = useParams();

  if (!id) {
    return <p>Área de equipo no encontrada.</p>;
  }

  const loggedIn = useSessionStorage('sessionJWTToken');
  const [areaEquipo, setAreaEquipo] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loggedIn) {
      return;
    }

    const fetchAreaEquipo = async () => {
      try {
        const token = loggedIn;
        const result = await getAreaEquipoById(token, id);

        setAreaEquipo(result);
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener detalles del área de equipo:', error);
      }
    };

    fetchAreaEquipo();
  }, [loggedIn, id]);

  const handleEditSuccess = () => {
    setIsEditing(false);
  };

  const handleDeleteSuccess = () => {
    navigate('/equipos/areas');
  };

  return (
    <div>
      <DashboardMenuLateral />
      <h1>Detalles del Área de Equipo</h1>

      {isEditing ? (
        <EditAreaEquipoButton
          areaEquipoId={id || ''}
          onEditSuccess={handleEditSuccess}
          onCancel={() => setIsEditing(false)}
          initialData={areaEquipo}
        />
      ) : (
        <div>
          <h3>Área: {areaEquipo ? areaEquipo.area : ''}</h3>
          <button onClick={() => setIsEditing(true)}>Editar</button>
          <DeleteAreaEquipoButton areaEquipoId={id || ''} onDeleteSuccess={handleDeleteSuccess} />
        </div>
      )}
    </div>
  );
};

export default AreaEquipoDetailPage;
