import React from 'react';
import { NavLink } from 'react-router-dom';


export function NoSuchAvailable (props) {
    /* 
        If none of albums or artists or genres
    */
    return (
        <div className="none-available">
            <h1>No {props.lack} available to explore</h1>
        </div>
    )
}



export function AlbumIndex(props) {
    /* 
        Each album on the index page
    */
    return (
        <div className="card index-card album">
            <div className="top">
                <img className="card-img-top" alt={`Cover for ${props.title}`} src={props.albumCover}/>
            </div>
            <div className="card-body">
                <h5 className="card-title"><NavLink to={`/albums?albumTitle=${props.albumSlug}`}>{`${props.title} (${props.year})`}</NavLink></h5>
                <hr />
                <div className="card-text">
                    <div className="play-section-album-index">
                        <ul className="album-info">
                            <li><NavLink to={`/artists?artistName=${props.artistSlug}`}>{props.artist}</NavLink></li>
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



export function GenreIndex (props) {
    /* 
        Each genre on the index page
    */
    return (
        <div className="card index-card genre">
            <div className="top">
                <img className="card-img-top" alt={`cover for ${props.name}`} src={props.cover}/>
            </div>
            <div className="card-body">
                <h5 className="card-title"><NavLink to={`/genres?genreName=${props.slug}`}>{props.name}</NavLink></h5>
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



export function ArtistIndex (props) {
    /* 
        Each artist on the index page
    */
    return (
        <div className="card index-card artist">
            <div className="top">
                <img className="card-img-top" alt={`Cover for ${props.name}`} src={props.avi}/>
            </div>
            <div className="card-body">
                <h5 className="card-title"><NavLink to={`/artists?artistName=${props.artistSlug}`}>{props.name}</NavLink></h5>
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