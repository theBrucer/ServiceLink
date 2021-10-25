// Helper function that checks if an object is empty
function isEmpty(obj) {

    // If there are no keys, then will return true
    return Object.keys(obj).length === 0;
}

// Extract query string from URL, and story the key value pairs in an object
// Accepts a location object
export const getQueryStringKeyValuePairs = (location) => {

    // If location isn't a valid object
    if (!location) {
        return {
            error: "Invalid location object"
        }
    }

    else {
        // Obtain the search params from the URLSearchParams API
        let searchParams = new URLSearchParams(location.search);

        // Create a new object to store the key value pairs
        let keyValuePairs = {};

        // Iterate through the entries
        for (let pair of searchParams.entries()) {

            // Store each entry as a key value pair
            keyValuePairs[pair[0]] = pair[1];
        }

        // Return null if there are no keyvalue pairs, otherwise return null
        return !isEmpty(keyValuePairs) ? keyValuePairs : null;
    }
}


// Build a query string from key value pairs
// Return example: "/{url}?key1=pair1&key2=pair2"
export const buildQueryString = (url, keyValues) => {

    // Set an empty string
    let queries = "";

    // Iterate through key value pairs 
    for (const [key, value] of Object.entries(keyValues)) {

        // Concatenate key value pairs to their strings
        queries = queries.concat(`${key}=${value}&`)
    }

    // Return a built URL, after removing the final & from the string
    return `${url}?${queries.slice(0, -1)}`
}
