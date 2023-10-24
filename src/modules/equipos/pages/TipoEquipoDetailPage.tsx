import React, { useState, useEffect } from 'react';
import { useSessionStorage } from '../hooks/useSessionStorage';
import { getTipoEquipoById, deleteTipoEquipoById } from '../services/tiposEquipoService';
import DashboardMenuLateral from '../../users/components/dashboard/DashboardMenulateral';
import { useNavigate, useParams } from 'react-router-dom';
import EditTipoEquipoButton from '../components/tiposEquipos/EditTipoEquipoButton';
import DeleteTipoEquipoButton from '../components/tiposEquipos/DeleteTipoEquipoButton';

const TipoEquipoDetailPage = () => {
  const { id } = useParams();

  if (!id) {
    return <p>Tipo de equipo no encontrado.</p>;
  }

  const loggedIn = useSessionStorage('sessionJWTToken');
  const [tipoEquipo, setTipoEquipo] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loggedIn) {
      return;
    }

    const fetchTipoEquipo = async () => {
      try {
        const token = loggedIn;
        const result = await getTipoEquipoById(token, id);

        setTipoEquipo(result);
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener detalles del tipo de equipo:', error);
      }
    };

    fetchTipoEquipo();
  }, [loggedIn, id]);

  const handleEditSuccess = () => {
    setIsEditing(false);
  };

  const handleDeleteSuccess = () => {
    navigate('/equipos/tipos');
  };

  return (
    <div>
      <DashboardMenuLateral />
      <h1>Detalles del Tipo de Equipo</h1>

      {isEditing ? (
        <EditTipoEquipoButton
          tipoEquipoId={id || ''}
          onEditSuccess={handleEditSuccess}
          onCancel={() => setIsEditing(false)}
          initialData={tipoEquipo}
        />
      ) : (
        <div>
          <h3>Tipo: {tipoEquipo ? tipoEquipo.tipo : ''}</h3>
          <button onClick={() => setIsEditing(true)}>Editar</button>
          <DeleteTipoEquipoButton tipoEquipoId={id || ''} onDeleteSuccess={handleDeleteSuccess} />
        </div>
      )}
    </div>
  );
};

export default TipoEquipoDetailPage;
