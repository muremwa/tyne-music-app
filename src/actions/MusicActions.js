import data from './test_data.json';
import actions from './DispatchActions';
import dispatcher from '../dispatcher/dispatcher';

export function fetchHomeData() {
    // code to fetch from back-end goes here!

    const { albums, artists, genres } = data;

    dispatcher.dispatch ({
        type: actions.FETCH_INIT_DATA,
        payload: {albums, artists, genres}
    });    
};


export function fetchAlbumCategories () {
    // code to fetch from the back-end goes here!

    const albumCategories = data.album_categories;

    dispatcher.dispatch({
        type: actions.FETCH_ALBUMS_CATEGORIES,
        payload: albumCategories
    });
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
