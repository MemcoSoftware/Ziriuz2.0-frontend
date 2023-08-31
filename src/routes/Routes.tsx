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
          {/* Redirect when Page is Not Found */}
          <Route
          path='*'
          element={<Navigate to='/login' replace/>}
          >
            
          </Route>
        </Routes> 
    )
}