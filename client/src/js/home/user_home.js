import React from 'react';  
import './user_home.css';
import CalendarEdit from '../../components/CalendarEdit';
import EventCard from '../../components/EventCard/EventCard'; 
import AddEvents from '../../components/AddEvents';
export default class HomePage extends React.Component{

  constructor(props) {
    super(props);
    this.state = { 
      name: "",
      eventList: []
    };
  }
  
  callAPI() {
    fetch("http://localhost:5000/profile/60b176f28ae12e6144722883")
      .then(res => res.json())
      .then(profile => this.setState({ 
        name: profile.name,
        eventList: profile.events
      }));
  }

  componentDidMount() {
    this.callAPI();
  }

  render() {
    
    const events = []

    for(var i = 0; i < this.state.eventList.length; i++){
      var obj = this.state.eventList[i];
      if(!obj.event){
        continue;
      }
      events.push(<EventCard name={obj.event.name} time={obj.event.time} repeating={obj.event.repeating} host={obj.host}/>)
    }

    let daysOfWeek = [0, 1, 2, 3, 4, 5, 6];
    let now = Date.now();
    let unixTimes = daysOfWeek.map((item, index) => {
      if ( item == 0 ) {
        return now;
      }
      else {
        return now + item * 86400000;
      }
    });
    
    return (
      <div class="home_flex_container">
        <div class="split left">
          <h1 class="eventLabel">{this.state.name}'s Events</h1>
          <div class="eventList">{events}</div>
        </div>

        <div class="split right">
          <div class="centered">
            <CalendarEdit dayList={unixTimes} timeRange={[9, 22]} dataReturn={(array) => {}}/>
            <br></br>
            <AddEvents/>
          </div>
        </div>
      </div>
    );
  }
}