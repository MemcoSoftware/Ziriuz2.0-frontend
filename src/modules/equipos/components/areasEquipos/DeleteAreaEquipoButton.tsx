import React from 'react';
import { deleteAreaEquipoById } from '../../services/areasEquiposService';
import { useSessionStorage } from '../../hooks/useSessionStorage';
import useUserRoleVerifier from '../../hooks/useUserRoleVerifier';
import { useNavigate } from 'react-router-dom';

type DeleteAreaEquipoButtonProps = {
  areaEquipoId: string;
  onDeleteSuccess: () => void;
};

const DeleteAreaEquipoButton: React.FC<DeleteAreaEquipoButtonProps> = ({ areaEquipoId, onDeleteSuccess }) => {
  const loggedIn = useSessionStorage('sessionJWTToken');
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (!loggedIn) {
      return;
    }

    try {
      const token = loggedIn;
      await deleteAreaEquipoById(token, areaEquipoId);

      navigate('/areas-equipos');
      window.alert('El área de equipo se ha eliminado satisfactoriamente');
      onDeleteSuccess();
    } catch (error) {
      console.error('Error al eliminar el área de equipo:', error);
    }
  };

  return (
    <button onClick={handleDelete}>Eliminar Área de Equipo</button>
  );
};

export default DeleteAreaEquipoButton;
