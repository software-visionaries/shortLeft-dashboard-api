import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import { MdDelete } from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";
import '../styles/user.css'
import { MdEdit } from "react-icons/md";
import { MdOutlineWhereToVote } from "react-icons/md";
import { LiaComments } from "react-icons/lia";
import { TfiStatsUp } from "react-icons/tfi";
import { MdOutlineClose } from "react-icons/md";

function Trips() {
  const [trips,setTrips] = useState([]);
  const[currentPage,setCurrentPage] = useState(1);
  const[tripPerPage,setTripPerPage] = useState(2);
  const[modal, setModal] = useState(false);

  const fetchTrips = async() => {
    const response = await fetch(`http://localhost:8080/trips/admin`);
    try{
      if(!response.ok) {
        throw new Error("Network error");
      }  
      const data = await response.json();
      setTrips(data)
    
      console.log(data)
    }
    catch(error) {
      console.log(error);
    }   
  }

  const fecthTrips = async () => {
    try {
      

      
    } catch (error) {
      console.log()
    }
  }

  useEffect(() => {
    fetchTrips();
  },[])

  const toggleModal = (event) => {
    setModal(!modal);
    if(modal)
    {
      document.body.classList.add(modal);
    }
    else {
      document.body.classList.remove(modal);
    }
  }
  
  const totalPages = Math.ceil(trips.length / tripPerPage);
  const indexOfFirstItem = (currentPage - 1) * tripPerPage;
  const indexOfLastItem = currentPage * tripPerPage;
  const currentPageTrip = trips.slice(indexOfFirstItem, indexOfLastItem);


  return (
   <>
     <Navbar/>        
     <Sidebar/>
     <section className='users'>
     <div className='stats_questions'>
        <div className='stats_questions_section'>
        <div className='stats_questions_section__iconwrapper'>
         <TfiStatsUp className='stats_questions_section__icon' />
        </div>
       
         <div className='stats_questions_section__content'>
          <p>Total Answers</p>
          <h6>1000</h6>
         </div>
        </div>
        <div className='stats_questions_section'>
          <div className='stats_questions_section__iconwrapper'>
          <LiaComments className='stats_questions_section__icon'/>
          </div>
         
          <div className='stats_questions_section__content'>
            <p>Total Comments</p>
            <h6>986</h6>
          </div>          
        </div>
        <div className='stats_questions_section'> 
        <div className='stats_questions_section__iconwrapper'>
        <MdOutlineWhereToVote className='stats_questions_section__icon'/>
         
        </div>          
          <div className='stats_questions_section__content'>
          <p>Total Ratings</p>
          <h6>14</h6>
        </div>        
           
        </div>
      </div>
      <div className='users__section'>
        <div className='headingFilter'>
        <h6>All Trips</h6>
        <BsThreeDots />
        </div>
        <div className='searchWrapper'>
          <input type='text' placeholder='Search '/>
        </div>
      <table className='table'>
        <thead>
          <tr>
            <th>From Question</th>
            <th>To Question</th>
            <th>Taxi Location</th>
            <th>Taxi Price</th>
            <th>Taxi Sign</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentPageTrip.map((trip, tripId)=> {
            return(<tr key={tripId}>
              <td>{trip.fromQuestion}</td>
              <td>{trip.toQuestion}</td>
              <td>{trip.taxiLocation}</td>
              <td>{trip.taxiPrice}</td>
              <td><img src='' alt='sign indication'/></td>
              <td>
                <span><MdDelete /></span>
                <span><MdEdit onClick={toggleModal}/>
                {
                  modal && (<div className='modal'><input type='text'/>
                  <div className='overlay'>
                    <div className='questionUpdate__wrapper'>
                      <div className='questionUpdate__background'>
                      <MdOutlineClose className='questionUpdate__closeIcon' onClick={toggleModal}/>
                        <form>
                        <div className='questionUpdate__form'>
                        <fieldset >                    
                          <legend>Trip</legend>
                          <div className='questionUpdate__input'>
                            <input placeholder='price'/>                      
                            <input placeholder='sign attachment'/>
                            <input placeholder='trip notes'/>
                          </div>
                        </fieldset>
                        <fieldset >                    
                          <legend>Location</legend>
                          <div className='questionUpdate__input'>                                           
                            <input placeholder='taxi rank name'/>
                            <input placeholder='trip notes'/>
                          </div>
                        </fieldset>
                        </div>
                        </form>
                      </div>
                    </div>
                    </div>
                  </div>)
                 }</span>
                </td>
            </tr>);
          })}
               
        </tbody>
      </table>
      <hr/>
      <nav aria-label="...">
        <ul className="pagination">
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <button className="page-link" onClick={() => setCurrentPage(currentPage - 1)}>Previous</button>
          </li>
          {Array.from({ length: totalPages }).map((_, index) => (
            <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
              <button className="page-link" onClick={() => setCurrentPage(index + 1)}>{index + 1}</button>
            </li>
          ))}
          <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
            <button className="page-link" onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
          </li>
        </ul>
      </nav>

      </div>
     
     </section>
    
    </>
  )
}

export default Trips