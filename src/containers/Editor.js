import React from 'react';

// Cookies.
import Cookies from 'universal-cookie';

// Styles.
import '../styles/Editor.css';

// Utility.
import { Base64 } from "js-base64";

function Editor(props) {    
    let problem = '';
    if (props.problem.description !== undefined && props.problem.description.length > 0) {
        problem = Base64.decode(props.problem.description);
    }

    function iframe() {
        const cookies = new Cookies();        
        let userId = cookies.get('userId', { path: '/' });
        const editor_url  = process.env.REACT_APP_EDITOR_URL + '?userId=' + userId + "&problem_id=" + props.problem.problemId;
        console.log(editor_url);
        return {
            __html: '<iframe src='+ editor_url + ' width="1000" height="1000"></iframe>'
        }
    }

    return (
        <div className='problem-editor-container'>
            <div className='problem-description'>
                <div className='problem-description-header'>
                    <p className='problem-description-index'>{props.problem.problemIndex}.</p>
                    <p className='problem-description-header-title'>{props.problem.problemTitle}</p>
                </div>
                <hr></hr>
                <div dangerouslySetInnerHTML={{ __html: problem}}></div>
                <hr></hr>
            </div>
            <div className='editor-container' dangerouslySetInnerHTML={iframe()}></div>
        </div>
    );
}

export default Editor;