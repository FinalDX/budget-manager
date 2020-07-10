import React from "react";
import classes from "./Select.module.css";

const select = props => {
  let options = props.categories.map((cur, index) => (
    <option key={index} value={cur}>
      {cur}
    </option>
  ));

  return (
    <select
      defaultValue="Category"
      className={classes.Select}
      onChange={props.changed}
      required
    >
      <option value="Category" disabled>
        Category
      </option>
      {options}
    </select>
  );
}

export default select;
