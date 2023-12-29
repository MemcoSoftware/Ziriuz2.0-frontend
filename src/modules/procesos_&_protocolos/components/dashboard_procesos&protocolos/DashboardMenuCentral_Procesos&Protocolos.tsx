import React from "react";
import { useNavigate } from 'react-router-dom';
import FaxOutlinedIcon from '@mui/icons-material/FaxOutlined';
import DevicesOtherOutlinedIcon from '@mui/icons-material/DevicesOtherOutlined';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import ClassIcon from '@mui/icons-material/Class'
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import TypeSpecimenOutlinedIcon from '@mui/icons-material/TypeSpecimenOutlined';
import HandymanOutlinedIcon from '@mui/icons-material/HandymanOutlined';

const DashboardMenuCentralProcesosProtocolos = () => {
    const navigate = useNavigate();

    return (
    
                   
                        <ul className="DashboardMenuCentral-nav-ul">
                        {/* <h1 className='DashboardMenuCentral-title'> Equipos</h1> */}
                            <button className="DashboardMenuCentral-button" onClick={() => navigate('/preventivos')}>
                                <li>
                                    <div className="DashboardMenuCentral-nav-icon">
                                    <i className='DashboardMenuCentral-nav-icon-i'>    
                                    <FaxOutlinedIcon/>                
                                    </i>
                                    <p className="DashboardMenuCentral-p">Preventivos</p> 
                                    </div>
                                </li>
                            </button>
                           
                        </ul>
        
    ); 
};
  
  
  export default DashboardMenuCentralProcesosProtocolos;