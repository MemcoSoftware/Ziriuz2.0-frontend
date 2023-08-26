import React from 'react';
import './App.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';


import { loginSchema } from './components/forms/LoginForm';
import LogInForm from './components/forms/LoginForm';
import RegisterUserForm from './components/forms/RegisterForm';

function App() {
  return (
    <div className="App">
      {/* RENDER LOGIN FORM */}
      <LogInForm />
      {/* Formik to encapsule a Form*/}
      
        {/* <RegisterUserForm /> */}

    </div>
  );
}

export default App;
