import React from "react";
import './style.css';

class CalendarSlot extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id,
            selected: false,
            locked: this.props.selectable
        };
    }

    onMouseDown(e) {
        console.log("On");
        console.log(this.state.id);
        this.setState({
            selected: !this.state.selected
        });
    }

    onMouseUp(e) {
        console.log("Off");
        console.log(this.state.id);
    }

    render() {
        let className = "calSlot disable-text-selection" + (this.state.selected ? " selected" : "");
        return(
            <div className={className} 
                onMouseDown={(e) => this.onMouseDown(e)}
                onMouseUp={(e) => this.onMouseUp(e)}>&nbsp;</div>
        );
    }
}

class CalendarEdit extends React.Component {
    /*  The calendar can be used two ways:
        1. As an input to mark time
        2. Display common times to the user

        Props:
            viewOnly (bool) - Determines interactivity of schedule
            timeDiv (int) - Determines how many slices wanted (default is 2)
            dayList ([float]) - List of days to show
            timeRange ([float, float]) - Determines range of time to display in UTC time (can be reversed)
                                         In reversed case, emphasize switch from AM -> PM
            calObjs (CalSelector[][]) - Literally simplified 2D array representation of each element in the calendar
     */ 
    constructor(props) {
        super(props);
        // Check if time division provided; otherwise default to 2
        let timeDiv = this.props.timeDiv;
        if ( this.props.timeDiv == null ) {
            timeDiv = 2;
        }

        // Generate all elements in calendar selector
        let calObjsGen = [];
        for (let i = 0; i < this.props.dayList.length * Math.trunc(Math.abs(this.props.timeRange[1] - this.props.timeRange[0])) * timeDiv; i++) {
            calObjsGen.push(
                <CalendarSlot id={i} selectable={this.props.viewOnly} startDrag={this.onDragStart} endDrag={this.onDragEnd}/>
            );
        }

        this.state = { 
            selected: (this.props.schedule ? this.props.schedule : []),
            calObjs: calObjsGen,
            timeDiv: timeDiv
        };
    }

    onDragStart() {

    }

    onDragEnd() {

    }

    // displayCalendar() {
    //     return(

    //     );
    // }

    render() {
        let display = this.props.dayList.map((item, index) => {
            let endCalc = (Math.trunc(Math.abs(this.props.timeRange[1] - this.props.timeRange[0])) * this.state.timeDiv);
            let thing = this.state.calObjs.slice(index * endCalc, index * endCalc + endCalc );
            console.log(thing);
            return(<div class="calCol">{thing}</div>);
        })
        console.log(display);
        return(
            <div class="calSelection">
                <div class="calTable">
                    {display}
                </div>
            </div>
        );
    }
}

export default CalendarEdit;