import React from 'react';

import classes from './TextButton.module.css';

const textButton = props => {
    return(
        <button 
            className={classes.TextButton}
            style={{color: props.color}}
            onClick={props.clicked}>
                {props.children}
        </button>
    );
}

export default textButton;