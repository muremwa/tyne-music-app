import React, { useEffect, useState } from 'react';

import { cleanSearchParams, caseChanger } from '../utiltity/main';
import { Category } from '../albumPage/Explore';
import { GenreIndex, NoSuchAvailable } from '../indexPage/IndexUtility';

import musicAppStore from '../../Stores/MusicAppStore';
import '../css/genre.css';
import changes from '../../Stores/Changes';



function ListGenres (props) {
    const fetchGenres = (filter) => {
        let raw
        if (filter) {
            raw = musicAppStore.filterGenres(filter);
        } else {
            raw = musicAppStore.fetchGenres();
        };
        return raw;
    };

    const [ rawGenres, newRawGenres ] = useState(fetchGenres(props.filter));

    // map genres to their props
    const genres = rawGenres.length > 0? rawGenres.map((genre, index) => <GenreIndex key={index} {...genre} />): <NoSuchAvailable lack={"genres"} />

    // function to update genres
    const updateRawGenres = () => newRawGenres(fetchGenres(props.filter));

    useEffect(() => {
        musicAppStore.on(changes.CHANGE_IN_ALL_DATA, updateRawGenres)

        return () => {
            musicAppStore.removeListener(changes.CHANGE_IN_ALL_DATA, updateRawGenres)
        };
    });

    return (
        <div>
            <h1 className="text-center">Explore genres</h1>
            <div className="row">
                {genres}
            </div>
        </div>
    );
};


function SingleGenre (props) {
    const categories = props.categories !== undefined? Object.keys(props.categories).map((key, index) => {
        let value = props.categories[key];
        let forAlbum = true;
        key = caseChanger(key, 'HN', 'NR');

        if (key.includes('artist')) {
            forAlbum = false;
        };

        return <Category key={index} categoryName={key} {...value} albumCategory={forAlbum} />;
    }): [];


    return (
        <div className="genre-main">
            <div id="genre-info">
                <div>
                    <img alt={`cover for ${props.genreName}`} src={props.cover}/>
                </div>
                <div className="spacer-2"></div>
                <div id="more-genre-info">
                    <h1>{props.genreName}</h1>
                    <p>{props.genreDescription}</p>
                    <div id="genre-shuffle" title={`Shuffle ${props.genreName}`}>
                        <img alt="shuffle genre" src="http://127.0.0.1:8000/static/svg/shuffle.svg" />
                    </div>
                </div>
            </div>
            <hr className="massive-divider" />
            <div id="genre-categories" className="container">
                {categories}
            </div>
        </div>
    )


}


export default class Genre extends React.Component {
    render () {
        const search = cleanSearchParams(this.props.location.search);
        let display;
        
        if (search) {
            if (search.genreName !== undefined) {
                const genre = musicAppStore.getGenre(search.genreName);
                display = <SingleGenre {...genre} />
            } else {
                display = <ListGenres filter={search} />;
            };
        } else {
            display = <ListGenres />;
        };

        return (
            <div>
                {display}
            </div>
        );
    };
};

