import React from 'react';
// import './App.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';

// React Router DOM Imports

import { BrowserRouter as Router, Routes, Route, Navigate, Link} from 'react-router-dom';


import { LoginPage } from '../modules/users/pages/LoginPage';
import { RegisterPage } from '../modules/users/pages/RegisterPage';
import { HomePage } from '../modules/users/pages/HomePage';
import { UsersPages } from '../modules/users/pages/UsersPages';
import { UserDetailPage } from '../modules/users/pages/UserDetailPage';
import { ForgotPasswordPage } from '../modules/users/pages/ForgotPasswordPage';
import { OTPValidationPage } from '../modules/users/pages/OTPValidationPage';
import UpdatePasswordPage from '../modules/users/pages/UpdatePasswordPage';
import PassUpdateSuccessfullPage from '../modules/users/pages/PassUpdateSuccessfullPage';
import RegisterSuccessPage from '../modules/users/pages/RegisterSuccessPage';
import SearchUsersResults from '../modules/users/components/searchTools/SearchUsersResults';
import { SedesPages } from '../modules/users/pages/SedesPages';
import SedeDetailPage from '../modules/users/pages/SedeDetailPage';
import CreateSedePage from '../modules/users/pages/CreateSedePage';
import UnauthorizedPage from '../pages/UnauthorizedPage';
import { ClientsPages } from '../modules/users/pages/ClientsPages';
import { ClientDetailPage } from '../modules/users/pages/ClientDetailPage';
import CreateClientPage from '../modules/users/pages/CreateClientPage';
import EquiposPages from '../modules/equipos/pages/EquiposPages';
import EquipoDetailPage from '../modules/equipos/pages/EquipoDetailPage';
import RegisterEquipoPage from '../modules/equipos/pages/RegisterEquipoPage';
import EquipoModeloPage from '../modules/equipos/pages/EquipoModeloPage';
import EquipoModeloDetailPage from '../modules/equipos/pages/EquipoModeloDetailPage';
import RegisterEquipoModeloPage from '../modules/equipos/pages/RegisterEquipoModeloPage';
import AreasEquiposPage from '../modules/equipos/pages/AreasEquiposPage';
import AreaEquipoDetailPage from '../modules/equipos/pages/AreaEquipoDetailPage';
import RegisterAreaEquipoPage from '../modules/equipos/pages/RegisterAreaEquipoPage';
import ClasesEquiposPage from '../modules/equipos/pages/ClasesEquiposPage';
import ClaseEquipoDetailPage from '../modules/equipos/pages/ClaseEquipoDetailPage';
import RegisterClaseEquipoPage from '../modules/equipos/pages/RegisterClaseEquipoPage';
import MarcasEquiposPage from '../modules/equipos/pages/MarcasEquiposPage';
import MarcaEquipoDetailPage from '../modules/equipos/pages/MarcaEquipoDetailPage';
import RegisterMarcaEquipoPage from '../modules/equipos/pages/RegisterMarcaEquipoPage';
import TiposEquiposPage from '../modules/equipos/pages/TiposEquiposPage';
import TipoEquipoDetailPage from '../modules/equipos/pages/TipoEquipoDetailPage';
import RegisterTipoEquipoPage from '../modules/equipos/pages/RegisterTipoEquipoPage';


export const AppRoutes = ()=>{



    return (
        <Routes>
          {/* Routes Definition */}
          <Route path="/home" element={<HomePage />} ></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/register" element={<RegisterPage />} ></Route>
          <Route path="/users" element={<UsersPages />}></Route>
          <Route path="/users/:id" element={<UserDetailPage />}></Route>
          <Route path="/forgot-password/" element={<ForgotPasswordPage />}></Route>
          <Route path="/otp-validator" element={<OTPValidationPage/>}></Route>
          <Route path="/update-password" element={<UpdatePasswordPage/>}></Route>
          <Route path="/pass-update-successfull" element={<PassUpdateSuccessfullPage/>}></Route>
          <Route path="/user-registered-successfull" element={<RegisterSuccessPage/>}></Route>
          <Route path="/searchUsers" element={<SearchUsersResults users={[]} />} />

          {/* HERE THE ROUTES FOR SEDES */}
          <Route path="/sedes" element={<SedesPages />} />
          <Route path="/sedes/:id" element={<SedeDetailPage />} />
          <Route path="/create-sede" element={<CreateSedePage />}/>
          
          {/* HERE THE ROUTES FOR CLIENTS */}
          <Route path="/clientes" element={<ClientsPages />} />
          <Route path="/clientes/:id" element={<ClientDetailPage />} />
          <Route path="/crear-cliente" element={<CreateClientPage />} />
          <Route path="/unauthorized" element={<UnauthorizedPage/>} />

          <Route path="/equipos" element={<EquiposPages/>} />
          <Route path="/equipos/:id" element={<EquipoDetailPage/>} />
          <Route path="/equipos/register" element={<RegisterEquipoPage/>} />

          <Route path="/equipos/modelos" element={<EquipoModeloPage/>} />
          <Route path="/equipos/modelo/:id" element={<EquipoModeloDetailPage/>} />
          <Route path="/equipos/modelos/register" element={<RegisterEquipoModeloPage/>} />
          
          <Route path="/equipos/areas" element={<AreasEquiposPage/>} />
          <Route path="/equipos/areas/:id" element={<AreaEquipoDetailPage/>} />
          <Route path="/equipos/areas/register" element={<RegisterAreaEquipoPage/>} />
          
          <Route path="/equipos/clases" element={<ClasesEquiposPage/>} />
          <Route path="/equipos/clases/:id" element={<ClaseEquipoDetailPage/>} />
          <Route path="/equipos/clases/register" element={<RegisterClaseEquipoPage/>} />

          <Route path="/equipos/marcas" element={<MarcasEquiposPage/>} />
          <Route path="/equipos/marcas/:id" element={<MarcaEquipoDetailPage/>} />
          <Route path="/equipos/marcas/register" element={<RegisterMarcaEquipoPage/>} />

          <Route path="/equipos/tipos" element={<TiposEquiposPage/>} />
          <Route path="/equipos/tipos/:id" element={<TipoEquipoDetailPage/>} />
          <Route path="/equipos/tipos/register" element={<RegisterTipoEquipoPage/>} />


          {/* Unauthorized Page */}
          {/* <Route path="/unauthorized" element={<UnauthorizedPage />}/> */}

          {/* Redirect when Page is Not Found */}
          <Route
          path='*'
          element={<Navigate to='/login' replace/>}
          >


          </Route>
        </Routes> 
    )
}