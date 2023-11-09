import React, { useState, FormEvent, useEffect } from 'react';
import { useSessionStorage } from '../../../hooks/useSessionStorage';
import { createModeloEquipo } from '../../../services/equiposModeloService';
import './styles/RegisterEquipoModeloForm.css'
import { useNavigate } from 'react-router-dom';

const RegisterEquipoModeloForm: React.FC = () => {
  const loggedIn = useSessionStorage('sessionJWTToken');
  const [modeloEquipoData, setModeloEquipoData] = useState({
    modelo: '',
    precio: 0,
    id_marca: '',
    id_clase: '',
  });
  
  const navigate = useNavigate();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setModeloEquipoData({ ...modeloEquipoData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const token = loggedIn;
      await createModeloEquipo(token, modeloEquipoData);
      // Puedes redirigir o mostrar un mensaje de éxito aquí

      console.log('Modelo de equipo registrado exitosamente');
      window.alert('Modelo de equipo registrado exitosamente')
      navigate('/equipos/modelos');
    } catch (error) {
      // Maneja errores, muestra mensajes de error, etc.
      console.error('Error al registrar el modelo de equipo:', error);
    }
  };

  const hancleCancelForm = () => {
    navigate('/equipos/modelos')
  };

  useEffect(() => {
    if (!loggedIn) {
      // Redirige al usuario a la página de inicio de sesión si no está autenticado
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    }
  }, [loggedIn, navigate]);

  return (
    <div>
      <div className="RegisterEquipoModeloForm-box">
      <form onSubmit={handleSubmit} className="RegisterEquipoModeloForm-registerequipomodelo">
        <div className="RegisterEquipoModeloForm-overlap-group">
          <div className="RegisterEquipoModeloForm-overlap">
            <p className="RegisterEquipoModeloForm-title">REGISTRAR NUEVO MODELO DE EQUIPO</p>
          </div>
          <div className="RegisterEquipoModeloForm-container-separator" />
          
          <label htmlFor="modelo" className="RegisterEquipoModeloForm-modelo-nombre-title">1. Ingrese el nombre del modelo de equipo</label>
          <input 
          className="RegisterEquipoModeloForm-modelo-nombre-input"
          type="text"
          id="modelo"
          name="modelo"
          value={modeloEquipoData.modelo}
          onChange={handleChange} />
          
          <label htmlFor="precio" className="RegisterEquipoModeloForm-modelo-precio-title">2. Ingrese el precio del modelo de equipo</label>
          <input 
          className="RegisterEquipoModeloForm-modelo-precio-input"
          type="number"
          id="precio"
          name="precio"
          value={modeloEquipoData.precio}
          onChange={handleChange}
          />
          
          <label htmlFor="marca" className="RegisterEquipoModeloForm-modelo-marca-title">3. Seleccione la Marca de Equipo a relacionar</label>
          <input 
          className="RegisterEquipoModeloForm-modelo-marca-input"
          type="text"
          id="id_marca"
          name="id_marca"
          value={modeloEquipoData.id_marca}
          onChange={handleChange}
          />
          
          <label htmlFor="clase" className="RegisterEquipoModeloForm-modelo-clase-title">4. Seleccione la Clase de Equipo a relacionar</label>
          <input 
          className="RegisterEquipoModeloForm-modelo-clase-input"
          type="text"
          id="id_clase"
          name="id_clase"
          value={modeloEquipoData.id_clase}
          onChange={handleChange}
          />
          
          
          <button 
          onClick={hancleCancelForm}
          className="RegisterEquipoModeloForm-modelo-canelar">Cancelar</button>
          <button 
          type='submit'
          className="RegisterEquipoModeloForm-modelo-registrar">Registrar</button>
        </div>
      </form>
    </div>


    </div>
  );
};

export default RegisterEquipoModeloForm;
