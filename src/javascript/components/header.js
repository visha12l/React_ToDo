import React from 'react';

class Header extends React.Component{
    render () {
        return (
            <header>
                <div className="headerContent">
                    {this.props.headerText}
                </div>
            </header>
        );
    }
};

export default Header;
