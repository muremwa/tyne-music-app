import React from 'react';

import { cleanSearchParams, caseChanger } from '../utiltity/main';
import { Category } from '../albumPage/Explore';
import { GenreIndex, NoSuchAvailable } from '../indexPage/IndexUtility';

import musicAppStore from '../../Stores/MusicAppStore';
import '../css/genre.css';



function ListGenres (props) {
    const genres = props.items.length > 0? props.items.map((genre, index) => <GenreIndex key={index} {...genre} />): <NoSuchAvailable lack={"genres"} />

    return (
        <div>
            <h1 className="text-center">Explore genres</h1>
            <div className="row">
                {genres}
            </div>
        </div>
    )
}


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
                display = <ListGenres items={musicAppStore.filterGenres(search)} />;
            };
        } else {
            display = <ListGenres items={musicAppStore.fetchGenres()} />;
        };

        return (
            <div>
                {display}
            </div>
        );
    };
};

