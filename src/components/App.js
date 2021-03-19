import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import SearchJobs from './SearchJobs'
import SearchPeople from './SearchPeople'
function App() {
  return (
    <div className="App">
         <h1 className="title">
            Torre Search body
         </h1>
        <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <SearchPeople />
          </Route>
          <Route exact path="/jobs">
            <SearchJobs />
          </Route>
          <Route path="/people">
            <SearchPeople />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
