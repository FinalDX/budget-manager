import React from "react";

import classes from "./Balance.module.css";

const balance = props => {
  let addedClasses = [];
  if (props.remaining > 0) {
    addedClasses = [classes.Green];
  } else if (props.remaining < 0) {
    addedClasses = [classes.Red];
  }

  return (
    <h1 className={addedClasses.join(" ")}>$ {props.remaining.toFixed(2)}</h1>
  );
};

export default balance;
