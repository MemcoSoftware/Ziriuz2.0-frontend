import React from 'react';
// import './App.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';

// React Router DOM Imports

import { BrowserRouter as Router, Routes, Route, Navigate, Link} from 'react-router-dom';


import { LoginPage } from '../../src/pages/LoginPage';
import { RegisterPage } from '../../src/pages/RegisterPage';
import { HomePage } from '../../src/pages/HomePage';
import { UsersPages } from '../../src/pages/UsersPages';
import { UserDetailPage } from '../../src/pages/UserDetailPage';
import { ForgotPasswordPage } from '../pages/ForgotPasswordPage';
import { OTPValidationPage } from '../pages/OTPValidationPage';
import UpdatePasswordPage from '../pages/UpdatePasswordPage';
import PassUpdateSuccessfullPage from '../pages/PassUpdateSuccessfullPage';
import RegisterSuccessPage from '../pages/RegisterSuccessPage';
import SearchUsersResults from '../components/searchTools/SearchUsersResults';
import { SedesPages } from '../pages/SedesPages';
import SedeDetailPage from '../pages/SedeDetailPage';
import CreateSedePage from '../pages/CreateSedePage';
import UnauthorizedPage from '../pages/UnauthorizedPage';
import { ClientsPages } from '../pages/ClientsPages';
import { ClientDetailPage } from '../pages/ClientDetailPage';
import CreateClientPage from '../pages/CreateClientPage';


export const AppRoutes = ()=>{



    return (
        <Routes>
          {/* Routes Definition */}
          <Route path="/" element={<HomePage />} ></Route>
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