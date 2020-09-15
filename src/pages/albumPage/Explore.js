import React from 'react';
import { NavLink } from 'react-router-dom';

import { AlbumIndex, ArtistIndex, NoSuchAvailable } from '../indexPage/IndexUtility';
import { caseChanger, cases } from '../utiltity/main';
import musicAppStore from '../../Stores/MusicAppStore';
import changes from '../../Stores/Changes';

import '../css/explore_albums.css';



export function Category (props) {
    // if the category is of albums, show albums
    let displayItems;

    if (props.albumCategory) {
        displayItems = props.items.map((album, index) => <AlbumIndex key={index} {...album}  />);
    } else {
        displayItems = props.items.map((artist, index) => <ArtistIndex key={index} {...artist} />);
    };

    return (
        <div className="explore-category">
            <div className="category-heading">
                <img src={props.categoryAvi} alt={`${props.categoryName}`} />
                <h2>
                    {props.categoryName} <br />
                    <small>{props.categoryDescription}</small>
                </h2>
            </div>

            <div className="row">
                {displayItems}
            </div>
            <hr />
        </div>
    )
}


export function SmallGenre (props) {
    /* 
        small rounded border genre
    */
    return <NavLink className="small-genre-link" to={`/albums?genre=${props.genreSlug}`}>{props.genreName}</NavLink>
}


export default class Explore extends React.Component {
    state = {
        genres: musicAppStore.fetchGenres(5, 'explore'),
        albumCategories: musicAppStore.categories.albumCategories
    };

    constructor () {
        super();
        this.getExploreData = this.exploreData.bind(this);
    };

    exploreData () {
        this.setState({
            genres: musicAppStore.fetchGenres(5),
            albumCategories: musicAppStore.categories.albumCategories
        });
    };

    componentDidMount () {
        // hide the top search bar
        document.getElementById('top-search-bar').style.display = 'none';
        musicAppStore.on(changes.CHANGE_IN_ALL_DATA, this.getExploreData);
    };

    componentWillUnmount () {
        // show the top search bar
        document.getElementById('top-search-bar').style.display = '';
        musicAppStore.removeListener(changes.CHANGE_IN_ALL_DATA, this.getExploreData);
    };

    render () {
        // small genres
        const smallGenres = this.state.genres.length > 0? this.state.genres.map((genre, index) => {
            return <SmallGenre key={index} {...genre} />
        }): <NoSuchAvailable lack={'genres'} />;

        // album categories
        // const categories = Object.keys(this.state.albumCategories).map((key, index) => {
        //     const value = this.state.albumCategories[key];
        //     // change to appropriate notation
        //     const name = caseChanger(key, cases.HUNGARIAN_NOTATION, cases.NORMAL_CASE);

        //     return <Category key={index} categoryName={name} {...value} />
        // })

        const categories = this.state.albumCategories.map((category, index) => <Category key={index} {...category} />)

        return (
            <div className="container">
                <h2 className="text-center">Explore Albums</h2>

                <div id="search-albums">
                    <form>
                        <div className="form-group">
                            <input id="search-form" type="text" className="form-control" placeholder="search for albums, artists or genres" autoFocus/>
                        </div>                           
                        <span className="input-group-btn">
                            <button id="search-button" type="button" className="btn btn-default">search</button>
                        </span>
                    </form>
                </div>

                <hr />

                <div className="explorer-genres">
                    <h2>by Genres</h2>
                    <div className="row">
                        {smallGenres}
                    </div>
                </div>

                <hr />
                {categories}

            </div>
        )
    };
};
