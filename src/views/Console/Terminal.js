import React, { useEffect, useState } from 'react';
import { w3cwebsocket as W3CWebSocket } from "websocket";

// Constants.
const WEB_SOCKET_PROTOCOL = "echo-protocol";
const TERMINAL_PROMPT = '>';
const COMMAND_RUN_TRIGGER = 'ENTER';
const METHOD_NAME = 'command';
const COMMAND_PLACEHOLDER = "Enter Command";

const webSocket = new W3CWebSocket(process.env.REACT_APP_CONSOLE_SOCKET_PATH, WEB_SOCKET_PROTOCOL);

// Style Components.
const TerminalOuterContainer = styled.main`
  margin-top: 50px;
  height: calc(100vh - 50px);
`

const TerminalInnerContainer = styled.main`
margin-top: 10px;
`

const CommandView = styled.main`
text-align: left;
`

const Terminal = () => {
    const [command, setCommand] = useState('');
    const [commandList, setCommandList] = useState([]);
    
    // Clearing the command list when the page is loaded.
    useEffect(()=>{
        ws.onmessage = msg => {
            setCommandList((currentCommandList)=> ([...currentCommandList, JSON.parse(msg.data)]));
        };
    },[]);

    // Handler for sending the command.
    const handleSendCommand = () => {
        const data = { method: METHOD_NAME, command: command };
        ws.send(JSON.stringify(data));
        setCommand('');
    }
    const handleInputChange = (e) => {
        setCommand(e.target.value);
    }
    const handleKeyPress = (e) => {
        if (e.key === COMMAND_RUN_TRIGGER) {
            handleSendCommand();
        }
    }

    return (
        <TerminalOuterContainer>
            <TerminalInnerContainer>
            {commandList.map((commands, index) => {
                return <CommandView key={index}>{commands.data}</CommandView>
            })}
            <InputContainer>
                <span>&nbspc;{TERMINAL_PROMPT}&nbspc;</span>
                <input
                value = {command}
                placeholder = {COMMAND_PLACEHOLDER}
                onChange = {handleInputChange}
                onKeyPress = {handleKeyPress}                                
                />                    
            </InputContainer>
            </TerminalInnerContainer>
        </TerminalOuterContainer>
    );
}

export default Terminal;