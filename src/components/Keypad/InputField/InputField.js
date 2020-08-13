import React from 'react';

import classes from './InputField.module.css'

const inputField = props => {
  let fields = [];

  for (let i = 0; i < 4; i++){
    let symbol = '';
    if (props.values[i]) {
      symbol = '*'
    } else {
      symbol = ''
    }
    fields.push(<div key={i} className={classes.Field}>{symbol}</div>)
  }

  return (
    <div className={classes.InputField}>
      {fields}
    </div>
  );
}

export default inputField;