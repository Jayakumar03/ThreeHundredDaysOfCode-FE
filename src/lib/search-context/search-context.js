import { createContext, useContext, useReducer } from "react";
import { defaultSearchState, SearchReducer } from "./search-reducer";


const SearchStateContext = createContext(defaultSearchState);
const SearchDispatchContext = createContext(undefined);

const SearchContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(SearchReducer, defaultSearchState);

    const autoComplete = () => {

    };
    
    return <SearchStateContext.Provider value={{state, autoComplete}}>
        <SearchDispatchContext.Provider value={dispatch}>
            {children}
        </SearchDispatchContext.Provider>
    </SearchStateContext.Provider>
}

const useSearchStateContext = () => {
    const ctx = useContext(SearchStateContext);
    return ctx;
}

const useSearchDispatchContext = () => {
    const ctx = useContext(SearchDispatchContext);
    return ctx;
}

export {
    useSearchStateContext,
    useSearchDispatchContext,
    SearchContextProvider
}