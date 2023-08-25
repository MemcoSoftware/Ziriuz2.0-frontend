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
        <div>
           <h4>Login Form</h4>
           <Formik
      initialValues={ initialCredentials }
      validationSchema={ loginSchema }
      onSubmit = {async(values)=>{
        // await new Promise((response)=> setTimeout(response, 2000));
        // alert(JSON.stringify(values, null, 2));
        // console.table(values);
        login(values.username, values.password).then((response: AxiosResponse)=>{
            if (response.status === 200){
                alert(JSON.stringify(response.data, null, 2));
                console.table(response.data);
            }else{
                throw new Error('Invalid Credentials')
            }
        }).catch((error: any)=> console.error(`[LOGIN ERROR]: Something went wrong: ${error}`))         
        
      }}
      >
        {
          ({values, touched, errors, isSubmitting, handleChange, handleBlur, }) => (

            <Form>
                { /* Username Field*/ }
              <label htmlFor= 'username'>Nombre de Usuario</label>
              <Field id='username' type= 'username' name='username' placeholder='nombre.apellido'  />
              {/* Username Errors*/}
              {
                errors.username && touched.username && (
                    <ErrorMessage name='username' component='div'> </ErrorMessage>

                )
              }


              { /* Password Field*/ }
              <label htmlFor= 'password'>Clave</label>
              <Field id='password' type= 'password' name='password' placeholder='clave'  />
              {/* Password Errors*/}
              {
                errors.password && touched.password && (
                    <ErrorMessage name='password' component='div'> </ErrorMessage>

                )
              }


            {/* LogIn Button*/}
            <button type="submit">LogIn</button>
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

