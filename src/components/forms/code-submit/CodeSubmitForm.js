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

    return (
        <div className='code-submit-form-container'>
            <div className='code-submit-form-inputs'>
                <CodeSubmitModal
                    isOpen={openCodeModal}
                    onClose={toggleCodeModal}
                    problem={props.problem}
                    handleSubmit={props.submitSolution}
                />
                <div className='code-submit-buttons'>
                    <Button onClick={toggleCodeModal}> Submit Github Link </Button>                    
                </div>
            </div>
        </div>
    );
}

export default CodeSubmitForm;