import React, { useState, useEffect } from 'react';
import { useSessionStorage } from '../hooks/useSessionStorage';
import { getModeloEquipoById } from '../services/equiposModeloService';
import DashboardMenuLateral from '../../users/components/dashboard/DashboardMenulateral';
import { useNavigate, useParams } from 'react-router-dom';
import EditEquipoModeloButton from '../components/equiposModelos/EditEquipoModeloButton';

const EquipoModeloDetailPage = () => {
  const { id } = useParams();

  if (!id) {
    // Maneja el caso en el que id es undefined (parámetro no encontrado en la URL)
    return <p>Modelo de equipo no encontrado.</p>;
  }

  const loggedIn = useSessionStorage('sessionJWTToken');
  const [modeloEquipo, setModeloEquipo] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loggedIn) {
      // Manejar la redirección si el usuario no está autenticado
      return;
    }

    const fetchModeloEquipo = async () => {
      try {
        const token = loggedIn;
        const result = await getModeloEquipoById(token, id);

        setModeloEquipo(result);
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener detalles del modelo de equipo:', error);
      }
    };

    fetchModeloEquipo();
  }, [loggedIn, id]);

  const handleEditSuccess = () => {
    console.log('Modelo de equipo editado con éxito');
    setIsEditing(false);
  };

  return (
    <div>
      <DashboardMenuLateral />
      <h1>Detalles del Modelo de Equipo</h1>

      {isEditing ? (
        <EditEquipoModeloButton
          modeloEquipoId={id || ''}
          onEditSuccess={handleEditSuccess}
          onCancel={() => setIsEditing(false)}
          initialData={modeloEquipo}
        />
      ) : (
        <div>
          <h3>Modelo: {modeloEquipo ? modeloEquipo.modelo : ''}</h3>
          <p>Precio: {modeloEquipo ? modeloEquipo.precio : ''}</p>
          <p>Marca: {modeloEquipo && modeloEquipo.id_marca ? modeloEquipo.id_marca.marca : 'N/A'}</p>
          <p>Clase: {modeloEquipo && modeloEquipo.id_clase ? modeloEquipo.id_clase.clase : 'N/A'}</p>
          <button onClick={() => setIsEditing(true)}>Editar</button>
        </div>
      )}
    </div>
  );
};

export default EquipoModeloDetailPage;
