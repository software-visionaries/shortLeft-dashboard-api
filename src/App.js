import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import User from './pages/User';
import Question from './pages/Question';
import Trips from './pages/Trips';
import Search from './pages/Search';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element = {<Dashboard/>}/>
        <Route path="/User" element = {<User/>}/>
        <Route path="/Question" element = {<Question/>}/>
        <Route path="/Trip" element = {<Trips/>}/>
        <Route path='/search' element = {<Search/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
