
import { HomeOutlined, BookOutlined, NotificationOutlined, QuestionCircleOutlined, DashboardOutlined, ProfileOutlined } from '@ant-design/icons';
import { Badge } from 'antd';
import { useNavigate } from "react-router-dom";

// Styles.
import '../styles/FeedNew.css';

function FeedLeftPanel() {
    let navigate = useNavigate();

    function handleHomeClick() { navigate("/"); }
    function handleProblemSetClick() { navigate("/problemset/all"); }
    function handleNotificationsClick() { navigate("/notifications"); }
    function handleLeaderBoardClick() { navigate("/leaderBoard"); }
    function handleMySubmissionsClick() { navigate("/mySubmissions"); } 
    function handleFAQClick() { navigate("/faq"); }

    return (
        <div className='feed-left-panel'>            
            <div className='feed-left-panel-icon-title-container' onClick={handleHomeClick}> 
                <HomeOutlined className='feed-left-panel-icon' />
                <div className='feed-left-panel-title'>Home</div>
            </div>
            <div className='feed-left-panel-icon-title-container' onClick={handleProblemSetClick}>
                <BookOutlined className='feed-left-panel-icon' />
                <a href="/problemset/all" className='feed-left-panel-title'>Problems</a>
            </div>
            <div className='feed-left-panel-icon-title-container' onClick={handleNotificationsClick}>
                <Badge style={{ backgroundColor: "blue" }}  count={1}>             
                    <NotificationOutlined className='feed-left-panel-icon' />
                </Badge>
                <a href="/notifications" className='feed-left-panel-title'>Notifications</a>
            </div>                
            <div className='feed-left-panel-icon-title-container' onClick={handleLeaderBoardClick}>
                <DashboardOutlined className='feed-left-panel-icon' />                    
                <a href="/leaderBoard" className='feed-left-panel-title'>LeaderBoard</a>
            </div>                
            <div className='feed-left-panel-icon-title-container' onClick={handleMySubmissionsClick}>
                <ProfileOutlined className='feed-left-panel-icon' />                    
                <a href="/mySubmissions" className='feed-left-panel-title'>My Submissions</a>
            </div>
            <div className='feed-left-panel-icon-title-container' onClick={handleFAQClick}>
                <QuestionCircleOutlined className='feed-left-panel-icon' />
                <a href="/faq" className='feed-left-panel-title'>FAQ</a>
            </div>
        </div>
    );
}

export default FeedLeftPanel; 