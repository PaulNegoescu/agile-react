import React from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';

export default function Navbar() {
    
    return (
        <nav className="navbar navbar-dark navbar-expand bg-dark">
            <Link className="navbar-brand" to="/">Agile Hub App</Link>

            <div className="collapse navbar-collapse">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <SrNavLink className="nav-link" exact to="/">Home</SrNavLink>
                    </li>
                    <li className="nav-item">
                        <SrNavLink className="nav-link" to="/games">Games</SrNavLink>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

function SrNavLink({ children, ...rest}) {
    const location = useLocation();

    return (
        <NavLink {...rest}>
            { children }
            { location.pathname === rest.to && <span className="sr-only">(current)</span> }
        </NavLink>
    );
}
