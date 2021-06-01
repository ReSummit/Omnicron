import React from 'react';
import './EventCard.css';
import 'antd/dist/antd.css';
import { Form, Input, Button, Checkbox, DatePicker, TimePicker } from 'antd';
import moment from 'moment';
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
                <h1>{name}</h1>
                <a>Event Time: {moment(start).format("MMMM Do h:mm a")} : {moment(end).format("MMMM Do h:mm a")}</a>
                <a>{repeat}</a> 
                <a>Host: {String(this.props.host)}</a>
            </div>
        );
    }
}
