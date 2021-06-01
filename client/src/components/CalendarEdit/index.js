import React from "react";
import './style.css';

class CalendarSlot extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            locked: this.props.selectable
        };
    }
    
    // Only mouseOver is needed, send event to controller that this event was hovered over
    onMouseOver(e) {
        this.props.alertMouseOver( this.props.id );
    }

    onMouseLeave(e) {
        this.props.alertMouseLeave( this.props.id );
    }

    render() {
        let className = "calSlot disable-text-selection" + 
                            ( this.props.selected ? " selected" : "" ) + 
                            ( this.props.id % this.props.numColSlots == this.props.numColSlots - 1 ? 
                                " bottom" : "");
        return(
            <div className={className} 
                onMouseOver={(e) => this.onMouseOver(e)}
                onMouseLeave={(e) => this.onMouseLeave(e)} />
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
        let numSegments = this.props.dayList.length * Math.trunc(Math.abs(this.props.timeRange[1] - this.props.timeRange[0])) * timeDiv;
        let selectArray = Array.apply(null, Array(numSegments)).map(() => { return false });

        this.state = { 
            selected: (this.props.schedule ? this.props.schedule : selectArray),
            timeDiv: timeDiv,
            mouseOverID: [],
            startDragId: 0,
            dragStartState: false,
            dragging: false
        };
    }

    alertMouseOver = ( id ) => {
        let temp = this.state.mouseOverID;
        let copySelected = this.state.selected;
        temp.push(id);
        
        // Update element dragged over
        if ( this.state.dragging ) {
            /* 
                This for loop is complex, so I'll go over it.
                The only thing we need to figure out is the number of columns spanned
                With this, we can also figure out the number of rows by subtracting:
                    id - (numCols * numSegments)
                Thus, we have our bounding box. As we find the column, we are guaranteed to
                change the first row at least, so we'll change that. Afterwards, we gotta go through
                the other cells.

                Also, check if the columns go left or right by checking startID and the id var
            */ 
            let colLen = Math.trunc(Math.abs(this.props.timeRange[1] - this.props.timeRange[0])) * this.state.timeDiv;
            let startCol = 0;
            let endCol = 0;
            for (let i = 0; i < this.props.dayList.length; i++) {
                if ( this.state.startDragId > colLen * i ) {
                    startCol = i;
                }
                if ( id > colLen * i ) {
                    endCol = i;
                }
            }
            
            let colNumDelta = endCol - startCol;
            let projColNum = (this.state.startDragId + (colNumDelta * colLen));
            let rowNumDelta = id - projColNum;
            
            // Top / Bottom right drag
            for ( let i = 0; i <= Math.abs(colNumDelta); i++ ) {
                for ( let j = 0; j <= Math.abs(rowNumDelta); j++ ) {
                    let curColSlot = this.state.startDragId + ((colNumDelta == 0 ? 1 : Math.sign(colNumDelta)) * i * colLen);
                    let curRowSlot = curColSlot + (rowNumDelta == 0 ? 1 : Math.sign(rowNumDelta)) * j;
                    copySelected[curRowSlot] = this.state.dragStartState;
                }
            }
        } 
        this.setState({
            mouseOverID: temp, 
            selected: copySelected
        });
    }

    alertMouseLeave = ( id ) => {
        let temp = this.state.mouseOverID;
        let index = temp.indexOf(id);
        if (index > -1) {
            temp.splice(index, 1);
        }
        this.setState({
            mouseOverID: temp
        });
    }

    startDrag = () => {
        if ( !this.props.viewOnly ) {
            let copySelected = this.state.selected;
            copySelected[this.state.mouseOverID[0]] = !copySelected[this.state.mouseOverID[0]];
            console.log(this.state.mouseOverID);
            this.setState({
                dragging: true,
                startDragId: this.state.mouseOverID[0],
                dragStartState: copySelected[this.state.mouseOverID[0]],
                selected: copySelected
            });
            document.addEventListener(
                "mouseup", this.endDrag                
            );  
        }
    }

    endDrag = () => {
        document.removeEventListener(
            "mouseup", this.endDrag                
        ); 
        this.setState({
            dragging: false
        });
    }

    render() {
        let numSegments = this.props.dayList.length * Math.trunc(Math.abs(this.props.timeRange[1] - this.props.timeRange[0])) * this.state.timeDiv;
        const calObjs = Array.apply(null, Array(numSegments)).map((item, i) => 
            <CalendarSlot id={i} 
                          viewOnly={this.props.viewOnly} 
                          alertMouseOver={this.alertMouseOver}
                          alertMouseLeave={this.alertMouseLeave}
                          selected={this.state.selected[i]}
                          numColSlots={numSegments / this.props.dayList.length}/>
        );
        let display = 
            this.props.dayList.map((item, index) => {
                let endCalc = numSegments / this.props.dayList.length;
                let slice = calObjs.slice(index * endCalc, index * endCalc + endCalc );

                return(<div class="calCol"
                            onMouseDown={this.startDrag}>{slice}</div>);
            });

        return(
            <div class="calSelection">
                {display}
            </div>
        );
    }
}

export default CalendarEdit;