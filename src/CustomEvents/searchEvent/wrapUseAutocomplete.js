import { useEffect } from 'react';
import { useEventingContext } from '@magento/peregrine/lib/context/eventing';

// Wrapper for the useAutocomplete() talon
/**
 * Wraps the useAutocomplete hook with additional functionality.
 * @param {Function} useAutocomplete - The original useAutocomplete hook to be wrapped
 * @returns {Function} A new function that enhances the functionality of the original hook
 */
const wrapUseAutocomplete = useAutocomplete => {
    return props => {
        const talonProps = useAutocomplete(props);
        const [, { dispatch }] = useEventingContext();

        const {
            categories,
            displayResult,
            messageType,
            value,
            ...restProps
        } = talonProps;

        /**
         * useEffect hook that dispatches a search response action based on messageType.
         */
        useEffect(() => {
            if (
                messageType === 'RESULT_SUMMARY' ||
                messageType === 'EMPTY_RESULT'
            ) {
                dispatch({
                    type: 'SEARCH_RESPONSE',
                    payload: {
                        categories: categories || [],
                        facets: [],
                        page: 1,
                        perPage: 3, // Same value used in GQL query
                        products: displayResult || [],
                        searchRequestId: value,
                        searchUnitId: 'search-bar',
                        suggestions: displayResult || []
                    }
                });
            }
        });

        /**
         * Returns the necessary props for the component.
         * @returns {Object} An object containing displayResult, messageType, value, and other restProps
         */
        return {
            displayResult,
            messageType,
            value,
            ...restProps
        };
    };
};

export default wrapUseAutocomplete;
