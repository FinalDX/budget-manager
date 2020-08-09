import React from 'react';

import classes from './Input.module.css';

const input = props => {
    return (
        <input
            className={classes.Input}
            style={props.style}
            type={props.type}
            placeholder={props.placeholder}/>
    )
}

export default input;