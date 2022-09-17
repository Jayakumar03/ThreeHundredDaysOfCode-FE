// Elements.
import { Button, Input, Modal } from 'antd';
import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

// Styles.
import '../styles/CodeSubmitForm.css';

function CodeSubmitForm(props) {
    console.log(props);
    const navigate = useNavigate();

    function handleNewProblemClick() {
        document.getElementById('code-submit-form-input-problem-link').style.display = 'block';
        document.getElementById('code-submit-form-input-problem-name').style.display = 'block';
        document.getElementById('code-submit-form-input-github-link').style.display = 'block';
        document.getElementById('code-submit-form-save-button').style.display = 'block';
    }  

    function handleClick() {
        const problemTitle = document.getElementById('code-submit-form-input-problem-name').value;
        const problemLink = document.getElementById('code-submit-form-input-problem-link').value;
        const solutionLink = document.getElementById('code-submit-form-input-github-link').value;
        const values = {
            problemTitle: problemTitle,
            problemLink: problemLink,
            solutionLink: solutionLink
          };
        props.handleClick(values);

        document.getElementById('code-submit-form-input-problem-link').style.display = 'none';
        document.getElementById('code-submit-form-input-problem-name').style.display = 'none';
        document.getElementById('code-submit-form-input-github-link').style.display = 'none';
        document.getElementById('code-submit-form-save-button').style.display = 'none';
    }

    function getProblemSubmissions() {
        const problemId = props.problemId;        
        navigate("/problemSubmissions/" + problemId);
    }

    return (
        <div className='code-submit-form-container'>
        <div className='code-submit-form-inputs'>
            <Input className='code-submit-form-input' id='code-submit-form-input-problem-link' value={props.problem.problemLink} />
            <Input className='code-submit-form-input' id='code-submit-form-input-problem-name' value={props.problem.problemTitle} />
            <Input className='code-submit-form-input' id='code-submit-form-input-github-link' placeholder="Github Link"/>
            <Button className='code-submit-form-submit-button' id='code-submit-form-save-button' onClick={handleClick}> Save </Button>
            <div className='code-submit-buttons'>
                <Button className='code-submit-form-submit-button' onClick={handleNewProblemClick}> Submit Github Link </Button>
                <Button className='code-submit-form-submit-button' onClick={getProblemSubmissions}>Submissions </Button>
            </div>
        </div>
    </div>
    
    );
}

export default CodeSubmitForm;