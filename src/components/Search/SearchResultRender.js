import SearchResultObject from './SearchResultObject';

function SearchResultRender(props) {
    const result = props.result;    
    return <SearchResultObject result = {result} />    
}

export default SearchResultRender;