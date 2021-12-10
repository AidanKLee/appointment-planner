import React from 'react';
import NavLinks from '../NavLinks/NavLinks';
import './MenuNav.css'

class MenuNav extends React.Component {
    render() {
        return (
            <div id='menu'>
                <nav id='menuNav'>
                    <NavLinks/>
                </nav>
            </div>
        )
    }
}

export default MenuNav;