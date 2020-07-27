import React from "react";

import Backdrop from "../Backdrop/Backdrop";

import classes from "./Modal.module.css";

const modal = props => {
  let buttons = (
    <div>
      <button 
        onClick={props.confirmed}>
          OK
      </button>

      <button 
        onClick={props.canceled}>
        Cancel
      </button>
    </div>
  );
  if (props.type === "alert") {
    buttons = <button onClick={props.canceled}>OK</button>;
  } else if (props.type === "action") {
    buttons = <button onClick={props.canceled}>Cancel</button>;
  }

  return (
    <div>
      <Backdrop show={true} clicked={props.canceled} layer={800} />
      <div className={classes.Modal}>
        <div className={classes.Title}>
          <p>{props.title}</p>
        </div>
        <div className={classes.Message}>
          <p>{props.message}</p>
        </div>
        <div>
          {props.type === 'prompt' ? 
            props.form
            : null}
          {props.type === 'action' ?
            props.actions :
            null}
          <div className={classes.Buttons}>{buttons}</div>
        </div>
      </div>
    </div>
  );
};

export default modal;
