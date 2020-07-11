import { EventEmitter } from 'events';

import musicDispatcher from '../dispatcher/dispatcher';
import actions from '../actions/DispatchActions';
import changes from './Changes';
import { fetchAlbumCategories, fetchGenreCategories } from '../actions/MusicActions';


class MusicAppStore extends EventEmitter {
    albums = [];
    genres = [];
    artists = [];
    categories = {
        albumCategories: {},
        genreCategories: {}
    };

    fetchAlbums () {
        // if no albums are in store you'll have to fetch from the back-end
        return this.albums;
    };

    filterAlbums (query) {
        /* 
            filter albums from the back-end then add the ones here! maybe send those to not include? idk!
        */
        return {albums: [...this.albums], artist: null, genre: this.genres.find((genre) => genre.genreSlug === 'reggea')};
    };

    getAlbum(slug) {
        // get a specific album: if its not here in the front-end, get it from the back-end
        const album = this.albums[0];
        return album;
    };

    fetchGenres () {
        /* 
            fetch all genres from store or back-end
        */
        if (arguments[1] === 'explore') {
            if (this.categories.albumCategoriess === undefined) {
                fetchAlbumCategories();
            };
        };
        const limit = arguments[0] === undefined? this.genres.length: arguments[0];
        return [...this.genres].splice(0, limit);
    }

    filterGenres (query) {
        /* 
            Filter genres?
        */;
        return this.genres;
    };

    getGenre (genreName) {
        // get an individual genre? from here first, if not there get it from the back-end
        fetchGenreCategories(genreName)
        const genre = this.genres[0];
        genre.categories = this.categories.genreCategories[genreName];
        return genre;
    };

    fetchArtists () {
        /* 
            return all artists in store or retireve from the backend!
        */
        return this.artists;
    }

    filterArtists (query) {
        return this.artists;
    };

    getArtist (artistSlug) {
        return this.artists[0];
    };


    handleActions (action) {
        switch (action.type) {
            case actions.FETCH_INIT_DATA:
                const { albums, genres, artists } = action.payload;
                this.albums = albums;
                this.artists = artists;
                this.genres = genres;
                this.emit(changes.CHANGE_IN_ALL_DATA);
                break;

            case actions.FETCH_ALBUMS_CATEGORIES:
                this.categories.albumCategories = action.payload;
                break;

            case actions.FETCH_GENRE_CATEGORIES:
                this.categories.genreCategories = Object.assign(
                    this.categories.genreCategories,
                    action.payload
                );
                break;

            default:
                break;
        };
    };


};


const musicAppStore = new MusicAppStore();
musicDispatcher.register(musicAppStore.handleActions.bind(musicAppStore));
export default musicAppStore;