import React from 'react'
import Register from './Register';
import Dashboard from './Dashboard';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './Login';
import View from './View.js';
import Edit from './Edit';


const App = () => {
  


  return (
    <div>
     
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Register/>}/>
        <Route path='/Login' element={<Login/>}/>
        <Route path='/Edit/:id' element={<Edit/>}/>
        <Route path='/View/:idnum' element={<View/>}/>
        <Route path='/Dashboard' element={<Dashboard/>}/>
      </Routes>
      </BrowserRouter>
      
    </div>
  )
}

export default App
