import './ProblemDescription.css';
import { Base64 } from "js-base64";

const ProblemDescription = (props) => {
    function cleanHTML(input) {
        let output = input.replace(new RegExp('code', 'g'), 'span');
        return output.replace(new RegExp('ul', 'g'), 'p');
    }

    let problemText = '';
    if (props.problem !== undefined && props.problem.description !== undefined && props.problem.description.length > 0) {
        problemText = cleanHTML(Base64.decode(props.problem.description));
    }
    return (
        <>
            <div className='problem-description'>
                <div className='problem-description-header'>
                    <span className='problem-description-index'>{props.problem.problemIndex}.</span>
                    <p className='problem-description-header-title'>
                        {props.problem.problemTitle} (
                            <a className='problem-description-link' target='_blank' href={props.problem.problemLink}> Leetcode Link </a>)
                    </p>
                </div>
                <hr></hr>
                <div dangerouslySetInnerHTML={{ __html: problemText}}></div>
                <hr></hr>
            </div>
        
        </>
    )
}

export default ProblemDescription;
