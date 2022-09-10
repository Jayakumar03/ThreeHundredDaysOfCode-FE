import React from 'react';

// Styles.
import './EditorStyle.css';
import CodeIFrame from './IFrame';

// Utility.

const CodeEditor = (props) => {

    return (
        <div className='problem-editor-container'>            
            { process.env.REACT_APP_SHOW_EDITOR === "true" &&
              <div className='editor-container' dangerouslySetInnerHTML={CodeIFrame(props)}></div>
            }
        </div>
    );
}

export default CodeEditor;
