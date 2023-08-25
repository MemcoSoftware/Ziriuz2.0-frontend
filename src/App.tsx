import React from 'react';
import './App.css';


import { loginSchema } from './components/forms/LoginForm';
import LogInForm from './components/forms/LoginForm';
import { Formik, Form, Field, ErrorMessage } from 'formik';

function App() {
  return (
    <div className="App">
      {/* RENDER LOGIN FORM */}
      <LogInForm />
      {/* Formik to encapsule a Form*/}
      
        
      
      
  

    </div>
  );
}

export default App;
