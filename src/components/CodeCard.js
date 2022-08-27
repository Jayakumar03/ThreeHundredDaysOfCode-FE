import { Avatar, Button, Card, Input, message } from 'antd';
import React, { useState } from 'react';
import { LikeOutlined, CommentOutlined, LikeTwoTone } from '@ant-design/icons';
import CommentBox from '../components/CommentBox';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

// Authentication.
import { Auth } from "aws-amplify";
// Cookies
import Cookies from 'universal-cookie';

// Utility.
const getUuid = require('uuid-by-string');

function CodeCard(props) {
  const [showMore, setShowMore] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [commentList, setCommentList] = useState(props.data.data.comments);
  const [numberLikes, setNumberLikes] = useState(props.data.data.numLikes);
  const [numberComments, setNumberComments] = useState(props.data.data.numComments);
  const [isLiked, setIsLiked] = useState(false);

  function showMessage(success, error, warning) {
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

  function handleLikeClick() {
    if (isLiked === true) {
      setNumberLikes(numberLikes - 1);
      setIsLiked(false);
    } else {
      setNumberLikes(numberLikes + 1);
      setIsLiked(true);
    }
    sendAddLike();
  }

  function handleCommentClick() {
    setShowComments(!showComments);
  }

  function sendAddCommentWithQuery(query, requestOptions) {
    fetch(query, requestOptions)
    .then(res => res.json())
    .then(responseJson => {      
      console.log(responseJson);
    })
    .catch((error) => {
      showMessage(null, "Error");
      console.log(error);
    });
  }

  async function sendAddLikeGoogleSSO() {
    const userAuth = await Auth.currentAuthenticatedUser();
    const userId = getUuid(userAuth.email);
    const requestOptions = { 
      'method': 'POST', 
      body: JSON.stringify({
        'userId': userId,
        'isLike': isLiked,
        'postId': ''
      }) 
    };  
    const query = process.env.REACT_APP_API_URL + '/google/comment';
    sendAddCommentWithQuery(query, requestOptions);
  }

  async function sendAddLikeCognitoUser() {
    const currentSessionResponse = await Auth.currentSession();
    const accessToken = currentSessionResponse.getAccessToken();
    const jwtToken = accessToken.getJwtToken();
    const userId = accessToken.payload.sub;
    const query = process.env.REACT_APP_API_URL + '/comment';
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + jwtToken
      },
      body: JSON.stringify({
        'userId': userId,
        'isLike': isLiked,
        'postId': props.data.data.postId

      })
    };
    sendAddCommentWithQuery(query, requestOptions);
  }

  function handleAddComment(e) {
    if (e.key === 'Enter') {
      const commentText = e.currentTarget.value;
      sendAddComment(commentText);
      setNumberComments(numberComments + 1);
    }
  }

async function sendAddCommentGoogleSSO(commentText) {
  const userAuth = await Auth.currentAuthenticatedUser();
  const userId = getUuid(userAuth.email);
  const requestOptions = { 
    'method': 'POST', 
    body: JSON.stringify({
      'userId': userId,
      'commentText': commentText,
      'postId': props.data.data.postId
    }) 
  };  
  const query = process.env.REACT_APP_API_URL + '/google/comment';
  sendAddCommentWithQuery(query, requestOptions);
}

async function sendAddCommentCognitoUser(commentText) {  
    const currentSessionResponse = await Auth.currentSession();
    const accessToken = currentSessionResponse.getAccessToken();
    const jwtToken = accessToken.getJwtToken();
    const userId = accessToken.payload.sub;
    const query = process.env.REACT_APP_API_URL + '/comment';
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + jwtToken
      },
      body: JSON.stringify({
        'userId': userId,
        'commentText': commentText
      })
    };
    sendAddCommentWithQuery(query, requestOptions);
  }
  
  async function sendAddCommentWithQuery(query, requestOptions) {
    fetch(query, requestOptions)
    .then(res => res.json())
    .then(responseJson => {      
      setCommentList(responseJson.data.comments);
    })
    .catch((error) => {
      showMessage(null, "Error");
      console.log(error);
    });
  }

  async function sendAddComment(commentText) {
    const cookies = new Cookies();
    const loginType = cookies.get('loginType');
    if (loginType === 'cognito') {
      sendAddCommentCognitoUser(commentText);
    } else {
      sendAddCommentGoogleSSO(commentText);
    }
  }

  async function sendAddLike() {
    const cookies = new Cookies();
    const loginType = cookies.get('loginType');
    if (loginType === 'cognito') {
      sendAddLikeCognitoUser();
    } else {
      sendAddLikeGoogleSSO();
    }
  }

return (
  <div>
    <Card style={{ width: 500,}} >          
      <div className='content-card-author-container'>
        <Avatar className='comment-avatar' src="https://joeschmoe.io/api/v1/random" />
        <p className='content-card-author-name'> {props.data.data.name} </p>
      </div>
      <div className='code-block'>
        <SyntaxHighlighter language={props.data.language} style={docco}>
          {showMore ? atob(props.data.data.codeBlock) : atob(props.data.data.codeBlock).substring(0, 250)}
        </SyntaxHighlighter>
          <Button type="link" className="show-more-button" onClick={() => setShowMore(!showMore)}>
            {showMore ? "Show less" : "Show more"}
          </Button>        
      </div>
      <div className='reaction-stats-box'>
      {
        isLiked === true ? <div> <p>{numberLikes} Likes</p> </div> : <div> <p>{numberLikes} Likes</p> </div> 
      }
      <div>
        <p>{numberComments} Comments</p>
      </div>
      </div>
      <hr className='line-class'></hr>
        <div className='reaction-block'>        
        {
          isLiked === true ? 
            <div onClick={handleLikeClick} className='reaction-element'>
              <LikeTwoTone className='reaction-icon'/> <p className='reaction-text-selected'>Like</p> 
            </div>
            :
            <div onClick={handleLikeClick} className='reaction-element'>
              <LikeOutlined className='reaction-icon'/> <p className='reaction-text'>Like</p>
            </div>
        }        
        <div className='reaction-element' onClick={handleCommentClick}>
            <CommentOutlined className='reaction-icon'/>
            <p className='reaction-text'>Comment</p>
        </div>        
        </div>
      <hr className='line-class'></hr>
      {showComments === true && commentList.map((result) => (
       <CommentBox key={result.text} text={result.text} author={result.author}/>
      ))}
      {showComments === true &&  <Input
          placeholder='Write a comment...'      
          className='reaction-comment-box'
          onKeyDown={handleAddComment}
          >            
          </Input>
      }      
    </Card>
  </div>
  );
}

export default CodeCard;