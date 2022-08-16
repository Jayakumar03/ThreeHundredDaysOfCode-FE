import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import { PoweroffOutlined } from '@ant-design/icons';

import '../styles/Navbar.css';
import '../styles/Common.css';
import '../styles/Footer.css';
import 'antd/dist/antd.css';

import Cookies from 'universal-cookie';

function Navbar(props) {
  const [isModalVisible, setIsModalVisible] = useState(false);


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
  return (
    !isAuthenticating && (
      <div className="header-class border-box no-underline col-12 px2 z3">
              {isAuthenticated && (                
                  <div className='flex nav-box'>
                  <img src='https://ik.imagekit.io/wfx6bvuzj/300Code/300_CODE_G1us9B5ug.png' className='logo-box'/>
                  <a href="/profile" className="link link-quiet focus-visible understroke active link-quiet navbar-text">Profile</a>
                  <a href="/submission" className="link link-quiet focus-visible understroke active link-quiet navbar-text">Submit Code</a>
                  <a href="/leaderboard" className="link link-quiet focus-visible understroke active link-quiet navbar-text">LeaderBoard</a>
                  <a href="/mySubmissions" className="link link-quiet focus-visible understroke active link-quiet navbar-text">My Submissions</a>                  
                  <a href="/challenge" className="link link-quiet focus-visible understroke active link-quiet navbar-text">300 Day Challenge</a>
                  <div className="flex-auto flex" />
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
