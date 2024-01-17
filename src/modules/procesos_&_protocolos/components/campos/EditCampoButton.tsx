import React, { useState } from 'react';
import { updateCampos } from '../../services/camposService';
import { useSessionStorage } from '../../hooks/useSessionStorage';
// import './styles/EditCampoButton.css'; 

type EditCampoButtonProps = {
  campoId: string;
  onEditSuccess: () => void;
  onCancel: () => void;
  initialData: any; // Asegúrate de que esto coincida con la estructura de un Campo
};

const EditCampoButton: React.FC<EditCampoButtonProps> = ({ campoId, onEditSuccess, onCancel, initialData }) => {
  const [campoData, setCampoData] = useState(initialData);
  const loggedIn = useSessionStorage('sessionJWTToken');

  const handleEdit = async () => {
    try {
      const token = loggedIn;

      // Mapear los campos relacionados al formato correcto
      const mappedData = {
        ...campoData,
        // Asumiendo que id_tipo es un objeto y necesita mapearse a una cadena para la solicitud
        id_tipo: campoData.id_tipo.nombre
      };

      await updateCampos(token, campoId, mappedData);
      onEditSuccess();
      window.alert(`Campo actualizado satisfactoriamente`);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error('Error al editar el campo:', error);
    }
  };

  return (
    <div className="EditCampoButton-box">
      <form className="EditCampoButton-form" onSubmit={(e) => {e.preventDefault(); handleEdit();}}>
        <div className="EditCampoButton-overlap-group">
          <div className="EditCampoButton-text-wrapper">ACTUALIZAR CAMPO</div>
          
          <label className="EditCampoButton-label">Tipo de Campo:</label>
          <input
            type="text"
            value={campoData.id_tipo.nombre || ''}
            onChange={(e) => setCampoData({ ...campoData, id_tipo: { ...campoData.id_tipo, nombre: e.target.value } })}
            className="EditCampoButton-input" />

          <label className="EditCampoButton-label">Título del Campo:</label>
          <input
            type="text"
            value={campoData.title || ''}
            onChange={(e) => setCampoData({ ...campoData, title: e.target.value })}
            className="EditCampoButton-input" />

          <div className="EditCampoButton-button-container">
            <button className="EditCampoButton-button-cancel" onClick={onCancel}>CANCELAR</button>
            <button type="submit" className="EditCampoButton-button-update">ACTUALIZAR</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditCampoButton;
