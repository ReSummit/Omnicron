import React from 'react';  
import './edit.css';
import AddEvents from '../../components/AddEvents';
import Header from '../../components/Header';

const edit = (props) => {
  return (
    <div>
      <h1>edit</h1>
      <AddEvents/>
    </div>
  );
}

export default edit;