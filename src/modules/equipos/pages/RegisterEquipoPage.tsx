import React from 'react';
import DashboardMenuLateral from '../../users/components/dashboard/DashboardMenulateral';
import RegisterEquipoForm from '../components/equipos/forms/RegisterEquipoForm';
const RegisterEquipoPage: React.FC = () => {
  return (
    <div>
      <DashboardMenuLateral />
      <h1>Registrar Nuevo Equipo</h1>
      <RegisterEquipoForm />
    </div>
  );
};

export default RegisterEquipoPage;
