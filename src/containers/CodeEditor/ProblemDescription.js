
import './ProblemDescription.css';
import { Base64 } from "js-base64";


const ProblemDescription = (props) => {
    let problem = '';
    if (props.problem.description !== undefined && props.problem.description.length > 0) {
        problem = Base64.decode(props.problem.description);
        console.log(problem);
    }

    return (
        <>
            <div className='problem-description'>
                <div className='problem-description-header'>
                    <span className='problem-description-index'>{props.problem.problemIndex}.</span>
                    <p className='problem-description-header-title'>{props.problem.problemTitle} (<a className='problem-description-link' target='_blank' href={props.problem.problemLink}> Leetcode Link </a>)</p>
                </div>
                <hr></hr>
                <div dangerouslySetInnerHTML={{ __html: problem}}></div>
                <hr></hr>
            </div>
        
        </>
    )
}

export default ProblemDescription;
