import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

import { fetchAlbumSongs } from '../../actions/MusicActions';
import { NoSuchAvailable } from '../indexPage/IndexUtility';
import Error404 from '../utiltity/Error404';
import musicAppStore from '../../Stores/MusicAppStore';


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


function IndividualSingleAlbum (props) {
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
                        <li>{albumSongs.length} songs on the the album</li>
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


export default function SingleAlbum (props) {
    const _album = musicAppStore.getAlbum(props.albumSlug);
    let display;

    const [album, albumChanger] = useState(_album);

    useEffect(() => {
        if (!album) {
            musicAppStore.on(`FETCHED_${props.albumSlug.toUpperCase()}`, () => {
                albumChanger(musicAppStore.getAlbum(props.albumSlug));
            });
        };
    });

    if (album) {
        // if the album is found (however it's found is none of this component's business) Show it
        display = <IndividualSingleAlbum {...album} />;
    } else {
        // show a 404 page error
        display = <Error404 message={`The album your requested '${props.albumSlug}' could not be found.`} />;
    }
    return display;
};