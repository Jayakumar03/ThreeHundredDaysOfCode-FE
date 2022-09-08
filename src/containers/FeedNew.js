// Styles.
import '../styles/FeedNew.css';

import Feed from './Feed';
import FeedLeftPanel from '../components/FeedLeftPanel';

function FeedNew() {
    return (
        <div className='feed-container'>
            <FeedLeftPanel />
            <div className='feed-parent'>
                <Feed />
            </div>
        </div>
    );
}

export default FeedNew;