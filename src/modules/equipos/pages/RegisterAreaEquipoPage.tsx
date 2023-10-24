import React from 'react';
import DashboardMenuLateral from '../../users/components/dashboard/DashboardMenulateral';
import RegisterAreaEquipoForm from '../components/areasEquipos/form/RegisterAreaEquipoForm';

const RegisterAreaEquipoPage: React.FC = () => {

    return (

        <div>
            <DashboardMenuLateral />
            <h1>Registrar Nueva Area de Equipo</h1>
            <RegisterAreaEquipoForm />
        </div>
    )


}


export default RegisterAreaEquipoPage