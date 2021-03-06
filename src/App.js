import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import List from './pages/List'
import Create from './pages/Create'
import Edit from './pages/Edit'
import { initializeIcons } from '@uifabric/icons'
import axios from 'axios'
import './App.css'

//Set proxy for axios to the backend
axios.defaults.baseURL = 'https://phonebook-axrail-api.herokuapp.com/';
// axios.defaults.baseURL = 'http://localhost:7000/';

initializeIcons();

function App() {
  return (
    <Router id="test">
      <div className="container">
        <Switch>
          <Route exact path="/">
            <List />
          </Route>
          <Route path="/create">
            <Create />
          </Route>
          <Route path="/edit/:id">
            <Edit />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
