import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import '../styles/navbar.css'
import { MdSpaceDashboard } from "react-icons/md";
import { ImUsers } from "react-icons/im";
import { BsPersonRaisedHand } from "react-icons/bs";
import { SiAnswer } from "react-icons/si";


function Sidebar() {

  

  
    return (
            <aside className="sidebar">
              <section className="sidebar__main">
                <div className="sidebar__links">

                  <NavLink to={"/"} className="sidebar__link"> 
                    <MdSpaceDashboard /> 
                    <span> Dashboard</span>
                  </NavLink>

                  <NavLink to={"/user"} className="sidebar__link">
                    <ImUsers />
                    <span>Users</span>
                  </NavLink>
                        
                  <NavLink to={"/question"} className="sidebar__link">
                    <BsPersonRaisedHand />
                    <span>Questions</span>
                  </NavLink> 

                  <NavLink to={"/trip"} className="sidebar__link">
                    <SiAnswer />
                    <span> Trips</span>
                  </NavLink> 

                </div>
              </section>
            </aside>
          )
          
      
}

export default Sidebar