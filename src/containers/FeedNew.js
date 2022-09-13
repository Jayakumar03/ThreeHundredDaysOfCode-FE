// Styles.
import '../styles/FeedNew.css';

import { Outlet } from 'react-router-dom';


function FeedNew() {
    return (
        <div className='feed-container'>
            <div className='feed-parent'>
                <Outlet />
            </div>
        </div>
    );
}

export default FeedNew;