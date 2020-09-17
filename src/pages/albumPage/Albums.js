import React from 'react';


import { cleanSearchParams } from '../utiltity/main';
import { AlbumIndex, NoSuchAvailable, ArtistIndex, GenreIndex } from '../indexPage/IndexUtility';
import musicAppStore from '../../Stores/MusicAppStore';
import Explore from './Explore';
import SingleAlbum from './SingleAlbum';

import '../css/album.css';
import { fetchHomeData } from '../../actions/MusicActions';


function SpecialSearchFeatures (props) {
    /* 
        Appears on the side as special features of a search eg artist, genre
    */
    let features = [];

    if (props.artist) {
        features.push(<ArtistIndex key={1} {...props.artist} />);
    };

    if (props.genre) {
        features.push(<GenreIndex key={2} {...props.genre} />);
    };

    if (features.length === 0) {
        return null;
    } else {
        return (
            <div>
                <h2 className="text-center">Search highlights</h2>
                <div>
                    {features}
                </div>
            </div>
        );
    };
};


function FilteredAlbums(props) {
    /* 
        Filtered albums displayed
    */
    return (
        <div>
            <h2 className="text-center">Albums {props.filterheading}</h2>
            <div id="filtered-albums">
                <div id="filtered-albums-row">
                    <div className="row">
                        {props.albums}
                    </div>
                </div>
                <SpecialSearchFeatures artist={props.artist} genre={props.genre} />
            </div>
        </div>
    )
}



export default class Album extends React.Component {   
    render () {
        const search = cleanSearchParams(this.props.location.search);
        let display;


        // used to map albums to <AlbumIndex /> component
        const mapAlbumsToIndex = (albums) => {
            return albums.length > 0? albums.map((album, index) => <AlbumIndex key={index} {...album}/>): <NoSuchAvailable lack={"albums"} />;
        }

        let getHomeData = true;

        if (search) {
            if (search.albumSlug !== undefined) {
                getHomeData = false;
                display = <SingleAlbum albumSlug={search.albumSlug} />;    
            } else {
                // if 'title' was not in the search then we'll filter using the user's filters
                const { albums, artist, genre } = musicAppStore.filterAlbums(search);
                const filterheading = `filtered by ${Object.keys(search).map((key) => search[key]).join(' and ')}`
                display = <FilteredAlbums albums={mapAlbumsToIndex(albums)} {...{artist, genre, filterheading}} />;
            };
        } else {
            // This shall give a page to browse albums
            display = <Explore />;
        };

        if (getHomeData && musicAppStore.initHomeData) {
            fetchHomeData();
        };
        
        return (
            <div id="albums-main" className="container-fluid">
                {display}
            </div>
        );
    };
};

