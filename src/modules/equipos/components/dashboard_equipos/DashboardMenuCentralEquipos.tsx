import React from "react";
import { useNavigate } from 'react-router-dom';
import FaxOutlinedIcon from '@mui/icons-material/FaxOutlined';
import DevicesOtherOutlinedIcon from '@mui/icons-material/DevicesOtherOutlined';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import ClassIcon from '@mui/icons-material/Class'
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import TypeSpecimenOutlinedIcon from '@mui/icons-material/TypeSpecimenOutlined';

const DashboardMenuCentralEquipos = () => {
    const navigate = useNavigate();

    return (
    
                   
                        <ul className="DashboardMenuCentral-nav-ul">
                        {/* <h1 className='DashboardMenuCentral-title'> Equipos</h1> */}
                            <button className="DashboardMenuCentral-button" onClick={() => navigate('/equipos')}>
                                <li>
                                    <div className="DashboardMenuCentral-nav-icon">
                                    <i className='DashboardMenuCentral-nav-icon-i'>    
                                    <FaxOutlinedIcon/>                
                                    </i>
                                    <p className="DashboardMenuCentral-p">Equipos</p> 
                                    </div>
                                </li>
                            </button>
                            <button className="DashboardMenuCentral-button" onClick={() => navigate('/equipos/modelos')}>
                                <li>
                                    <div className="DashboardMenuCentral-nav-icon">
                                        <i className='DashboardMenuCentral-nav-icon-i'> 
                                            {/* <img  alt=""width="40px" height="30px"/> */}
                                            <DevicesOtherOutlinedIcon/>       
                                        </i>
                                        <p className="DashboardMenuCentral-p">Modelos</p>
                                    </div>
                                </li>
                            </button>
                            <button className="DashboardMenuCentral-button" onClick={() => navigate('/equipos/areas')}>
                                <li>
                                    <div className="DashboardMenuCentral-nav-icon">
                                        <i className='DashboardMenuCentral-nav-icon-i'>
                                            {/* <img  alt="" width="40px" height="30px"/> */}
                                            <SpaceDashboardIcon />
                                        </i>
                                        <p className="DashboardMenuCentral-p"> Areas </p>
                                    </div>
                                </li>
                            </button>
                            <button className="DashboardMenuCentral-button" onClick={() => navigate('/equipos/clases')}>
                                <li>
                                    <div className="DashboardMenuCentral-nav-icon">
                                    <i className='DashboardMenuCentral-nav-icon-i'>
                                        {/* <img  alt="" width="40px" height="30px"/> */}
                                        <ClassIcon/>
                                    </i>
                                    <p className="DashboardMenuCentral-p"> Clases </p>  
                                    </div>
                                </li>
                            </button>
                            <button className="DashboardMenuCentral-button" onClick={() => navigate('/equipos/marcas')}>
                                <li>
                                    <div className="DashboardMenuCentral-nav-icon">
                                    <i className='DashboardMenuCentral-nav-icon-i'>
                                        {/* <img  alt="" width="40px" height="30px"/> */}
                                        <LocalOfferOutlinedIcon />
                                    </i>
                                    <p className="DashboardMenuCentral-p"> Marcas </p>  
                                    </div>
                                </li>
                            </button>
                            <button className="DashboardMenuCentral-button" onClick={() => navigate('/equipos/tipos')}>
                                <li>
                                    <div className="DashboardMenuCentral-nav-icon">
                                    <i className='DashboardMenuCentral-nav-icon-i'>
                                        {/* <img  alt="" width="40px" height="30px"/> */}
                                        <TypeSpecimenOutlinedIcon />
                                    </i>
                                    <p className="DashboardMenuCentral-p"> Tipos </p>  
                                    </div>
                                </li>
                            </button>
                        </ul>
        
    ); 
};
  
  
  export default DashboardMenuCentralEquipos;