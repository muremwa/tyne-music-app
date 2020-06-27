import { EventEmmitter } from 'events';


class Album {
    title = null;
    albumSlug = null;
    albumCover = 'http://127.0.0.1:8000/media/defaults/album_cover.png';
    artist = null;
    artistSlug = null;
    year = null;
}


class AlbumStore extends EventEmmitter {
    albums = [];
    categories = {};

    filterAlbums (query) {
        /* 
            filter albums from the back-end then add the ones here! maybe send those to not include? idk!
        */
        return this.albums;
    };

    getAlbum(slug) {
        // get a specific album: if its not here in the front-end, get it from the back-end
        return this.albums[0];
    };
}


const albumStore = new AlbumStore();
export default albumStore;
