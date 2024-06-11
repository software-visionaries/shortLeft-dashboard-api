import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import { MdDelete } from "react-icons/md";
import { TbMapQuestion } from "react-icons/tb";
import { BsThreeDots } from "react-icons/bs";
import '../styles/user.css'
import { MdEdit } from "react-icons/md";
import { TbUserQuestion } from "react-icons/tb";
import { TbEyeQuestion } from "react-icons/tb";
import { MdOutlineClose } from "react-icons/md";
import '../styles/question.css'

function Question() {

  const [questions, setQuestions] = useState([]); 
  const [currentQuestionPage,setCurrentQuestionPage] = useState(1);
  const [modal, setModal] = useState(false);
  const [fromQuestionTown,setFromQuestionTown] = useState('');
  const [fromQuestionArea,setFromQuestionArea] = useState('');
  const [fromQuestionSection,setFromQuestionSection] = useState('');
  const [fromQuestionSectionNumber,setFromQuestionSectionNumber] = useState('');
  const [toQuestionTown,setToQuestionTown] = useState('');
  const [toQuestionArea,setToQuestionArea] = useState('');
  const [toQuestionSection,setToQuestionSection] = useState('');
  const [toQuestionSectionNumber,setToQuestionSectionNumber] = useState('');
  const [totalUnAnswered,setTotalUnAnswered] = useState(0);
  const [totalAnswered,setTotalAnswered] = useState(0);
  const [totalQuestions,setTotalQuestions] = useState(0);
  

  const fetchQuestions = async() => {

    try {
        const response = await fetch(`http://localhost:8080/admin/questions`);
        if(!response.ok) {
          throw new Error("Network response");
        }

        const data = await response.json();
        console.log(data);
        setQuestions(data);
    }catch(error) {
      console.log(error);
    }
  } 

  const fetchTotalAnswered = async () => {

    try {

      const response = await fetch(`http://localhost:8080/count/answered`);

      if(!response.ok) {
        throw new Error('Network response');
      }

      const data = await response.json();
      console.log(data);
      setTotalAnswered(data);
      
    } catch (error) {
      console.error(error);
    }
  }

  const fetchTotalUnAnswered = async () => {
    try {
      const response = await fetch(`http://localhost:8080/count/unAnswered`);
      
      if(!response.ok) {
        throw new Error('Network response');
      }

      const data = await response.json();
      console.log(data);
      setTotalUnAnswered(data);

    } catch (error) {
      console.error(error)
    }
  }

  const fecthTotalQuestion = async () => {
    try {
      const response = await fetch(`http://localhost:8080/count/all`);

      if(!response.ok) {
        throw new Error('Network response');
      }
      
      const data = await response.json();
      console.log(data);
      setTotalQuestions(data);

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchQuestions();
    fetchTotalAnswered();
    fetchTotalUnAnswered();
    fecthTotalQuestion();
  },[]);

  const deleteQuestions = async (fromTownId,toTownId,fromAreaId,toAreaId,fromSectionId,toSectionId) => {
      const response = await fetch(`http://localhost:8080/admin/questions/delete/${fromTownId}/${toTownId}/${fromAreaId}/${toAreaId}/${fromSectionId}/${toSectionId}`,{
        method:'DELETE',
        headers: {
          'Content-Type':'application/json'
        }        
      }    
    )
    if(!response.ok) {
      throw new Error("Network error");
    }
    const data = await response.json();
    console.log('deleted successful')
  }


  // making the modal for update ,
  const toggleModal = (event) => {
    

      setModal(!modal)
      if(modal) {
        document.body.classList.add('add_modal')
      } else {
          document.body.classList.remove('add_modal')
      }
    }
    
    const updateQuestion = async (fromTownId,toTownId,fromArea,toArea,fromSectionId,toSectionId) => {  

      try {
        const response = await fetch (`http://localhost:8080/admin/questions/update/${fromTownId}/${toTownId}/${fromArea}/${toArea}/${fromSectionId}/${toSectionId}`,{
          method: 'PUT',         
            headers : {
             'Content-Type' :'application/json'
            },  
            body: JSON.stringify({
              
              fromTown : {name : fromQuestionTown},
              fromArea : {name :  fromQuestionArea },
              fromSection: { name : fromQuestionSection, number: fromQuestionSectionNumber},
              toArea : {name : toQuestionArea},  
              toTown : { name : toQuestionTown},
              toSection : {name: toQuestionSection, number: toQuestionSectionNumber },           
            }),      
        });
        if(!response.ok) {
          throw new Error("Network error");
        } else {
          console.log('successful updated:', await response.json());

        }
        // fetch();
        toggleModal();
      } catch(error) {
        console.log("Error Update question",error);
      }
      
    }

  return (
   <>
     <Navbar/>        
     <Sidebar/>
    
     <section className='users'>
    
       <div className='stats_questions'>       
        <div className='stats_questions_section'>
        <div className='stats_questions_section__iconwrapper'>
         <TbMapQuestion  className='stats_questions_section__icon' />
        </div>
       
         <div className='stats_questions_section__content'>
          <p>Total Questions</p>
          <h6>{totalQuestions}</h6>
         </div>
        </div>
        <div className='stats_questions_section'>
          <div className='stats_questions_section__iconwrapper'>
          <TbEyeQuestion className='stats_questions_section__icon'/>
          </div>
         
          <div className='stats_questions_section__content'>
            <p>Total of Answered Questions</p>
            <h6>{totalAnswered}</h6>
          </div>          
        </div>
        <div className='stats_questions_section'> 
        <div className='stats_questions_section__iconwrapper'>
          <TbUserQuestion className='stats_questions_section__icon'/>
        </div>          
          <div className='stats_questions_section__content'>
          <p>Total of Unanswered Questions</p>
          <h6>{totalUnAnswered}</h6>
        </div>        
           
        </div>
      </div>
      <div className='users__section'>
        <div className='headingFilter'>
        <h6>All Questions</h6>
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
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((question,questionId) => {
            return (
              <tr key={questionId}>
              <td>{question.fromQuestion}</td>
              <td>{question.toQuestion}</td>
              <td>{question.status}</td>
              <td>
                <span onClick={() => deleteQuestions(question.townId,question.townToId,question.areaId,question.areaToId,question.sectionId,question.sectionToId)}>
                  <MdDelete />
                </span>
                <span  >
                  <MdEdit onClick={toggleModal} />
                  {modal && (<div className='modal'>
                <div className='overlay'>
                  <div className='questionUpdate__wrapper'>
                    <div className='questionUpdate__background'>
                    <MdOutlineClose className='questionUpdate__closeIcon' onClick={toggleModal}/>
                      <form onSubmit={(e) => {
                        e.preventDefault();
                       updateQuestion(question.townId, question.townToId, question.areaId, question.areaToId, question.sectionId, question.sectionToId);
                      }}>
                      <div className='questionUpdate__form'>                        
                        <fieldset >                    
                          <legend>From Question</legend>
                          <div className='questionUpdate__input'>
                            <input type='text' placeholder='Town' name='fromQuestionTown' 
                             value={fromQuestionTown}
                            onChange={(event) =>  setFromQuestionTown(event.target.value)}/>
                            <input type='text' placeholder='Area' name='fromQuestionArea'
                            value={fromQuestionArea}
                            onChange={(event => setFromQuestionArea(event.target.value))}/>
                          </div>
                          <div className='questionUpdate__input'>
                            <input type="text" placeholder='Section' name='fromQuestionSection'
                             value={fromQuestionSection}
                            onChange={ (event => setFromQuestionSection(event.target.value))}/>
                            <input type= "text" placeholder='section Number' name='fromQuestionSectionNumber'
                             value={fromQuestionSectionNumber}
                            onChange={ (event) => setFromQuestionSectionNumber(event.target.value)}/>
                          </div>
                        </fieldset>
                      </div>
                      <div className='questionUpdate__form'>
                      <fieldset >
                        <legend>To Question</legend>
                        <div className='questionUpdate__input'>
                          <input type='text' placeholder='Town' name='toQuestionTown'
                          value={toQuestionTown}
                          onChange={ (event) => setToQuestionTown(event.target.value)}/>
                          <input type='text' placeholder='Area' name='toQuestionArea'
                          value={toQuestionArea}
                          onChange={ (event) => setToQuestionArea(event.target.value)}/>
                        </div>
                        <div className='questionUpdate__input'>
                          <input type="text" placeholder='Section' name='toQuestionSection'
                          value={toQuestionSection}
                          onChange={ (event) => setToQuestionSection(event.target.value)}/>
                          <input type= "text" placeholder='section Number' name='toQuestionSectionNumber'
                           value={toQuestionSectionNumber}
                          onChange={ (event) => setToQuestionSectionNumber(event.target.value)}/>
                        </div>
                      </fieldset>
                      </div> 
                      <button type='submit'> Update Question</button>
                      </form>                     
                    </div>                    
                  </div>               
                </div>            
       </div>)} 
                </span>
             </td>
            </tr> 
            );    
          })}
              
        
        </tbody>
      </table>
      <hr/>
              <nav aria-label="...">
                <ul className="pagination">
                  <li className="page-item disabled">
                    <a className="page-link" href="#" tabIndex="-1" aria-disabled="true">Previous</a>
                  </li>
                  <li className="page-item"><a className="page-link" href="#">1</a></li>
                  <li className="page-item active" aria-current="page">
                    <a className="page-link" href="#">2</a>
                  </li>
                  <li className="page-item"><a className="page-link" href="#">3</a></li>
                  <li className="page-item">
                    <a className="page-link" href="#">Next</a>
                  </li>
                </ul>
              </nav>
      </div>
     
     </section>
    
    </>
  )
}

export default Question