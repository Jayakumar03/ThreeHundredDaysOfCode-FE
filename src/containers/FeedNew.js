// Styles.
import '../styles/FeedNew.css';
import Feed from './Feed';

function FeedNew() {
    return (
        <div className='feed-container'>
            <div className='feed-parent'>
                <Feed />
            </div>
        </div>
    );
}

export default FeedNew;