import React from 'react';

// Styles.
import './EditorStyle.css';

const CodeEditor = (props) => {
    const editor_url  = process.env.REACT_APP_EDITOR_URL + '?userId=' + props.userId + "&problemId=" + props.problemId + "&apiUrl=" + process.env.REACT_APP_API_URL + "&submissionId=" + props.submissionId;
    const iframeClass = "code-editor-iframe";

    return (
        <div className='problem-editor-container'>            
            { process.env.REACT_APP_SHOW_EDITOR === "true" &&
              <div className='editor-container' dangerouslySetInnerHTML={{
                __html: '<iframe class=' + iframeClass + ' src='+ editor_url + '></iframe>'
            }}
            ></div>
            }
        </div>
    );
}

export default CodeEditor;
