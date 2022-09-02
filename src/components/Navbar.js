import React, { useState } from 'react';

import '../styles/Navbar.css';
import '../styles/Common.css';
import '../styles/Footer.css';

import { Avatar, Badge, Button, Modal, message } from 'antd';
import { ClockCircleOutlined, PoweroffOutlined, NotificationTwoTone } from '@ant-design/icons';
import 'antd/dist/antd.css';

import Cookies from 'universal-cookie';
import { Auth } from "aws-amplify";

function Navbar(props) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);

  const handleOk = () => {
    props.handleDeleteAllData();
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const isAuthenticating = props.isAuthenticating;
  const cookies = new Cookies();
  const value = cookies.get('isLoggedIn', { path: '/' });
  const isAuthenticated = value === "true";

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

  async function handleReferralOnClick() {
    const currentSessionResponse = await Auth.currentSession();
    const accessToken = currentSessionResponse.getAccessToken();
    const url = process.env.REACT_APP_URL + "/signup?" + "__referrerId=" + accessToken.payload.sub;
    navigator.clipboard.writeText(url);
    showMessage('Referral link copied to your clipboard.');    
  }

  return (
    !isAuthenticating && (
      <div className="header-class border-box no-underline col-12 px2 z3">
              {isAuthenticated && (                
                  <div className='flex nav-box'>
                  <img src='https://ik.imagekit.io/wfx6bvuzj/300Code/300_CODE_G1us9B5ug.png' className='logo-box'/>
                  {/* <a href="/profile" className="link link-quiet focus-visible understroke active link-quiet navbar-text">Profile</a> */}
                  <a href="/submission" className="link link-quiet focus-visible understroke active link-quiet navbar-text">Problem Of The Day</a>
                  <a href="/leaderboard" className="link link-quiet focus-visible understroke active link-quiet navbar-text">LeaderBoard</a>
                  <a href="/mySubmissions" className="link link-quiet focus-visible understroke active link-quiet navbar-text">My Submissions</a>
                  { 
                    process.env.REACT_APP_ENABLE_FEED === "true" && 
                    <a href="/feed" className="link link-quiet focus-visible understroke active link-quiet navbar-text">My Feed</a>
                  }
                  <a target="_window" href="/faq" className="link link-quiet focus-visible understroke active link-quiet navbar-text">FAQ</a>
                  <a href='/problemset/all' className="link link-quiet focus-visible understroke active link-quiet navbar-text">Problem Set</a>
                  <div className="flex-auto flex" />
                  <div >
                    <a className='profile-container' href="/profile">
                      <Avatar className='comment-avatar' src="https://joeschmoe.io/api/v1/random" />                       
                    </a>
                  </div>
                  {/* <div className='notification-container'> 
                    <Badge count={notificationCount}>
                      <NotificationTwoTone className='notification-container'/> 
                    </Badge>
                  </div> */}
                  {/* <Button
                  className='referral-btn'
                  type="primary"
                  onClick={handleReferralOnClick}>
                    Refer A Friend
                  </Button> */}
                  <Button
                    type="primary"
                    icon={<PoweroffOutlined />}
                    onClick={props.handleLogout}
                  > Logout </Button>
                </div>
              )}
        
        <Modal title="Delete Data Confirmation" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <p> Click OK to confirm the deletion of all your data. </p>
        <p> Click Cancel if this was a mistake. </p>        
      </Modal>
      </div>
    )
  );
}

export default Navbar;
