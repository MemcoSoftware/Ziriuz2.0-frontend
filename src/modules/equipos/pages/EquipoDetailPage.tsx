import React, { useState, useEffect } from 'react';
import { useSessionStorage } from '../hooks/useSessionStorage';
import { getEquipoById } from '../services/equiposService';
import DashboardMenuLateral from '../../users/components/dashboard/DashboardMenulateral';
import { useNavigate, useParams } from 'react-router-dom';
import EditEquipoButton from '../components/equipos/EditEquipoButton';
import DeleteEquipoButton from '../components/equipos/DeleteEquipoButton';

const EquipoDetailPage: React.FC = () => {
  const loggedIn = useSessionStorage('sessionJWTToken');
  const { id } = useParams();
  const [equipo, setEquipo] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loggedIn) {
      // Manejar la redirección si el usuario no está autenticado
      return;
    }

    if (!id) {
      // Maneja el caso en el que id es undefined (parámetro no encontrado en la URL)
      console.error('ID del equipo no encontrado en la URL');
      return;
    }

    const fetchEquipo = async () => {
      try {
        const token = loggedIn;
        const result = await getEquipoById(token, id);

        setEquipo(result);
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener detalles del equipo:', error);
      }
    };

    fetchEquipo();
  }, [loggedIn, id]);

  const handleEditSuccess = () => {
    console.log('Equipo editado con éxito');
    setIsEditing(false);
  };



  return (
    <div>
      <DashboardMenuLateral />
      <h1>Detalles del Equipo</h1>

      {isEditing ? (
        <EditEquipoButton
          equipoId={id || ''}
          onEditSuccess={handleEditSuccess}
          onCancel={() => setIsEditing(false)}
          initialData={equipo}
        />
      ) : (
        <div>
          <h3>Serie: {equipo ? equipo.serie : ''}</h3>
          <p>Modelo: {equipo && equipo.modelo_equipos ? equipo.modelo_equipos.modelo : ''}</p>
          <p>Sede: {equipo && equipo.id_sede ? equipo.id_sede.sede_nombre : ''}</p>
          <p>Ubicación en sede: {equipo ? equipo.ubicacion : ''}</p>
          <p>Área: {equipo && equipo.id_area ? equipo.id_area.area : ''}</p>
          <p>Tipo: {equipo && equipo.id_tipo ? equipo.id_tipo.tipo : ''}</p>
          <p>Frecuencia Mantenimiento en meses: {equipo ? equipo.frecuencia : ''}</p>
          <button onClick={() => setIsEditing(true)}>Editar</button>
        </div>
      )}

      <DeleteEquipoButton equipoId={id || ''} serie={equipo ? equipo.serie : ''}/>
    </div>
  );
};

export default EquipoDetailPage;
