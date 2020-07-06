import React from "react";

import classes from "./Item.module.css";

const item = props => {
  let addedClasses = [classes.Amount];
  if (props.itemType === "income") {
    addedClasses = [classes.Amount, classes.Green];
  } else if (props.itemType === "expense") {
    addedClasses = [classes.Amount, classes.Red];
  }

  return (
    <li className={classes.Item}>
      <p className={classes.Name}>{props.name}: </p>
      <div className={addedClasses.join(" ")}>
        <p>${props.amount.toFixed(2)}</p>
        <button onClick={() => props.clicked(props.itemType, props.key)}>
          Delete
        </button>
      </div>
    </li>
  );
};

export default item;
