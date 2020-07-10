import React from 'react';

import { cleanSearchParams } from '../utiltity/main';
import { AlbumIndex, NoSuchAvailable, ArtistIndex } from '../indexPage/IndexUtility';
import { SmallGenre } from '../albumPage/Explore';

import musicAppStore from '../../Stores/MusicAppStore';

import '../css/artist.css';


function SingleArtist (props) {
    /* 
        Single artist
    */
   const rawAlbums = musicAppStore.filterAlbums({artist: props.name}).albums;
   const rawGenres = musicAppStore.filterGenres({artist: props.name});
   const albums = rawAlbums.length > 0? rawAlbums.map((album, index) => <AlbumIndex key={index} {...album} />): <NoSuchAvailable lack={'albums'} />;
   const genres = rawGenres.length > 0? rawGenres.map((genre, index) => <SmallGenre key={index} {...genre} />): <NoSuchAvailable lack={'genres'} />;

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
                    <h3>{rawAlbums.length} albums by {props.name}</h3>
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
            <h1 className="text-center">{props.title}</h1>

            <div className="row">
                {artists}
            </div>
        </div>
    )
}


export default class Artist extends React.Component {
    state = {
        artists: musicAppStore.fetchArtists()
    };

    render () {
        const search = cleanSearchParams(this.props.location.search);
        let display;

        if (search) {
            if (search.artistName !== undefined) {
                display = <SingleArtist {...musicAppStore.getArtist(search.artistName)} />;
            } else {
                let title = `Artists filtered by ${Object.values(search).join(' and ')}`;
                display = <MultipleArtists title={title} artists={musicAppStore.filterArtists(search)} />;
            };
        } else {
            let title = `Artists to checkout`;
            display = <MultipleArtists title={title} artists={musicAppStore.filterArtists(search)} />;
        };

        return (
            <div>
                {display}
            </div>
        );
    };
};

