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
import HomeEditor from './pages/HomeEditor';
import EditorSelect from './pages/EditorSelect';
import SelectProblem from './pages/SelectProblem';
import Connect from './pages/Connect'
import ExplainDetail from './pages/ExplainDetail';
import Renewal from './pages/EditorRenewal';

//import design css
import './components/index.css'

function App() {
  return (
    <Provider store={store}>
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact={true} path="/" component={Home}/>
          <Route path="/home" component={Home} />
          <Route path="/editor" component={HomeEditor} />
          <Route path="/editorSelect" component={EditorSelect} />
          <Route path="/recommand" component={SelectProblem} />
          <Route path="/connect" component={Connect} />
          <Route path="/login" component={Login} />
          <Route path="/renewal" component={Renewal} />
          <Route path="/explaindetail" component={ExplainDetail} />
        </Switch> 
      </BrowserRouter>
    </div>
    </Provider>
  );
  serviceWorker.unregister();
}

export default App;