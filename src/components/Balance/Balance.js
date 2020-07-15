import React from "react";

import classes from "./Balance.module.css";

const balance = props => {
  let addedClasses = [];
  let sign = "";
  if (props.remaining > 0) {
    addedClasses = [classes.Green];
    sign = "+";
  } else if (props.remaining < 0) {
    addedClasses = [classes.Red];
    sign = "-";
  }

  return (
    <span className={addedClasses.join(" ")}>
      {sign}${props.remaining.toFixed(2)}
    </span>
  );
};

export default balance;
