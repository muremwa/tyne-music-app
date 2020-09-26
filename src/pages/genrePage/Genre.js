import React, { useEffect, useState } from 'react';

import { cleanSearchParams } from '../utiltity/main';
import { Category } from '../albumPage/Explore';
import { GenreIndex, NoSuchAvailable } from '../indexPage/IndexUtility';
import { fetchHomeData, fetchGenre, fetchGenreCategories } from '../../actions/MusicActions';
import Error404 from '../utiltity/Error404';
import musicAppStore from '../../Stores/MusicAppStore';
import changes from '../../Stores/Changes';

import '../css/genre.css';



function ListGenres (props) {
    if (musicAppStore.initHomeData) {
        fetchHomeData();
    };

    const fetchGenres = (filter) => filter? musicAppStore.filterGenres(filter): musicAppStore.fetchGenres();

    const [ rawGenres, newRawGenres ] = useState(fetchGenres(props.filter));

    // map genres to their props
    const genres = rawGenres.length > 0? rawGenres.map((genre, index) => <GenreIndex key={index} {...genre} />): <NoSuchAvailable lack={"genres"} />

    // function to update genres
    const updateRawGenres = () => newRawGenres(fetchGenres(props.filter));

    // when changes are made to the store, rerender
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


function GenreCategories (props) {
    const [categories, categoriesChanger] = useState(musicAppStore.filterGenreCategories(props.genreSlug));
    const setCategories = () => categoriesChanger(musicAppStore.filterGenreCategories(props.genreSlug));
    
    if (!categories.length) {
        fetchGenreCategories(props.genreSlug);
    };

    const categoriesFetched = `FETCHED_GENRE_CATEGORIES_FOR_${props.genreSlug}`;

    useEffect(() => {
        if (!categories.length) {
            musicAppStore.on(categoriesFetched, setCategories)
        };

        return () => musicAppStore.removeListener(categoriesFetched, setCategories);
    })

    const mappedCategories = categories.length? categories.map((category, index) => <Category key={index} {...category} />): <NoSuchAvailable lack={'categories'} />;

    return (
        <div id="genre-categories" className="container">
            {mappedCategories}
        </div>
    );
};


function SingleGenre (props) {
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
            <GenreCategories genreSlug={props.genreSlug} />
        </div>
    );
};


function IndividualGenre (props) {
    const [genre, changeGenre] = useState(musicAppStore.getGenre(props.genreSlug));
    const change = `FETCHED_GENRE_${props.genreSlug.toUpperCase()}`;
    const setGenre = () => changeGenre(musicAppStore.getGenre(props.genreSlug));
    let display = <Error404 message={`Could not find the genre '${props.genreSlug}'`} />;

    if (genre) {
        display = <SingleGenre {...genre} />;
    } else {
        fetchGenre(props.genreSlug);
    };

    useEffect(() => {
        if (!genre) {
            musicAppStore.on(change, setGenre);
        };

        return () => musicAppStore.removeListener(change, setGenre);
    })

    return display;
};


export default class Genre extends React.Component {
    render () {
        const search = cleanSearchParams(this.props.location.search);
        let display;
        
        if (search) {
            if (search.genreName !== undefined) {
                display = <IndividualGenre genreSlug={search.genreName} />
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