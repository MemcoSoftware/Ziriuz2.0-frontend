import React, { useState, FormEvent } from 'react';
import { useSessionStorage } from '../../../hooks/useSessionStorage';
import { useNavigate } from 'react-router-dom';
import { createVisita } from '../../../services/visitasService';
import './styles/RegisterVisitaOrden.css'
const RegisterVisitaOrden: React.FC = () => {
  const loggedIn = useSessionStorage('sessionJWTToken');
  const [visitaData, setVisitaData] = useState({
    id_visita_estado: '',
    id_responsable: '',
    id_creador: '',
    ids_protocolos: [] as string[],
    id_orden: '',
    fecha_inicio: '',
    ejecutar_sede: false,
    duracion: '',
    fecha_creacion: '',
  });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setVisitaData({ ...visitaData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const token = loggedIn;
      await createVisita(token, visitaData);
      // Puedes redirigir o mostrar un mensaje de éxito aquí
      console.log('Visita registrada exitosamente');
      window.alert('Visita registrada exitosamente');
      navigate('/visitas');
    } catch (error) {
      // Maneja errores, muestra mensajes de error, etc.
      console.error('Error al registrar la visita:', error);
    }
  };

  return (
    <div className='RegisterVisita-div'>
      <h2>REGISTRAR NUEVA VISITA</h2>
      <form onSubmit={handleSubmit}>


        <div className="visita-nueva">
              <div className="div">
                <header className="header">
                  <div className="overlap-group">
                    <div className="register-title">REGISTRAR NUEVA VISITA</div>
                  </div>
                </header>
                <div className="overlap">
                  {/* <div className="user-div">
                    <div className="rectangle" />
                    <div className="users-listed">
                      <div className="user-pick" />
                      <img className="img" alt="User selected" src="user-selected.svg" />
                    </div>
                    <p className="text-wrapper">Seleccione la persona encargada de ejecutar la visita:</p>
                  </div>
                  <div className="protocolos-div">
                    <p className="text-wrapper">Seleccione las actividades a programar:</p>
                    <div className="rectangle" />
                    <div className="protocolos-listed">
                      <div className="protocolos-pick" />
                      <img className="img" alt="Protocolos seleted" src="protocolos-seleted.svg" />
                    </div>
                  </div>
                  <img className="separator" alt="Separator" src="separator.svg" />
                  <div className="fecha-div">
                    <div className="text-wrapper-2">Seleccione fecha de inicio:</div>
                    <div className="div-2" />
                  </div>
                  <div className="insede-div">
                    <div className="text-wrapper-2">Ejecutar en sede:</div>
                    <img className="sede-input" alt="Sede input" src="sede-input.png" />
                  </div>
                  <div className="time-div">
                    <div className="text-wrapper-2">Duración estimada (minutos):</div>
                    <div className="div-2" />
                  </div> */}


                    <label>
                              Estado de la Visita:
                              <input
                                type="text"
                                name="id_visita_estado"
                                value={visitaData.id_visita_estado}
                                onChange={handleChange}
                              />
                            </label>
                            <label>
                              Responsable:
                              <input
                                type="text"
                                name="id_responsable"
                                value={visitaData.id_responsable}
                                onChange={handleChange}
                              />
                            </label>
                            <label>
                              Creador:
                              <input
                                type="text"
                                name="id_creador"
                                value={visitaData.id_creador}
                                onChange={handleChange}
                              />
                            </label>
                            <label>
                              IDs de Protocolos:
                              <input
                                type="text"
                                name="ids_protocolos"
                                value={visitaData.ids_protocolos.join(',')}
                                onChange={handleChange}
                              />
                            </label>
                            <label>
                              ID de la Orden:
                              <input
                                type="text"
                                name="id_orden"
                                value={visitaData.id_orden}
                                onChange={handleChange}
                              />
                            </label>
                            <label>
                              Fecha de Inicio:
                              <input
                                type="date"
                                name="fecha_inicio"
                                value={visitaData.fecha_inicio}
                                onChange={handleChange}
                              />
                            </label>
                            <label>
                              Duración:
                              <input
                                type="text"
                                name="duracion"
                                value={visitaData.duracion}
                                onChange={handleChange}
                              />
                            </label>
                            <label>
                              Fecha de Creación:
                              <input
                                type="date"
                                name="fecha_creacion"
                                value={visitaData.fecha_creacion}
                                onChange={handleChange}
                              />
                            </label>
                            <button type="submit">REGISTRAR</button>
                            <button type="button" onClick={() => navigate('/visitas')}>CANCELAR</button>


                  
                </div>
              </div>
            </div>


     
      </form>
    </div>
  );
};

export default RegisterVisitaOrden;
