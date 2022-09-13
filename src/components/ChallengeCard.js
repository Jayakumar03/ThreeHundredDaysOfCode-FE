import { useNavigate } from "react-router-dom";
import '../styles/ChallengeCard.css';

function ChallengeCard(props) {
    let navigate = useNavigate();

    function handleClick() {
        navigate(props.url);
    }

    return (
        <div className={'challenge-card-container'} onClick={handleClick}>
            <img className='challenge-card-image' src={props.img}></img>
            <div className="challenge-card-text-container">
                <span className="challenge-card-title-text">{props.title}</span>
                <span className="challenge-card-description-text">{props.description}</span>
            </div>
        </div>
    );
}

export default ChallengeCard;