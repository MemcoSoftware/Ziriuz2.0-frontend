import React, { useState, useEffect } from 'react';
import { useSessionStorage } from '../hooks/useSessionStorage';
import { getClaseEquipoById, deleteClaseEquipoById } from '../services/clasesEquipoService';
import DashboardMenuLateral from '../../users/components/dashboard/DashboardMenulateral';
import { useNavigate, useParams } from 'react-router-dom';
import EditClaseEquipoButton from '../components/clasesEquipos/EditClaseEquipoButton';
import DeleteClaseEquipoButton from '../components/clasesEquipos/DeleteClaseEquipoButton';

const ClaseEquipoDetailPage = () => {
  const { id } = useParams();

  if (!id) {
    return <p>Clase de equipo no encontrada.</p>;
  }

  const loggedIn = useSessionStorage('sessionJWTToken');
  const [claseEquipo, setClaseEquipo] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loggedIn) {
      return;
    }

    const fetchClaseEquipo = async () => {
      try {
        const token = loggedIn;
        const result = await getClaseEquipoById(token, id);

        setClaseEquipo(result);
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener detalles de la clase de equipo:', error);
      }
    };

    fetchClaseEquipo();
  }, [loggedIn, id]);

  const handleEditSuccess = () => {
    setIsEditing(false);
  };

  const handleDeleteSuccess = () => {
    navigate('/equipos/clases');
  };

  return (
    <div>
      <DashboardMenuLateral />
      <h1>Detalles de la Clase de Equipo</h1>

      {isEditing ? (
        <EditClaseEquipoButton
          claseEquipoId={id || ''}
          onEditSuccess={handleEditSuccess}
          onCancel={() => setIsEditing(false)}
          initialData={claseEquipo}
        />
      ) : (
        <div>
          <h3>Clase: {claseEquipo ? claseEquipo.clase : ''}</h3>
          <button onClick={() => setIsEditing(true)}>Editar</button>
          <DeleteClaseEquipoButton claseEquipoId={id || ''} onDeleteSuccess={handleDeleteSuccess} />
        </div>
      )}
    </div>
  );
};

export default ClaseEquipoDetailPage;
