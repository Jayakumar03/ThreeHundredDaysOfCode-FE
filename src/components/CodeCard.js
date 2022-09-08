import { Avatar, Button, Card, Input, message } from 'antd';
import React, { useState } from 'react';
import { LikeOutlined, CommentOutlined, LikeTwoTone } from '@ant-design/icons';
import CommentBox from '../components/CommentBox';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { dark, darcula, docco, sunburst, foundation } from 'react-syntax-highlighter/dist/esm/styles/hljs';

// Authentication.
import { Auth } from "aws-amplify";
// Cookies
import Cookies from 'universal-cookie';

// Utility.
const getUuid = require('uuid-by-string');

function CodeCard(props) {
  const [showMore, setShowMore] = useState(true);
  const [showComments, setShowComments] = useState(false);
  const [commentList, setCommentList] = useState(props.card.comments);
  const [numberLikes, setNumberLikes] = useState(props.card.numLikes);
  const [numberComments, setNumberComments] = useState(props.card.numComments);
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

  function sendAddLikeWithQuery(query, requestOptions) {
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
      headers: {
        'Content-Type': 'application/json'        
      },
      body: JSON.stringify({
        'userId': userId,
        'isLike': true,
        'postId': props.card.postId
      }) 
    };  
    const query = process.env.REACT_APP_API_URL + '/google/like';
    sendAddLikeWithQuery(query, requestOptions);
  }

  async function sendAddLikeCognitoUser() {
    const currentSessionResponse = await Auth.currentSession();
    const accessToken = currentSessionResponse.getAccessToken();
    const jwtToken = accessToken.getJwtToken();
    const userId = accessToken.payload.sub;
    const query = process.env.REACT_APP_API_URL + '/like';
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + jwtToken
      },
      body: JSON.stringify({
        'userId': userId,
        'isLike': isLiked,
        'postId': props.card.postId

      })
    };
    sendAddLikeWithQuery(query, requestOptions);
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
    headers: {
      'Content-Type': 'application/json'      
    },
    body: JSON.stringify({
      'userId': userId,
      'text': commentText,
      'postId': props.card.postId
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
        'text': commentText,
        'postId': props.card.postId
      })
    };
    sendAddCommentWithQuery(query, requestOptions);
  }
  
  async function sendAddCommentWithQuery(query, requestOptions) {
    fetch(query, requestOptions)
    .then(res => res.json())
    .then(responseJson => {
      setCommentList(responseJson.data);
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
    <Card style={{ width: 700, backgroundColor: 'black' }} >
      <div className='content-card-author-container'>
        <Avatar className='comment-avatar' src="https://joeschmoe.io/api/v1/random" />
        <p className='content-card-author-name'> {props.card.authorName} </p>
      </div>
      <hr className='line-class'></hr>
        <p className='content-card-author-name'> Problem Name: {props.card.problemName} </p>
        <p className='content-card-author-name'> <a target="_blank" href={props.card.problemLink}> Click here </a> to checkout the problem.</p>      
      
      <div className='code-block'>
      <div className='circle-block'>
        <div className="red circle"></div> 
        <div className="yellow circle"></div> 
        <div className="green circle"></div> 
      </div>
        <SyntaxHighlighter className='syntax-highlighter' language={props.card.language} style={darcula}>
        
          {showMore ? atob(props.card.codeBlock) : atob(props.card.codeBlock).substring(0, 250)}
        </SyntaxHighlighter>
      </div>
      <Button type="link" className="show-more-button" onClick={() => setShowMore(!showMore)}>
         {showMore ? "Show less" : "Show more"}
      </Button>
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
      {showComments === true &&
      <div className='comment-input-avatar-container'>
      <Avatar className='comment-avatar' src="https://joeschmoe.io/api/v1/random" />
      <Input
          placeholder='Add a comment...'      
          className='reaction-comment-box'
          onKeyDown={handleAddComment}
          />
        </div> 
      }
      {showComments === true && commentList.map((result) => (
       <CommentBox key={result.commentId} text={result.text} author={result.author}/>
      ))}
    </Card>
  </div>
  );
}

export default CodeCard;