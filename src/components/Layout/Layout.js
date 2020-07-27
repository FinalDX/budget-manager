import React from "react";

import Toolbar from '../Toolbar/Toolbar';

import classes from "./Layout.module.css";

const layout = props => (
  <div className={classes.Layout}>
    <Toolbar />
    <main className={classes.Main}>
      {props.children}
    </main>
    <footer />
  </div>
);

export default layout;
