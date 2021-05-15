import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Home from './js/home/user_home.js';
import Header from './components/Header'

function App() {
  return (
    <>
      <header>
        <Header />
      </header>
      <Router>
        <Switch>
          <Route path='/home' exact component={Home} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
