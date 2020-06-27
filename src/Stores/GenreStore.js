import { EventEmmiter } from 'events';


class Genre {
    name = null;
    genreSlug = null;
    avi = 'http://127.0.0.1:8000/media/defaults/genre.png';
}


class GenreStore extends EventEmmiter {
    genres = [];
    categories = {};

    filterGenres (query) {
        /* 
            Filter genres?
        */
        return this.genres;
    };

    getGenre (genreName) {
        // get an individual genre? from here first, if not there get it from the back-end
        return this.genres[0];
    }
}


const genreStore = new GenreStore();
export default genreStore;