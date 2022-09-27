// Elements.
import { Button, Input, Modal } from 'antd';

import { Navigate, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

// Styles.
import './CodeSubmitForm.css';

function CodeSubmitForm(props) {    
    const navigate = useNavigate();
    function handleNewProblemClick() {
        document.getElementById('code-submit-form-elements').style.display = 'block';
    }
    function handleClick() {
        let problemTitle = document.getElementById('code-submit-form-input-problem-name').value;
        if (problemTitle === '') { 
            problemTitle = props.problem.problemTitle;
        }
        let problemLink = document.getElementById('code-submit-form-input-problem-link').value
        if (problemLink === '') {
            problemLink = props.problem.problemLink;
        }
        const solutionLink = document.getElementById('code-submit-form-input-github-link').value;
        const values = {
            problemTitle: problemTitle,
            problemLink: problemLink,
            solutionLink: solutionLink
          };
        props.handleClick(values);

        document.getElementById('code-submit-form-elements').style.display = 'none';
    }

    function getProblemSubmissions() {
        const problemId = props.problemId;        
        navigate("/problemSubmissions/" + problemId);
    }


    return (
        <div className='code-submit-form-container'>
        <div className='code-submit-form-inputs'>
            <div className='code-submit-form-elements' id='code-submit-form-elements'>
                <div className='code-submit-form-input-wrapper'>
                    <p className='code-submit-form-input-name'>Problem Link:</p>
                    <Input className='code-submit-form-input' id='code-submit-form-input-problem-link' placeholder={props.problem.problemLink} />
                </div>
                <div className='code-submit-form-input-wrapper'>
                    <p className='code-submit-form-input-name'>Problem Name:</p>
                    <Input className='code-submit-form-input' id='code-submit-form-input-problem-name' placeholder={props.problem.problemTitle} />
                </div>    
                <div className='code-submit-form-input-wrapper'>
                    <p className='code-submit-form-input-name'>Github Link:</p>
                    <Input className='code-submit-form-input' id='code-submit-form-input-github-link' placeholder="Github Link"/>
                </div>
                <div className='code-submit-form-input-wrapper'>
                    <Button className='code-submit-form-submit-button' id='code-submit-form-save-button' onClick={handleClick}> Save </Button>
                </div>
            </div>
            <div className='code-submit-buttons'>
                <Button className='code-submit-form-submit-button' onClick={handleNewProblemClick}> Submit Github Link </Button>
                <Button className='code-submit-form-submit-button' onClick={getProblemSubmissions}>Submissions </Button>
            </div>
        </div>
    </div>
    
    );
}

export default CodeSubmitForm;