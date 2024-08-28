//modules
import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => 
{
    return (
        <>
            <nav className="navbar is-dark" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    <Link className="navbar-item" to="/">
                        <h1>Travel Mate</h1>
                    </Link>
                    <Link role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </Link>
                </div>
                <div id="navbarBasicExample" className="navbar-menu">
                    <div className="navbar-start">
                        <Link className="navbar-item" to="/trips">
                            Home
                        </Link>
                        <Link id="newEntry" className="navbar-item" to="/create">
                            Create New
                        </Link>
                    </div>
                </div>
            </nav>
        </>
    )
};

export default NavBar;