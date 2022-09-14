import { useParams } from 'react-router-dom';

import CodeEditor from './CodeEditor/CodeEditor';

function ProblemSubmission() {
    const submissionId = useParams().submissionId;
    return (
        <>
        <CodeEditor submissionId={submissionId} />
        </>
    );
}

export default ProblemSubmission;