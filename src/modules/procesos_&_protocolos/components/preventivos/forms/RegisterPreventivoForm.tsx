import React, { useState, useEffect } from 'react';
import { useSessionStorage } from '../../../hooks/useSessionStorage';
import { createPreventivo } from '../../../services/preventivosService';
import { searchCamposByKeyword } from '../../../services/searchProcesos&ProtocolosService';
import { useNavigate } from 'react-router-dom';

const RegisterPreventivoForm: React.FC = () => {
  const [preventivoData, setPreventivoData] = useState<any>({
    title: '',
    codigo: '',
    version: '',
    fecha: '',
    cualitativo: [],
    mantenimiento: [],
    cuantitativo: [],
    otros: [],
  });

  const [cualitativoResults, setCualitativoResults] = useState<any[]>([]);
  const [selectedCualitativo, setSelectedCualitativo] = useState<string | null>(null);

  const [mantenimientoResults, setMantenimientoResults] = useState<any[]>([]);
  const [selectedMantenimiento, setSelectedMantenimiento] = useState<string | null>(null);

  const [cuantitativoResults, setCuantitativoResults] = useState<any[]>([]);
  const [selectedCuantitativo, setSelectedCuantitativo] = useState<string | null>(null);

  const [otrosResults, setOtrosResults] = useState<any[]>([]);
  const [selectedOtros, setSelectedOtros] = useState<string | null>(null);

  const loggedIn = useSessionStorage('sessionJWTToken');
  const navigate = useNavigate();

  const handleCreatePreventivo = async () => {
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
        cuantitativo: preventivoData.cuantitativo.map((item: any) => ({
          title: item.campo ? item.campo.title : '',
          minimo: item.minimo,
          maximo: item.maximo,
          unidad: item.unidad,
        })),
        otros: preventivoData.otros.map((item: any) => item.title),
      };

      // Llamar a la función de creación
      await createPreventivo(token, mappedData);

      // Mostrar la alerta y recargar la página después de 2 segundos
      window.alert('Preventivo creado satisfactoriamente');
      setTimeout(() => {
        window.location.reload();
      }, 2000); // 2000 milisegundos (2 segundos)
    } catch (error) {
      console.error('Error al crear el preventivo:', error);
    }
  };

  const onCancel = () => {
    navigate('/preventivos');
  };

  const handleCualitativoChange = (index: number, newValue: string) => {
    const updatedCualitativo = [...preventivoData.cualitativo];
    updatedCualitativo[index].title = newValue;
    setPreventivoData({ ...preventivoData, cualitativo: updatedCualitativo });
    setCualitativoResults([]);
    setSelectedCualitativo(null);
  };

  useEffect(() => {
    const handleSearch = async () => {
      if (selectedCualitativo) {
        try {
          const token = loggedIn;
          const results = await searchCamposByKeyword(token, selectedCualitativo);
          const filteredResults = results.filter((result: any) =>
            result.tipoCampo.some((tipo: any) => tipo.nombre === 'Pasó ó Falló')
          );
          setCualitativoResults(filteredResults);
        } catch (error) {
          console.error('Error al buscar cualitativos:', error);
        }
      }
    };

    handleSearch();
  }, [loggedIn, selectedCualitativo]);

  const handleSelectCualitativo = (title: string) => {
    const updatedCualitativo = [...preventivoData.cualitativo, { _id: '', id_tipo: '', title }];
    setPreventivoData({ ...preventivoData, cualitativo: updatedCualitativo });
    setSelectedCualitativo(null);
  };

  const handleRemoveCualitativo = (index: number) => {
    const updatedCualitativo = [...preventivoData.cualitativo];
    updatedCualitativo.splice(index, 1);
    setPreventivoData({ ...preventivoData, cualitativo: updatedCualitativo });
    setCualitativoResults([]);
    setSelectedCualitativo(null);
  };

  // Lógica para agregar y eliminar MANTENIMIENTO
  const handleMantenimientoChange = (index: number, newValue: string) => {
    const updatedMantenimiento = [...preventivoData.mantenimiento];
    updatedMantenimiento[index].title = newValue;
    setPreventivoData({ ...preventivoData, mantenimiento: updatedMantenimiento });
    setMantenimientoResults([]);
    setSelectedMantenimiento(null);
  };

  useEffect(() => {
    const handleSearch = async () => {
      if (selectedMantenimiento) {
        try {
          const token = loggedIn;
          const results = await searchCamposByKeyword(token, selectedMantenimiento);
          const filteredResults = results.filter((result: any) =>
            result.tipoCampo.some((tipo: any) => tipo.nombre === 'Pasó ó Falló')
          );
          setMantenimientoResults(filteredResults);
        } catch (error) {
          console.error('Error al buscar de mantenimiento:', error);
        }
      }
    };

    handleSearch();
  }, [loggedIn, selectedMantenimiento]);

  const handleSelectMantenimiento = (title: string) => {
    const updatedMantenimiento = [...preventivoData.mantenimiento, { _id: '', id_tipo: '', title }];
    setPreventivoData({ ...preventivoData, mantenimiento: updatedMantenimiento });
    setSelectedMantenimiento(null);
  };

  const handleRemoveMantenimiento = (index: number) => {
    const updatedMantenimiento = [...preventivoData.mantenimiento];
    updatedMantenimiento.splice(index, 1);
    setPreventivoData({ ...preventivoData, mantenimiento: updatedMantenimiento });
    setMantenimientoResults([]);
    setSelectedMantenimiento(null);
  };

  // Lógica para agregar y eliminar CUANTITATIVO
  const handleCuantitativoChange = (index: number, newValue: string) => {
    const updatedCuantitativo = [...preventivoData.cuantitativo];

    if (updatedCuantitativo[index].campo) {
      updatedCuantitativo[index].campo.title = newValue;
      setPreventivoData({ ...preventivoData, cuantitativo: updatedCuantitativo });
    }

    setCuantitativoResults([]);
    setSelectedCuantitativo(null);
  };

  useEffect(() => {
    const handleSearch = async () => {
      if (selectedCuantitativo) {
        try {
          const token = loggedIn;
          const results = await searchCamposByKeyword(token, selectedCuantitativo);
          const filteredResults = results.filter((result: any) =>
            result.tipoCampo.some((tipo: any) => tipo.nombre === 'Cuantitativo')
          );
          setCuantitativoResults(filteredResults);
        } catch (error) {
          console.error('Error al buscar cuantitativos:', error);
        }
      }
    };

    handleSearch();
  }, [loggedIn, selectedCuantitativo]);

  const handleSelectCuantitativo = (title: string) => {
    const selectedCuantitativoItem = cuantitativoResults.find(result => result.title === title);

    if (selectedCuantitativoItem) {
      const updatedCuantitativo = [
        ...preventivoData.cuantitativo,
        { _id: '', id_tipo: '', campo: selectedCuantitativoItem },
      ];
      setPreventivoData({ ...preventivoData, cuantitativo: updatedCuantitativo });
      setSelectedCuantitativo(null);
    }
  };

  const handleRemoveCuantitativo = (index: number) => {
    const updatedCuantitativo = [...preventivoData.cuantitativo];
    updatedCuantitativo.splice(index, 1);
    setPreventivoData({ ...preventivoData, cuantitativo: updatedCuantitativo });
    setCuantitativoResults([]);
    setSelectedCuantitativo(null);
  };

  // Lógica para agregar y eliminar OTROS
  const handleOtrosChange = (index: number, newValue: string) => {
    const updatedOtros = [...preventivoData.otros];
    updatedOtros[index].title = newValue;
    setPreventivoData({ ...preventivoData, otros: updatedOtros });
    setOtrosResults([]);
    setSelectedOtros(null);
  };

  useEffect(() => {
    const handleSearch = async () => {
      if (selectedOtros) {
        try {
          const token = loggedIn;
          const results = await searchCamposByKeyword(token, selectedOtros);
          setOtrosResults(results);
        } catch (error) {
          console.error('Error al buscar de otros:', error);
        }
      }
    };

    handleSearch();
  }, [loggedIn, selectedOtros]);

  const handleSelectOtros = (title: string) => {
    const updatedOtros = [...preventivoData.otros, { _id: '', id_tipo: '', title }];
    setPreventivoData({ ...preventivoData, otros: updatedOtros });
    setSelectedOtros(null);
  };

  const handleRemoveOtros = (index: number) => {
    const updatedOtros = [...preventivoData.otros];
    updatedOtros.splice(index, 1);
    setPreventivoData({ ...preventivoData, otros: updatedOtros });
    setOtrosResults([]);
    setSelectedOtros(null);
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
            placeholder="Agregar cualitativo"
            value={selectedCualitativo || ''}
            onChange={(e) => setSelectedCualitativo(e.target.value)}
          />
          {/* Resultados del buscador como opciones de una lista */}
          {cualitativoResults.length > 0 && (
            <ul>
              {cualitativoResults.map((result, index) => (
                <li key={index} onClick={() => handleSelectCualitativo(result.title)}>
                  {result.title}
                </li>
              ))}
            </ul>
          )}
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
        <div>
          {/* Input para búsqueda de mantenimiento */}
          <input
            type="text"
            placeholder="Agregar mantenimiento"
            value={selectedMantenimiento || ''}
            onChange={(e) => setSelectedMantenimiento(e.target.value)}
          />
          {/* Resultados del buscador como opciones de una lista */}
          {mantenimientoResults.length > 0 && (
            <ul>
              {mantenimientoResults.map((result, index) => (
                <li key={index} onClick={() => handleSelectMantenimiento(result.title)}>
                  {result.title}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* CUANTITATIVO LOGIC */}
      <div className="EditPreventivoButton-input-wrapper">
        <label>Cuantitativo:</label>
        {preventivoData.cuantitativo.map((item: any, index: number) => (
          <div key={index}>
            <input
              type="text"
              value={item.campo ? item.campo.title : ''}
              onChange={(e) => handleCuantitativoChange(index, e.target.value)}
            />
            {/* Agregar lógica para mostrar y actualizar los campos minimo, maximo y valor */}
            <input
              type="number"
              value={item.minimo}
              onChange={(e) => {
                const updatedCuantitativo = [...preventivoData.cuantitativo];
                updatedCuantitativo[index].minimo = e.target.value;
                setPreventivoData({ ...preventivoData, cuantitativo: updatedCuantitativo });
              }}
              placeholder="Minimo"
            />
            <input
              type="number"
              value={item.maximo}
              onChange={(e) => {
                const updatedCuantitativo = [...preventivoData.cuantitativo];
                updatedCuantitativo[index].maximo = e.target.value;
                setPreventivoData({ ...preventivoData, cuantitativo: updatedCuantitativo });
              }}
              placeholder="Maximo"
            />
            <input
              type="text"
              value={item.unidad}
              onChange={(e) => {
                const updatedCuantitativo = [...preventivoData.cuantitativo];
                updatedCuantitativo[index].unidad = e.target.value;
                setPreventivoData({ ...preventivoData, cuantitativo: updatedCuantitativo });
              }}
              placeholder={item.unidad}
            />
            <button type="button" onClick={() => handleRemoveCuantitativo(index)}>
              Eliminar
            </button>
          </div>
        ))}
        <div>
          {/* Input para búsqueda de cuantitativos */}
          <input
            type="text"
            placeholder="Agregar cuantitativo"
            value={selectedCuantitativo || ''}
            onChange={(e) => setSelectedCuantitativo(e.target.value)}
          />
          {/* Resultados del buscador como opciones de una lista */}
          {cuantitativoResults.length > 0 && (
            <ul>
              {cuantitativoResults.map((result, index) => (
                <li key={index} onClick={() => handleSelectCuantitativo(result.title)}>
                  {result.title}
                </li>
              ))}
            </ul>
          )}
        </div>
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
        <div>
          {/* Input para búsqueda de otros */}
          <input
            type="text"
            placeholder="Agregar otros"
            value={selectedOtros || ''}
            onChange={(e) => setSelectedOtros(e.target.value)}
          />
          {/* Resultados del buscador como opciones de una lista */}
          {otrosResults.length > 0 && (
            <ul>
              {otrosResults.map((result, index) => (
                <li key={index} onClick={() => handleSelectOtros(result.title)}>
                  {result.title}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="EditPreventivoButton-button-wrapper">
        <button type="button" onClick={handleCreatePreventivo} className="EditPreventivoButton-edit-button">
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

export default RegisterPreventivoForm;
