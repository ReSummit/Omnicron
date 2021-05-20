import React from 'react';  
import './user_home.css';
import CalendarEdit from '../../components/CalendarEdit';
import Header from '../../components/Header';

function Home() {
  return (
    <div>
      <h1>My Events</h1>
      <CalendarEdit dayList={[1, 2, 3, 4, 5]} timeRange={[9, 22]}/>
    </div>
  );
}



export default Home;