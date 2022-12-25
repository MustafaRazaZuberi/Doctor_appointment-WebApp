import React from 'react';
import './App.css';
// import SiginButtons from "./components/SiginButtons/SiginButtons"
// import Home from "./components/Home/Home"
// import {BrowserRouter as Router} from 'react-router-dom';
import Router from "./config/Router"

function App() {
  return (
    <>
      <div className="mainPage">
        <Router />
      </div>
    </>
  );
}

export default App;

