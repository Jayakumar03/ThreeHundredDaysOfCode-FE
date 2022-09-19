import React, { Component } from "react"
import { EditorState, convertToRaw } from "draft-js"
import { Editor } from "react-draft-wysiwyg"
import draftToHtml from "draftjs-to-html"
import { Button, Input, message } from 'antd';

// Cookies
import Cookies from 'universal-cookie';

// Styles.
import './ProblemEditor.css';

// Authentication
import { Auth } from "aws-amplify";

// Utility.
const getUuid = require('uuid-by-string');

class EditorConvertToHTML extends Component {
  state = { 
    editorState: EditorState.createEmpty() 
  }

  onEditorStateChange = editorState => {
    this.setState({
      editorState
    })
  }

  showMessage(success, error, warning) {
    if (success !== null) {
      message.success({
        content: success,
        className: 'display-message',
      });
    } else if (error !== null) {
        message.error({
        content: error,
        className: 'display-message',
      });
    } else if (warning !== null) {
      message.warning({
      content: warning,
      className: 'display-message',
    });
  }
}

  saveProblemWithQuery(query, requestOptions) {
    fetch(query, requestOptions)
    .then(res => res.json())
    .then(responseJson => {      
      console.log(responseJson);
    })
    .catch((error) => {
      console.log(error);
    });
  }

async saveProblemWithGoogleSSO() {
    const userAuth = await Auth.currentAuthenticatedUser();
    const userId = getUuid(userAuth.email);
    const description = atob(draftToHtml(convertToRaw(this.editorState.getCurrentContent())));
    const title = document.getElementById('problem-editor-input-title').value;
    const requestOptions = { 
      'method': 'POST', 
      headers: {
        'Content-Type': 'application/json'        
      },
      body: JSON.stringify({
        'userId': userId,
        'title': title,
        'description': description
      }) 
    };  
    const query = process.env.REACT_APP_API_URL + '/google/saveProblem';
    this.saveProblemWithQuery(query, requestOptions);
  }

 async saveProblemCognitoUser() {
    const currentSessionResponse = await Auth.currentSession();
    const accessToken = currentSessionResponse.getAccessToken();
    const jwtToken = accessToken.getJwtToken();
    const userId = accessToken.payload.sub;
    const query = process.env.REACT_APP_API_URL + '/saveProblem';
    const description = atob(draftToHtml(convertToRaw(this.editorState.getCurrentContent())));
    const title = document.getElementById('problem-editor-input-title').value;
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + jwtToken
      },
      body: JSON.stringify({
        'userId': userId,
        'title': title,
        'description': description

      })
    };
    this.saveProblemWithQuery(query, requestOptions);
  }

async handleSubmission() {
  const cookies = new Cookies();
  const loginType = cookies.get('loginType');
  if (loginType === 'cognito') {
    this.saveProblemCognitoUser();
  } else {
    this.saveProblemGoogleSSO();
  }
}

  render() {
    const { editorState } = this.state
    return (
      <div className='demo-section-wrapper-container'>
        <div className='problem-editor-input-form'>
          <span className='problem-editor-input-title-text'>Problem Title:</span>
          <Input className='problem-editor-input-title' id ='problem-editor-input-title' placeholder='Enter problem title...'/>
          <Button onClick={this.handleSubmission}> Submit Problem </Button>
        </div>
        <div className='demo-section-wrapper'>
            <Editor
              editorState={editorState}
              wrapperClassName="demo-wrapper"
              editorClassName="demo-editor"
              onEditorStateChange={this.onEditorStateChange}
            />
            <textarea
            disabled
            className='editor-textarea'
            value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
            />
        </div>        
      </div>
    )
  }
}

export default EditorConvertToHTML;