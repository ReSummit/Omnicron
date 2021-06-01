import React from 'react';
import './style.css';

function EventCard(props) {
    return(
        <div class="card">
            <ul>
                <li><h1>Event Name: {props.name}</h1></li>
                <li><a>Event Time: {props.time.start}, {props.time.end}</a></li>
                <li><a>Repeating: {String(props.repeating)}</a></li>
                <li><a>Host: {String(props.host)}</a></li>
            </ul>
        </div>
    );
}


export default EventCard;