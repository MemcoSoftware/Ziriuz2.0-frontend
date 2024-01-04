import React, { useState } from 'react';
import { updatePreventivo } from '../../services/preventivosService';
import { useSessionStorage } from '../../hooks/useSessionStorage';
// import './styles/EditPreventivoButton.css';

type EditPreventivoButtonProps = {
  preventivoId: string;
  onEditSuccess: () => void;
  onCancel: () => void;
  initialData: any;
};

const EditPreventivoButton: React.FC<EditPreventivoButtonProps> = ({ preventivoId, onEditSuccess, onCancel, initialData }) => {
  const [preventivoData, setPreventivoData] = useState(initialData);

  const loggedIn = useSessionStorage('sessionJWTToken');

  const handleEdit = async () => {
    try {
      const token = loggedIn;

      // Mapear los campos relacionados al formato correcto
      const mappedData = {
        ...preventivoData,
        // Mapear otros campos según tu estructura
      };

      await updatePreventivo(token, preventivoId, mappedData);
      onEditSuccess();
      // Mostrar la alerta y luego recargar la página después de 2 segundos
      window.alert(`Preventivo ID: ${preventivoData._id} actualizado satisfactoriamente`);
      setTimeout(() => {
        window.location.reload();
      }, 2000); // 2000 milisegundos (2 segundos)
    } catch (error) {
      console.error('Error al editar el preventivo:', error);
    }
  };

  return (
    <div className="EditPreventivoButton-box">
      <form className="EditPreventivoButton-form">
        {/* Campos comunes */}
        <div className="EditPreventivoButton-input-wrapper">
          <label>Título:</label>
          <input
            type="text"
            value={preventivoData.title}
            onChange={(e) => setPreventivoData({ ...preventivoData, title: e.target.value })}
          />
        </div>

        <div className="EditPreventivoButton-input-wrapper">
          <label>Código:</label>
          <input
            type="text"
            value={preventivoData.codigo}
            onChange={(e) => setPreventivoData({ ...preventivoData, codigo: e.target.value })}
          />
        </div>

        <div className="EditPreventivoButton-input-wrapper">
          <label>Versión:</label>
          <input
            type="number"
            value={preventivoData.version}
            onChange={(e) => setPreventivoData({ ...preventivoData, version: e.target.value })}
          />
        </div>

        <div className="EditPreventivoButton-input-wrapper">
          <label>Fecha:</label>
          <input
            type="date"
            value={preventivoData.fecha}
            onChange={(e) => setPreventivoData({ ...preventivoData, fecha: e.target.value })}
          />
        </div>

        {/* Campos específicos de cada entidad */}
        <div className="EditPreventivoButton-input-wrapper">
          <label>Cualitativo:</label>
          <input
            type="text"
            value={preventivoData.cualitativo ? preventivoData.cualitativo.title : 'N/A'}
            onChange={(e) => setPreventivoData({ ...preventivoData, cualitativo: e.target.value })}
          />
        </div>

        <div className="EditPreventivoButton-input-wrapper">
          <label>Mantenimiento:</label>
          <input
            type="text"
            value={preventivoData.mantenimiento ? preventivoData.mantenimiento.title : 'N/A'}
            onChange={(e) => setPreventivoData({ ...preventivoData, mantenimiento: e.target.value })}
          />
        </div>

        <div className="EditPreventivoButton-input-wrapper">
          <label>Cuantitativo:</label>
          <input
            type="text"
            value={preventivoData.cuantitativo ? preventivoData.cuantitativo.title : 'N/A'}
            onChange={(e) => setPreventivoData({ ...preventivoData, cuantitativo: e.target.value })}
          />
        </div>

        <div className="EditPreventivoButton-input-wrapper">
          <label>Otros:</label>
          <input
            type="text"
            value={preventivoData.otros ? preventivoData.otros.title : 'N/A'}
            onChange={(e) => setPreventivoData({ ...preventivoData, otros: e.target.value })}
          />
        </div>

        <div className="EditPreventivoButton-button-wrapper">
          <button type="button" onClick={handleEdit} className="EditPreventivoButton-edit-button">
            Editar
          </button>
          <button type="button" onClick={onCancel} className="EditPreventivoButton-cancel-button">
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPreventivoButton;
