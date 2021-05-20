import React from 'react';
import './EventCard.css';

const eventCard = (props) => {
    return(
        <div>
            <ul class="event-details">
                <li><h1>Event Name: {props.name}</h1></li>
                <li><h1>Event Time: {props.time}</h1></li>
            </ul>
        </div>
    );
}


export default EventCard;