import React from 'react';
import './index.css';
import EditProfile from '../../components/editProfile/editProfile.component.js';
import CalendarEdit from '../../components/CalendarEdit'

//This contains the layout of what the page looks like
/**
 * Prints out layout of edit Profile PAge
 * 
 */

function editProfile(){
    return(
        <div className="profContainer">
            <div>
                <EditProfile className="edits" />
            </div>
            <div>
                <CalendarEdit className="calendar" dayList={[1, 2, 3, 4, 5, 6, 7]} timeRange={[0, 23]} dataReturn={(array) => {}} />
            </div>
        </div>
    );
}
export default editProfile;
