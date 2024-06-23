import React from 'react';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './Pages/Dashboard';
import OTPBox from './Components/OTPBox';

function App() {
  return (
<BrowserRouter>
<Routes>
    <Route path='/' element={<SignUp/>} />
      <Route element={<Login />} path='/login'/>
      <Route element={<Dashboard/>} path='/dashboard'/>
    </Routes>
   
     </BrowserRouter>
    

  );
}

export default App;
