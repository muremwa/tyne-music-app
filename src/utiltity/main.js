/**
 * @param {string} query
 * @returns {object} object of params in a search query if not? null is returned.  
 * Pass in the search parameter and get all search parameters and thier values as an object
*/
export function cleanSearchParams (query) {
    let localQuery = null;
    
    if (query) {
        localQuery = [...query.matchAll(/(\w+)=(\w+)/g)];

        localQuery = Object.assign(
            localQuery.map((result) => (
                {
                    [result[1]]: result[1]
                }
            ))
        );
    };

    return localQuery;
};