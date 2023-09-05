import React from 'react';
import { useNavigate } from 'react-router-dom';


const RegisterSuccessPage = ()=>{

    const navigate = useNavigate();

  const handleOnClick = () => {
    navigate("/users");
  };

    return(
        <div className="PassUpdateSuccessfullPage-box">
        <div>
            <form className="PassUpdateSuccessfullPage-form">
            <h2>Usuario Registrado Correctamente</h2>
            <br></br>
            <br></br>
            
            <br></br>
            <br></br>
            <button type='submit' className="PassUpdateSuccessfullPage-button" onClick={handleOnClick}>Volver</button>
            </form>
        </div>
    </div>
    ) 
}


export default RegisterSuccessPage;