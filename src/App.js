import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import List from './pages/List'
import Create from './pages/Create'
import { initializeIcons } from '@uifabric/icons'
import axios from 'axios'
import './App.css'

//Set proxy for axios to the backend
axios.defaults.baseURL = 'https://phonebook-axrail-api.herokuapp.com/';
// axios.defaults.baseURL = 'http://localhost:7000/';

initializeIcons();

function App() {
  return (
    <Router>
      <div className="container">
        <Switch>
          <Route exact path="/">
            <List />
          </Route>
          <Route path="/create">
            <Create />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
