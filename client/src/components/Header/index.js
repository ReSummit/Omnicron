import React from "react";
import { BrowserRouter, Redirect, Link, Router } from "react-router-dom"
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
        // if ( this.state.redirect) {
        //     return(
        //     <BrowserRouter>
        //         <Redirect to={this.state.redirect} />
        //     </BrowserRouter>
        //     )
        // }
        return (
            <div class="header-block">
                <div class="top-header">
                    <img class="logo" src="https://www.melbourne-corporate-apartments.com.au/wp-content/uploads/2020/04/google-logo-google-account-g-suite-google-images-google-search-png-favpng-rTnjE5rGaBuktNMbihGdPMTjT-300x300.jpg" alt="logo" />
                </div>
                <BrowserRouter>
                    <div class="header-contents">
                        {/* <a class="header-link" onClick={() => window.history.pushState({}, "home", "/home" )}>Home</a>
                    <a class="header-link" onClick={() => window.history.pushState({}, "editProfile", "/editProfile" )}>Edit Profile</a> */}
                        {/* <a class="header-link" onClick={() => this.setState({ redirect:"/home"})}>Home</a>
                    <a class="header-link" onClick={() => this.setState({ redirect:"/editProfile" })}>Edit Profile</a> */}
                        {/* <a class="header-link" onClick={() => this.redir("/home")}>Home</a>
                    <a class="header-link" onClick={() => this.redir("/editProfile")}>Edit Profile</a> */}
                        <Link to="/home" class="header-link">Home</Link>
                        <Link to="/editProfile" class="header-link">Edit Profile</Link>
                        <a class="header-link">Logout</a>
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}

