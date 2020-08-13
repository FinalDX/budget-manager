import React from 'react';

import classes from './Key.module.css';

const key = props => {
  return(
    <button className={classes.Key} onClick={props.clicked} value={props.value}>{props.value}</button>
  )
}

export default key;