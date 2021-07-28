// src/App.js
import React from 'react';
import { BrowserRouter, BrowserRouter as Router, Route, Switch } from 'react-router-dom';

//import pages & components
import Home from './pages/Home'
import Navbar from './components/Navbar'

//import design css
import './components/index.css'

function App() {
  return (
    <div className="App">
      <Navbar />
      <BrowserRouter basename="/home">
        <Route path="/home" component={Home} />
      </BrowserRouter>
    </div>
  );
}
export default App;