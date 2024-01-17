import React from "react";
import { useNavigate } from 'react-router-dom';
import FaxOutlinedIcon from '@mui/icons-material/FaxOutlined';
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';

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

                            <button className="DashboardMenuCentral-button" onClick={() => navigate('/campos')}>
                                <li>
                                    <div className="DashboardMenuCentral-nav-icon">
                                    <i className='DashboardMenuCentral-nav-icon-i'>    
                                    <FormatListBulletedOutlinedIcon/>                
                                    </i>
                                    <p className="DashboardMenuCentral-p">Campos</p> 
                                    </div>
                                </li>
                            </button>
                           
                        </ul>
        
    ); 
};
  
  
  export default DashboardMenuCentralProcesosProtocolos;