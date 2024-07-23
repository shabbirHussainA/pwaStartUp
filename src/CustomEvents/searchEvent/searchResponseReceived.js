/**
 * Checks if the event can be handled based on its type.
 * 
 * @param {object} event - The event object to be checked.
 * @returns {boolean} - Returns true if the event type is 'SEARCH_RESPONSE', otherwise false.
 */
const canHandle = event => event.type === 'SEARCH_RESPONSE';

/**
 * Handles the search event and sets the search results context using the provided SDK.
 * @param {Object} sdk - The SDK object used for interacting with the platform.
 * @param {Object} event - The event object containing payload data for the search.
 */
const handle = (sdk, event) => {
    const { payload } = event;

    const {
        categories,
        facets,
        page,
        perPage,
        products,
        searchRequestId,
        searchUnitId,
        suggestions
    } = payload;

    // Construct the search results context object
    const searchResultsContext = {
        units: [
            {
                categories,
                facets,
                page,
                perPage,
                products,
                searchRequestId,
                searchUnitId,
                suggestions
            }
        ]
    };

    // Set the search results context using the SDK
    sdk.context.setSearchResults(searchResultsContext);
    
    // Publish the search response received event with the search unit ID and search results context
    sdk.publish.searchResponseReceived(searchUnitId, searchResultsContext);
};

export default {
    canHandle,
    handle
};
