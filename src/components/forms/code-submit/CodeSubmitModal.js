import { Check, Close } from "@mui/icons-material";
import { Box, Fade, IconButton, Input, Modal } from "@mui/material";

import './CodeSubmitForm.css';
import { useState } from "react";

const CSInput = (props) => {
    const boxStyle = {
        marginTop: '10px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'baseline'
    };
    const inputStyle = {
        backgroundColor: 'rgb(34, 34, 34) !important',
        paddingLeft: '20px',
        color: 'white !important',
        width: '70%',
        height: '40px',
    };
    const pStyle = { float: 'left', width: '200px' };
    const { label, placeholder, onChange } = props;
    return (
        <Box sx={boxStyle}>
            <p sx={pStyle}>{label}</p>
            <Input sx={inputStyle} placeholder={placeholder} onChange={onChange} value={placeholder} />
        </Box>
    );
}

const CodeSubmitModal = (props) => {
    const boxStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '40%',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const { isOpen, onClose } = props;
    const [problemTitle, setProblemTitle] = useState(props.problem.problemTitle || '');
    const [problemLink, setProblemLink] = useState(props.problem.problemLink || '');
    const [solutionLink, setSolutionLink] = useState("Github Link");

    const handleSubmitSolution = () => {
        // call `handleSubmit` of parent (CodeSubmitForm)
        // TODO (satyam.sundaram): Close the modal if successful
        props.handleSubmit({
            problemTitle: problemTitle,
            problemLink: problemLink,
            solutionLink: solutionLink
        });
    }
    const handleCancel = () => {
        // reset everything on cancel
        setProblemLink(props.problem.problemLink || '');
        setProblemTitle(props.problem.problemTitle || '');
        setSolutionLink("Github Link");
        onClose();
    }

    return (
        <Modal
            open={isOpen}
            onClose={onClose} // Don't reset the form if user clicks outside
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Fade in={isOpen}>
                <Box sx={boxStyle} className={"code-submit-modal"}>
                    <CSInput label="Problem Link:" placeholder={problemLink} onChange={(e) => setProblemLink(e.target.value)} />
                    <CSInput label="Problem Name:" placeholder={problemTitle} onChange={(e) => setProblemTitle(e.target.value)} />
                    <CSInput label="Github Link:" placeholder={solutionLink} onChange={(e) => setSolutionLink(e.target.value)} />
                    <Box className='code-submit-form-input-wrapper'>
                        <IconButton onClick={handleSubmitSolution}><Check sx={{color:"green"}} /></IconButton>
                        <IconButton onClick={handleCancel}><Close sx={{color:"red"}}/></IconButton>
                    </Box>
                </Box>
            </Fade>
        </Modal>
    );
}

export default CodeSubmitModal;