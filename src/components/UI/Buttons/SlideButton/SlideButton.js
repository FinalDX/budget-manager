import React from 'react';

import classes from './SlideButton.module.css';

const slideButton = props => {
    let addedClasses = [classes.SlideButton];
    if (props.show) {
        addedClasses = [classes.SlideButton, classes.ShowBtn];
    }
    if (props.color === 'Blue') {
        addedClasses.push(classes.Blue);
    }
    if (props.color === 'Red') {
        addedClasses.push(classes.Red);
    }
    
    return (
        <button className={addedClasses.join(' ')}
            style={props.style}
            onClick={props.clicked}>{props.children}</button>
    )
}

export default slideButton;