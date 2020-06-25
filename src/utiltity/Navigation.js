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
                    <NavLink className="nav-link" to='/albums/'>Albums</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" to='/artists/'>Artists</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" to='/genres/'>Genres</NavLink>
                </li>
            </ul>
        </div>
    );
};