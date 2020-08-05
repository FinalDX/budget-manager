import React from "react";

import Backdrop from "../Backdrop/Backdrop";

import classes from "./Modal.module.css";

const modal = props => {
  // Defualt OK and Cancel buttons for Modals
  let buttons = (
    <div>
      <button className={classes.OKBtn} onClick={props.confirmed}>
        OK
      </button>

      <button className={classes.CancelBtn} onClick={props.canceled}>
        Cancel
      </button>
    </div>
  );
  // Display only an OK button if the Modal is an alert
  if (props.type === "alert") {
    buttons = (
      <button className={classes.OKBtn} onClick={props.canceled}>
        OK
      </button>
    );
    // Display only a Cancel button if the Modal is an action
  } else if (props.type === "action") {
    buttons = (
      <button className={classes.CancelBtn} onClick={props.canceled}>
        Cancel
      </button>
    );
  }

  // Add class to show modal using animation
  let addedClasses = [classes.Modal];
  if (props.show) {
    addedClasses.push(classes.ShowModal);
  }

  return (
    <div>
      <Backdrop show={props.show} clicked={props.canceled} layer={800} />
      <div className={addedClasses.join(" ")}>
        <div className={classes.Title}>
          <p>{props.title}</p>
        </div>
        <div className={classes.Message}>
          <p>{props.message}</p>
        </div>
        <div>
          {/*Add passed in form if Modal is a prompt*/}
          {props.type === "prompt" ? props.form : null}
          {/*Add passed in actions if Modal is an action*/}
          {props.type === "action" ? props.actions : null}
          <div className={classes.Buttons}>{buttons}</div>
        </div>
      </div>
    </div>
  );
};

export default modal;
