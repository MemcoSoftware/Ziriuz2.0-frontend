import React, { useState } from 'react';
import { updateTipoEquipo } from '../../services/tiposEquipoService';
import { useSessionStorage } from '../../hooks/useSessionStorage';

type EditTipoEquipoButtonProps = {
  tipoEquipoId: string;
  onEditSuccess: () => void;
  onCancel: () => void;
  initialData: any;
};

const EditTipoEquipoButton: React.FC<EditTipoEquipoButtonProps> = ({ tipoEquipoId, onEditSuccess, onCancel, initialData }) => {
  const [tipoEquipoData, setTipoEquipoData] = useState(initialData);
  const loggedIn = useSessionStorage('sessionJWTToken');

  const handleEdit = async () => {
    try {
      const token = loggedIn;

      // Realizar una solicitud PUT para actualizar el tipo de equipo
      await updateTipoEquipo(token, tipoEquipoId, tipoEquipoData);

      onEditSuccess();
      window.location.reload();
      window.alert(`Tipo de equipo: ${tipoEquipoData.tipo} actualizado satisfactoriamente`);
    } catch (error) {
      console.error('Error al editar el tipo de equipo:', error);
    }
  };

  return (
    <div>
      <h2>Editar Tipo de Equipo</h2>
      <div>
        <label>Tipo:</label>
        <input
          type="text"
          value={tipoEquipoData.tipo || ''}
          onChange={(e) => setTipoEquipoData({ ...tipoEquipoData, tipo: e.target.value })}
        />
      </div>
      <button onClick={handleEdit}>Guardar Cambios</button>
      <button onClick={onCancel}>Cancelar</button>
    </div>
  );
};

export default EditTipoEquipoButton;
