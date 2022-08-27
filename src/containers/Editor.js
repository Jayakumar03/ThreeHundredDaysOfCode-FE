import React, {  } from 'react';

// Cookies.
import Cookies from 'universal-cookie';

// Styles.
import '../styles/Editor.css';

function Editor() {
    const problem = "<p>Given an integer <code>n</code>, return <em><code>true</code> if it is a power of three. Otherwise, return <code>false</code></em>.</p>" +
    "<p>An integer <code>n</code> is a power of three, if there exists an integer <code>x</code> such that <code>n == 3<sup>x</sup></code>.</p>" + 
    
    "<p>&nbsp;</p>" + 
    "<p><strong>Example 1:</strong></p>" + 
    
    "<pre> <strong>Input:</strong> n = 27 <strong>Output:</strong> true </pre>" + 
    "<p><strong>Example 2:</strong></p>" + 
    
    "<pre> <strong>Input:</strong> n = 0 <strong>Output:</strong> false </pre>" + 
    
    "<p><strong>Example 3:</strong></p>" + 
    
    "<pre> <strong>Input:</strong> n = 9 <strong>Output:</strong> true </pre>" +
    
    "<p>&nbsp;</p> <p><strong>Constraints:</strong></p>" +
    
    "<ul> <li><code>-2<sup>31</sup> &lt;= n &lt;= 2<sup>31</sup> - 1</code></li> </ul>" +
    "<p>&nbsp;</p> <strong>Follow up:</strong> Could you solve it without loops/recursion?";
    
    
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
        <div className='problem-editor-container'>
            <div dangerouslySetInnerHTML={{ __html: problem}}></div>
            <div dangerouslySetInnerHTML={iframe()}></div>
        </div>
    );
}

export default Editor;