import React from 'react';
import { NavLink } from "react-router-dom";


export default function MusicNavigation () {
    return (        
        <div id="music-navigation" className="navbar">
            <ul className="nav navbar-nav">
                <li className="active nav-item">
                    <NavLink className="nav-link" to='/'>all music</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" to='/albums/'>albums</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" to='/artists/'>artists</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" to='/genres/'>genres</NavLink>
                </li>
            </ul>
        </div>
    );
};