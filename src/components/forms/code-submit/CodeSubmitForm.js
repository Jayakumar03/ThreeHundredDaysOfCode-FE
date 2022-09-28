// Elements.
import { Button } from 'antd';
import React, { useState } from 'react';

// Styles.
import './CodeSubmitForm.css';
import CodeSubmitModal from './CodeSubmitModal';

function CodeSubmitForm(props) {
    // modal toggle
    const [openCodeModal, setOpenCodeModal] = useState(false);
    const toggleCodeModal = () => {
      setOpenCodeModal(prev => {
        return !prev
      });
    }

    const getProblemSubmissions = () => {}

    return (
        <div className='code-submit-form-container'>
            <div className='code-submit-form-inputs'>
                <CodeSubmitModal
                    isOpen={openCodeModal}
                    onClose={toggleCodeModal}
                    problem={props.problem}
                    handleSubmit={props.submitSolution}
                >
                </CodeSubmitModal>
                <div className='code-submit-buttons'>
                    <Button onClick={toggleCodeModal}> Submit Github Link </Button>
                    <Button onClick={getProblemSubmissions}> Submissions </Button>
                </div>
            </div>
        </div>
    );
}

export default CodeSubmitForm;