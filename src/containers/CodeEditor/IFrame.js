// Cookies
import Cookies from 'universal-cookie';

// Style
import './EditorStyle.css';

const CodeIFrame = (props) => {
    const iframeClass = "code-editor-iframe"
    const cookies = new Cookies();
    let userId = cookies.get('userId', { path: '/' });
    const editor_url  = process.env.REACT_APP_EDITOR_URL + '?userId=' + userId + "&problemId=" + props.problemId + "&apiUrl=" + process.env.REACT_APP_API_URL;
    return {
        __html: '<iframe class=' + iframeClass + ' src='+ editor_url + '></iframe>'
    }
};

export default CodeIFrame;