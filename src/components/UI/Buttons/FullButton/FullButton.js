import React from "react";

import classes from "./FullButton.module.css";

const fullButton = props => {
  let addedClasses = [classes.FullButton];
  if (props.color === 'Blue') {
    addedClasses.push(classes.Blue);
  }
  if (props.color === 'Purple') {
    addedClasses.push(classes.Purple);
  }

  return (
    <button
      onClick={props.clicked}
      className={addedClasses.join(' ')}
      type={props.type}
      style={props.style}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
}

export default fullButton;
