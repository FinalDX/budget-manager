import React from "react";
import classes from "./Select.module.css";

const categories = [
  "Clothing",
  "Education",
  "Entertainment",
  "Food",
  "Housing",
  "Insurance",
  "Medical",
  "Personal",
  "Savings",
  "Transportation",
  "Utilites",
  "Other"
];

let options = categories.map((cur, index) => (
  <option key={index} value={cur}>
    {cur}
  </option>
));

const select = props => (
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

export default select;
