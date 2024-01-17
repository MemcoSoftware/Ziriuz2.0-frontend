import React, { useState, useEffect } from 'react';
import { useSessionStorage } from '../hooks/useSessionStorage';
import { getCamposById } from '../services/camposService';
import DashboardMenuLateral from '../../users/components/dashboard/DashboardMenulateral';
import { useNavigate, useParams } from 'react-router-dom';
import EditCampoButton from '../components/campos/EditCampoButton';
import { Campo } from '../utils/types/Campo.type';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
// import './styles/CampoDetailPage.css'; 
import DeleteCampoButton from '../components/campos/DeleteCampoButton';

const CampoDetailPage: React.FC = () => {
  const loggedIn = useSessionStorage('sessionJWTToken');
  const { id } = useParams();
  const [campo, setCampo] = useState<Campo | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loggedIn) {
      return;
    }

    if (!id) {
      console.error('ID del campo no encontrado en la URL');
      return;
    }

    const fetchCampo = async () => {
      try {
        const token = loggedIn;
        const result = await getCamposById(token, id);

        setCampo(result);
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener detalles del campo:', error);
      }
    };

    fetchCampo();
  }, [loggedIn, id]);

  const handleEditSuccess = () => {
    console.log('Campo editado con éxito');
    setIsEditing(false);
  };

  return (
    <div>
      <DashboardMenuLateral />

      {isEditing ? (
        <EditCampoButton
          campoId={id || ''}
          onEditSuccess={handleEditSuccess}
          onCancel={() => setIsEditing(false)}
          initialData={campo}
        />
      ) : (
        loading ? (
          <div>Cargando...</div>
        ) : (
          campo && (
            <div className="CampoDetailPage-box">
              <div className="CampoDetailPage-campo-detail">
                {/* Aquí va el contenido de la página de detalles del campo */}
                <div className="CampoDetailPage-title">{campo.title}</div>
                <div className="CampoDetailPage-id">ID: {campo._id}</div>
                <div className="CampoDetailPage-tipo">Tipo: {campo.id_tipo.nombre}</div>

                <EditOutlinedIcon className="CampoDetailPage-edit-icon" onClick={() => setIsEditing(true)} />
                <DeleteCampoButton campoId={id || ''} title={campo.title} />
              </div>
            </div>
          )
        )
      )}
    </div>
  );
};

export default CampoDetailPage;
