import React, { useState, FormEvent } from 'react';
import { createRepuestoEquipo } from '../../../services/repuestosEquiposService';
import { useSessionStorage } from '../../../hooks/useSessionStorage';
import { useNavigate } from 'react-router-dom';

import './styles/RegisterRepuestoEquipoForm.css'; // Ajusta la ruta a tus estilos

const RegisterRepuestoEquipoForm: React.FC = () => {
  const loggedIn = useSessionStorage('sessionJWTToken');
  const [repuestoEquipoData, setRepuestoEquipoData] = useState({
    id_cliente: '',
    repuesto_name: '',
    repuesto_cantidad: 0,
    repuesto_precio: 0,
  });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setRepuestoEquipoData({ ...repuestoEquipoData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const token = loggedIn;
      await createRepuestoEquipo(token, repuestoEquipoData);
      // Puedes redirigir o mostrar un mensaje de éxito aquí
      console.log('Repuesto equipo registrado exitosamente');
      window.alert('Repuesto equipo registrado exitosamente');
      navigate('/equipos-repuestos');
    } catch (error) {
      // Maneja errores, muestra mensajes de error, etc.
      console.error('Error al registrar el repuesto equipo:', error);
    }
  };

  return (
    <div>
      <div className="RegisterRepuestoEquipoForm-box">
        <form onSubmit={handleSubmit} className="REGISTER-REPUESTO-EQUIPO-FORM">
        <div className="box">
              <div className="register-repuesto">
                <div className="overlap-group">
                  <div className="overlap">
                    <div className="register-title">REGISTRAR NUEVO REPUESTO</div>
                  </div>

                  <label htmlFor="id_cliente" className="repuesto-cliente">Seleccione el cliente a relacionar:</label>
                  <input 
                  type='text'
                  id="id_cliente"
                  className="cliente-input"
                  name="id_cliente"
                  value={repuestoEquipoData.id_cliente}
                  onChange={handleChange}
                  />

                  <label htmlFor="repuesto_name" className="repuesto-nombre">Ingrese el nombre del repuesto:</label>
                  <input
                  type="text"
                  id="repuesto_name"
                  name="repuesto_name"
                  value={repuestoEquipoData.repuesto_name}
                  onChange={handleChange}
                  className="nombre-input"
                  />

                  <label htmlFor="repuesto_cantidad" className="repuesto-cantidad">Ingrese la cantidad del repuesto:</label>
                  <input 
                  type="number"
                  id="repuesto_cantidad"
                  name="repuesto_cantidad"
                  value={repuestoEquipoData.repuesto_cantidad}
                  onChange={handleChange}
                  className="cantidad-input" 
                  />

                  <label className="repuesto-precio">Ingrese el precio del repuesto</label>
                  <input className="precio-input" 
                  type="number"
                  id="repuesto_precio"
                  name="repuesto_precio"
                  value={repuestoEquipoData.repuesto_precio}
                  onChange={handleChange}
                  />


                  <div className="registrar-texto-wrapper">
                    <div className="text-wrapper" onClick={handleSubmit}>REGISTRAR</div>
                  </div>
                  <div className="cancelar-texto-wrapper">
                    <div  className="text-wrapper" onClick={() => navigate('/equipos-repuestos')}>CANCELAR</div>
                  </div>
                  <div className="repuesto-separator" />
                </div>
              </div>
            </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterRepuestoEquipoForm;


{/* <div className="RegisterRepuestoEquipoForm-overlap-group">
            <div className="RegisterRepuestoEquipoForm-overlap">
              <div className="RegisterRepuestoEquipoForm-text-wrapper">REGISTRAR NUEVO REPUESTO EQUIPO</div>
            </div>
            <div className="RegisterRepuestoEquipoForm-rectangle" />

            <label htmlFor="id_cliente" className="RegisterRepuestoEquipoForm-div">Seleccione el cliente a relacionar:</label>
            <input
              type="text"
              id="id_cliente"
              name="id_cliente"
              value={repuestoEquipoData.id_cliente}
              onChange={handleChange}
              className="RegisterRepuestoEquipoForm-rectangle-2"
            />

            <label htmlFor="repuesto_name" className="RegisterRepuestoEquipoForm-p">Ingrese el nombre del repuesto equipo:</label>
            <input
              type="text"
              id="repuesto_name"
              name="repuesto_name"
              value={repuestoEquipoData.repuesto_name}
              onChange={handleChange}
              className="RegisterRepuestoEquipoForm-rectangle-3"
            />

            <label htmlFor="repuesto_cantidad" className="RegisterRepuestoEquipoForm-text-wrapper-2">Ingrese la cantidad del repuesto equipo:</label>
            <input
              type="number"
              id="repuesto_cantidad"
              name="repuesto_cantidad"
              value={repuestoEquipoData.repuesto_cantidad}
              onChange={handleChange}
              className="RegisterRepuestoEquipoForm-rectangle-4"
            />

            <label htmlFor="repuesto_precio" className="RegisterRepuestoEquipoForm-text-wrapper-3">Ingrese el precio del repuesto equipo:</label>
            <input
              type="number"
              id="repuesto_precio"
              name="repuesto_precio"
              value={repuestoEquipoData.repuesto_precio}
              onChange={handleChange}
              className="RegisterRepuestoEquipoForm-rectangle-5"
            />

            <div className="RegisterRepuestoEquipoForm-div-wrapper">
              <button
                className="RegisterRepuestoEquipoForm-text-wrapper-7"
                onClick={() => navigate('/equipos-repuestos')}
              >
                CANCELAR
              </button>
            </div>
            <div className="RegisterRepuestoEquipoForm-overlap-2">
              <button type="submit" className="RegisterRepuestoEquipoForm-text-wrapper-8">REGISTRAR</button>
            </div>
          </div> */}