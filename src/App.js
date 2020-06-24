import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import HomePage from './indexPage/Home';
import Album from './albumPage/Albums';
import Artist from './artistPage/Artist';
import Genre from './genrePage/Genre';


export default function App() {
    return (
        <BrowserRouter>
            <div>
                <Route path="/" exact component={HomePage} />
                <Route path="/albums/" exact component={Album} />
                <Route path="/artists/" exact component={Artist} />
                <Route path="/genre/" exact component={Genre} />
            </div>
        </BrowserRouter>
    )
}