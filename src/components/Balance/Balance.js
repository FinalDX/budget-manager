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
  // Use absolute value to remove the negative sign
  // that appears between the dollar sign and the 
  // remaining value when the remaining value is a
  // negative number.
  let absValue = Math.abs(props.remaining).toFixed(2);

  return (
    <span className={addedClasses.join(" ")}
      style={props.style}>
      {sign}${absValue}
    </span>
  );
};

export default balance;
