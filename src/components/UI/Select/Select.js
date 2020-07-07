import React from "react";
import classes from "./Select.module.css";

const categories = [
  "Housing",
  "Food",
  "Transportation",
  "Utilites",
  "Insurance",
  "Clothing",
  "Medical",
  "Personal",
  "Education",
  "Savings",
  "Entertainment"
];

let options = categories.map((cur, index) => <option key={index} value={cur}>{cur}</option>);

const select = props => (
  <select className={classes.Select} onChange={props.changed} required>
    <option defaultValue="Category" disabled>
      Category
    </option>
    {options}
  </select>
);

export default select;
