import React, { useState } from 'react';
import { deleteEquipoById } from '../../services/equiposService';
import { AxiosResponse } from 'axios';
import { useSessionStorage } from '../../hooks/useSessionStorage';
import useUserRoleVerifier from '../../hooks/useUserRoleVerifier';
import { useNavigate } from 'react-router-dom';

const DeleteEquipoButton: React.FC<{ equipoId: string, serie: string }> = ({ equipoId, serie }) => {
  const loggedIn = useSessionStorage('sessionJWTToken');
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (!loggedIn) {
      // Manejar la redirección si el usuario no está autenticado
      return;
    }

    try {
      const token = loggedIn;
      await deleteEquipoById(token, equipoId);

      // Realizar la redirección y mostrar un mensaje de éxito
      navigate('/equipos');
      window.alert(`El equipo ${serie} se ha eliminado satisfactoriamente`);
    } catch (error) {
      console.error('Error al eliminar el equipo:', error);
    }
  };

  return (
    <button onClick={handleDelete}>Eliminar Equipo</button>
  );
};

export default DeleteEquipoButton;
