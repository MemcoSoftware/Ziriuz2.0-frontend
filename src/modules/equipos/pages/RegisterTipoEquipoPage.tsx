import React from 'react';
import DashboardMenuLateral from '../../users/components/dashboard/DashboardMenulateral';
import RegisterTipoEquipoForm from '../components/tiposEquipos/forms/RegisterTipoEquipoForm';

const RegisterTipoEquipoPage: React.FC = () => {

    return (

        <div>
            <DashboardMenuLateral />
            <h1>Registrar Nuevo Tipo de Equipo</h1>
            <RegisterTipoEquipoForm/>
        </div>
    )


}


export default RegisterTipoEquipoPage;