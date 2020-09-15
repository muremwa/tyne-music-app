import data from './test_data.json';
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

    const genreCategories = data.genre_categories;

    dispatcher.dispatch({
        type: actions.FETCH_GENRE_CATEGORIES,
        payload: {
            [genreSlug]: genreCategories
        }
    });
};
