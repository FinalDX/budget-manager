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
      style={props.style}
      defaultValue={props.defaultValue}
      value={props.value}
      className={classes.Select}
      onChange={props.changed}
      placeholder={'placeholder'}
      required
    >
      {props.defaultValue ? (
        <option value={props.defaultValue} disabled={props.disabled}>
          {props.defaultValue}
        </option>
      ) : null}
      {options}
    </select>
  );
};

export default select;
