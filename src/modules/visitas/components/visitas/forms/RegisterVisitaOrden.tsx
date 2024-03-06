import React, { useState, FormEvent, useEffect } from 'react';
import { useSessionStorage } from '../../../hooks/useSessionStorage';
import { useNavigate } from 'react-router-dom';
import { createVisita } from '../../../services/visitasService';
import './styles/RegisterVisitaOrden.css';
import { searchUsersByKeyword } from '../../../../users/services/usersService';
import CancelIcon from '@mui/icons-material/Cancel';
import { getAllProtocolos } from '../../../services/protocolosService';
import { getOrdenById, updateOrden } from '../../../../ordenes/services/ordenesService';

const RegisterVisitaOrden: React.FC<{ onCancel: () => void, idOrden: string }> = ({ onCancel, idOrden }) => {
  const loggedIn = useSessionStorage('sessionJWTToken');
  const userId = useSessionStorage('userId');
  const estadoPendienteId = "65c5609fcb319b5fbc4220d1"; // Asegúrate de que este ID es correcto y existe en tu base de datos
  const now = new Date();
  const fechaCreacion = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
  useEffect(() => {
    setVisitaData(prevData => ({ ...prevData, id_orden: idOrden, id_creador: userId, id_visita_estado: estadoPendienteId }));
  }, [idOrden, userId, estadoPendienteId]);

  const [visitaData, setVisitaData] = useState({
    id_visita_estado: estadoPendienteId,
    id_responsable: '',
    id_creador: userId,
    ids_protocolos: [] as string[],
    id_orden: idOrden,
    fecha_inicio: '',
    ejecutar_sede: false,
    duracion: '',
    fecha_creacion: fechaCreacion,
  });

  // USER STATES
  const [keyword, setKeyword] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  // PROTOCOLOS STATES
  const [protocolos, setProtocolos] = useState<any[]>([]);
  const [selectedProtocolos, setSelectedProtocolos] = useState<string[]>([]);
  const [duracion, setDuracion] = useState('');


  const [loading, setLoading] = useState(false);
  const [visitaRegistrada, setVisitaRegistrada] = useState(false);

  const [visitaId, setVisitaId] = useState('');

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'id_responsable') {
      setKeyword(value); // Actualizamos la palabra clave de búsqueda solo para el campo de búsqueda de usuarios
    }
    setVisitaData({ ...visitaData, [name]: value }); // Actualizamos el estado visitaData para otros campos
  };

  const handleUserClick = (user: any) => {
    setSelectedUser(user);
    setVisitaData({ ...visitaData, id_responsable: user._id });
    setKeyword(''); // Limpiamos la palabra clave después de seleccionar un usuario
    setSearchResults([]); // Limpiamos los resultados de búsqueda después de seleccionar un usuario
  };

  const handleCancelUser = () => {
    setSelectedUser(null);
    setVisitaData({ ...visitaData, id_responsable: '' });
  };

  const handleProtocoloChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedProtocoloId = e.target.value;
    setSelectedProtocolos([...selectedProtocolos, selectedProtocoloId]);
    setVisitaData({ ...visitaData, ids_protocolos: [...selectedProtocolos, selectedProtocoloId] });
  };

  const removeProtocolo = (id: string) => {
    const updatedProtocolos = selectedProtocolos.filter((protocoloId) => protocoloId !== id);
    setSelectedProtocolos(updatedProtocolos);
    setVisitaData({ ...visitaData, ids_protocolos: updatedProtocolos });
  };

  const handleChangeDuracion = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setDuracion(value);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    try {
      const token = loggedIn;
    
      // 2. Crea la nueva visita
      const nuevaVisita = await createVisita(token, visitaData);
      console.log('Visita registrada exitosamente');
      console.log(nuevaVisita);
    
      // Almacena el ID de la visita
      if (nuevaVisita && nuevaVisita.visitaId) {
        setVisitaId(nuevaVisita.visitaId);
    
        // 1. Obtén los OIDs de visita existentes en la orden
        const ordenActual = await getOrdenById(token, idOrden);
        const oidsVisitasExistentes = ordenActual.ids_visitas.map((visita: any) => visita._id);
        console.log(idOrden);
        console.log(oidsVisitasExistentes);
    
        // 3. Actualiza la orden con el nuevo OID de visita
        const nuevaOrdenData = {
          ids_visitas: [...oidsVisitasExistentes, nuevaVisita.visitaId] // Utiliza el nuevo ID de visita
        };
        await updateOrden(token, idOrden, nuevaOrdenData);
        console.log(idOrden);
        console.log("Orden actualizada");
        window.alert(`Visita creada exitosamente bajo orden ID: ${idOrden}`);
        window.location.reload();
        
      } else {
        console.error('Error al obtener el ID de la nueva visita.');
        window.alert('Error al obtener el ID de la nueva visita.');
      }
    
    } catch (error) {
      console.error('Error al registrar la visita o actualizar la orden:', error);
      window.alert('Error al registrar la visita o actualizar la orden');
    }
  };
  

  const handleCancel = () => {
    onCancel(); // Llama a la función de control pasada desde VisitasOrden.tsx
  };
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = loggedIn;
        const results = await searchUsersByKeyword(token, keyword);
        setSearchResults(results);
      } catch (error) {
        console.error('Error al buscar usuarios:', error);
      }
    };

    if (keyword.trim() !== '') {
      fetchUsers();
    } else {
      setSearchResults([]);
    }
  }, [keyword, loggedIn]);

  useEffect(() => {
    const fetchProtocolos = async () => {
      try {
        const token = loggedIn;
        const protocolosData = await getAllProtocolos(token);
        setProtocolos(protocolosData);
      } catch (error) {
        console.error('Error al obtener los protocolos:', error);
      }
    };

    fetchProtocolos();
  }, [loggedIn]);

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
              <div className="user-div">
                <p className="text-wrapper">1. Seleccione la persona encargada de ejecutar la visita:</p>
                <input
                  className="rectangle"
                  type="text"
                  name="id_responsable"
                  value={selectedUser ? selectedUser._id : visitaData.id_responsable}
                  onChange={handleChange}
                  placeholder="Buscar..."
                />
                {selectedUser && (
                  <div className="user-pick">
                    {selectedUser.username}
                    <CancelIcon className='user-selected-cancel' onClick={handleCancelUser}/>
                  </div>
                )}
                {searchResults.length > 0 && (
                  <ul className='users-ul'>
                    {searchResults.map((user) => (
                      <li className="users-listed" key={user._id} onClick={() => handleUserClick(user)}>
                        {user.username}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="protocolos-div">
                <p className="text-wrapper">2. Seleccione las actividades a programar:</p>
                <select
                  className="rectangle"
                  name="ids_protocolos"
                  onChange={handleProtocoloChange}
                >
                  <option value="" disabled selected>Seleccionar</option>
                  {protocolos.map((protocolo) => (
                    <option key={protocolo._id} value={protocolo._id}>
                      {protocolo.title}
                    </option>
                  ))}
                </select>
                <ul className="protocolos-listed">
                  {selectedProtocolos.map((protocoloId) => (
                    <li key={protocoloId} className="img">
                      {protocolos.find((protocolo) => protocolo._id === protocoloId).title}
                      <CancelIcon className="protocolo-selected-cancel" onClick={() => removeProtocolo(protocoloId)}/>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="separator"/>
              <div className="fecha-div">
                <div className="text-wrapper-2">3. Seleccione fecha de inicio:</div>
                <input
                  className="div-2"
                  type="datetime-local"
                  name="fecha_inicio"
                  value={visitaData.fecha_inicio}
                  onChange={handleChange}
                />
              </div>
              <div className="insede-div">
                <div className="text-wrapper-2">4. Ejecutar en sede:</div>
                <label className="switch">
                  <input
                    type="checkbox"
                    name="ejecutar_sede"
                    className='ejecutar-sede-input'
                    checked={visitaData.ejecutar_sede}
                    onChange={(e) => setVisitaData({ ...visitaData, ejecutar_sede: e.target.checked })}
                  />
                  <span className="slider round"></span>
                </label>
              </div>
              <div className="time-div">
                <div className="text-wrapper-2">5. Duración estimada (minutos):</div>
                <input
                  className="div-2"
                  type="text"
                  name="duracion"
                  value={visitaData.duracion}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          {/* ESPACIO PARA BOTONES DE CREAR Y CANCELAR */}
          <div className="button-container">
            <button type="submit" className="btn-register">Registrar</button>
            <button type="button" className="btn-cancel" onClick={handleCancel}>Cancelar</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RegisterVisitaOrden;
