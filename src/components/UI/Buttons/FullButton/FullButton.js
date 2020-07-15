import React from "react";

import classes from "./FullButton.module.css";

const fullButton = props => (
  <button
    onClick={props.clicked}
    className={classes.FullButton}
    type={props.type}
  >
    {props.children}
  </button>
);

export default fullButton;
