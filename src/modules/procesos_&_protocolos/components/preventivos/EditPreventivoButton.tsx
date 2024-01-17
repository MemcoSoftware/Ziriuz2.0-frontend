import React, { useEffect, useState } from 'react';
import { updatePreventivo } from '../../services/preventivosService';
import { useSessionStorage } from '../../hooks/useSessionStorage';
import { searchCamposByKeyword, searchPreventivosByKeyword } from '../../services/searchProcesos&ProtocolosService';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import './styles/EditPreventivoButton.css'

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
  const [selectedCualitativo, setSelectedCualitativo] = useState<string | null>(null);

  const [mantenimientoResults, setMantenimientoResults] = useState<any[]>([]); // Resultados del buscador cualitativo
  const [selectedMantenimientoIndex, setSelectedMantenimientoIndex] = useState<number | null>(null); // Índice del elemento seleccionado
  const [selectedMantenimiento, setSelectedMantenimiento] = useState<string | null>(null);

  const [cuantitativoResults, setCuantitativoResults] = useState<any[]>([]); // Resultados del buscador cuantitativo
  const [selectedCuantitativoIndex, setSelectedCuantitativoIndex] = useState<number | null>(null); // Índice del elemento seleccionado
  const [selectedCuantitativo, setSelectedCuantitativo] = useState<string | null>(null);

  // Estados para la lógica de OTROS
  const [otrosResults, setOtrosResults] = useState<any[]>([]); // Resultados del buscador de otros
  const [selectedOtrosIndex, setSelectedOtrosIndex] = useState<number | null>(null); // Índice del elemento seleccionado de otros
  const [selectedOtros, setSelectedOtros] = useState<string | null>(null); // Elemento seleccionado de otros



  const loggedIn = useSessionStorage('sessionJWTToken');

  // Función para manejar la edición del preventivo
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
        cuantitativo: preventivoData.cuantitativo.map((item: any) => ({
          title: item.campo ? item.campo.title : '',
          minimo: item.minimo,
          maximo: item.maximo,
          unidad: item.unidad,
        })),
        otros: preventivoData.otros.map((item: any) => item.title),
      };

      // Llamar a la función de actualización
      await updatePreventivo(token, preventivoId, mappedData);
      onEditSuccess();

      // Mostrar la alerta y recargar la página después de 2 segundos
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
  
  useEffect(() => {
    // Actualiza los resultados cada vez que cambia el valor de selectedCualitativo
    const handleSearch = async () => {
      if (selectedCualitativo) {
        try {
          const token = loggedIn;
          const results = await searchCamposByKeyword(token, selectedCualitativo);
          // Filtra los resultados para mostrar solo los que tienen "tipoCampo" con "nombre" igual a "Pasó ó Falló"
          const filteredResults = results.filter((result: any) =>
            result.tipoCampo.some((tipo: any) => tipo.nombre === "Pasó ó Falló")
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
    // Agregar el campo seleccionado a la lista
    const updatedCualitativo = [...preventivoData.cualitativo, { _id: '', id_tipo: '', title }];
    setPreventivoData({ ...preventivoData, cualitativo: updatedCualitativo });
    // Limpiar el campo seleccionado al agregar
    setSelectedCualitativo(null);
  };

  const handleRemoveCualitativo = (index: number) => {
    const updatedCualitativo = [...preventivoData.cualitativo];
    updatedCualitativo.splice(index, 1);
    setPreventivoData({ ...preventivoData, cualitativo: updatedCualitativo });
    // Limpiar los resultados y el índice seleccionado al eliminar
    setCualitativoResults([]);
    setSelectedCualitativoIndex(null); 
  };

  // Lógica para agregar y eliminar MANTENIMIENTO
const handleMantenimientoChange = (index: number, newValue: string) => {
  const updatedMantenimiento = [...preventivoData.mantenimiento];
  updatedMantenimiento[index].title = newValue;
  setPreventivoData({ ...preventivoData, mantenimiento: updatedMantenimiento });
  // Limpiar los resultados y el índice seleccionado al cambiar el valor manualmente
  setMantenimientoResults([]);
  setSelectedMantenimiento(null);
};

useEffect(() => {
  // Actualiza los resultados cada vez que cambia el valor de selectedMantenimiento
  const handleSearch = async () => {
    if (selectedMantenimiento) {
      try {
        const token = loggedIn;
        const results = await searchCamposByKeyword(token, selectedMantenimiento);
        // Filtra los resultados para mostrar solo los que tienen "tipoCampo" con "nombre" igual a "Pasó ó Falló"
        const filteredResults = results.filter((result: any) =>
          result.tipoCampo.some((tipo: any) => tipo.nombre === "Pasó ó Falló")
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
  // Agregar el campo seleccionado a la lista
  const updatedMantenimiento = [...preventivoData.mantenimiento, { _id: '', id_tipo: '', title }];
  setPreventivoData({ ...preventivoData, mantenimiento: updatedMantenimiento });
  // Limpiar el campo seleccionado al agregar
  setSelectedMantenimiento(null);
};

const handleRemoveMantenimiento = (index: number) => {
  const updatedMantenimiento = [...preventivoData.mantenimiento];
  updatedMantenimiento.splice(index, 1);
  setPreventivoData({ ...preventivoData, mantenimiento: updatedMantenimiento });
  // Limpiar los resultados y el índice seleccionado al eliminar
  setMantenimientoResults([]);
  setSelectedMantenimiento(null);
};


// Lógica para agregar y eliminar CUANTITATIVO
const handleCuantitativoChange = (index: number, newValue: string) => {
  const updatedCuantitativo = [...preventivoData.cuantitativo];

  // Asegúrate de que 'campo' exista antes de actualizar 'title'
  if (updatedCuantitativo[index].campo) {
    updatedCuantitativo[index].campo.title = newValue;
    setPreventivoData({ ...preventivoData, cuantitativo: updatedCuantitativo });
  }

  // Limpiar los resultados y el índice seleccionado al cambiar el valor manualmente
  setCuantitativoResults([]);
  setSelectedCuantitativoIndex(null);
};


useEffect(() => {
  // Actualiza los resultados cada vez que cambia el valor de selectedCuantitativo
  const handleSearch = async () => {
    if (selectedCuantitativo) {
      try {
        const token = loggedIn;
        const results = await searchCamposByKeyword(token, selectedCuantitativo);
        // Filtra los resultados para mostrar solo los que tienen "tipoCampo" con "nombre" igual a "Pasó ó Falló"
        const filteredResults = results.filter((result: any) =>
          result.tipoCampo.some((tipo: any) => tipo.nombre === "Cuantitativo")
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
  // Agregar el campo seleccionado a la lista
  const selectedCuantitativo = cuantitativoResults.find(result => result.title === title);

  if (selectedCuantitativo) {
    const updatedCuantitativo = [...preventivoData.cuantitativo, { _id: '', id_tipo: '', campo: selectedCuantitativo }];
    setPreventivoData({ ...preventivoData, cuantitativo: updatedCuantitativo });
    // Limpiar el campo seleccionado al agregar
    setSelectedCuantitativo(null);
  }
};

const handleRemoveCuantitativo = (index: number) => {
  const updatedCuantitativo = [...preventivoData.cuantitativo];
  updatedCuantitativo.splice(index, 1);
  setPreventivoData({ ...preventivoData, cuantitativo: updatedCuantitativo });
  // Limpiar los resultados y el índice seleccionado al eliminar
  setCuantitativoResults([]);
  setSelectedCuantitativoIndex(null);
};


// Lógica para agregar y eliminar OTROS
const handleOtrosChange = (index: number, newValue: string) => {
  const updatedOtros = [...preventivoData.otros];
  updatedOtros[index].title = newValue;
  setPreventivoData({ ...preventivoData, otros: updatedOtros });
  // Limpiar los resultados y el índice seleccionado al cambiar el valor manualmente
  setOtrosResults([]);
  setSelectedOtrosIndex(null);
};

useEffect(() => {
  // Actualiza los resultados cada vez que cambia el valor de selectedOtros
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
  // Agregar el campo seleccionado a la lista
  const updatedOtros = [...preventivoData.otros, { _id: '', id_tipo: '', title }];
  setPreventivoData({ ...preventivoData, otros: updatedOtros });
  // Limpiar el campo seleccionado al agregar
  setSelectedOtros(null);
};

const handleRemoveOtros = (index: number) => {
  const updatedOtros = [...preventivoData.otros];
  updatedOtros.splice(index, 1);
  setPreventivoData({ ...preventivoData, otros: updatedOtros });
  // Limpiar los resultados y el índice seleccionado al eliminar
  setOtrosResults([]);
  setSelectedOtrosIndex(null);
};


  return (
    <div className="EditPreventivoButton-box">
      <div className="box">
      <div className="edit-preventivo">
        <div className="overlap">
          <div className="overlap-group">
            <p className="preventivo-title">ACTUALIZAR PREVENTIVO - {preventivoData.title}</p>
            <div className="preventivo-id">ID: {preventivoData._id}</div>
          </div>
          <p className="title-p">1.  Ingrese el titulo del Preventivo:</p>
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
              <div className="cualitativos-p">5.  Edite los campos cualitativos:</div>
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
            <div className='EditPreventivoButton-separator'/>

          {/* MANTENIMIENTO LOGIC */}
            <div className="mantenimiento-space">
              <div className="mantenimiento-p">6.  Edite los campos de mantenimiento:</div>
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
            <div className='EditPreventivoButton-separator2'/>

            {/* CUANTITATIVO LOGIC */}
            <div className="cuantitativo-space">
              <div className="cuantitativo-p">7.  Edite los campos cuantitativos:</div>
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
            <div className='EditPreventivoButton-separator3'/>

             {/* OTROS LOGIC */}
             <div className="otros-space">
              <div className="otros-p">8.  Edite los campos de OTROS:</div>
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
          <button className="actualizar-button" onClick={handleEdit} >ACTUALIZAR</button>
        </div>
      </div>
    </div>

    </div>
  );
};

export default EditPreventivoButton;
