import React from 'react';
import { NavLink } from 'react-router-dom';

import { cleanSearchParams } from '../utiltity/main';

import { AlbumIndex, NoSuchAvailable, ArtistIndex, GenreIndex } from '../indexPage/IndexUtility';
import Explore from './Explore';

import '../css/album.css';



function Song (props) {
    /* 
        song bar on the single album page
    */
    return (
        <div className="song">
            <span className="song-name"><span className="song-name-name">{props.name}</span></span>
            <span className="song-play-button">
                <img className="play-btn-song" src="http://127.0.0.1:8000/static/svg/play_arrow.svg" alt="play button"/>
            </span>
            <span className="song-genre">
                <NavLink to={`/genres?genreName=${props.genreSlug}`}>{props.genre}</NavLink>
            </span>
            <span className="song-length">{props.length}</span>
        </div>
    )
}


function SingleAlbum (props) {
    /* 
        When a single album is to be displayed
    */
    const songs = props.songs.length > 0? props.songs.map((song, index) => <Song key={index} {...song} />): <NoSuchAvailable lack={"songs"} />;

    return (
        <div className="container">
            <h2 id="top-heading" className="text-center">{props.title} ({props.year}) by <NavLink to={`/artists/?name=${props.artistSlug}`}>{props.artist}</NavLink></h2>

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
        features.push(<ArtistIndex {...props.artist} />);
    };

    if (props.genre) {
        features.push(<GenreIndex {...props.genre} />);
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
    /* 
        Filter albums by artist, genre, year, etc.
    */
    state = {
        albums: [
            {
                title: 'Loud',
                year: 2010,
                artist: 'Rihanna',
                artistSlug: 'rihanna-1',
                albumSlug: 'loud',
                genre: 'R&B',
                genreSlug: 'rythms-and-blue',
                albumCover: 'http://127.0.0.1:8000/media/defaults/album_cover.png'
            },
            {
                title: 'The Carter V',
                year: 2018,
                artist: 'Lil Wayne',
                artistSlug: 'lil-wayne-2',
                albumSlug: 'the-carter-iv',
                genre: 'Hip hop',
                genreSlug: 'hip-hop',
                albumCover: 'http://127.0.0.1:8000/media/album_covers/the_carter_iv.png'
            },
            {
                title: 'Pink Print',
                year: 2015,
                artist: 'Nicki Minaj',
                artistSlug: 'nicki-minaj-4',
                albumSlug: 'pink-print',
                genre: 'Hip Hop',
                genreSlug: 'hip-hop',
                albumCover: 'http://127.0.0.1:8000/media/defaults/album_cover.png'
            },
            {
                title: 'Anti',
                year: 2016,
                artist: 'Rihanna',
                artistSlug: 'rihanna-1',
                albumSlug: 'anti',
                genre: 'Dancehall',
                genreSlug: 'dancehall',
                albumCover: 'http://127.0.0.1:8000/media/album_covers/65f6cde8ee53c7ba39d6ce738094ea53.jpg'
            },
        ],
    };

    getAdditionalAlbumInfo (album) {
        /* 
            This shall be used to retireve album info from the back-end!
        */
        let result = {
            songs: [],
            released: '',
            description: '',
            
        }
        // TODO:: add procedure to fetch additional album info including songs
        return result;
    };


    filterAlbums (obj) {
        /* 
            filter albums by 
            a. genre -> genre: 'name'
            b. artist -> artist: 'name'
            c. year -> before? after? year?: year
        */
        let albums = [];

        // TODO:: filter albums frontend? back-end?

        return {
            albums,
            artist: null,
            genre: null
        };
    };
    
    render () {
        const search = cleanSearchParams(this.props.location.search);
        let display;


        // used to map albums to <AlbumIndex /> component
        const mapAlbumsToIndex = (albums) => {
            return albums.length > 0? albums.map((album, index) => <AlbumIndex key={index} {...album}/>): <NoSuchAvailable lack={"albums"} />;
        }

        if (search) {
            if (Object.keys(search).includes('title')) {
                // if the query is a title search the return a single album page
                let title = search['title'];
                let album = this.state.albums.find((album) => album.albumSlug === title || album.title.toLowerCase().includes(title));           
    
                if (album !== undefined) {
                    // if the album does not exist in our catalogue, we may want to search the back-end 
                    // but for now we will return an index of albums
                    display = <SingleAlbum {...album} {...this.getAdditionalAlbumInfo(album.albumSlug)}/>
                } else {
                    // this will at one time look for the album in the back-end
                    let albums = mapAlbumsToIndex(this.state.albums)
                    display = <FilteredAlbums albums={albums} filterheading={'not found'}/>;
                };
    
            } else {
                // if 'title' was not in the search then we'll filter using the user's filters
                const { albums, artist, genre } = this.filterAlbums(search);
                const filterheading = `filtered by ${Object.keys(search).map((key) => search[key]).join(' and ')}`
                display = <FilteredAlbums albums={mapAlbumsToIndex(albums)} {...{artist, genre, filterheading}} />;
            };
        } else {
            // This shall give a page to browse albums
            display = <Explore />
        };
        
        return (
            <div id="albums-main" className="container-fluid">
                {display}
            </div>
        );
    };
};

