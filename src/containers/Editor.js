import React from 'react';

// Cookies.
import Cookies from 'universal-cookie';
import { Auth } from "aws-amplify";

// Styles.
import '../styles/EditorStyle.css';

// Utility.
import { Base64 } from "js-base64";
const getUuid = require('uuid-by-string');



function Editor(props) {    
    let problem = '';
    if (props.problem.description !== undefined && props.problem.description.length > 0) {
        problem = Base64.decode(props.problem.description);        
    }

     function iframe() {
        const userId = props.userId;
        const editor_url  = process.env.REACT_APP_EDITOR_URL + '?userId=' + userId + "&problemId=" + props.problemId + "&apiUrl=" + process.env.REACT_APP_API_URL;
        console.log('UserId:' + userId);
        return {
            __html: '<iframe src='+ editor_url + ' width="1000" height="1000"></iframe>'
        }
    }

    return (
        <div className='problem-editor-container'>
            <div className='problem-description'>
                <div className='problem-description-header'>
                    <span className='problem-description-index'>{props.problem.problemIndex}.</span>
                    <p className='problem-description-header-title'>{props.problem.problemTitle} (<a className='problem-description-link' target='_blank' href={props.problem.problemLink}> Leetcode Link </a>)</p>
                </div>
                <hr></hr>
                <div dangerouslySetInnerHTML={{ __html: problem}}></div>
                <hr></hr>
            </div>
            { process.env.REACT_APP_SHOW_EDITOR === "true" &&
              <div className='editor-container' dangerouslySetInnerHTML={iframe()}></div>    
            }            
        </div>
    );
}

export default Editor;