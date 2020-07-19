import React from "react";
import classes from "./Select.module.css";

const select = props => {
  let options = props.options.map((cur, index) => (
    <option key={index} value={cur}>
      {cur}
    </option>
  ));

  return (
    <select
      defaultValue={props.defaultValue}
      className={classes.Select}
      onChange={props.changed}
      required
    >
      {props.haveDefaultOption ? 
      <option value={props.defaultValue} disabled>
        {props.defaultValue}
      </option> : null}
      {options}
    </select>
  );
}

export default select;
