import React from 'react';

import { Formik, Form, Field, ErrorMessage } from 'formik';

import * as Yup from 'yup'; 

import { register } from '../../services/authService';
import { AxiosResponse } from 'axios';
import { useSessionStorage } from '../../hooks/useSessionStorage';
import { useNavigate } from 'react-router-dom';




const RegisterUserForm = ()=>{
    const loggedIn = useSessionStorage('sessionJWTToken');
    const navigate = useNavigate();

    const initialValues = {
        number: 0,
        username: '',
        password: '',
        name: '',
        cedula: 0,
        telefono: '',
        email: '',
        more_info: ''
    }

    // Schema Validation with Yup
    const registerUserSchema = Yup.object().shape(
        {
            number: Yup.number()
                .required('Number must be required'),
            username: Yup.string()
                .matches(/^[a-zA-Z]+\.[a-zA-Z]+$/,'Invalid username format: TRY [firstname.lastname]')
                .required('Username is mandatory'),
            password: Yup.string()
                .min(8, 'Password must be at least 8 characters')
                .max(32, 'Password must be at most 32 characters')
                .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                'Password must contain at least one lowercase letter, one uppercase letter, and one digit')
                .required('Password is required'),
            name: Yup.string()
                .matches(
                    /^[A-Z][a-z]+ [A-Z][a-z]+$/,
                    'Name must be in the format "Firstname Lastname"')
                .required(' Name is required'),
            cedula: Yup.number().required('Identification must be entered'),
            telefono: Yup.string()
                .matches(/^\+\d{2} \d+$/, 'Invalid phone number format')
                .required('Telephone number format must be country code + phone number. Example: (+57 3102121212)'),
            email: Yup.string()
                .email('Invalid email format: [email@email.com]')
                .required('Email is required'),
            more_info: Yup.string()
                .required('More information is required. Try to enter user function: "Developer" ')

            
            
        }
    );    

    return (
        <div>
            <h4>Registrar Nuevo Usuario</h4>
                {/* Formik wrapper */}
                <Formik
                    initialValues={initialValues}
                    validationSchema={registerUserSchema}
                    onSubmit = {async(values)=>{
                        console.log("Submitting form: ", values);
                        if (!loggedIn){
                            navigate('/login');
                            return;
                        }
                        register(values.number,
                            values.username,
                            values.password,
                            values.name,
                            values.cedula,
                            values.telefono,
                            values.email,
                            values.more_info)
                        .then((response: AxiosResponse)=>{
                            if (response.status === 200){
                                console.log('User registered successfully')
                                console.log(response.data)
                            }else{
                                throw new Error('Register Error')
                            }
                        }).catch((error: any)=> console.error(`[REGISTER ERROR]: Something went wrong: ${error}`))         
                        
                      }}
                
                >
                    {
                            ({values, touched, errors, isSubmitting, handleChange, handleBlur, }) => (

                                <Form>
                                
                                { /* Number Field*/ }
                                <label htmlFor= 'number'>Numero de Usuario</label>
                                <Field id='number' type= 'number' name='number' placeholder='numero de usuario'  />
                                {/* Number Errors*/}
                                {
                                    errors.number && touched.number && (
                                        <ErrorMessage name='number' component='div'> </ErrorMessage>

                                    )
                                }
                                
                                
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

                                { /* Name Field*/ }
                                <label htmlFor= 'name'>Nombre de Usuario</label>
                                <Field id='name' type= 'name' name='name' placeholder='Nombre Apellido'  />
                                {/* Name Errors*/}
                                {
                                    errors.name && touched.name && (
                                        <ErrorMessage name='name' component='div'> </ErrorMessage>

                                    )
                                }



                                { /* Cedula Field*/ }
                                <label htmlFor= 'cedula'>Cedula</label>
                                <Field id='cedula' type= 'cedula' name='cedula' placeholder='010101010'  />
                                {/* Cedula Errors*/}
                                {
                                    errors.cedula && touched.cedula && (
                                        <ErrorMessage name='cedula' component='div'> </ErrorMessage>

                                    )
                                }



                                { /* Telefono Field*/ }
                                <label htmlFor= 'telefono'>Telefono</label>
                                <Field id='telefono' type= 'telefono' name='telefono' placeholder='+57 3010101010'  />
                                {/* Telefono Errors*/}
                                {
                                    errors.telefono && touched.telefono && (
                                        <ErrorMessage name='telefono' component='div'> </ErrorMessage>

                                    )
                                }

                                { /* email Field*/ }
                                <label htmlFor= 'email'>Email</label>
                                <Field id='email' type= 'email' name='email' placeholder='email@email.com'  />
                                {/* email Errors*/}
                                {
                                    errors.email && touched.email && (
                                        <ErrorMessage name='email' component='div'> </ErrorMessage>

                                    )
                                }

                                { /* More Info Field*/ }
                                <label htmlFor= 'more_info'>Más Información</label>
                                <Field id='more_info' type= 'more_info' name='more_info' placeholder='Información de funciones'  />
                                {/* email Errors*/}
                                {
                                    errors.more_info && touched.more_info && (
                                        <ErrorMessage name='email' component='div'> </ErrorMessage>

                                    )
                                }

                                


                                
                                {/* Register Button*/}
                                <button type="submit">Registrar Usuario</button>
                                {/* Message if the form is submitting*/}
                                {
                                    isSubmitting ? (
                                        <p>Registrando...</p> 
                                    ): null
                                }



                                </Form>
                            )
        }






                </Formik>
        </div>
    )

}

export default RegisterUserForm;