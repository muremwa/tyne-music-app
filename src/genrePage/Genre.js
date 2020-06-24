import React from 'react';

import { cleanSearchParams } from '../utiltity/main';


export default class Genre extends React.Component {
    

    render () {
        const search = cleanSearchParams(this.props.location.search);
        console.log(search)

        return (
            <div>
                <h1 className="text-center">This is genre page!!!!</h1>
            </div>
        );
    };
};

