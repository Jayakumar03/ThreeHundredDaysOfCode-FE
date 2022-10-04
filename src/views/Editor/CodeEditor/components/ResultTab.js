import { Result, Tabs } from 'antd';
import React from 'react';
import styled from 'styled-components';
import Editor from "@monaco-editor/react";

const ResultTabContainer = styled.main`
    width: 40%;
    background-color: white;
    height: 85vh;
    margin-left: 20px;
    padding: 10px;
` 
const handleResultBoxTextChange = () => {}

const ResultTab = (props) => (
    <ResultTabContainer>
        <Tabs defaultActiveKey="1">
            <Tabs.TabPane tab="Input" key="1">
            <Editor
                height="85vh"
                width={`100%`}
                language={"plaintext"}
                value={""}
                theme="vs-dark"
                defaultValue="// some comment"
                onChange={handleResultBoxTextChange}
            />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Output" key="2">
            <Editor
                height="85vh"
                width={`100%`}
                language={"plaintext"}
                value={""}
                theme="vs-dark"
                defaultValue="// some comment"
                onChange={handleResultBoxTextChange}
            />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Console" key="3">
            Content of Tab Pane 3
            </Tabs.TabPane>
        </Tabs>
    </ResultTabContainer>
);

export default ResultTab;