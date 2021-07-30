// src/App.js
import React from 'react';
import { BrowserRouter, BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import store from './redux/store/exportStore';


//import pages & components
import Home from './pages/Home'
import Login from './pages/Login'
import Navbar from './components/Navbar'

//import design css
import './components/index.css'

function App() {
  return (
    <div className="App">
      <Navbar />
      <BrowserRouter basename="/home">
        <Route path="/home" component={Home} />
        <Route path="/login" component={Login} />
      </BrowserRouter>
    </div>
  );
}
export default App;