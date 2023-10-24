import React from 'react';
import RegisterEquipoModeloForm from '../components/equiposModelos/forms/RegisterEquipoModeloForm';
import DashboardMenuLateral from '../../users/components/dashboard/DashboardMenulateral';

const RegisterEquipoModeloPage: React.FC = () => {
  return (
    <div>
        <DashboardMenuLateral />
      <h1>Registrar Nuevo Modelo de Equipo</h1>
      <RegisterEquipoModeloForm />
    </div>
  );
};

export default RegisterEquipoModeloPage;
