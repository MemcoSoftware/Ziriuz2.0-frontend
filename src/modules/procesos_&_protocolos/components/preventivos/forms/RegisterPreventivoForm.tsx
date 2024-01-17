import React, { useState, useEffect } from 'react';
import { useSessionStorage } from '../../../hooks/useSessionStorage';
import { createPreventivo } from '../../../services/preventivosService';
import { searchCamposByKeyword } from '../../../services/searchProcesos&ProtocolosService';
import { useNavigate } from 'react-router-dom';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import '../styles/EditPreventivoButton.css'

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

      navigate('/preventivos');
      
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
  <div className="box">
  <div className="edit-preventivo">
    <div className="overlap">
      <div className="overlap-group">
        <p className="preventivo-title">REGISTRAR NUEVO PREVENTIVO - {preventivoData.title}</p>
        <div className="preventivo-id"></div>
      </div>
      <p className="title-p">1.  Ingrese el titulo del nuevo Preventivo:</p>
      <input 
      className="title-input"
      type="text"
      value={preventivoData.title}
      onChange={(e) => setPreventivoData({ ...preventivoData, title: e.target.value })}
       />
      <div className="codigo-p">2.  Ingrese el codigo:</div>
      <input 
      className="codigo-input"
      type='text'
      value={preventivoData.codigo}
      onChange={(e) => setPreventivoData({ ...preventivoData, codigo: e.target.value })}
       />
      <div className="version-p">3.  Ingrese la versión:</div>
      <input 
      className="version-input"
      type='number'
      value={preventivoData.version}
      onChange={(e) => setPreventivoData({ ...preventivoData, version: e.target.value })}
      />
      <p className="date-p">4.  Ingrese la fecha de creación:</p>
      <input
      className="date-input" 
      type='date'
      value={preventivoData.fecha}
      onChange={(e) => setPreventivoData({ ...preventivoData, fecha: e.target.value })}
      />


      <div className="separator" />


      <div className="div">

        {/* CUALITATIVO LOGIC */}
        <div className="cualitativo-space">
          <div className="cualitativos-p">5.  Registre los campos cualitativos:</div>
      {preventivoData.cualitativo.map((item: any, index: number) => (
          <div key={index}>
            <input 
            className="x-wrapper"
            type='text'
            value={item.title}
            readOnly={true}
            onChange={(e) => handleCualitativoChange(index, e.target.value)}
            >
            </input>
              <ClearOutlinedIcon className="x"  onClick={() => handleRemoveCualitativo(index)}/>
          </div>
            ))}

            <input className="cualitativo-selected"
            type="text"
            placeholder="Buscar Cualitativo"
            value={selectedCualitativo || ''}
            onChange={(e) => setSelectedCualitativo(e.target.value)}
            />
            {cualitativoResults.length > 0 && (
            <ul>
              {cualitativoResults.map((result, index) => (
                <li className="cualitativo-result" key={index} onClick={() => handleSelectCualitativo(result.title)}>
                  {result.title}
                </li>
              ))}
            </ul>
          )}
       
        </div>

      {/* MANTENIMIENTO LOGIC */}
        <div className="mantenimiento-space">
          <div className="mantenimiento-p">6.  Registre los campos de mantenimiento:</div>
      {preventivoData.mantenimiento.map((item: any, index: number) => (
          <div key={index}>
            <input 
            className="mantenimiento-x-wrapper"
            type='text'
            value={item.title}
            readOnly={true}
            onChange={(e) => handleMantenimientoChange(index, e.target.value)}
            >
            </input>
              <ClearOutlinedIcon className="mantenimiento-x"  onClick={() => handleRemoveMantenimiento(index)}/>
          </div>
            ))}

            <input className="mantenimiento-selected"
            type="text"
            placeholder="Buscar Mantenimiento"
            value={selectedMantenimiento || ''}
            onChange={(e) => setSelectedMantenimiento(e.target.value)}
            />
            {mantenimientoResults.length > 0 && (
            <ul>
              {mantenimientoResults.map((result, index) => (
                <li className="mantenimiento-result" key={index} onClick={() => handleSelectMantenimiento(result.title)}>
                  {result.title}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* CUANTITATIVO LOGIC */}
        <div className="cuantitativo-space">
          <div className="cuantitativo-p">7.  Registre los campos cuantitativos:</div>
        {preventivoData.cuantitativo.map((item: any, index: number) => (

          <div className="cuantitativo" key={index}>
            <input 
            className="cuantitativo-search"
            type="text"
            value={item.campo ? item.campo.title : ''}
            onChange={(e) => handleCuantitativoChange(index, e.target.value)}
            readOnly={true}
            />
            <input 
            className="img"
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
            className="cuantitativo-search-2"
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
            className="cuantitativo-search-3"
            type="text"
            value={item.unidad}  
            onChange={(e) => {
              const updatedCuantitativo = [...preventivoData.cuantitativo];
              updatedCuantitativo[index].unidad = e.target.value;
              setPreventivoData({ ...preventivoData, cuantitativo: updatedCuantitativo });
            }}
            placeholder={item.unidad}
            />
            <ClearOutlinedIcon className="x-2" onClick={() => handleRemoveCuantitativo(index)}/>
            <div className="text-wrapper">mínimo</div>
            <div className="text-wrapper-2">cuantitativo</div>
            <div className="text-wrapper-3">máximo</div>
            <div className="unidad"> unidad</div>
          </div>
          ))}
          <input className="cuantitativo-selected-2"
          type="text"
          placeholder="Buscar Cuantitativo"
          value={selectedCuantitativo || ''}
          onChange={(e) => setSelectedCuantitativo(e.target.value)}
          />
          {/* Resultados del buscador como opciones de una lista */}
          {cuantitativoResults.length > 0 && (
          <ul>
            {cuantitativoResults.map((result, index) => (
              <li className="cualitativo-result-2" key={index} onClick={() => handleSelectCuantitativo(result.title)}>
                {result.title}
              </li>
            ))}
          </ul>
        )}

        </div>

         {/* OTROS LOGIC */}
         <div className="otros-space">
          <div className="otros-p">8.  Registre los campos de OTROS:</div>
      {preventivoData.otros.map((item: any, index: number) => (
          <div key={index}>
            <input 
            className="otros-x-wrapper"
            type='text'
            value={item.title}
            readOnly={true}
            onChange={(e) => handleOtrosChange(index, e.target.value)}
            >
            </input>
              <ClearOutlinedIcon className="otros-x"  onClick={() => handleRemoveOtros(index)}/>
          </div>
            ))}

            <input className="otros-selected"
            type="text"
            placeholder="Buscar Otros"
            value={selectedOtros || ''}
            onChange={(e) => setSelectedOtros(e.target.value)}
            />
            {otrosResults.length > 0 && (
            <ul>
              {otrosResults.map((result, index) => (
                <li className="otros-result" key={index} onClick={() => handleSelectOtros(result.title)}>
                  {result.title}
                </li>
              ))}
            </ul>
          )}
        </div>


      </div>
      <button className="update-cancelar" onClick={onCancel} >CANCELAR</button> 
      <button className="actualizar-button" onClick={handleCreatePreventivo} >REGISTRAR</button>
    </div>
  </div>
</div>

</div>
  );
};

export default RegisterPreventivoForm;
