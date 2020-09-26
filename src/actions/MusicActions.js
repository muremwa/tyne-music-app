import actions from './DispatchActions';
import dispatcher from '../dispatcher/dispatcher';
import ajax from './ajaxWrapper';

export function fetchHomeData() {
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

    const dispatchGenreCategories = (genreCategories) => {
        dispatcher.dispatch({
            type: actions.FETCH_GENRE_CATEGORIES,
            payload: {
                [genreSlug]: genreCategories
            }
        });
    };

    const genreCategoriesOptions = {
        url: `/api/categories/?for=genre&genre_slug=${genreSlug}`,
        responseType: 'json',
        error: () => {},
        success: (response) => {
            dispatchGenreCategories(response.response.categories);
        }
    };

    ajax.get(genreCategoriesOptions);
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
            payload: {
                artist: artistSlug,
                albums
            }
        })
    };

    const artistAlbumOptions = {
        url: `/api/albums/?artist=${artistSlug}`,
        responseType: 'json',
        error: () => {},
        success: (reponse) => {
            dispatchArtistAlbums(reponse.response.albums);
        }
    };

    ajax.get(artistAlbumOptions);
};


export function fetchGenre (genreSlug) {
    const genreDispatcher = (genre) => {
        dispatcher.dispatch({
            type: actions.FETCH_GENRE,
            payload: genre
        });
    };

    const genreOptions = {
        url: `/api/genres/${genreSlug}/`,
        responseType: 'json',
        error: () => {},
        success: (response) => {
            genreDispatcher(response.response)
        }
    };

    ajax.get(genreOptions)
};