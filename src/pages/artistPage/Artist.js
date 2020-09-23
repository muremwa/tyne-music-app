import React, { useEffect, useState } from 'react';

import { cleanSearchParams } from '../utiltity/main';
import { AlbumIndex, NoSuchAvailable, ArtistIndex } from '../indexPage/IndexUtility';
import { SmallGenre } from '../albumPage/Explore';
import { fetchHomeData, fetchArtist } from '../../actions/MusicActions';
import changes from '../../Stores/Changes';
import musicAppStore from '../../Stores/MusicAppStore';
import Error404 from '../utiltity/Error404';


import '../css/artist.css';


function SingleArtistAlbums (props) {
    const rawAlbums = musicAppStore.filterAlbums({artist: props.artistSlug}).albums;
    const albums = rawAlbums.length > 0? rawAlbums.map((album, index) => <AlbumIndex key={index} {...album} />): <NoSuchAvailable lack={'albums'} />;

    return (
        <div id="a-albums">
            <h3>{rawAlbums.length} albums by {props.name}</h3>
            <div className="a-album">
                <div className="row">
                    {albums}
                </div>
            </div>
        </div>
    );
};



function SingleArtist (props) {
    /* 
        Single artist
    */
   const rawGenres = musicAppStore.filterGenres({artist: props.name});
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
                <SingleArtistAlbums artistSlug={props.artistSlug} name={props.name}/>
            </div>
        </div>
    );
};


function IndividualArtist (props) {
    /* 
        Single artist
    */

    musicAppStore.initHomeData = false;
    const _artist = musicAppStore.getArtist(props.artistSlug);
    const [artist, artistChanger] = useState(_artist);
    
    useEffect(() => {
        if (!artist) {
            musicAppStore.on(`FETCHED_ARTIST_${props.artistSlug.toUpperCase()}`, () => {
                artistChanger(musicAppStore.getArtist(props.artistSlug));
            });
        };
    });

    let display = <Error404 message={`Could not find the artist '${props.artistSlug}'.`} />;

    if (artist) {
        display = <SingleArtist {...artist} />;
    } else {
        fetchArtist(props.artistSlug);
    };
    musicAppStore.initHomeData = true;
    return display;
};


function MultipleArtists (props) {
    /* 
        Display many artists
    */
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
        artists: musicAppStore.fetchArtists(),
    };

    constructor () {
        super();
        this.getArtists = this.getArtists.bind(this);
    };

    getArtists () {
        this.setState({
            artists: musicAppStore.fetchArtists()  
        });
    };

    componentDidMount () {
        if (musicAppStore.initHomeData) {
            musicAppStore.on(changes.CHANGE_IN_ALL_DATA, this.getArtists);
        }
    };

    componentWillUnmount () {
        musicAppStore.removeListener(changes.CHANGE_IN_ALL_DATA, this.getArtists);
    };

    homeDataStatus (status) {
        this.setState({homeData: status});
    };

    render () {
        const search = cleanSearchParams(this.props.location.search);
        let display;
        let homeData = true;

        if (search) {
            if (search.artistName !== undefined) {
                homeData = false;
                display = <IndividualArtist artistSlug={search.artistName} />;
            } else {
                let title = `Artists filtered by ${Object.values(search).join(' and ')}`;
                display = <MultipleArtists title={title} artists={musicAppStore.filterArtists(search)} />;
            };
        } else {
            let title = `Artists to checkout`;
            display = <MultipleArtists title={title} artists={musicAppStore.filterArtists(search)} />;
        };

        if (musicAppStore.initHomeData && homeData) {
            fetchHomeData();
        };

        return (
            <div>
                {display}
            </div>
        );
    };
};

