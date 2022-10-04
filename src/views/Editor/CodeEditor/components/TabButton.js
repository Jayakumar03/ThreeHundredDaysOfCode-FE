import React from 'react';
import styled from 'styled-components';

const TabButtonContainer = styled.main`
    width: 100%;
    display: flex;
    height: 30px;
    border-radius: 0.375rem;

    &:hover{
        background: #ebe7e7;
        cursor: pointer;
    }

    ${({ active })  => active && `
        background: #ebe7e7;
        border: 1px solid black;
    `}
}
`

const TextBox = styled.main`
    padding-left: 10px;
`

const TabButton = (props) => {
    const isActive = props.id === props.activeId;    
    const handleClick = () => {
        props.onClick(props.id);
    }
    return (
        <TabButtonContainer 
        active={isActive}
        onClick={handleClick}
        >
        <TextBox>{props.label}</TextBox>
        </TabButtonContainer>
    );
}
export default TabButton;