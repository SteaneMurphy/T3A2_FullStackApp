//modules
import React from "react";
import { Link } from "react-router-dom";
import Logo from "./assets/newLogo.png";

const NavBar = () => 
{
    return (
        <>
            <nav className="navbar" class="custom-navbar" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    <div class="navbar-logo">
                        <img src={Logo}></img>
                    </div>
                    <div id="navbarBasicExample" className="navbar-menu">
                        <div className="navbar-start">
                            <p className="navbar-item">|</p>
                            <Link className="navbar-item custom-link" to="/trips">My Itineraries</Link>
                            <p className="navbar-item">|</p>
                            <Link id="newEntry" className="navbar-item custom-link" to="/create">New Itinerary</Link>
                            <p className="navbar-item">|</p>
                            <Link id="newEntry" className="navbar-item custom-link" to="#">My Account</Link>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
};

export default NavBar;