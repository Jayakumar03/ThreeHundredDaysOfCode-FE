import { Avatar, Button, Card, Input, message } from 'antd';
import { LikeOutlined, CommentOutlined, LikeTwoTone } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";

// Styles.
import '../styles/NotificationCard.css';

function NotificationCard(props) {
    let navigate = useNavigate();
    function handleClick() { navigate("/post/" + props.card.postId);  }
    return (
        <div className ='notification-card-container' onClick={handleClick}>
            {
                props.card.notificationType === "USER_COMMENT" &&
                <>
                    <div className='notification-card-header-container'>
                        <CommentOutlined style={{ fontSize: '30px' }}  className='reaction-icon'/>
                        <Avatar className='notification-card-avatar' size='large' src="https://joeschmoe.io/api/v1/random" />
                        </div>
                        <>
                        <div className='notification-card-text'> {props.card.authorName} commented on your post. </div>            
                        <div className='notification-card-problem-name-text'> Problem Name: {props.card.problemName} </div>
                        </>                        
                </>
            }
            {
                props.card.notificationType === "USER_LIKE" &&
                <>
                    <div className='notification-card-header-container'>
                        <LikeTwoTone style={{ fontSize: '30px' }}  className='reaction-icon'/>
                        <Avatar className='notification-card-avatar' size='large' src="https://joeschmoe.io/api/v1/random" />
                        </div>
                        <>
                        <div className='notification-card-text'> {props.card.authorName} liked your post. </div>            
                        <div className='notification-card-problem-name-text'> Problem Name: {props.card.problemName} </div>
                        </>                    
                </>
            }            
        </div>
    );
}

export default NotificationCard;