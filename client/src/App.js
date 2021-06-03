import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';

import Home from './js/home/user_home.js';
import Header from './components/Header';
import editProfile from './js/editProfile';
import edit from './js/edit';


function App() {
  return (
      <Router>
        <Header />
        <Switch>
          <Route path="/home" component={Home} />
          <Route path="/editProfile" exact component={editProfile} />
          {/* <Route path="/edit" component={edit}/> */}
        </Switch>
      </Router>
  );
}

export default App;
