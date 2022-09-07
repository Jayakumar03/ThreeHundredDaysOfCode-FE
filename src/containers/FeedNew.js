// Icons.
import { HomeOutlined, BookOutlined, NotificationOutlined, QuestionCircleOutlined, DashboardOutlined, ProfileOutlined } from '@ant-design/icons';

// Styles.
import '../styles/FeedNew.css';

import Feed from './Feed';

function FeedNew() {

    return (
        <div className='feed-container'>
            <div className='feed-left-panel'>
                <div className='feed-left-panel-icon-title-container'> 
                    <HomeOutlined className='feed-left-panel-icon' />                    
                    <a href="/" className='feed-left-panel-title'>Home</a>
                </div>
                <div className='feed-left-panel-icon-title-container'>
                    <BookOutlined className='feed-left-panel-icon' />
                    <a href="/problemset/all" className='feed-left-panel-title'>Problems</a>
                </div>
                <div className='feed-left-panel-icon-title-container'>                    
                    <NotificationOutlined className='feed-left-panel-icon' />
                    <a href="/notifications" className='feed-left-panel-title'>Notifications</a>
                </div>                
                <div className='feed-left-panel-icon-title-container'>                    
                    <DashboardOutlined className='feed-left-panel-icon' />                    
                    <a href="/leaderBoard" className='feed-left-panel-title'>LeaderBoard</a>
                </div>                
                <div className='feed-left-panel-icon-title-container'>                    
                    <ProfileOutlined className='feed-left-panel-icon' />                    
                    <a href="/mySubmissions" className='feed-left-panel-title'>My Submissions</a>
                </div>
                <div className='feed-left-panel-icon-title-container'>                    
                    <QuestionCircleOutlined className='feed-left-panel-icon' />
                    <a href="/faq" className='feed-left-panel-title'>FAQ</a>
                </div>
            </div>
            <div className='feed-parent'>
                <Feed />
            </div>
        </div>
    );
}

export default FeedNew;