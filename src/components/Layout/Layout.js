import React from "react";

import classes from "./Layout.module.css";

const layout = props => (
  <div className={classes.Layout}>
    <header>
      <nav />
    </header>
    <main>
      {props.children}
    </main>
    <footer />
  </div>
);

export default layout;
