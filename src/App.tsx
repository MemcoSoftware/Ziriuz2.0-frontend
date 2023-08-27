import React from 'react';
// import './App.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';

// React Router DOM Imports

import { BrowserRouter as Router, Routes, Route, Navigate, Link} from 'react-router-dom';


import { loginSchema } from './components/forms/LoginForm';
import { LoginPage } from '../src/pages/LoginPage';
import { RegisterPage } from '../src/pages/RegisterPage';
import { HomePage } from '../src/pages/HomePage';
import { UsersPages } from '../src/pages/UsersPages';
import { UserDetailPage } from '../src/pages/UserDetailPage';
// import LogInForm from './components/forms/LoginForm';
// import RegisterUserForm from './components/forms/RegisterForm';

function App() {
  return (
    <div className="App">
      
      <Router>
        <nav>
          <ul>
            <li>
              <Link to = '/'>Home</Link>
            </li>

          </ul>
          <ul>
            <li>
              <Link to = '/login'>Login</Link>
            </li>

          </ul>
          <ul>
            <li>
              <Link to = '/register'>Register</Link>
            </li>
          </ul>
          <ul>
            <li>
              <Link to = '/users'>Users</Link>
            </li>
          </ul>
        </nav>
        
        <Routes>
          {/* Routes Definition */}
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/register" element={<RegisterPage />} ></Route>
          <Route path="/" element={<HomePage />} ></Route>
          <Route path="/users" element={<UsersPages />}></Route>
          <Route path="/users:id" element={<UserDetailPage />}></Route>
          {/* Redirect when Page is Not Found */}
          <Route
          path='*'
          element={<Navigate to='/' replace/>}
          >
            
          </Route>
        </Routes> 
      </Router>
    </div>
  );
}

export default App;
