import React from 'react';
import { NavLink } from 'react-router-dom';

import { AlbumIndex, ArtistIndex } from '../indexPage/IndexUtility';


import '../css/explore_albums.css';



function Category (props) {
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



function SmallGenre (props) {
    /* 
        small rounded border genre
    */
    return <NavLink className="small-genre-link" to={`/genres?genreName=${props.genreSlug}`}>{props.genre}</NavLink>
}



export default class Explore extends React.Component {
    componentDidMount () {
        // hide the top search bar
        document.getElementById('top-search-bar').style.display = 'none';
    };

    componentWillUnmount () {
        // show the top search bar
        document.getElementById('top-search-bar').style.display = '';
    }

    render () {
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
                        {/* {smallGenres} */}
                    </div>
                </div>

                <hr />
                {/* {categories} */}

            </div>
        )
    };
};
