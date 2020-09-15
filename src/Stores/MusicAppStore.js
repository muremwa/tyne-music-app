import { EventEmitter } from 'events';

import { fetchGenreCategories, fetchAlbum } from '../actions/MusicActions';
import { cases, caseChanger } from '../pages/utiltity/main';
import musicDispatcher from '../dispatcher/dispatcher';
import actions from '../actions/DispatchActions';
import changes from './Changes';


class MusicAppStore extends EventEmitter {
    albums = [];
    genres = [];
    artists = [];
    categories = {
        albumCategories: [],
        artistCategories: [],
        genreCategories: []
    };

    constructor() {
        super();
        this.genericCleaner = this.genericCleaner.bind(this);
        this.isObject = (item) => typeof item === 'object' && item !== null;
    };

    getSongs (albumSlug) {
        /* 
            Fetch all songs of an album from store only
        */
        const album = this.albums.find((album) => album.albumSlug === albumSlug);
        return album && typeof album.songs !== 'string'? album.songs: null;
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
        const album = this.albums.find((album) => album.albumSlug === slug);
        
        if (!album) {
            fetchAlbum(slug);
        };
        return album;
    };

    fetchGenres () {
        /* 
            fetch all genres from store or back-end
        */
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

    genericCleaner (obj) {
        /* 
            clean generic data from the backend recursively!!!
        */
    
        if (!this.isObject(obj)) {
            return {};
        };

        // create a new object holder
        const newObj = {};

        // loop through all items and change case
        for (let key of Object.keys(obj)) {
            const newKey = caseChanger(key, cases.SNAKE_CASE, cases.HUNGARIAN_NOTATION);
            let value = obj[key];

            // recursively clean arrays and other objects
            if (Array.isArray(value)) {
                value = value.map(this.genericCleaner);
            } else if (this.isObject(value)) {
                value = this.genericCleaner(value);
            };

            newObj[newKey] = value;
        };

        return newObj;
    };

    handleActions (action) {
        switch (action.type) {
            case actions.FETCH_INIT_DATA:
                const { albums, genres, artists, categories } = action.payload;
                this.albums = [...this.albums, ...albums.map(this.genericCleaner)];
                this.genres = [...this.genres, ...genres.map(this.genericCleaner)];
                this.artists = [...this.artists, ...artists.map(this.genericCleaner)];
                this.categories = this.genericCleaner(categories);
                this.emit(changes.CHANGE_IN_ALL_DATA);
                break;

            case actions.FETCH_ALBUM_SONGS:
                const album = this.albums.find((album) => album.albumSlug === action.payload.albumSlug);
                if (album) {
                    album.songs = action.payload.songs.map(this.genericCleaner);
                };
                this.emit(`CHANGE_IN_${action.payload.albumSlug.toUpperCase()}_SONGS`);
                break;

            default:
                break;
        };
    };


};


const musicAppStore = new MusicAppStore();
musicDispatcher.register(musicAppStore.handleActions.bind(musicAppStore));
export default musicAppStore;