import React from 'react';
import classes from './Backdrop.module.css';

const backdrop = props => (
    props.show ? 
        <div className={classes.Backdrop} style={{zIndex: props.layer}}
            onClick={props.clicked}></div> : null
)

export default backdrop;