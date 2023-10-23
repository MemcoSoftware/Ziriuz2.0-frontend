import React, { useState } from 'react';
import { updateEquipo } from '../../services/equiposService';
import { useSessionStorage } from '../../hooks/useSessionStorage';

type EditEquipoButtonProps = {
  equipoId: string;
  onEditSuccess: () => void;
  onCancel: () => void;
  initialData: any;
};

const EditEquipoButton: React.FC<EditEquipoButtonProps> = ({ equipoId, onEditSuccess, onCancel, initialData }) => {
  const [equipoData, setEquipoData] = useState(initialData);

  const loggedIn = useSessionStorage('sessionJWTToken');

  const handleEdit = async () => {
    try {
      const token = loggedIn;

      // Mapear los campos relacionados al formato correcto
      const mappedData = {
        ...equipoData,
        id_sede: equipoData.id_sede.sede_nombre,
        modelo_equipos: equipoData.modelo_equipos.modelo,
        id_area: equipoData.id_area.area,
        id_tipo: equipoData.id_tipo.tipo,
      };

      await updateEquipo(token, equipoId, mappedData);
      onEditSuccess();
      window.location.reload();
      window.alert(`Equipo SERIE: ${equipoData.serie} actualizado satisfactoriamente`);
    } catch (error) {
      console.error('Error al editar el equipo:', error);
    }
  };

  return (
    <div>
      <h2>Editar Equipo</h2>
      <div>
        <label>ID de Sede:</label>
        <input
          type="text"
          value={equipoData.id_sede ? equipoData.id_sede.sede_nombre : ''}
          onChange={(e) => setEquipoData({ ...equipoData, id_sede: { sede_nombre: e.target.value } })}
        />
      </div>
      <div>
        <label>Modelo de Equipos:</label>
        <input
          type="text"
          value={equipoData.modelo_equipos ? equipoData.modelo_equipos.modelo : ''}
          onChange={(e) => setEquipoData({ ...equipoData, modelo_equipos: { modelo: e.target.value } })}
        />
      </div>
      <div>
        <label>ID de Área:</label>
        <input
          type="text"
          value={equipoData.id_area ? equipoData.id_area.area : ''}
          onChange={(e) => setEquipoData({ ...equipoData, id_area: { area: e.target.value } })}
        />
      </div>
      <div>
        <label>ID de Tipo:</label>
        <input
          type="text"
          value={equipoData.id_tipo ? equipoData.id_tipo.tipo : ''}
          onChange={(e) => setEquipoData({ ...equipoData, id_tipo: { tipo: e.target.value } })}
        />
      </div>
      <div>
        <label>Serie:</label>
        <input
          type="text"
          value={equipoData.serie || ''}
          onChange={(e) => setEquipoData({ ...equipoData, serie: e.target.value })}
        />
      </div>
      <div>
        <label>Ubicación:</label>
        <input
          type="text"
          value={equipoData.ubicacion || ''}
          onChange={(e) => setEquipoData({ ...equipoData, ubicacion: e.target.value })}
        />
      </div>
      <div>
        <label>Frecuencia Mantenimiento en meses:</label>
        <input
          type="number"
          value={equipoData.frecuencia || ''}
          onChange={(e) => setEquipoData({ ...equipoData, frecuencia: e.target.value })}
        />
      </div>
      <button onClick={handleEdit}>Guardar Cambios</button>
      <button onClick={onCancel}>Cancelar</button>
    </div>
  );
};

export default EditEquipoButton;
