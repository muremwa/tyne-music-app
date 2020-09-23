import data from './test_data.json';
import actions from './DispatchActions';
import dispatcher from '../dispatcher/dispatcher';
import ajax from './ajaxWrapper';

export function fetchHomeData() {
    console.log('fetched home data')
    const dispatchHomeData = (data) => {
        const { albums, artists, genres, categories } = data;

        dispatcher.dispatch ({
            type: actions.FETCH_INIT_DATA,
            payload: {albums, artists, genres, categories}
        });
    };

    const homeOptions = {
        url: '/api/home-data/',
        responseType: 'json',
        success: (response) => {
            dispatchHomeData(response.response);
        },
        error: () => {}
    }

    ajax.get(homeOptions);
};


export function fetchGenreCategories (genreSlug) {
    // code to fetch from the back-end goes here!

    const genreCategories = data.genre_categories;

    dispatcher.dispatch({
        type: actions.FETCH_GENRE_CATEGORIES,
        payload: {
            [genreSlug]: genreCategories
        }
    });
};


export function fetchAlbum (albumSlug) {
    /* 
        Get an album from the backend
    */
    const dispatchAlbum = (album) => {
        dispatcher.dispatch({
            type: actions.FETCH_ALBUM,
            payload: album
        });
    };

    const albumFetchOptions = {
        url: `/api/albums/${albumSlug}/`,
        responseType: 'json',
        error: () => {},
        success: (response) => {
            dispatchAlbum(response.response);
        }
    };

    ajax.get(albumFetchOptions);    
};

export function fetchArtist (artistSlug) {
    /* 
        Get an album from the backend
    */
    const dispatchAlbum = (artist) => {
        dispatcher.dispatch({
            type: actions.FETCH_ARTIST,
            payload: artist
        });
    };

    const albumFetchOptions = {
        url: `/api/artists/${artistSlug}/`,
        responseType: 'json',
        error: () => {},
        success: (response) => {
            dispatchAlbum(response.response);
        }
    };

    ajax.get(albumFetchOptions);    
};


export function fetchAlbumSongs (albumSlug, songsUrl) {
    /* 
        GET the songs of an album
    */
    const dispatchAlbumSongs = (data) => {
        dispatcher.dispatch({
            type: actions.FETCH_ALBUM_SONGS,
            payload: {
                albumSlug,
                songs: data
            }
        })
    }

    const fetchSongOptions = {
        url: songsUrl,
        responseType: 'json',
        error: () => {},
        success: (payload) => {
            dispatchAlbumSongs(payload.response)
        }
    };

    ajax.get(fetchSongOptions);
};


export function fetchArtistAlbums (artistSlug) {
    const dispatchArtistAlbums = (albums) => {
        dispatcher.dispatch({
            type: actions.FETCH_ARTIST_ALBUMS,
            payload: albums
        })
    };

    const artistAlbumOptions = {
        url: `/api/albums/?artist=${artistSlug}`,
        responseType: 'json',
        error: () => {},
        success: (reponse) => {
            dispatchArtistAlbums(reponse.response);
        }
    };

    ajax.get(artistAlbumOptions);
};