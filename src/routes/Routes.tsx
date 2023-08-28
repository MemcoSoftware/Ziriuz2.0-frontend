import React from 'react';
// import './App.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';

// React Router DOM Imports

import { BrowserRouter as Router, Routes, Route, Navigate, Link} from 'react-router-dom';


import { loginSchema } from '../components/forms/LoginForm';
import { LoginPage } from '../../src/pages/LoginPage';
import { RegisterPage } from '../../src/pages/RegisterPage';
import { HomePage } from '../../src/pages/HomePage';
import { UsersPages } from '../../src/pages/UsersPages';
import { UserDetailPage } from '../../src/pages/UserDetailPage';


export const AppRoutes = ()=>{
    return (
        <Routes>
          {/* Routes Definition */}
          <Route path="/" element={<HomePage />} ></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/register" element={<RegisterPage />} ></Route>
          <Route path="/users" element={<UsersPages />}></Route>
          <Route path="/users/:id" element={<UserDetailPage />}></Route>
          {/* Redirect when Page is Not Found */}
          <Route
          path='*'
          element={<Navigate to='/login' replace/>}
          >
            
          </Route>
        </Routes> 
    )
}