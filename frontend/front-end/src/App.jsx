import { useState } from 'react';
import Splash from './Splash';
import { Routes, Route } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import About from './About';

function App() {
  return (
    <>
      {/* <Splash /> */}
      <Routes>
        <Route exact path="/" element={<Splash />}></Route>
        <Route exact path="/Login" element={<Login />}></Route>
        <Route exact path="/Signup" element={<Signup />}></Route>
        <Route exact path="/About" element={<About />}></Route>
      </Routes>
    </>
  );
}
export default App;
