import React from "react";

import { Link } from "react-router-dom"
import './style.css';
import BrowserHistory from '../../history.js';
export default class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    redir = ( path ) => {
        if (path) {
            BrowserHistory.push(path);
        }
    }

    logout = () => {
        // Logout procedure here
        // Logout function through auth
    }
    state = { redirect: null };
    render() {
        return (
            <div className="header-block">
                <div className="top-header">
                    <img className="logo" src="https://www.melbourne-corporate-apartments.com.au/wp-content/uploads/2020/04/google-logo-google-account-g-suite-google-images-google-search-png-favpng-rTnjE5rGaBuktNMbihGdPMTjT-300x300.jpg" alt="logo" />
                </div>
                    <div className="header-contents">
                        <Link to="/home" className="header-link">Home</Link>
                        <Link to="/editProfile" className="header-link">Edit Profile</Link>
                        {/* <Link to="/edit" className="header-link">Edit</Link> */}
                        <a href="/home" className="header-link">Logout</a> {/* TEMP href */}
                    </div>
            </div>
        );
    }
}

