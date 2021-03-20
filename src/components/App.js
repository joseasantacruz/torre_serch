import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import SearchJobs from './SearchJobs'
import {SearchPeople} from './SearchPeople'

export default function App() {
  return <Routes/>
}

function Routes() {
  return ( 
      <Router>
        <Switch>
          <Route exact path="/" render={() => <SearchPeople/>}/>  
          <Route exact path="/jobs" render={() => <SearchJobs/>}/> 
          <Route exact path="/people" render={() => <SearchPeople/>}/> 
        </Switch>
      </Router> 
  );
}
 
