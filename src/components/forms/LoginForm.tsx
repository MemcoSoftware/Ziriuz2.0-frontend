import React from 'react';

import { Formik, Form, Field, ErrorMessage } from 'formik';

import * as Yup from 'yup'; 

import { login } from '../../services/authService';
import { AxiosResponse } from 'axios';


// Define Schema of validation with Yup

export const loginSchema = Yup.object().shape({
    username: Yup.string().matches(/^[a-zA-Z]+\.[a-zA-Z]+$/,'Invalid username format: TRY [firstname.lastname]').required('Username is mandatory'),
    password: Yup.string().required('Password is mandatory')
});


// Login Component

const LogInForm = ()=>{

    // Defining Initial Credentials to LogIn
     const initialCredentials = {
        username: '',
        password: '' 
    }
    
    
    return (
        <div className='box'>
           
           <Formik
      initialValues={ initialCredentials }
      validationSchema={ loginSchema }
      onSubmit = {async(values)=>{
        login(values.username, values.password).then((response: AxiosResponse)=>{
            if (response.status === 200){
              if(response.data.token){ 
                sessionStorage.setItem('sessionJWTToken', response.data.token)
                }else{
                  throw new Error('Error generating Login token');
                }
            }else{
                throw new Error('Invalid Credentials')
            }
        }).catch((error: any)=> console.error(`[LOGIN ERROR]: Something went wrong: ${error}`))         
        
      }}
      >
        {
          ({values, touched, errors, isSubmitting, handleChange, handleBlur, }) => (

            <Form className='form'>
              <h2>Iniciar Sesión</h2>
                { /* Username Field*/ }
              <div className='inputBox'>
                  <label htmlFor= 'username'>Nombre de Usuario</label>
                  <Field className = 'myField' id='username' type= 'username' name='username'  />
                  
                  <i></i>
                  {/* Username Errors*/}
                  {
                    errors.username && touched.username && (
                        <ErrorMessage name='username' component='div'> </ErrorMessage>

                    )
                  }
              </div>    
              <div className='inputBox'>
                    { /* Password Field*/ }
                    <label htmlFor= 'password'>Clave</label>
                    <Field className = 'myField' id='password' type= 'password' name='password'  />
                    
                    
                    <i></i>
                    {/* Password Errors*/}
                    {
                      errors.password && touched.password && (
                          <ErrorMessage name='password' component='div'> </ErrorMessage>

                      )
                    }
                </div>

            {/* LogIn Button*/}
            <button type="submit" value= 'LogIn'>LogIn</button>
            {/* Message if the form is submitting*/}
            {
                isSubmitting ? (
                    <p>Ingresando...</p> 
                ): null
            }



            </Form>
          )
        }


      </Formik>
         </div>
    )


}

export default LogInForm;

