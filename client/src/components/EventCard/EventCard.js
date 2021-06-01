import React from 'react';
import './EventCard.css';

export default class EventCard extends React.Component {

    render() {
        var name = this.props.name;
        var start = this.props.time.start;
        var end = this.props.time.end;
        var repeat = "Not repeating";
        var host = this.props.host;

        if(!name || name == ""){
            name = "No name";
        }
        if(this.props.repeating == true){
            repeat = "Repeats weekly";
        }
        return(
            <div class="card">
                <div class="vl"></div>
                <ul>
                    <li><h1>{name}</h1></li>
                    <li><a>Event Time: {this.props.time.start} : {this.props.time.end}</a></li>
                    <li><a>{repeat}</a></li>
                    <li><a>Host: {String(this.props.host)}</a></li>
                </ul>
            </div>
        );
    }
}
