import React from "react";
import { Link } from "react-router-dom"
import './style.css';
import history from '../../history';

class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    redir = ( path ) => {
        if (path) {
            history.push(path);
        }
    }

    logout = () => {
        // Logout procedure here
        // Logout function through auth
    }

    render() {
        return (
            <div class="header-block">
                <div class="top-header">
                    <img class="logo" src="https://www.melbourne-corporate-apartments.com.au/wp-content/uploads/2020/04/google-logo-google-account-g-suite-google-images-google-search-png-favpng-rTnjE5rGaBuktNMbihGdPMTjT-300x300.jpg" alt="logo" />
                </div>
                    <div class="header-contents">
                        <Link to="/home" class="header-link">Home</Link>
                        <Link to="/editProfile" class="header-link">Edit Profile</Link>
                        <a href="/home" class="header-link">Logout</a> {/* TEMP href */}
                    </div>
            </div>
        );
    }
}

export default Header;