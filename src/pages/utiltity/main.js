export const cases = {
    HUNGARIAN_NOTATION: 'HN',
    NORMAL_CASE: 'NR',
    CAMEL_CASE: 'CS',
    SNAKE_CASE: 'SC',
};


/**
 * @param {string} query
 * @returns {object} object of params in a search query if not? null is returned.
 * Pass in the search parameter and get all search parameters and thier values as an object
*/
export function cleanSearchParams (query) {
    let localQuery = null;

    if (query) {
        localQuery = [...query.matchAll(/(\w+)=([0-9a-zA-Z-]+)/g)];

        if (localQuery.length > 0) {
            localQuery = Object.assign(
                ...localQuery.map((result) => (
                    {
                        [result[1]]: result[2]
                    }
                ))
            );
        } else {
            localQuery = null;
        }
    };

    return localQuery;
};


/**
 * @param {string} toChange
 * @param {cases} currentCase
 * @param {cases} changeTo
 * @returns {string} Returns an string in the new case type
*/
export function caseChanger (toChange, currentCase, changeTo) {
    if ([toChange, currentCase, changeTo].some((arg) => arg === undefined)) {
        throw new Error('Missing arguments');
    };

    if ([toChange, currentCase, changeTo].some((arg) => (typeof arg) !== 'string')) {
        throw new Error('Wrong argument type');
    };

    currentCase = currentCase.toUpperCase();
    changeTo = changeTo.toUpperCase();

    if (currentCase === changeTo) {
        return toChange;
    }

    let temp;
    let result;

    switch (currentCase) {
        case cases.CAMEL_CASE:
            temp = toChange.split(/([A-Z]{1}[a-z]*)/).filter(Boolean);
            break;

        case cases.HUNGARIAN_NOTATION:
            temp = toChange.split(/([A-Z]{1}[a-z]*)/).filter(Boolean);
            break;

        case cases.SNAKE_CASE:
            temp = toChange.split("_");
            break;

        case cases.NORMAL_CASE:
            temp = toChange.split(/\s/);
            break;
    
        default:
            throw new Error(`Converting from '${currentCase}' not supported`);
    };


    switch (changeTo) {
        case cases.CAMEL_CASE:
            result = temp.map((char) => `${char[0].toUpperCase()}${char.substring(1).toLowerCase()}`).join('');
            break;

        case cases.HUNGARIAN_NOTATION:
            result = temp.map((char, index) => {
                char = char.toLowerCase();
                if (index > 0) {
                    char = `${char[0].toUpperCase()}${char.substring(1).toLowerCase()}`;
                };

                return char
            }).join('');
            break;

        case cases.SNAKE_CASE:
            result = temp.map((char) => char.toLowerCase()).join('_');
            break;

        case cases.NORMAL_CASE:
            result = temp.map((char) => char.toLowerCase()).join(' ');
            break;

        default:
            throw new Error(`Converting to '${changeTo}' not supported`);
    };

    return result;
};