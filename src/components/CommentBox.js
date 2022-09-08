import React from 'react';
import { Avatar, Image } from 'antd';
import '../styles/CommentBox.css';

function CommentBox(props) {
    return (
        <div className='comment-box-container'>
            <Avatar className='comment-avatar' src="https://joeschmoe.io/api/v1/random" />
            <div className='comment-author-text-container'>
                <p className='comment-author-name'>{props.author}</p>
                <p className='comment-text'>{props.text}</p>
            </div>        
        </div>
    );
}

export default CommentBox;