import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

import { cleanSearchParams } from '../utiltity/main';
import { AlbumIndex, NoSuchAvailable, ArtistIndex, GenreIndex } from '../indexPage/IndexUtility';
import Error404 from '../utiltity/Error404';
import musicAppStore from '../../Stores/MusicAppStore';
import Explore from './Explore';
import { fetchAlbumSongs } from '../../actions/MusicActions';

import '../css/album.css';



function Song (props) {
    /* 
        song bar on the single album page
    */
    return (
        <div className="song">
            <span className="song-name"><span className="song-name-name">{props.title}</span></span>
            <span className="song-play-button">
                <img className="play-btn-song" src="http://127.0.0.1:8000/static/svg/play_arrow.svg" alt="play button"/>
            </span>
            <span className="song-genre">
                <NavLink to={`/genres?genreName=${props.genre.genreSlug}`}>{props.genre.genreName}</NavLink>
            </span>
            <span className="song-length">{props.length}</span>
        </div>
    )
}


function SingleAlbum (props) {
    /* 
        When a single album is to be displayed
    */

    const [songsLoaded, loadedChanger] = useState(false);

    if (typeof props.songs === 'string' && songsLoaded === false) {
        loadedChanger(true);
        fetchAlbumSongs(props.albumSlug, props.songs);
    }

    const songsChange = `CHANGE_IN_${props.albumSlug.toUpperCase()}_SONGS`;
    const initSongs = Array.isArray(props.songs)? props.songs: [];
    const [albumSongs, songsChanger] = useState(initSongs);

    const changeSongs = () => {
        songsChanger(musicAppStore.getSongs(props.albumSlug));
    };

    useEffect(() => {
        musicAppStore.on(songsChange, changeSongs);

        return () => {
            musicAppStore.removeListener(songsChange, changeSongs)
        };
    });

    const songs = albumSongs.length > 0? albumSongs.map((song, index) => <Song key={index} {...song} />): <NoSuchAvailable lack={"songs"} />;

    return (
        <div className="container">
            <h2 id="top-heading" className="text-center">{props.title} ({props.year}) by <NavLink to={`/artists/?artistName=${props.artistSlug}`}>{props.artist}</NavLink></h2>

            <div className="row">

                <div id="album-info" className="col-md-5">
                    <img id="cover-image" src={props.albumCover} alt="cover for #" />

                    <ul id="more-info">
                        <li>Released {props.released}</li>
                        <li>{props.songs.length} songs on the the album</li>
                        <hr />
                        <li>More info<br />{props.description}</li>
                    </ul> 
                </div>

                <div id="songs" className="col-md-7">
                    <h3 className="text-center">all songs</h3>
                    {songs}
                </div>
            </div>
        </div>
    );
};


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

        if (search) {
            if (search.albumSlug !== undefined) {
                const album = musicAppStore.getAlbum(search.albumSlug);

                if (album) {
                    // if the album is found (however it's found is none of this component's business) Show it
                    display = <SingleAlbum {...album} />;
                } else {
                    // show a 404 page error
                    display = <Error404 message={`The album your requested '${search.albumSlug}' could not be found`} />;
                }
    
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
        
        return (
            <div id="albums-main" className="container-fluid">
                {display}
            </div>
        );
    };
};

