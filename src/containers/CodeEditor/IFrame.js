// Cookies
import Cookies from 'universal-cookie';

// Style
import './EditorStyle.css';

const CodeIFrame = (props) => {
    const iframeClass = "code-editor-iframe"
    let userId = props.userId;
    const editor_url  = process.env.REACT_APP_EDITOR_URL + '?userId=' + userId + "&problemId=" + props.problemId + "&apiUrl=" + process.env.REACT_APP_API_URL;
    return {
        __html: '<iframe class=' + iframeClass + ' src='+ editor_url + '></iframe>'
    }
};

export default CodeIFrame;