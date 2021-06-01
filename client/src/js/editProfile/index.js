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
        <div class="profContainer">
            <EditProfile />
            <CalendarEdit dayList={[1, 2, 3, 4, 5, 6, 7]} timeRange={[0, 23]} />
        </div>
    );
}
export default editProfile;
