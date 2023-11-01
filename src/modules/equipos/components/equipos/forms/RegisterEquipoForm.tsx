import React, { useState, FormEvent } from 'react';
import { useSessionStorage } from '../../../hooks/useSessionStorage';
import { createEquipo } from '../../../services/equiposService';
import './styles/RegisterEquipoForm.css'
import { useNavigate } from 'react-router-dom';
const RegisterEquipoForm: React.FC = () => {
  const loggedIn = useSessionStorage('sessionJWTToken');
  const [equipoData, setEquipoData] = useState({
    id_sede: '',
    modelo_equipos: '',
    id_area: '',
    id_tipo: '',
    serie: '',
    ubicacion: '',
    frecuencia: 0,
  });
  const navigate = useNavigate();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEquipoData({ ...equipoData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const token = loggedIn;
      await createEquipo(token, equipoData);
      // Puedes redirigir o mostrar un mensaje de éxito aquí
      console.log('Equipo registrado exitosamente');
      window.alert('Equipo registrado exitosamente')
      navigate('/equipos');
    } catch (error) {
      // Maneja errores, muestra mensajes de error, etc.
      console.error('Error al registrar el equipo:', error);
    }
  };

  return (
    <div>
    
      <div className="RegisterEquipoForm-box">
      <form onSubmit={handleSubmit} className="REGISTER-EQUIPO-FORM">
        <div className="RegisterEquipoForm-overlap-group">
          <div className="RegisterEquipoForm-overlap">
            <div className="RegisterEquipoForm-text-wrapper">REGISTRAR NUEVO EQUIPO</div>
          </div>
          <div className="RegisterEquipoForm-rectangle" />
          
          <label htmlFor="id_sede" className="RegisterEquipoForm-div">Seleccione la sede a relacionar:</label>
          <input 
          type="text"
          id="id_sede"
          name="id_sede"
          value={equipoData.id_sede}
          onChange={handleChange}
          className="RegisterEquipoForm-rectangle-2" />

          <label htmlFor="serie" className="RegisterEquipoForm-p">Ingrese el numero de serie (SN) del equipo:</label>
          <input
          type="text"
          id="serie"
          name="serie"
          value={equipoData.serie}
          onChange={handleChange}
          className="RegisterEquipoForm-rectangle-3" />

          <label htmlFor="ubicacion" className="RegisterEquipoForm-text-wrapper-2">Ingrese la ubicación dentro de la Sede para el equipo:</label>
          <input
          type="text"
          id="ubicacion"
          name="ubicacion"
          value={equipoData.ubicacion}
          onChange={handleChange}
          className="RegisterEquipoForm-rectangle-4" />



          <label htmlFor="frecuencia" className="RegisterEquipoForm-text-wrapper-3">Ingrese la frecuencia en meses para el mantenimiento dell equipo:</label>
          <input
          type="number"
          id="frecuencia"
          name="frecuencia"
          value={equipoData.frecuencia}
          onChange={handleChange}
          className="RegisterEquipoForm-rectangle-5" />



          <label className="RegisterEquipoForm-text-wrapper-4">Seleccione el Modelo de Equipo a relacionar:</label>
          <input
          type="text"
          id="modelo_equipos"
          name="modelo_equipos"
          value={equipoData.modelo_equipos}
          onChange={handleChange}
          className="RegisterEquipoForm-rectangle-6" />


          <label htmlFor="id_area" className="RegisterEquipoForm-text-wrapper-5">Seleccione el Área de Equipo a relacionar:</label>
          <input
          type="text"
          id="id_area"
          name="id_area"
          value={equipoData.id_area}
          onChange={handleChange}
          className="RegisterEquipoForm-rectangle-7" />

          <label htmlFor="id_tipo" className="RegisterEquipoForm-text-wrapper-6">Seleccione el Tipo de Equipo a relacionar:</label>
          <input 
          type="text"
          id="id_tipo"
          name="id_tipo"
          value={equipoData.id_tipo}
          onChange={handleChange}
          className="RegisterEquipoForm-rectangle-8" />

          <div className="RegisterEquipoForm-div-wrapper">
            <button 
             className="RegisterEquipoForm-text-wrapper-7"
             onClick={() => navigate('/equipos')}>CANCELAR</button>
          </div>
          <div className="RegisterEquipoForm-overlap-2">
            <button type="submit" className="RegisterEquipoForm-text-wrapper-8">REGISTRAR</button>
          </div>
        </div>
      </form>
    </div>




    </div>
  );
};

export default RegisterEquipoForm;
