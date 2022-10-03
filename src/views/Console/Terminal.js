import React, { useState } from 'react';
import styled from 'styled-components';
import SockJsClient from 'react-stomp';

// Constants.
const TERMINAL_PROMPT = '>';
const COMMAND_RUN_TRIGGER = 'Enter';
const METHOD_NAME = 'command';
const COMMAND_PLACEHOLDER = "Enter Command";

// Style Components.
const TerminalOuterContainer = styled.main`
  margin-top: 50px;
  height: calc(100vh - 50px);
`

const TerminalInnerContainer = styled.main`
margin-top: 50px;
color: white;
`

const CommandView = styled.main`
text-align: left;
color: white;
`

const InputContainer = styled.main``

const Terminal = () => {
    const [command, setCommand] = useState('');
    const [commandList, setCommandList] = useState([]);
    const [connected, setConnected] = useState(false); 
    const [client, setClient] = useState(null);
    const wsSourceUrl = process.env.REACT_APP_CONSOLE_END_POINT;

    const onConnect = () => {
        setConnected(true);
        console.log('Connected');
    }
    const onMessage = (msg) => {
        console.log('message received')
        const command = {
            command: msg.command,
            response: msg.response
        }
        setCommandList((currentCommandList) => ([...currentCommandList, command]));
    }
    const onDisconnect = () => {        
        setConnected(false);
        console.log("Disconnected");
    }
    
    // Handler for sending the command.
    const handleSendCommand = (command) => {
        const data = { method: METHOD_NAME, command: command };
        try {
            client.sendMessage("/app/all", JSON.stringify(data));
            setCommand('');
            console.log('message sent successfully')
        } catch (e) {
            console.log('failed to send message')
            console.log(e)
        }
    }
    const handleInputChange = (e) => {
        setCommand(e.target.value);
    }
    const handleKeyPress = (e) => {
        if (e.key === COMMAND_RUN_TRIGGER) {
            handleSendCommand(e.target.value);
        }
    }

    return (
        <TerminalOuterContainer>
            <h1>Output</h1> 
            <TerminalInnerContainer>
            {commandList.map((pair, index) => {
                return <CommandView key={index}>{pair.command}<br/>{pair.response}</CommandView>
            })}
            <InputContainer>
                <span>{TERMINAL_PROMPT}</span>
                <input
                value = {command}
                placeholder = {COMMAND_PLACEHOLDER}
                onChange = {handleInputChange}
                onKeyPress = {handleKeyPress}                                
                />
                <SockJsClient 
                url={wsSourceUrl}
                topics={["/topic/all"]}
                onMessage={onMessage}
                ref={ (client) => {setClient(client)}}
                onConnect={onConnect}
                onDisconnect={onDisconnect}
                debug={false}
                />
            </InputContainer>
            </TerminalInnerContainer>
        </TerminalOuterContainer>
    );
}

export default Terminal;