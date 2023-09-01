import React from "react";
import './styles/lateralmenudashboard.css';
const DashboardMenuLateral = () => {
  return (
    <div>
      <nav className="DashboardMenuLateral-main-menu">
      <ul className="DashboardMenuLateral-ul">
        <li>
          <a href="#">
            <i className="DashboardMenuLateral-icon"></i>
            <span className="DashboardMenuLateral-nav-text">Home</span>
          </a>
        </li>

        <li>
          <a href="#">
            <i className="DashboardMenuLateral-icon"></i>
            <span className="DashboardMenuLateral-nav-text">Gallery</span>
          </a>
        </li>

        <li>
          <a href="#">
            <i className="DashboardMenuLateral-icon"></i>
            <span className="DashboardMenuLateral-nav-text">Blog</span>
          </a>
        </li>

        <li>
          <a href="#">
            <i className="DashboardMenuLateral-icon"></i>
            <span className="DashboardMenuLateral-nav-text">Messages</span>
          </a>
        </li>

        <li>
          <a href="#">
            <i className="DashboardMenuLateral-icon"></i>
            <span className="DashboardMenuLateral-nav-text">Notification</span>
          </a>
        </li>

      </ul>

      <ul className="DashboardMenuLateral-logout">
        <li>
          <a href="#">
            <i className="DashboardMenuLateral-icon"></i>
            <span className="DashboardMenuLateral-nav-text">Settings</span>
          </a>
        </li>

        <li>
          <a href="#">
            <i className="DashboardMenuLateral-icon"></i>
            <span className="DashboardMenuLateral-nav-text">
              Logout
            </span>
          </a>
        </li>  
      </ul>
   </nav>
    </div>
  ); 
};


export default DashboardMenuLateral;