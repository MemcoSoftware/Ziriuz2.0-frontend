import React, { useState } from 'react';
import { updatePreventivo } from '../../services/preventivosService'; // Ajusta la importación según la ubicación correcta
// import './styles/EditPreventivoButton.css'; // Asegúrate de importar el archivo CSS correcto
import { useSessionStorage } from '../../hooks/useSessionStorage';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

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
      // Asegúrate de ajustar según la estructura de datos de tu entidad de Preventivo
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
    <div>
      <div className="EditPreventivoButton-box">
        <form className="EditPreventivoButton-form">
          {/* Resto del formulario según tus requerimientos */}
          {/* Recuerda utilizar etiquetas <p> para los campos del preventivo */}
        </form>
      </div>
    </div>
  );
};

export default EditPreventivoButton;
