import { EventEmitter } from 'events';

import { fetchGenreCategories, fetchAlbum } from '../actions/MusicActions';
import { cases, caseChanger } from '../pages/utiltity/main';
import musicDispatcher from '../dispatcher/dispatcher';
import actions from '../actions/DispatchActions';
import changes from './Changes';


class MusicAppStore extends EventEmitter {
    initHomeData = true;
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
        let _albums = [];

        if (Object.keys(query).length) {
            _albums = this.albums;

            if (query.hasOwnProperty('artist')) {
                _albums = _albums.filter((album) => album.artistSlug === query.artist);
            };
        };
        return {albums: [..._albums], artist: null, genre: this.genres.find((genre) => genre.genreSlug === 'reggea')};
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

    getGenre (genreSlug) {
        // get an individual genre? from here first, if not there get it from the back-end
        const genre = this.genres.find((genre) => genre.genreSlug === genreSlug);
        if (genre) {
            fetchGenreCategories(genreSlug)
        };
        return genre;
    };

    filterGenreCategories (genreSlug) {
        return [
            ...this.categories.albumCategories,
            ...this.categories.artistCategories
        ].filter((category) => category.genre && category.genre.genreSlug === genreSlug);
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
        const artist = this.artists.find((artist) => artist.artistSlug === artistSlug);
        return artist;
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

    uniqueItemsPreservingArray1(arrayOne, arrayTwo, identifier) {
        return [...arrayOne, ...arrayTwo.filter((item) => arrayOne.findIndex((_item) => _item[identifier] === item[identifier]) === -1)];
    };

    handleActions (action) {
        switch (action.type) {
            case actions.FETCH_INIT_DATA:
                const { albums, genres, artists, categories } = action.payload;
                this.albums = this.uniqueItemsPreservingArray1(this.albums, albums.map(this.genericCleaner), 'albumSlug');
                this.genres = this.uniqueItemsPreservingArray1(this.genres, genres.map(this.genericCleaner), 'genreSlug');
                this.artists = this.uniqueItemsPreservingArray1(this.artists, artists.map(this.genericCleaner), 'artistSlug');
                this.categories = this.genericCleaner(categories);
                this.initHomeData = false;
                this.emit(changes.CHANGE_IN_ALL_DATA);
                break;

            case actions.FETCH_ALBUM:
                const cleanAlbum = this.genericCleaner(action.payload);
                
                // make sure the album isn't there
                if (this.albums.findIndex((album) => albums.albumSlug === cleanAlbum.albumSlug) === -1) {
                    this.albums.push(cleanAlbum)
                    this.emit(`FETCHED_${cleanAlbum.albumSlug.toUpperCase()}`);
                };
                break;

            case actions.FETCH_ALBUM_SONGS:
                const album = this.albums.find((album) => album.albumSlug === action.payload.albumSlug);
                if (album) {
                    album.songs = action.payload.songs.map(this.genericCleaner);
                };
                this.emit(`CHANGE_IN_${action.payload.albumSlug.toUpperCase()}_SONGS`);
                break;

            case actions.FETCH_ARTIST:
                const artist = this.genericCleaner(action.payload.artist);
                this.artists.push(artist);
                this.emit(`FETCHED_ARTIST_${artist.artistSlug.toUpperCase()}`);
                break;

            case actions.FETCH_ARTIST_ALBUMS:
                this.albums = this.uniqueItemsPreservingArray1(this.albums, action.payload.albums.map(this.genericCleaner), 'albumSlug');
                this.emit(`FETCHED_${action.payload.artist.toUpperCase()}_ALBUMS`);
                break;

            case actions.FETCH_GENRE:
                const genre = this.genericCleaner(action.payload);
                
                if (!this.genres.length || this.genres.find((_genre) => _genre.genreSlug === genre.genreSlug) === -1) {
                    this.genres.push(genre);
                };
                this.emit(`FETCHED_GENRE_${genre.genreSlug.toUpperCase()}`);
                break;

            case actions.FETCH_GENRE_CATEGORIES:
                Object.keys(action.payload).forEach((_genre) => {
                    action.payload[_genre].forEach((_category) => {
                        const cleanCategory = this.genericCleaner(_category);

                        // add category to the correct category
                        if (cleanCategory.albumCategory) {
                            this.categories.albumCategories.push(cleanCategory);
                        } else {
                            this.categories.artistCategories.push(cleanCategory);
                        };
                    });
                    this.emit(`FETCHED_GENRE_CATEGORIES_FOR_${_genre}`);
                });
                break;

            default:
                break;
        };
    };


};


const musicAppStore = new MusicAppStore();
musicDispatcher.register(musicAppStore.handleActions.bind(musicAppStore));
export default musicAppStore;