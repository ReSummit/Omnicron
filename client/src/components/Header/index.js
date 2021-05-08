import React from "react";
import { BrowserRouter as Route } from "react-router-dom"
import './style.css';

class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div class="header-block">
                <img class="logo" src="https://www.melbourne-corporate-apartments.com.au/wp-content/uploads/2020/04/google-logo-google-account-g-suite-google-images-google-search-png-favpng-rTnjE5rGaBuktNMbihGdPMTjT-300x300.jpg" />
                <div class="header-contents">
                    <div class="header-link">Hello1</div>
                    <div class="header-link">Hello2</div>
                    <div class="header-link">Hello3</div>
                </div>
            </div>
        );
    }
}

export default Header;