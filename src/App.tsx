import React from 'react';
// import './App.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';

// React Router DOM Imports

import { BrowserRouter as Router} from 'react-router-dom';
import { AppRoutes } from './routes/Routes';
import { Copyright } from './components/dashboard/CopyRight';


function App() {
  return (
    <div className="App">
      
      <Router>
        <AppRoutes />
        
      </Router>
      {/* <Copyright /> */}
    </div>
  );
}

export default App;
