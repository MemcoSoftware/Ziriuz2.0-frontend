import React from 'react';
import DashboardMenuLateral from '../../users/components/dashboard/DashboardMenulateral';
import RegisterClaseEquipoForm from '../components/clasesEquipos/forms/RegisterClaseEquipoForm';

const RegisterClaseEquipoPage: React.FC = () => {

    return (

        <div>
            <DashboardMenuLateral />
            <h1>Registrar Nueva Area de Equipo</h1>
            <RegisterClaseEquipoForm />
        </div>
    )


}


export default RegisterClaseEquipoPage