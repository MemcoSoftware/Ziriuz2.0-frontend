import React, { useState } from 'react';
import { useSessionStorage } from '../../hooks/useSessionStorage';
import useUserRoleVerifier from '../../hooks/useUserRoleVerifier';
import { updateEquipo } from '../../services/equiposService'; // Importa la función de servicio para actualizar equipos
import { AxiosResponse, AxiosRequestConfig } from 'axios';

interface EditEquipoButtonProps {
  equipoId: string;
  equipoData: any; // Asegúrate de que este prop contenga los datos del equipo
  isEditing: boolean;
  onSaveSuccess: (editedEquipo: any) => void;
}

const EditEquipoButton: React.FC<EditEquipoButtonProps> = ({
  equipoId,
  equipoData,
  isEditing,
  onSaveSuccess,
}) => {
  const [editedEquipo, setEditedEquipo] = useState({ ...equipoData });
  const loggedIn = useSessionStorage('sessionJWTToken');
  const isAdmin = useUserRoleVerifier(['administrador']);

  const handleCancelEdit = () => {
    setEditedEquipo({ ...equipoData }); // Restablecer los datos originales cuando se cancela la edición
  };

  const handleSaveEdit = () => {
    updateEquipo(loggedIn, equipoId, editedEquipo) // Llama a la función para actualizar el equipo
      .then((response: AxiosResponse) => {
        if (response.status === 200 && response.data) {
          onSaveSuccess(response.data);
          window.alert('Equipo actualizado satisfactoriamente');
        }
      })
      .catch((error: any) => console.error(`[EDIT EQUIPO ERROR]: ${error}`));
  };

  return (
    <div>
      {isEditing ? (
        <div>
          <h2>Editar Equipo</h2>
          <label>Serie:</label>
          <input
            type="text"
            value={editedEquipo.serie}
            onChange={(e) => setEditedEquipo({ ...editedEquipo, serie: e.target.value })}
          />
          <label>Modelo:</label>
          <input
            type="text"
            value={editedEquipo.modelo}
            onChange={(e) => setEditedEquipo({ ...editedEquipo, modelo: e.target.value })}
          />
          <label>Sede:</label>
          <input
            type="text"
            value={editedEquipo.sede}
            onChange={(e) => setEditedEquipo({ ...editedEquipo, sede: e.target.value })}
          />
          <label>Ubicación en Sede:</label>
          <input
            type="text"
            value={editedEquipo.ubicacion}
            onChange={(e) => setEditedEquipo({ ...editedEquipo, ubicacion: e.target.value })}
          />
          <label>Área:</label>
          <input
            type="text"
            value={editedEquipo.area}
            onChange={(e) => setEditedEquipo({ ...editedEquipo, area: e.target.value })}
          />
          <label>Tipo:</label>
          <input
            type="text"
            value={editedEquipo.tipo}
            onChange={(e) => setEditedEquipo({ ...editedEquipo, tipo: e.target.value })}
          />
          <label>Frecuencia de Mantenimiento en Meses:</label>
          <input
            type="number"
            value={editedEquipo.frecuencia}
            onChange={(e) =>
              setEditedEquipo({ ...editedEquipo, frecuencia: parseInt(e.target.value) || 0 })
            }
          />
          <button onClick={handleSaveEdit}>Guardar Cambios</button>
          <button onClick={handleCancelEdit}>Cancelar</button>
        </div>
      ) : (
        <button onClick={() => isAdmin && setEditedEquipo(true)}>Editar Equipo</button>
      )}
    </div>
  );
};

export default EditEquipoButton;
