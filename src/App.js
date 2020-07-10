import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import List from './pages/List'
import Create from './pages/Create'
import axios from 'axios'
import './App.css'

axios.defaults.baseURL = 'http://localhost:7000';


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
