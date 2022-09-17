
export const defaultSearchState = {
    /* TODO satyam : Add */
    filteredSuggestions: false,
    activeSuggestion: false
};

export const initSearchState = {
    /* TODO satyam : Add */
    filteredSuggestions: false,
    activeSuggestion: false
};


export const SearchActions = {
    SET_FILTERED_SUGGESTION: 0,
    SET_ACTIVE_SUGGESTION: 1,

    IN_PROGRESS: 2,
    DONE: 3
};

export const SearchReducer = (state, action) => {
    switch(action.type) {
        case SearchActions.SET_FILTERED_SUGGESTION:
        case SearchActions.SET_FILTERED_SUGGESTION:
            return {...state, ...action.payload}
        default:
            return state
    }
}
