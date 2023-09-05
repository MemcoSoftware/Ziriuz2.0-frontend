import React from 'react';
import './styles/DashboardMenuCentral.css';
import ZiriuzDashboardLogo from './img/ziriuzDashboardLogo.png'
import { useNavigate } from 'react-router-dom';
const DashboardMenuCentral = () => {
    const navigate = useNavigate();

    return (
       
      <div className='DashboardMenuCentral'>
              <section className="DashboardMenuCentral-LogoPrincipal">
                  <div className="DashboardMenuCentral-logo">
                          <a className="DashboardMenuCentral-a" href="">
                              <img  src={ZiriuzDashboardLogo} alt="" width = "250px" height = "150px" />
                              <span></span>
                              <span></span>
                              <span></span>
                              <span></span>
                          </a>
                  </div>
              </section>
              <section className="DashboardMenuCentral-Block">
                      <nav className="DashboardMenuCentral-nav">
                    
                          <ul className="DashboardMenuCentral-nav-ul">
                          <h1> Generales</h1>
                              <button className="DashboardMenuCentral-button" onClick={() => navigate('/users')}>
                              <li>
                                  <div className="DashboardMenuCentral-nav-icon">
                                  <i className='DashboardMenuCentral-nav-icon-i'>
                                       {/* <img  alt="" width="40px" height="30px"/> */}
                                       <svg xmlns="http://www.w3.org/2000/svg" width="25" height="50" fill="currentColor" className="bi bi-person" viewBox="0 0 16 16">
                                                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z"/>
                                                </svg>
                                  </i>
                                 <p className="DashboardMenuCentral-p">Usuarios</p> 
                                  </div>
                              </li>
                              </button>
                              <button className="DashboardMenuCentral-button">
                              <li>
                                  <div className="DashboardMenuCentral-nav-icon">
                                      <i className='DashboardMenuCentral-nav-icon-i'> 
                                          {/* <img  alt=""width="40px" height="30px"/> */}
                                          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="50" fill="currentColor" className="bi bi-building" viewBox="0 0 16 16">
                                                <path d="M4 2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm3.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1ZM4 5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1ZM7.5 5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1Zm2.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1ZM4.5 8a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1Zm2.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm3.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1Z"/>
                                                <path d="M2 1a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V1Zm11 0H3v14h3v-2.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5V15h3V1Z"/>
                                                </svg>
                                      </i>
                                      <p className="DashboardMenuCentral-p">Sedes</p>
                                  </div>
                              </li>
                              </button>
                              <button className="DashboardMenuCentral-button">
                              <li>
                                  <div className="DashboardMenuCentral-nav-icon">
                                      <i className='DashboardMenuCentral-nav-icon-i'>
                                           {/* <img  alt="" width="40px" height="30px"/> */}
                                           <svg xmlns="http://www.w3.org/2000/svg" width="25" height="50" fill="currentColor" className="bi bi-bank" viewBox="0 0 16 16">
                                                <path d="m8 0 6.61 3h.89a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5H15v7a.5.5 0 0 1 .485.38l.5 2a.498.498 0 0 1-.485.62H.5a.498.498 0 0 1-.485-.62l.5-2A.501.501 0 0 1 1 13V6H.5a.5.5 0 0 1-.5-.5v-2A.5.5 0 0 1 .5 3h.89L8 0ZM3.777 3h8.447L8 1 3.777 3ZM2 6v7h1V6H2Zm2 0v7h2.5V6H4Zm3.5 0v7h1V6h-1Zm2 0v7H12V6H9.5ZM13 6v7h1V6h-1Zm2-1V4H1v1h14Zm-.39 9H1.39l-.25 1h13.72l-.25-1Z"/>
                                                </svg>
                                      </i>
                                      <p className="DashboardMenuCentral-p">  Empresas</p>
                                  </div>
                              </li>
                              </button>
                              <button className="DashboardMenuCentral-button">
                              <li>
                                  <div className="DashboardMenuCentral-nav-icon">
                                  <i className='DashboardMenuCentral-nav-icon-i'>
                                      {/* <img  alt="" width="40px" height="30px"/> */}
                                      <svg xmlns="http://www.w3.org/2000/svg" width="25" height="50" fill="currentColor" className="bi bi-shield-lock" viewBox="0 0 16 16">
                                        <path d="M5.338 1.59a61.44 61.44 0 0 0-2.837.856.481.481 0 0 0-.328.39c-.554 4.157.726 7.19 2.253 9.188a10.725 10.725 0 0 0 2.287 2.233c.346.244.652.42.893.533.12.057.218.095.293.118a.55.55 0 0 0 .101.025.615.615 0 0 0 .1-.025c.076-.023.174-.061.294-.118.24-.113.547-.29.893-.533a10.726 10.726 0 0 0 2.287-2.233c1.527-1.997 2.807-5.031 2.253-9.188a.48.48 0 0 0-.328-.39c-.651-.213-1.75-.56-2.837-.855C9.552 1.29 8.531 1.067 8 1.067c-.53 0-1.552.223-2.662.524zM5.072.56C6.157.265 7.31 0 8 0s1.843.265 2.928.56c1.11.3 2.229.655 2.887.87a1.54 1.54 0 0 1 1.044 1.262c.596 4.477-.787 7.795-2.465 9.99a11.775 11.775 0 0 1-2.517 2.453 7.159 7.159 0 0 1-1.048.625c-.28.132-.581.24-.829.24s-.548-.108-.829-.24a7.158 7.158 0 0 1-1.048-.625 11.777 11.777 0 0 1-2.517-2.453C1.928 10.487.545 7.169 1.141 2.692A1.54 1.54 0 0 1 2.185 1.43 62.456 62.456 0 0 1 5.072.56z"/>
                                        <path d="M9.5 6.5a1.5 1.5 0 0 1-1 1.415l.385 1.99a.5.5 0 0 1-.491.595h-.788a.5.5 0 0 1-.49-.595l.384-1.99a1.5 1.5 0 1 1 2-1.415z"/>
                                        </svg>

                                  </i>
                                  <p className="DashboardMenuCentral-p">Permisos </p>  
                                  </div>
                              </li>
                              </button>
                          </ul>
              </nav>
              </section>
      </div>
    ); 
  };
  
  
  export default DashboardMenuCentral;