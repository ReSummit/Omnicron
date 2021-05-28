import React from "react";
import './style.css';

class CalendarSlot extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            locked: this.props.selectable,
            dragging: false,
            selected: false
        };
    }

    endDrag = () => {
        this.setState({
            dragging: false
        });
        this.props.endDrag( this.props.id );
        document.removeEventListener(
            "mouseup", this.endDrag
        );
    }
    
    // 

    onMouseDown(e) {
        if ( !this.props.viewOnly ) {
            this.props.startDrag( this.props.id );
            this.setState({ 
                dragging: true,
                selected: this.props.selected
            }); 

            document.addEventListener(
                "mouseup", this.endDrag                
            ); 
        }
    }

    onMouseOver(e) {
        if ( this.props.dragging ) {
            console.log(this.props.id);
            this.props.updateDrag( this.props.id );
            document.addEventListener(
                "mouseup", this.endDrag                
            );  
        }
    }

    onMouseLeave(e) {
        if ( this.props.dragging ) {
            console.log(this.props.id);
            document.removeEventListener(
                "mouseup", this.endDrag
            );
        }
    }

    render() {
        let className = "calSlot disable-text-selection" + (this.props.selected ? " selected" : "");
        return(
            <div className={className} 
                onMouseDown={(e) => this.onMouseDown(e)}
                onMouseOver={(e) => this.onMouseOver(e)}
                onMouseLeave={(e) => this.onMouseLeave(e)}>{this.props.id}</div>
        );
    }
}

const MemoizedCalendarSlot =  React.memo(CalendarSlot);

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

            Mon  Tues   Wed 
    9:00
    10:00   x     x  
    11:00   x     x     x`
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
        let numSegments = this.props.dayList.length * Math.trunc(Math.abs(this.props.timeRange[1] - this.props.timeRange[0])) * timeDiv;
        let dragStatus = false;
        let selectArray = Array.apply(null, Array(numSegments)).map(() => { return false });

        this.state = { 
            selected: (this.props.schedule ? this.props.schedule : selectArray),
            calObjs: calObjsGen,
            timeDiv: timeDiv,
            startDragId: 0,
            dragStartState: false,
            dragging: dragStatus
        };

        for (let i = 0; i < numSegments; i++) {
            calObjsGen.push(
                <CalendarSlot id={i} 
                              viewOnly={this.props.viewOnly} 
                              dragging={this.state.dragging}
                              startDrag={this.onDragStart} 
                              endDrag={this.onDragEnd} 
                              updateDrag={this.onDragUpdate}
                              selected={this.state.selected[i]}/>
            );
        }
        console.log(this.state.calObjs);
    }

    // 
    onDragStart = ( id ) => {
        let copySelected = [...this.state.selected];
        console.log("start:", id);
        copySelected[id] = !copySelected[id];

        // this.setState( state => {
        //     return {

        //     };
        // });

        this.setState({
            selected: copySelected,
            startDragId: id,
            dragStartState: copySelected[id],
            dragging: true
        });
    }

    onDragEnd = ( id ) => {
        console.log("end:", id);
        this.setState({
            dragging: false
        });
    }

    onDragUpdate = ( id ) => {
        if ( this.state.dragging ) {
            let copySelected = this.state.selected;
            let colLen = Math.trunc(Math.abs(this.props.timeRange[1] - this.props.timeRange[0])) * this.state.timeDiv;
            
            for (let i = 0; i < this.props.dayList.length; i++) {
                copySelected[i * colLen] = this.state.dragStartState;
                if ( i * colLen > id ) {
                    for (let j = (i - 1) * colLen; j < id + 1; j++) {
                        copySelected[j] = this.state.dragStartState;
                    }
                }
            }
        } 
    }

    render() {
        let timeDiv = this.props.timeDiv;
        if ( this.props.timeDiv == null ) {
            timeDiv = 2;
        }

        let numSegments = this.props.dayList.length * Math.trunc(Math.abs(this.props.timeRange[1] - this.props.timeRange[0])) * timeDiv;
        console.log(Array.from(numSegments));
        const calObjs = Array.apply(null, Array(numSegments)).map((item, i) => 
            <CalendarSlot id={i} 
                                viewOnly={this.props.viewOnly} 
                                dragging={this.state.dragging}
                                startDrag={this.onDragStart} 
                                endDrag={this.onDragEnd} 
                                updateDrag={this.onDragUpdate}
                                selected={this.state.selected[i]}/>
        );
        console.log(calObjs);
        let display = 
            this.props.dayList.map((item, index) => {
                let endCalc = (Math.trunc(Math.abs(this.props.timeRange[1] - this.props.timeRange[0])) * timeDiv);
                console.log(endCalc);
                let slice = calObjs.slice(index * endCalc, index * endCalc + endCalc );
                console.log(slice);

                return(<div class="calCol">{slice}</div>);
            });

        return(
            <div class="calSelection">
                {display}
            </div>
        );
    }
}

export default CalendarEdit;