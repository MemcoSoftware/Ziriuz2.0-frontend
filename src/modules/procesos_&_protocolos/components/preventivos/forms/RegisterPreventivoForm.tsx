import React, { useState, FormEvent, ChangeEvent } from 'react';
import { useSessionStorage } from '../../../hooks/useSessionStorage';
import { createPreventivo } from '../../../services/preventivosService';
import { useNavigate } from 'react-router-dom';

interface PreventivoData {
  title: string;
  codigo: string;
  version: number;
  fecha: string;
  cualitativo: string[];
  mantenimiento: string[];
  cuantitativo: string[];
  otros: string[];
}

const RegisterPreventivoForm: React.FC = () => {
  const loggedIn = useSessionStorage('sessionJWTToken');
  const [preventivoData, setPreventivoData] = useState<PreventivoData>({
    title: '',
    codigo: '',
    version: 0,
    fecha: '',
    cualitativo: [],
    mantenimiento: [],
    cuantitativo: [],
    otros: [],
  });
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPreventivoData({ ...preventivoData, [name]: value });
  };

  const handleAddField = (fieldName: keyof PreventivoData) => {
    setPreventivoData((prevData: any) => ({
      ...prevData,
      [fieldName]: [...prevData[fieldName], ''],
    }));
  };

  const handleRemoveField = (fieldName: keyof PreventivoData, index: number) => {
    setPreventivoData((prevData: any) => {
      const updatedFields = [...prevData[fieldName]];
      updatedFields.splice(index, 1);
      return { ...prevData, [fieldName]: updatedFields };
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const token = loggedIn;
      await createPreventivo(token, preventivoData);
      console.log('Preventivo registrado exitosamente');
      window.alert('Preventivo registrado exitosamente');
      navigate('/preventivos');
    } catch (error) {
      console.error('Error al registrar el preventivo:', error);
    }
  };

  return (
    <div>
      <div className="RegisterPreventivoForm-box">
        <form onSubmit={handleSubmit} className="REGISTER-PREVENTIVO-FORM">
          {/* Título */}
          <div className="RegisterPreventivoForm-input-wrapper">
            <label>Título:</label>
            <input
              type="text"
              name="title"
              value={preventivoData.title}
              onChange={(e) => handleChange(e)}
            />
          </div>

          {/* Código */}
          <div className="RegisterPreventivoForm-input-wrapper">
            <label>Código:</label>
            <input
              type="text"
              name="codigo"
              value={preventivoData.codigo}
              onChange={(e) => handleChange(e)}
            />
          </div>

          {/* Versión */}
          <div className="RegisterPreventivoForm-input-wrapper">
            <label>Versión:</label>
            <input
              type="number"
              name="version"
              value={preventivoData.version}
              onChange={(e) => handleChange(e)}
            />
          </div>

          {/* Fecha */}
          <div className="RegisterPreventivoForm-input-wrapper">
            <label>Fecha:</label>
            <input
              type="date"
              name="fecha"
              value={preventivoData.fecha}
              onChange={(e) => handleChange(e)}
            />
          </div>

          {/* CUALITATIVO LOGIC */}
          <div className="RegisterPreventivoForm-input-wrapper">
            <label>Cualitativo:</label>
            {preventivoData.cualitativo.map((item: string, index: number) => (
              <div key={index}>
                <input
                  type="text"
                  value={item}
                  onChange={(e) => {
                    const updatedCualitativo = [...preventivoData.cualitativo];
                    updatedCualitativo[index] = e.target.value;
                    setPreventivoData({ ...preventivoData, cualitativo: updatedCualitativo });
                  }}
                />
                <button type="button" onClick={() => handleRemoveField('cualitativo', index)}>
                  Eliminar
                </button>
              </div>
            ))}
            <button type="button" onClick={() => handleAddField('cualitativo')}>
              Agregar Cualitativo
            </button>
          </div>

          {/* MANTENIMIENTO LOGIC */}
          <div className="RegisterPreventivoForm-input-wrapper">
            <label>Mantenimiento:</label>
            {preventivoData.mantenimiento.map((item: string, index: number) => (
              <div key={index}>
                <input
                  type="text"
                  value={item}
                  onChange={(e) => {
                    const updatedMantenimiento = [...preventivoData.mantenimiento];
                    updatedMantenimiento[index] = e.target.value;
                    setPreventivoData({ ...preventivoData, mantenimiento: updatedMantenimiento });
                  }}
                />
                <button type="button" onClick={() => handleRemoveField('mantenimiento', index)}>
                  Eliminar
                </button>
              </div>
            ))}
            <button type="button" onClick={() => handleAddField('mantenimiento')}>
              Agregar Mantenimiento
            </button>
          </div>

          {/* CUANTITATIVO LOGIC */}
          <div className="RegisterPreventivoForm-input-wrapper">
            <label>Cuantitativo:</label>
            {preventivoData.cuantitativo.map((item: string, index: number) => (
              <div key={index}>
                <input
                  type="text"
                  value={item}
                  onChange={(e) => {
                    const updatedCuantitativo = [...preventivoData.cuantitativo];
                    updatedCuantitativo[index] = e.target.value;
                    setPreventivoData({ ...preventivoData, cuantitativo: updatedCuantitativo });
                  }}
                />
                <button type="button" onClick={() => handleRemoveField('cuantitativo', index)}>
                  Eliminar
                </button>
              </div>
            ))}
            <button type="button" onClick={() => handleAddField('cuantitativo')}>
              Agregar Cuantitativo
            </button>
          </div>

          {/* OTROS LOGIC */}
          <div className="RegisterPreventivoForm-input-wrapper">
            <label>Otros:</label>
            {preventivoData.otros.map((item: string, index: number) => (
              <div key={index}>
                <input
                  type="text"
                  value={item}
                  onChange={(e) => {
                    const updatedOtros = [...preventivoData.otros];
                    updatedOtros[index] = e.target.value;
                    setPreventivoData({ ...preventivoData, otros: updatedOtros });
                  }}
                />
                <button type="button" onClick={() => handleRemoveField('otros', index)}>
                  Eliminar
                </button>
              </div>
            ))}
            <button type="button" onClick={() => handleAddField('otros')}>
              Agregar Otro
            </button>
          </div>

          <div className="RegisterPreventivoForm-button-wrapper">
            <button type="submit" className="RegisterPreventivoForm-submit-button">
              Registrar Preventivo
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPreventivoForm;
