import React, { useState } from 'react'
import "../styles/navbar.css"
import { FaSearch } from "react-icons/fa";
import { IoMdMenu } from "react-icons/io";
import logo from "../images/logo.webp"
import { CiMenuBurger } from "react-icons/ci";
import { IoIosNotificationsOutline } from "react-icons/io";
import Avatar from './Avatar';

const Navbar = (event)  => {
  const [sidebar,setSidebar] = useState(false);

  const sidebarToggle = (event) => {
    const sidebar = document.getElementsByClassName('sidebar');
    setSidebar(!sidebar);
    if(sidebar) {
      sidebar.classList.add('active')
    }
    else {
      sidebar.classList.remove('active');
    }

  }
  return (
    <nav className='header'>
      <div className='topSidebarPart'>
                <div className='logo__wrapper'>
                    <img className='logo' src={logo} alt='logo'/>
                </div>                
      </div>
      <div className='headerElements'>
        <div className='menuAndSearch'>
        <CiMenuBurger className='menuicon' onClick={sidebarToggle}/>
          <div className='search-bar'>        
              <input type='text' placeholder="Search"></input>
              <FaSearch className='searchIcon'/>
          </div>
        </div>

        <div className='notificationProfile'>
          <IoIosNotificationsOutline className='notification' />
          <div className='userProfile'>
            <Avatar image ='' name ="Thabang Lebele"/>
            <p>Thabang Lebele</p>
          </div>
        </div>
      </div>
     
      
        
    </nav>
  )
}

export default Navbar