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

    setSelect( selected ) {
        this.setState({
            selected: selected
        });
    }

    onMouseDown(e) {
        this.props.startDrag();
        console.log("On");
        console.log(this.state.id);
        this.setState({
            selected: true
        });
    }

    onMouseUp(e) {
        console.log("Off");
        console.log(this.state.id);
        this.setState({
            selected: false
        });
    }

    render() {
        let className = "calSlot disable-text-selection" + (this.state.selected ? " selected" : "");
        return(
            <div className={className} 
                onMouseDown={(e) => this.onMouseDown(e)}>{this.state.id}</div>
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
            timeRange ([int, int]) - Determines range of time to display in UTC time (can be reversed)
                                         In reversed case, emphasize switch from AM -> PM
            calObjs (CalSelector[][]) - Literally simplified 2D array representation of each element in the calendar
            schedule ([int]) - Input of schedule from backend (if viewing)
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

    // 
    onDragStart() {
        
    }

    onDragEnd() {
        
    }

    render() {
        let display = 
        this.props.dayList.map((item, index) => {
            let endCalc = (Math.trunc(Math.abs(this.props.timeRange[1] - this.props.timeRange[0])) * this.state.timeDiv);
            let slice = this.state.calObjs.slice(index * endCalc, index * endCalc + endCalc );
            return(<div class="calCol">{slice}</div>);
        })
        return(
            <div class="calSelection">
                {display}
            </div>
        );
    }
}

export default CalendarEdit;