import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = props => {

    return (
        <ul >
            <NavigationItem
                clicked={props.clicked} 
                link="/" 
                exact>Dashboard</NavigationItem>
            <NavigationItem 
                clicked={props.clicked} 
                link="/Budget" >Budget</NavigationItem>
        </ul>
    );
}

export default navigationItems;