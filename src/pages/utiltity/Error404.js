import React from 'react';


export default function Error404(props) {
    const message = props.message? props.message: "The page your'e looking for does not exist";

    return (
        <div className="text-center">
            <h1>Error 404</h1>
            <p>{message}</p>
        </div>
    )
}