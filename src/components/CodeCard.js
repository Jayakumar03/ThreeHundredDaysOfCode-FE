import { Avatar, Button, Card, Input } from 'antd';
import React, { useState } from 'react';
import { LikeOutlined, CommentOutlined } from '@ant-design/icons';
import CommentBox from '../components/CommentBox';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

function CodeCard(props) {
  const [showMore, setShowMore] = useState(false);
  const [showComments, setShowComments] = useState(false);

  function handleCommentClick() {
    setShowComments(!showComments);
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
      <div>
        <p>{props.data.data.numLikes} Likes</p>
      </div>
      <div>
        <p>{props.data.data.numComments} Comments</p>
      </div>
      </div>
      <hr className='line-class'></hr>
        <div className='reaction-block'>
        <div className='reaction-element'>
            <LikeOutlined className='reaction-icon'/>
            <p className='reaction-text'>Like</p>
        </div>
        <div className='reaction-element' onClick={handleCommentClick}>
            <CommentOutlined className='reaction-icon'/>
            <p className='reaction-text'>Comment</p>
        </div>        
        </div>
      <hr className='line-class'></hr>
      {showComments === true && props.data.data.comments.map((result) => (
       <CommentBox text={result.text} author={result.author}/>
      ))}
      {showComments === true &&  <Input
          placeholder='Write a comment...'      
          className='reaction-comment-box'>            
          </Input>
      }      
    </Card>
  </div>
  );
}

export default CodeCard;