import React from 'react';

import { cleanSearchParams, caseChanger } from '../utiltity/main';
import { Category } from '../albumPage/Explore';
import { GenreIndex, NoSuchAvailable } from '../indexPage/IndexUtility';

import '../css/genre.css';



function ListGenres (props) {
    const genres = props.items.length > 0? props.items.map((genre, index) => <GenreIndex key={index} {...genre} />): <NoSuchAvailable lack={"genres"} />

    return (
        <div>
            <h1 className="text-center">Explore genres</h1>
            <div className="row">
                {genres}
            </div>
        </div>
    )
}


function SingleGenre (props) {
    const categories = props.categories !== undefined? Object.keys(props.categories).map((key, index) => {
        let value = props.categories[key];
        let forAlbum = true;
        key = caseChanger(key, 'HN', 'NR');

        if (key.includes('artist')) {
            forAlbum = false;
        };

        return <Category key={index} categoryName={key} {...value} albumCategory={forAlbum} />;
    }): [];


    return (
        <div className="genre-main">
            <div id="genre-info">
                <div>
                    <img alt={`cover for ${props.name}`} src={props.avi}/>
                </div>
                <div className="spacer-2"></div>
                <div id="more-genre-info">
                    <h1>{props.name}</h1>
                    <p>{props.description}</p>
                    <div id="genre-shuffle" title={`Shuffle ${props.name}`}>
                        <img alt="shuffle genre" src="http://127.0.0.1:8000/static/svg/shuffle.svg" />
                    </div>
                </div>
            </div>
            <hr className="massive-divider" />
            <div id="genre-categories" className="container">
                {categories}
            </div>
        </div>
    )


}


export default class Genre extends React.Component {
    getGenres () {
        // this shall in the future get a list of genres!
        return [
            {
                name: 'Hip hop',
                slug: 'hip-hop',
                cover: 'http://127.0.0.1:8000/media/defaults/genre.png'
            },
            {
                name: 'Reggea',
                slug: 'reggea',
                cover: 'http://127.0.0.1:8000/media/defaults/genre.png'
            },
            {
                name: 'R&B',
                slug: 'rhythms-and-blues',
                cover: 'http://127.0.0.1:8000/media/defaults/genre.png'
            },
            {
                name: 'Soul',
                slug: 'soul',
                cover: 'http://127.0.0.1:8000/media/defaults/genre.png'
            },
            {
                name: 'Rock',
                slug: 'rock',
                cover: 'http://127.0.0.1:8000/media/defaults/genre.png'
            },
        ]
    };

    getGenre (name) {
        // this shall access genre info from the store or backend in the future
        return {
            name,
            description: `We are an award-winning music streaming site, dedicated to the best service, quality, and customer service.
            ©  2019 - 2020 . HOUSE OF M. All Rights Reserved.`,
            avi: 'http://127.0.0.1:8000/media/defaults/genre.png',
            categories: {
                popularArtists: {
                    categoryDescription: "Artists popular in this genres!",
                    categoryAvi: "http://127.0.0.1:8000/media/defaults/artist.png",
                    items: [
                        {
                            name: 'Rihanna',
                            avi: 'http://127.0.0.1:8000/media/artists/Screenshot_20170616-135311.png',
                            artistSlug: 'rihanna-1'
                        },
                        {
                            name: 'Lil Wayne',
                            avi: 'http://127.0.0.1:8000/media/defaults/artist.png',
                            artistSlug: 'lil-wayne-2'
                        },
                        {
                            name: 'Post Malone',
                            avi: 'http://127.0.0.1:8000/media/defaults/artist.png',
                            artistSlug: 'post-malone-3'
                        },
                    ]
                },
                popularAlbums: {
                    categoryDescription: "Albums popular in this genre!",
                    categoryAvi: "http://127.0.0.1:8000/static/svg/album.svg",
                    items: [
                        {
                            title: 'The Carter V',
                            year: 2018,
                            artist: 'Lil Wayne',
                            artistSlug: 'lil-wayne-2',
                            albumSlug: 'the-carter-iv',
                            albumCover: 'http://127.0.0.1:8000/media/album_covers/the_carter_iv.png'
                        },
                        {
                            title: 'Pink Print',
                            year: 2015,
                            artist: 'Nicki Minaj',
                            artistSlug: 'nicki-minaj-4',
                            albumSlug: 'pink-print',
                            albumCover: 'http://127.0.0.1:8000/media/defaults/album_cover.png'
                        },
                        {
                            title: 'Anti',
                            year: 2016,
                            artist: 'Rihanna',
                            artistSlug: 'rihanna-1',
                            albumSlug: 'anti',
                            albumCover: 'http://127.0.0.1:8000/media/album_covers/65f6cde8ee53c7ba39d6ce738094ea53.jpg'
                        },
                    ]
                }
            }
        };
    }

    render () {
        const search = cleanSearchParams(this.props.location.search);
        let display;
        console.log(search)
        
        if (search) {
            if (Object.keys(search).includes('genreName')) {
                const genre = this.getGenre(search.genreName);
                display = <SingleGenre {...genre} />
            } else {
                display = <ListGenres items={this.getGenres()} />;
            };
        } else {
            display = <ListGenres items={this.getGenres()} />;
        };

        return (
            <div>
                {display}
            </div>
        );
    };
};

