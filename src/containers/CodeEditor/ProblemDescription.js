
import './ProblemDescription.css';
import { Base64 } from "js-base64";


const ProblemDescription = (props) => {
    let problem = {
        problemIndex: '',
        problemTitle: '',
        description: '',
        problemLink: ''
    }
    if (props.problem !== undefined) {
        problem = props.problem
    }

    if (props.problem !== undefined && props.problem.description !== undefined && props.problem.description.length > 0) {
        problem = Base64.decode(props.problem.description);
        console.log("PROBLEM", problem);
    }

    return (
        <>
            <div className='problem-description'>
                <div className='problem-description-header'>
                    <span className='problem-description-index'>{problem.problemIndex}.</span>
                    <p className='problem-description-header-title'>{problem.problemTitle} (<a className='problem-description-link' target='_blank' href={problem.problemLink}> Leetcode Link </a>)</p>
                </div>
                <hr></hr>
                <div dangerouslySetInnerHTML={{ __html: problem}}></div>
                <hr></hr>
            </div>
        
        </>
    )
}

export default ProblemDescription;
