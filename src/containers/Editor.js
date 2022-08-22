import React, {  } from 'react';

// Cookies.
import Cookies from 'universal-cookie';

function Editor() {
    function iframe() {
        const cookies = new Cookies();        
        let userId = cookies.get('userId', { path: '/' });
        const editor_url  = process.env.REACT_APP_EDITOR_URL + '?userId=' + userId;
        console.log(editor_url);
        return {
            __html: '<iframe src='+ editor_url + ' width="1000" height="1000"></iframe>'
        }
    }
    return (
        <div dangerouslySetInnerHTML={iframe()}></div>
    );
}

export default Editor;