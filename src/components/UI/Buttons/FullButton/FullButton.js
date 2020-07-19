import React from "react";

import classes from "./FullButton.module.css";

const fullButton = props => (
  <button
    onClick={props.clicked}
    className={classes.FullButton}
    type={props.type}
    style={props.style}
    disabled={props.disabled}
  >
    {props.children}
  </button>
);

export default fullButton;
