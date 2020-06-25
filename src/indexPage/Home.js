import React from 'react';
import { NavLink } from 'react-router-dom';

import '../css/index_page.css'


function NoSuchAvailable (props) {
    /* 
        If none of albums or artists or genres
    */
    return (
        <div className="none-available">
            <h1>No {props.lack} available to explore</h1>
        </div>
    )
}



function AlbumIndex(props) {
    /* 
        Each album on the index page
    */
    return (
        <div className="card index-card album">
            <div className="top">
                <img className="card-img-top" alt={`Cover for ${props.title}`} src={props.albumCover}/>
            </div>
            <div className="card-body">
                <h5 className="card-title"><NavLink to={`/albums?title=${props.albumSlug}`}>{`${props.title} (${props.year})`}</NavLink></h5>
                <hr />
                <div className="card-text">
                    <div className="play-section-album-index">
                        <ul className="album-info">
                            <li><NavLink to={`/artists?name=${props.artistSlug}`}>{props.artist}</NavLink></li>
                        </ul>
                        <div className="play-par">
                            <span><img className="play-btn" src="http://127.0.0.1:8000/static/svg/play-circle.svg" alt="play-button"/></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};



function GenreIndex (props) {
    /* 
        Each genre on the index page
    */
    return (
        <div className="card index-card genre">
            <div className="top">
                <img className="card-img-top" alt={`cover for ${props.name}`} src={props.cover}/>
            </div>
            <div className="card-body">
                <h5 className="card-title"><NavLink to={`/genres?name=${props.slug}`}>{props.name}</NavLink></h5>
                <hr />
                <div className="card-text">
                    <div className="play-par">
                        <span><img className="play-btn" src="http://127.0.0.1:8000/static/svg/play-circle.svg" alt="play button"/></span>
                    </div>
                </div>
            </div>
        </div>
    );
};



function ArtistIndex (props) {
    /* 
        Each album on the index page
    */
    return (
        <div className="card index-card artist">
            <div className="top">
                <img className="card-img-top" alt={`Cover for ${props.name}`} src={props.avi}/>
            </div>
            <div className="card-body">
                <h5 className="card-title"><NavLink to={`/artists?name=${props.artistSlug}`}>{props.name}</NavLink></h5>
                <hr />
                <div className="card-text text-center">
                    <div className="play-par">
                        <span><img className="play-btn" src="http://127.0.0.1:8000/static/svg/play-circle.svg" alt="play-button" /></span>
                    </div>
                </div>
            </div>
        </div>
    );
};





export default class HomePage extends React.Component {
    state = {
        albums: [
            {
                title: 'Loud',
                year: 2010,
                artist: 'Rihanna',
                artistSlug: 'rihanna-1',
                albumSlug: 'loud',
                albumCover: 'http://127.0.0.1:8000/media/defaults/album_cover.png'
            },
            {
                title: 'The Carter V',
                year: 2018,
                artist: 'Lil Wayne',
                artistSlug: 'lil-wayne-2',
                albumSlug: 'the-carter-iv',
                albumCover: 'http://127.0.0.1:8000/media/album_covers/the_carter_iv.png'
            },
            {
                title: 'Pink Print',
                year: 2015,
                artist: 'Nicki Minaj',
                artistSlug: 'nicki-minaj-4',
                albumSlug: 'pink-print',
                albumCover: 'http://127.0.0.1:8000/media/defaults/album_cover.png'
            },
            {
                title: 'Anti',
                year: 2016,
                artist: 'Rihanna',
                artistSlug: 'rihanna-1',
                albumSlug: 'anti',
                albumCover: 'http://127.0.0.1:8000/media/album_covers/65f6cde8ee53c7ba39d6ce738094ea53.jpg'
            },
        ],
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
        ],
        genres: [
            {
                name: 'Hip hop',
                slug: 'hip-hop',
                cover: 'http://127.0.0.1:8000/media/defaults/genre.png'
            },
            {
                name: 'Reggea',
                slug: 'reggea',
                cover: 'http://127.0.0.1:8000/media/defaults/genre.png'
            },
            {
                name: 'R&B',
                slug: 'rhythms-and-blues',
                cover: 'http://127.0.0.1:8000/media/defaults/genre.png'
            },
            {
                name: 'Soul',
                slug: 'soul',
                cover: 'http://127.0.0.1:8000/media/defaults/genre.png'
            },
            {
                name: 'Rock',
                slug: 'rock',
                cover: 'http://127.0.0.1:8000/media/defaults/genre.png'
            },
        ]
    }


    render () {
        // index albums
        const albums = this.state.albums.length > 0? this.state.albums.map((album, index) => <AlbumIndex key={index} {...album}/>): <NoSuchAvailable lack={'albums'} />;
        // index genres
        const genres = this.state.genres.length > 0? this.state.genres.map((genre, index) => <GenreIndex key={index} {...genre}/>): <NoSuchAvailable lack={'genres'} />;
        // index artists
        const artists = this.state.artists.length > 0? this.state.artists.map((artist, index) => <ArtistIndex key={index} {...artist}/>): <NoSuchAvailable lack={'artists'} />;

        return (
            <div id="main" className="container-fluid">
                <section id="albums">

                    <h3>albums</h3>

                    <div id="album-index" className="row">
                        {albums}
                    </div>
                    <hr />
                </section>

                <section id="genres">
                    <h3>explore genres</h3>

                    <div className="row">
                        {genres}
                    </div>
                    <hr />
                </section>


                <section id="artists">
                    <h3>explore artists</h3>

                    <div className="row">
                        {artists}
                    </div>
                    <hr />
                </section>

            </div>
        )
    }
}