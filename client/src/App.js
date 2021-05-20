import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';

import Home from './js/home/user_home.js';
import Header from './components/Header';
import EditProfile from './js/editProfile';

function App() {
  return (
    <>
      <header>
        <Header />
      </header>
      <Router>
        {/* <Switch> */}
          {/* <Route exact path='/home' >
            <Home />
          </Route>
          <Route exact path='/editProfile'>
            <EditProfile />
          </Route> */}
          <Route path="/home" component={Home} />
          <Route path="/editProfile" exact component={EditProfile} />
        {/* </Switch> */}
      </Router>
    </>
  );
}

export default App;
