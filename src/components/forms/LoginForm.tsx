import React from 'react';
import './styles/LoginForm.css';
import { useNavigate} from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup'; 
import { login } from '../../services/authService';
import { AxiosResponse } from 'axios';
import ZiriuzLogo from './img/ziriuzLogoPNG.png';


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
    
    let navigate = useNavigate();
    const handleForgotPasswordClick = () => {
      navigate('/forgot-password');
     };
    
    return (
      
        <div>
          <div>
           <img src={ZiriuzLogo} alt="ZiriuzLogoWithLeters" className="LoginForm-ZiriuzLogo" /> 
           <br></br>
          </div>
           <Formik
      initialValues={ initialCredentials }
      validationSchema={ loginSchema }
      onSubmit = {async(values)=>{
        login(values.username, values.password).then(async(response: AxiosResponse)=>{
            if (response.status === 200){
              if(response.data.token){ 
                await sessionStorage.setItem('sessionJWTToken', response.data.token);
                navigate('/');
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
           <div className='LoginForm-box'>
            <Form className='LoginForm-form'>
                <h2>Iniciar Sesión</h2>
                  { /* Username Field*/ }
                <div className='LoginForm-inputBox'>
                
                    <Field className = 'LoginForm-Field' id='username' type= 'username' name='username' required />
                    <span>Nombre de Usuario</span>
                    <i></i>
                    {/* Username Errors*/}
                    {
                      errors.username && touched.username && (
                          <ErrorMessage name='username' component='div'> </ErrorMessage>

                      )
                    }
                </div>    
                <div className='LoginForm-inputBox'>
                      { /* Password Field*/ }
                      {/* <label htmlFor= 'password'/> */}
                      <Field className = 'LoginForm-Field' id='password' type= 'password' name='password' required />
                      <span>Clave</span>
                      <i></i>
                      {/* Password Errors*/}
                      {
                        errors.password && touched.password && (
                            <ErrorMessage name='password' component='div'> </ErrorMessage>

                        )
                      }
                  </div>

                      <br></br>
                      <div className='LoginForm-links'>
                        <a href='#' onClick={handleForgotPasswordClick}>Restaurar Clave</a>
                        
                      </div>
                      <br></br>
                      <br></br>
              {/* LogIn Button*/}
              <button className="LoginForm-button" type="submit" value= 'LogIn'>LogIn</button>
              {/* Message if the form is submitting*/}
              {
                  isSubmitting ? (
                      <p>Ingresando...</p> 
                  ): null
              }



              </Form>
          </div>  
            
          )
        }


      </Formik>
         </div>
    )


}

export default LogInForm;

