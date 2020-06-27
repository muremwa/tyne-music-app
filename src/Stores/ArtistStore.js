import { EventEmmiter } from 'events';

import albumStore from './AlbumStore';
import genreStore from './GenreStore';


class Artist {
    name = null;
    artistSlug = null;
    avi = 'http://127.0.0.1:8000/media/defaults/genre.png';
    country = null;
    dob = 'January 1, 1970';
};


class ArtistStore extends EventEmmiter {
    artists = [];
    categories = {};

    filterArtists (query) {
        return this.artists;
    };

    getArtist (artistSlug) {
        return this.artists[0];
    }

    getAlbums (artistSlug) {
        /* 
            get albums from the store where artist = artistSlug
            ablumStore.filterAlbums(artistSlug);
        */
        return albumStore.filterAlbums({artistSlug});
    };

    getGenres (artistSlug) {
        /* 
            get genres that this artists is involed in!
        */
        return genreStore.filterGenres({artistSlug});
    }
};


const artistStore = new ArtistStore();
export default artistStore;