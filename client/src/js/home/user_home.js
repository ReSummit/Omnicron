import React from 'react';  
import './user_home.css';
import {EventCard} from '../../components/EventCard/EventCard';

const userHome = (props) => {
  return (
    <div>
      <h1>{props.name}'s Events</h1>
      <ul>
        {props.events.map((value, index) => {
          return <li key={index}><EventCard name={value.event.name} /></li>
        })}
      </ul>
    </div>
  );
}


export default userHome;