import { useState } from 'react';
import Splash from './Splash';
import { Routes, Route } from 'react-router-dom';
import Login from './Login';

function App() {
  return (
    <>
      {/* <Splash /> */}
      <Routes>
        <Route exact path="/" element={<Splash />}></Route>
        <Route exact path="/Login" element={<Login />}></Route>
      </Routes>
    </>
  );
}
export default App;
