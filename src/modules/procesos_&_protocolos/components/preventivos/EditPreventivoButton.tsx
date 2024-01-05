import React, { useState } from 'react';
import { updatePreventivo } from '../../services/preventivosService';
import { useSessionStorage } from '../../hooks/useSessionStorage';
import { searchPreventivosByKeyword } from '../../services/searchProcesos&ProtocolosService';

type EditPreventivoButtonProps = {
  preventivoId: string;
  onEditSuccess: () => void;
  onCancel: () => void;
  initialData: any;
};

const EditPreventivoButton: React.FC<EditPreventivoButtonProps> = ({
  preventivoId,
  onEditSuccess,
  onCancel,
  initialData,
}) => {
  const [preventivoData, setPreventivoData] = useState(initialData);
  const [cualitativoResults, setCualitativoResults] = useState<any[]>([]); // Resultados del buscador cualitativo
  const [selectedCualitativoIndex, setSelectedCualitativoIndex] = useState<number | null>(null); // Índice del elemento seleccionado
  const loggedIn = useSessionStorage('sessionJWTToken');

  const handleEdit = async () => {
    try {
      const token = loggedIn;

      // Mapear los campos relacionados al formato correcto
      const mappedData = {
        title: preventivoData.title,
        codigo: preventivoData.codigo,
        version: preventivoData.version,
        fecha: preventivoData.fecha,
        cualitativo: preventivoData.cualitativo.map((item: any) => item.title),
        mantenimiento: preventivoData.mantenimiento.map((item: any) => item.title),
        cuantitativo: preventivoData.cuantitativo.map((item: any) => item.title),
        otros: preventivoData.otros.map((item: any) => item.title),
        // Asegúrate de incluir otros campos según tu estructura
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

  // Lógica para agregar y eliminar CUALITATIVO
  const handleCualitativoChange = (index: number, newValue: string) => {
    const updatedCualitativo = [...preventivoData.cualitativo];
    updatedCualitativo[index].title = newValue;
    setPreventivoData({ ...preventivoData, cualitativo: updatedCualitativo });
    // Limpiar los resultados y el índice seleccionado al cambiar el valor manualmente
    setCualitativoResults([]);
    setSelectedCualitativoIndex(null);
  };

  const handleAddCualitativo = () => {
    // Si hay un elemento seleccionado, agrégalo a la lista
    if (selectedCualitativoIndex !== null && cualitativoResults[selectedCualitativoIndex]) {
      const selectedCualitativo = cualitativoResults[selectedCualitativoIndex];
      const updatedCualitativo = [...preventivoData.cualitativo, selectedCualitativo];
      setPreventivoData({ ...preventivoData, cualitativo: updatedCualitativo });
      // Limpiar los resultados y el índice seleccionado al agregar
      setCualitativoResults([]);
      setSelectedCualitativoIndex(null);
    } else {
      // Si no hay un elemento seleccionado, simplemente agrega un elemento vacío
      const updatedCualitativo = [...preventivoData.cualitativo, { _id: '', id_tipo: '', title: '' }];
      setPreventivoData({ ...preventivoData, cualitativo: updatedCualitativo });
    }
  };

  const handleRemoveCualitativo = (index: number) => {
    const updatedCualitativo = [...preventivoData.cualitativo];
    updatedCualitativo.splice(index, 1);
    setPreventivoData({ ...preventivoData, cualitativo: updatedCualitativo });
    // Limpiar los resultados y el índice seleccionado al eliminar
    setCualitativoResults([]);
    setSelectedCualitativoIndex(null);
  };

   // Función para manejar la búsqueda de cualitativos
   const handleSearchCualitativo = async (keyword: string) => {
    try {
      const token = loggedIn;
      const results = await searchPreventivosByKeyword(token, keyword);
      setCualitativoResults(results);
    } catch (error) {
      console.error('Error al buscar cualitativos:', error);
    }
  };

  // Lógica para agregar y eliminar MANTENIMIENTO
  const handleMantenimientoChange = (index: number, newValue: string) => {
    const updatedMantenimiento = [...preventivoData.mantenimiento];
    updatedMantenimiento[index].title = newValue;
    setPreventivoData({ ...preventivoData, mantenimiento: updatedMantenimiento });
  };

  const handleAddMantenimiento = () => {
    const updatedMantenimiento = [...preventivoData.mantenimiento, { _id: '', id_tipo: '', title: '' }];
    setPreventivoData({ ...preventivoData, mantenimiento: updatedMantenimiento });
  };

  const handleRemoveMantenimiento = (index: number) => {
    const updatedMantenimiento = [...preventivoData.mantenimiento];
    updatedMantenimiento.splice(index, 1);
    setPreventivoData({ ...preventivoData, mantenimiento: updatedMantenimiento });
  };

  // Lógica para agregar y eliminar CUANTITATIVO
  const handleCuantitativoChange = (index: number, newValue: string) => {
    const updatedCuantitativo = [...preventivoData.cuantitativo];
    updatedCuantitativo[index].title = newValue;
    setPreventivoData({ ...preventivoData, cuantitativo: updatedCuantitativo });
  };

  const handleAddCuantitativo = () => {
    const updatedCuantitativo = [...preventivoData.cuantitativo, { _id: '', id_tipo: '', title: '' }];
    setPreventivoData({ ...preventivoData, cuantitativo: updatedCuantitativo });
  };

  const handleRemoveCuantitativo = (index: number) => {
    const updatedCuantitativo = [...preventivoData.cuantitativo];
    updatedCuantitativo.splice(index, 1);
    setPreventivoData({ ...preventivoData, cuantitativo: updatedCuantitativo });
  };

  // Lógica para agregar y eliminar OTROS
  const handleOtrosChange = (index: number, newValue: string) => {
    const updatedOtros = [...preventivoData.otros];
    updatedOtros[index].title = newValue;
    setPreventivoData({ ...preventivoData, otros: updatedOtros });
  };

  const handleAddOtros = () => {
    const updatedOtros = [...preventivoData.otros, { _id: '', id_tipo: '', title: '' }];
    setPreventivoData({ ...preventivoData, otros: updatedOtros });
  };

  const handleRemoveOtros = (index: number) => {
    const updatedOtros = [...preventivoData.otros];
    updatedOtros.splice(index, 1);
    setPreventivoData({ ...preventivoData, otros: updatedOtros });
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

          {/* CUALITATIVO LOGIC */}
          <div className="EditPreventivoButton-input-wrapper">
          <label>Cualitativo:</label>
          {preventivoData.cualitativo.map((item: any, index: number) => (
            <div key={index}>
              <input
                type="text"
                value={item.title}
                onChange={(e) => handleCualitativoChange(index, e.target.value)}
              />
              <button type="button" onClick={() => handleRemoveCualitativo(index)}>
                Eliminar
              </button>
            </div>
          ))}
          <div>
            {/* Input para búsqueda de cualitativos */}
            <input
              type="text"
              placeholder="Buscar cualitativo"
              onChange={(e) => handleSearchCualitativo(e.target.value)}
            />
            {/* Resultados del buscador */}
            <ul>
              {cualitativoResults.map((result, index) => (
                <li key={index} onClick={() => setSelectedCualitativoIndex(index)}>
                  {result.title}
                </li>
              ))}
            </ul>
            <button type="button" onClick={handleAddCualitativo}>
              Agregar Cualitativo
            </button>
          </div>
        </div>

        {/* MANTENIMIENTO LOGIC */}
        <div className="EditPreventivoButton-input-wrapper">
          <label>Mantenimiento:</label>
          {preventivoData.mantenimiento.map((item: any, index: number) => (
            <div key={index}>
              <input
                type="text"
                value={item.title}
                onChange={(e) => handleMantenimientoChange(index, e.target.value)}
              />
              <button type="button" onClick={() => handleRemoveMantenimiento(index)}>
                Eliminar
              </button>
            </div>
          ))}
          <button type="button" onClick={handleAddMantenimiento}>
            Agregar Mantenimiento
          </button>
        </div>

        {/* CUANTITATIVO LOGIC */}
        <div className="EditPreventivoButton-input-wrapper">
          <label>Cuantitativo:</label>
          {preventivoData.cuantitativo.map((item: any, index: number) => (
            <div key={index}>
              <input
                type="text"
                value={item.title}
                onChange={(e) => handleCuantitativoChange(index, e.target.value)}
              />
              <button type="button" onClick={() => handleRemoveCuantitativo(index)}>
                Eliminar
              </button>
            </div>
          ))}
          <button type="button" onClick={handleAddCuantitativo}>
            Agregar Cuantitativo
          </button>
        </div>

        {/* OTROS LOGIC */}
        <div className="EditPreventivoButton-input-wrapper">
          <label>Otros:</label>
          {preventivoData.otros.map((item: any, index: number) => (
            <div key={index}>
              <input
                type="text"
                value={item.title}
                onChange={(e) => handleOtrosChange(index, e.target.value)}
              />
              <button type="button" onClick={() => handleRemoveOtros(index)}>
                Eliminar
              </button>
            </div>
          ))}
          <button type="button" onClick={handleAddOtros}>
            Agregar Otro
          </button>
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
