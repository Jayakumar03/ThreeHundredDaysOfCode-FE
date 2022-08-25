import { Card, Input } from 'antd';
import { Avatar, Image } from 'antd';
import React from 'react';
import { LikeOutlined, CommentOutlined } from '@ant-design/icons';
import CommentBox from '../components/CommentBox';

function CodeCard(props) {
  console.log(props.data);

function submitComment() {}
function submitLike() {}

return (
  <div>
    <Card
      title="Code Submission"
      style={{
        width: 500,
      }}
    >
      <div className='content-card-author-container'>
        <Avatar className='comment-avatar' src="https://joeschmoe.io/api/v1/random" />
        <p className='content-card-author-name'> {props.data.data.name} </p>
      </div>
      <div className='code-block'>
        <p>{props.data.data.codeBlock}</p>
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
        <div className='reaction-element'>
            <CommentOutlined className='reaction-icon'/>
            <p className='reaction-text'>Comment</p>
        </div>        
        </div>
      <hr className='line-class'></hr>
      {props.data.data.comments.map((result) => (
       <CommentBox text={result.text} author={result.author}/>
      ))}
      <Input
        placeholder='Write a comment...'      
        className='reaction-comment-box'>            
        </Input>
    </Card>   
  </div>
  );
}

export default CodeCard;