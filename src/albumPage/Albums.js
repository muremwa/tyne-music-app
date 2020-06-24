import React from 'react';

import { cleanSearchParams } from '../utiltity/main';


export default class Album extends React.Component {
    

    render () {
        const search = cleanSearchParams(this.props.location.search);

        return (
            <div>
                <h1 className="text-center">This is albums page!!!!</h1>
            </div>
        );
    };
};

