import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import HomePage from './pages/indexPage/Home';
import Album from './pages/albumPage/Albums';
import Artist from './pages/artistPage/Artist';
import Genre from './pages/genrePage/Genre';
import Error404 from './pages/utiltity/Error404';
import MusicNavigation from './pages/utiltity/Navigation';
import { fetchHomeData } from './actions/MusicActions';


export default function App() {
    // fetch home data
    useEffect(fetchHomeData);

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