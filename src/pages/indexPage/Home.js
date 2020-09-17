import React from 'react';

import { AlbumIndex, ArtistIndex, GenreIndex, NoSuchAvailable } from './IndexUtility';
import changes from '../../Stores/Changes';
import musicAppStore from '../../Stores/MusicAppStore';

import '../css/index_page.css';
import { fetchHomeData } from '../../actions/MusicActions';

export default class HomePage extends React.Component {
    state = {
        albums: musicAppStore.fetchAlbums(),
        artists: musicAppStore.fetchArtists(),
        genres: musicAppStore.fetchGenres()
    };

    constructor (props) {
        super(props);
        this.getInitData = this.getInitData.bind(this);
    };

    componentDidMount () {
        if (musicAppStore.initHomeData) {
            fetchHomeData()
            musicAppStore.on(changes.CHANGE_IN_ALL_DATA, this.getInitData);
        }
    };

    componentWillUnmount () {
        musicAppStore.removeListener(changes.CHANGE_IN_ALL_DATA, this.getInitData);
    }

    getInitData () {
        this.setState({
            albums: musicAppStore.fetchAlbums(),
            genres: musicAppStore.fetchGenres(),
            artists: musicAppStore.fetchArtists()
        });
    };

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

                    <h3>explore albums</h3>

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
        );
    };
};