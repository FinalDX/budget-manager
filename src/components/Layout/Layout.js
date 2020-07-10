import React from "react";

import Toolbar from '../Toolbar/Toolbar';

import classes from "./Layout.module.css";

const layout = props => (
  <div className={classes.Layout}>
    <Toolbar />
    <main>
      {props.children}
    </main>
    <footer />
  </div>
);

export default layout;
