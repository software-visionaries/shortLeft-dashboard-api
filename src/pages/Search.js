import React, { useState } from 'react'

function Search() {
    const [fromTown, setFromTown] = useState('');
    const [fromArea, setFromArea] = useState('');
    const [fromSectionClassification, setFromSectionClassification] = useState('');
    const [fromSectionClassificationNumber, setFromSectionClassificationNumber] = useState('')
    const [toTown, settoTown] = useState('');
    const [toArea, setToArea] = useState('');
    const [toSectionClassification, setToSectionClassification] = useState('');
    const [toSectionClassificationNumber, setToSectionClassificationNumber] = useState('')

    // 
    const[isTripAvailable,setIsTripAvailable] = useState(false);

    const fromSection = fromSectionClassification + " " + fromSectionClassificationNumber;
    const toSection =toSectionClassification + " " + toSectionClassificationNumber;

    const fetchTrips = async () => {    

        try {
            const response = await fetch(`http://localhost:8080/trip/direction/
            ${fromTown.trim()}/${fromArea.trim()}/${fromSection.trim()}/${toTown.trim()}/
            ${toArea.trim()}/${toSection.trim()}`);
    
            const data = await response.json();
            if(data == null) {
                setIsTripAvailable(false)
            }
            else {
                setIsTripAvailable(true);
            }
            console.log(data);
        } 
        catch(error) {
            console.error(error);
        }
        
    }

    const findOutSearchOrAddQuestion = () => {
        fetchTrips();
        if(!isTripAvailable) {
            addQuestion();
        }
    }
    
    const addQuestion = async () => {
        try {
            const response = await fetch(`http://localhost:8080/add/question/1`,{
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify({
                    fromTown : fromTown.trim(),
                    fromArea : fromArea.trim(),
                    fromSection : fromSection.trim(),
                    toTown : toTown.trim(),
                    toArea :toArea.trim(),
                    toSection : toSection.trim()
                }),
            });
            if(!response.ok) {
                console.log("error");
            }
            else {
                const data = await response.text();
                console.log('successful added', data);
            }            
            
        } catch (error) {
            console.error(error);
        }      

    }

  return (
    <div>
       <div>
       <label>From Town</label>
        <input name='fromTown' onChange={ (e) => setFromTown(e.target.value)}/>
       </div>
       <div>
       <label>From Area</label>
        <input name='fromArea' onChange={(e) => setFromArea(e.target.value)}/>
       </div>
        <div>
        <label>From Section name</label>
        <input name='fromSectionName' onChange={(e) => setFromSectionClassification(e.target.value)}/>
        </div>
        <div>
        <label>From Section number</label>
        <input name='fromSectionNumber' onChange={(e) =>setFromSectionClassificationNumber(e.target.value)}/>
        </div>
        <div>
        <label>To Town</label>
        <input name='toTown' onChange={(e) => settoTown(e.target.value)}/>
        </div>
        <div>
        <label >to Area</label>
        <input name='toArea' onChange={(e) => setToArea(e.target.value)}/>
        </div>
        <div>
        <label>to Section name</label>
        <input name='toSectionName'  onChange={(e) => setToSectionClassification(e.target.value)} />
        </div>
       <div>
       <label name='toSectionNumber'>From Section number</label>
        <input onChange={(e) => setToSectionClassificationNumber(e.target.value)}/>
       </div>
       
        <button onClick={() => findOutSearchOrAddQuestion()}> search</button>
      
       
    </div>
  )
}

export default Search