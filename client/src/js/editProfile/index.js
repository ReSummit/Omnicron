import React from 'react';
import Header from '../../components/Header';
//This contains the layout of what the page looks like
function editProfile(){
    return(
    <>
        <div>
            <h1>Edit Profile</h1>
            <form>
                <label for="name">Name:</label>
                <input type="text" name="name" id="name" value="some_name"></input>
                <button type="submit">Edit</button>
                <br></br><br></br>
                <label for="schedule">Schedule:</label>
                <input type="text" name="schedule" id="schedule"></input>
                <button type="submit">Edit</button>
                <br></br><br></br>
                <label for="events">Events</label>
                <input type="list"></input>
                <button type="submit">Edit</button>
            </form>
        </div>
    </>
    );
}

export default editProfile;