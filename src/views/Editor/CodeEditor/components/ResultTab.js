import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import 'antd/dist/antd.css';
import {UpCircleOutlined, DownCircleOutlined, RightOutlined, PlayCircleOutlined} from '@ant-design/icons';
import TabButton from './TabButton';
import Editor from "@monaco-editor/react";

const defaultPanes = [
    {
        id: '1',
        label: 'Input',        
        img: {DownCircleOutlined}
    },
    {
        id: '2',
        label: 'Output',
        img: {UpCircleOutlined}
    },
    {
        id: '3',
        label: 'Console',
        img: {RightOutlined}

    },
    {
        id: '4',
        label: 'Shell',
        img: {PlayCircleOutlined}
    }
];

const ResultTabContainer = styled.main`
    width: 30%;
    background-color: white;
    height: 85vh;
` 
const TabListContainer = styled.main`
    width: 100%;
    display: flex;
    padding-left: 5px;
`
const ResultTextContainer = styled.main`
    height: 100%;
    width: 100%;
    color: white;
`
const InputStyled = styled.input`
    background-color: black;
    color: white;    
    width: 100%;
    height: 100%;

`
const ResultTab = () => {
    const [activeKey, setActiveKey] = useState(defaultPanes[0].id);
    const [items, setItems] = useState(defaultPanes);
    const newTabIndex = useRef('1');
    const [inputText, setInputText] = useState('');
    const [outputText, setOutputText] = useState('');
    const [terminalText, setTerminalText] = useState('');
    const [consoleText, setConsoleText] = useState('');
    const [resultText, setResultText] = useState('');
    
    // Handlers.
    const handleOnChange = (id) => {
        setActiveKey(id);
    };
    const handleResultBoxTextChange = () => {}
    return (
    <ResultTabContainer>
        <TabListContainer>
            <>
            {items.map((item, index) => (
              <TabButton 
                key={item.id}
                id={item.id}
                label={item.label}
                activeId={activeKey}
                onClick={handleOnChange}
              />
            ))}            
            </>            
        </TabListContainer>
        <Editor
        height="85vh"
        width={`100%`}
        language={"plaintext"}
        value={""}
        theme="vs-dark"
        defaultValue="// some comment"
        onChange={handleResultBoxTextChange}
        />
    </ResultTabContainer>
    );
};

export default ResultTab;