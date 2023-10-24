import React from 'react';
import DashboardMenuLateral from '../../users/components/dashboard/DashboardMenulateral';
import RegisterMarcaEquipoForm from '../components/marcasEquipos/forms/RegisterMarcaEquipoForm';

const RegisterMarcaEquipoPage: React.FC = () => {

    return (

        <div>
            <DashboardMenuLateral />
            <h1>Registrar Nueva Area de Equipo</h1>
            <RegisterMarcaEquipoForm/>
        </div>
    )


}


export default RegisterMarcaEquipoPage;