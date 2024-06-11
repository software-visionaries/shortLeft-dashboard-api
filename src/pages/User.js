import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import { MdDelete } from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";
import '../styles/user.css'
import { MdEdit } from "react-icons/md";
import { SiOpenaccess } from "react-icons/si";
import { LiaUsersSolid } from "react-icons/lia";
import { RiUserStarLine } from "react-icons/ri";
import { LiaUsersCogSolid } from "react-icons/lia";


function User() {
  const [userData , setUserData] = useState([]);
  
  useEffect(() => {
    const fetchingUserData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/admin/alluser`);
        const data = await response.json();
        setUserData(data);
      } catch(error) {
        console.error(error);
      }
    }
  
    fetchingUserData();
  },[]);

  useEffect(() => {
    console.log(userData);
  }, [userData]);
  return (
   <>
     <Navbar/>        
     <Sidebar/>
     <section className='users'>
     <div className='stats_questions'>
        <div className='stats_questions_section'>
        <div className='stats_questions_section__iconwrapper'>
        <LiaUsersSolid className='stats_questions_section__icon'/>
         {/* <FaFileCircleQuestion  /> */}
        </div>
       
         <div className='stats_questions_section__content'>
          <p>Total Users</p>
          <h6>1000</h6>
         </div>
        </div>
        <div className='stats_questions_section'>
          <div className='stats_questions_section__iconwrapper'>
          <LiaUsersCogSolid className='stats_questions_section__icon' />
          </div>
         
          <div className='stats_questions_section__content'>
            <p>Total Active Users</p>
            <h6>986</h6>
          </div>          
        </div>
        <div className='stats_questions_section'> 
        <div className='stats_questions_section__iconwrapper'>
        <RiUserStarLine  className='stats_questions_section__icon'/>
        </div>          
          <div className='stats_questions_section__content'>
          <p>Total New Users Monthly</p>
          <h6>14</h6>
        </div>        
           
        </div>
      </div>
      <div className='users__section'>
        <div className='headingFilter'>
        <h6>All User</h6>
        <BsThreeDots />
        </div>
        <div className='searchWrapper'>
          <input type='text' placeholder='Search '/>
        </div>
      <table className='table'>
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Email</th>
            <th>Addresses</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {userData.map((user,userId )=> {
            return (
              <tr key={userId}>
              <td>{user.fullName}</td>
              <td>{user.email}</td>
              {user.userAddress.map((address, index) => (
                <td className='addressflex'>
                  {address.town.name}
                  {/* ,{address.area.name}, {address.section.name} */}
                </td>
              ))}
              
                 
              {/* {user.userAddress.map((address, index) => (
                <li key={index}>
                  {address.town.name}, 
                </li>
              ))} */}
           
              <td>Active</td>
              <td>
                <span><MdDelete /></span>
                <span><MdEdit /></span>
                <span><SiOpenaccess /></span>
                </td>
            </tr>
            )
           
        
          })}
          
         
        </tbody>
      </table>
      <hr/>
              <nav aria-label="...">
                <ul class="pagination">
                  <li class="page-item disabled">
                    <a class="page-link" href="#" tabindex="-1" aria-disabled="true">Previous</a>
                  </li>
                  <li class="page-item"><a class="page-link" href="#">1</a></li>
                  <li class="page-item active" aria-current="page">
                    <a class="page-link" href="#">2</a>
                  </li>
                  <li class="page-item"><a class="page-link" href="#">3</a></li>
                  <li class="page-item">
                    <a class="page-link" href="#">Next</a>
                  </li>
                </ul>
              </nav>
      </div>
     
     </section>
    
    </>
  )
}

export default User