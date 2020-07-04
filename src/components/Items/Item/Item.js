import React from "react";

import classes from "./Item.module.css";

const item = props => (
  <li key={props.id} className={classes.Item}>
    <p className={classes.Name}>{props.name}: </p>
    <div className={classes.Amount}>
      <p>${props.amount}</p>
      <button id={props.id} name={props.itemType} onClick={props.clicked}>
        X
      </button>
    </div>
  </li>
);

export default item;
