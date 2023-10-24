import React from 'react';
import { deleteClaseEquipoById } from '../../services/clasesEquipoService';
import { useSessionStorage } from '../../hooks/useSessionStorage';
import useUserRoleVerifier from '../../hooks/useUserRoleVerifier';
import { useNavigate } from 'react-router-dom';

type DeleteClaseEquipoButtonProps = {
  claseEquipoId: string;
  onDeleteSuccess: () => void;
};

const DeleteClaseEquipoButton: React.FC<DeleteClaseEquipoButtonProps> = ({ claseEquipoId, onDeleteSuccess }) => {
  const loggedIn = useSessionStorage('sessionJWTToken');
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (!loggedIn) {
      return;
    }

    try {
      const token = loggedIn;
      await deleteClaseEquipoById(token, claseEquipoId);

      navigate('/clases-equipos');
      window.alert('La clase de equipo se ha eliminado satisfactoriamente');
      onDeleteSuccess();
    } catch (error) {
      console.error('Error al eliminar la clase de equipo:', error);
    }
  };

  return (
    <button onClick={handleDelete}>Eliminar Clase de Equipo</button>
  );
};

export default DeleteClaseEquipoButton;
