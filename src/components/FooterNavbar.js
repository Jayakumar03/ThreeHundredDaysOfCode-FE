import React from 'react';

import '../styles/Navbar.css';
import '../styles/Common.css';
import '../styles/Footer.css';

function FooterNavbar() {
    return (
        <div className="footer">
            <div className="mx2 flex-none big quiet">
                <a href="https://www.decoverhq.com/privacy" className="link link-quiet focus-visible understroke active link-quiet navbar-text">Privacy</a>
                <a href="https://www.decoverhq.com/terms" className="link link-quiet focus-visible understroke active link-quiet navbar-text">Terms</a>
                <a href="https://www.decoverhq.com/help" className="link link-quiet focus-visible understroke active link-quiet navbar-text">How To Search</a>
            </div>
        </div>
    );
}

export default FooterNavbar;