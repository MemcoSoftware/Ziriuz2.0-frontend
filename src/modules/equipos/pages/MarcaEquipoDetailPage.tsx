import React, { useState, useEffect } from 'react';
import { useSessionStorage } from '../hooks/useSessionStorage';
import { getMarcaEquipoById, deleteMarcaEquipoById } from '../services/marcasEquipoService';
import DashboardMenuLateral from '../../users/components/dashboard/DashboardMenulateral';
import { useNavigate, useParams } from 'react-router-dom';
import EditMarcaEquipoButton from '../components/marcasEquipos/EditMarcaEquipoButton';
import DeleteMarcaEquipoButton from '../components/marcasEquipos/DeleteMarcaEquipoButton';

const MarcaEquipoDetailPage = () => {
  const { id } = useParams();

  if (!id) {
    return <p>Marca de equipo no encontrada.</p>;
  }

  const loggedIn = useSessionStorage('sessionJWTToken');
  const [marcaEquipo, setMarcaEquipo] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loggedIn) {
      return;
    }

    const fetchMarcaEquipo = async () => {
      try {
        const token = loggedIn;
        const result = await getMarcaEquipoById(token, id);

        setMarcaEquipo(result);
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener detalles de la marca de equipo:', error);
      }
    };

    fetchMarcaEquipo();
  }, [loggedIn, id]);

  const handleEditSuccess = () => {
    setIsEditing(false);
  };

  const handleDeleteSuccess = () => {
    navigate('/equipos/marcas');
  };

  return (
    <div>
      <DashboardMenuLateral />
      <h1>Detalles de la Marca de Equipo</h1>

      {isEditing ? (
        <EditMarcaEquipoButton
          marcaEquipoId={id || ''}
          onEditSuccess={handleEditSuccess}
          onCancel={() => setIsEditing(false)}
          initialData={marcaEquipo}
        />
      ) : (
        <div>
          <h3>Marca: {marcaEquipo ? marcaEquipo.marca : ''}</h3>
          <button onClick={() => setIsEditing(true)}>Editar</button>
          <DeleteMarcaEquipoButton marcaEquipoId={id || ''} onDeleteSuccess={handleDeleteSuccess} />
        </div>
      )}
    </div>
  );
};

export default MarcaEquipoDetailPage;
