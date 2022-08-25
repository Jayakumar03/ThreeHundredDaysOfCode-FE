import { Card, Input } from 'antd';
import React from 'react';

import { LikeOutlined, CommentOutlined } from '@ant-design/icons';

function CodeCard() {

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
      <div>        
        <p> Author: Ravi Tandon </p>
      </div>
      <div className='code-block'>
        <p>Card content</p>
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
      <Input 
        placeholder='Write a comment...'      
        className='reaction-comment-box'>            
        </Input>
    </Card>   
  </div>
  );
}

export default CodeCard;