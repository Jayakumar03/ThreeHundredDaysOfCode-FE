import { Result, Tabs } from 'antd';
import React, { useState } from 'react';
import styled from 'styled-components';
import Editor from "@monaco-editor/react";

const ResultTabContainer = styled.main`
    width: 100%;
    background-color: #202124;
    margin-left: 20px;
    padding-top: 10px;
    height: 20vh;
    .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
        color: light-blue;
        font-weight: 700;
    }
    .ant-tabs-tab .ant-tabs-tab-btn {
        color: white;
    }
`
const handleInputBoxTextChange = () => {}
const ResultTab = (props) => {
    return (
        <ResultTabContainer>
            <Tabs activeKey={props.activeKey} onTabClick={props.setActiveKey} >
                <Tabs.TabPane 
                    tab="Input" 
                    key="1"                
                >
                <Editor
                    height={`80vh`}
                    width={`100%`}
                    language={"plaintext"}
                    value={props.input}
                    theme="vs-dark"
                    onChange={handleInputBoxTextChange}
                />
                </Tabs.TabPane>
                <Tabs.TabPane tab="Output" key="2">
                <Editor
                    height={`80vh`}                
                    width={`100%`}
                    language={"plaintext"}
                    value={props.output}
                    theme="vs-dark"                
                    onChange={handleInputBoxTextChange}
                />
                </Tabs.TabPane>
                <Tabs.TabPane tab="Console" key="3">
                Content of Tab Pane 3
                </Tabs.TabPane>
            </Tabs>
        </ResultTabContainer>
    );
};

export default ResultTab;