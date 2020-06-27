import React from 'react';

import { cleanSearchParams } from '../utiltity/main';
import { AlbumIndex, NoSuchAvailable, ArtistIndex } from '../indexPage/IndexUtility';
import { SmallGenre } from '../albumPage/Explore';

import '../css/artist.css';


function SingleArtist (props) {
    /* 
        Single artist
    */
    const albums = props.albums.length > 0? props.albums.map((album, index) => <AlbumIndex key={index} {...album} />): <NoSuchAvailable lack={'albums'} />;
    const genres = props.genres.length > 0? props.genres.map((genre, index) => <SmallGenre key={index} {...genre} />): <NoSuchAvailable lack={'genres'} />;

    return (
        <div id="artist-main">
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <img src={props.avi} alt={`${props.name}'s avi`} id="artist-image" />
                    </div>

                    <div className="col-md-6">
                        <h1>{props.name}</h1>
                        <ul className="artist-info">
                            <li>from {props.country}</li>
                            <li>born {props.dob}</li>
                        </ul>
                        <div id="genres">
                            <h3>genres</h3>
                            <div className="row genre">
                                {genres}
                            </div>
                        </div>

                    </div>
                </div>

                <div id="a-albums">
                    <h3>{props.albums.length} albums by {props.name}</h3>
                    <div className="a-album">
                        <div className="row">
                            {albums}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


function MultipleArtists (props) {
    const artists = props.artists.length > 0? props.artists.map((artist, index) => <ArtistIndex key={index} {...artist} />): <NoSuchAvailable lack={'artist'} />;

    return (
        <div>
            <h1>{props.title}</h1>

            <div className="row">
                {artists}
            </div>
        </div>
    )
}


export default class Artist extends React.Component {
    state = {
        artist: {
            name: 'Rihanna',
            artistSlug: 'rihanna-1',
            avi: 'http://127.0.0.1:8000/media/artists/Screenshot_20170616-135311.png',
            country: 'Barbados',
            dob: 'January 15, 1980',
            albums: [
                {
                    title: 'Anti',
                    year: 2016,
                    artist: 'Rihanna',
                    artistSlug: 'rihanna-1',
                    albumSlug: 'anti',
                    albumCover: 'http://127.0.0.1:8000/media/album_covers/65f6cde8ee53c7ba39d6ce738094ea53.jpg'
                },
                {
                    title: 'Loud',
                    year: 2010,
                    artist: 'Rihanna',
                    artistSlug: 'rihanna-1',
                    albumSlug: 'loud',
                    albumCover: 'http://127.0.0.1:8000/media/defaults/album_cover.png'
                },
            ],
            genres: [
                {
                    genre: 'Reggea',
                    genreSlug: 'reggea',
                    cover: 'http://127.0.0.1:8000/media/defaults/genre.png'
                },
                {
                    genre: 'R&B',
                    genreSlug: 'rhythms-and-blues',
                    cover: 'http://127.0.0.1:8000/media/defaults/genre.png'
                },
                {
                    genre: 'Soul',
                    genreSlug: 'soul',
                    cover: 'http://127.0.0.1:8000/media/defaults/genre.png'
                },
            ]
            
        },

        artists: [
            {
                name: 'Rihanna',
                avi: 'http://127.0.0.1:8000/media/artists/Screenshot_20170616-135311.png',
                artistSlug: 'rihanna-1'
            },
            {
                name: 'Lil Wayne',
                avi: 'http://127.0.0.1:8000/media/defaults/artist.png',
                artistSlug: 'lil-wayne-2'
            },
            {
                name: 'Post Malone',
                avi: 'http://127.0.0.1:8000/media/defaults/artist.png',
                artistSlug: 'post-malone-3'
            },
        ]
    }

    getArtist (artistSlug) {
        // in the future this shall search for an artist
        return this.state.artist;
    }

    filterArtists (query) {
        // this will do more in future!
        return [...this.state.artists];
    }

    render () {
        const search = cleanSearchParams(this.props.location.search);
        let display;

        if (search) {
            if (Object.keys(search).includes('artistName')) {
                display = <SingleArtist {...this.getArtist(search.artistName)} />;
            } else {
                let title = `Artists filtered by ${Object.values(search).join(' and ')}`;
                display = <MultipleArtists title={title} artists={this.filterArtists(search)} />;
            };
        } else {
            let title = `Artists to checkout`;
            display = <MultipleArtists title={title} artists={this.filterArtists(search)} />;
        };

        return (
            <div>
                {display}
            </div>
        );
    };
};

