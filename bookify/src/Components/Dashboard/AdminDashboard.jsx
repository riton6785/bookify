import React, { useEffect } from 'react'
import "./dashboard.css"
import ActivityComponent from './ActivityComponent';
import { Link } from 'react-router-dom'
const AdminDashboard = () => {
    let body;
    let modeToggle;
    let sidebar;
    let sidebarToggle;
    let getMode;
    let getStatus;
    useEffect(() => {
        body = document.querySelector("body");
        modeToggle = body.querySelector(".mode-toggle");
        sidebar = body.querySelector("nav");
        sidebarToggle = body.querySelector(".sidebar-toggle");

        getMode = localStorage.getItem("mode");
        if(getMode && getMode ==="dark"){
            body.classList.toggle("dark");
        }

        getStatus = localStorage.getItem("status");
        if(getStatus && getStatus ==="close"){
            sidebar.classList.toggle("close");
        }

        
        
      }, [getMode, getStatus]);
      const modeToggleFunction = ()=>{
        body.classList.toggle("dark");
        if(body.classList.contains("dark")){
            localStorage.setItem("mode", "dark");
        }else{
            localStorage.setItem("mode", "light");
        }
    }

    const sidebarToggleFunction = ()=>{
        sidebar.classList.toggle("close");
        if(sidebar.classList.contains("close")){
            localStorage.setItem("status", "close");
        }else{
            localStorage.setItem("status", "open");
        }
    }
    
  return (
    <body>
        <nav>
        <div className="logo-name">
            <div className="logo-image">
                <img src="images/logo.png" alt=""/>
            </div>

            <span className="logo_name">Bookify</span>
        </div>

        <div className="menu-items">
            <ul className="nav-links">
                <li><Link to="/dashboard">
                    <i className="uil uil-estate"></i>
                    <span className="link-name">Dahsboard</span>
                </Link></li>
                <li><Link to="createuser">
                    <i class="uil uil-user-plus"></i>
                    <span className="link-name">Create User</span>
                </Link></li>
                <li><Link to="addproducts">
                    <i class="uil uil-book-medical"></i>
                    <span className="link-name">Add Products</span>
                </Link></li>
                <li><Link to="/allproducts">
                    <i className="uil uil-notebooks"></i>
                    <span className="link-name">Getall Products</span>
                </Link></li>
                <li><Link to="alluser">
                    <i className="uil uil-user"></i>
                    <span className="link-name">GetAll Users</span>
                </Link></li>
                <li><Link to="recentsales">
                <i class="uil uil-shopping-basket"></i>
                    <span className="link-name">Recent Sales</span>
                </Link></li>
            </ul>
            
            <ul className="logout-mode">
                <li className="mode">
                    <Link>
                        <i className="uil uil-moon"></i>
                    <span className="link-name">Dark Mode</span>
                </Link>

                <div className="mode-toggle" onClick={modeToggleFunction}>
                  <span className="switch"></span>
                </div>
            </li>
            </ul>
        </div>
    </nav>

    <section className="dashboard">
        <div className="top">
            <i className="uil uil-bars sidebar-toggle" onClick={sidebarToggleFunction}></i>

            <div className="search-box">
                <i className="uil uil-search"></i>
                <input type="text" placeholder="Search here..."/>
            </div>
            
            <img src="images/profile.jpg" alt=""/>
        </div>

        <div className="dash-content">
            <div className="overview">
                <div className="title">
                    <i className="uil uil-tachometer-fast-alt"></i>
                    <span className="text">Dashboard</span>
                </div>

                <div className="boxes">
                    <div className="box box1">
                        <i className="uil uil-shopping-basket"></i>
                        <span className="text">Total sales</span>
                        <span className="number">50,120</span>
                    </div>
                    <div className="box box2">
                        <i className="uil uil-user"></i>
                        <span className="text">Users</span>
                        <span className="number">20,120</span>
                    </div>
                    <div className="box box3">
                    <i class="uil uil-analytics"></i>
                        <span className="text">Analytics</span>
                        <span className="number">10,120</span>
                    </div>
                </div>
            </div>
            <ActivityComponent/>
        </div>
    </section>

    </body>
  )
}

export default AdminDashboard