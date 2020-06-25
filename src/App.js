import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import HomePage from './indexPage/Home';
import Album from './albumPage/Albums';
import Artist from './artistPage/Artist';
import Genre from './genrePage/Genre';
import Error404 from './utiltity/Error404';
import MusicNavigation from './utiltity/Navigation';


export default function App() {
    return (
        <BrowserRouter>
            <div className="container-fluid">
                <MusicNavigation />
                <Switch>
                    <Route path="/" exact component={HomePage} />
                    <Route path="/albums/" exact component={Album} />
                    <Route path="/artists/" exact component={Artist} />
                    <Route path="/genres/" exact component={Genre} />
                    <Route component={Error404} />
                </Switch>
            </div>
        </BrowserRouter>
    );
};