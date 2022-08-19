import React from "react";

function Editor() {
    function iframe() {
        return {
            __html: '<iframe src="https://master.d1ai8g2pfn1x6u.amplifyapp.com/" width="1000" height="1000"></iframe>'
        }
    }
    
    return (
        <div dangerouslySetInnerHTML={iframe()}></div>
    );
}

export default Editor;