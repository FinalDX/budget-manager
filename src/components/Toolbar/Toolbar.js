import React from "react";

import classes from "./Toolbar.module.css";

const toolbar = props => {
  return (
    <header className={classes.Toolbar}>
      <nav>
        <div className={classes.Menu}>Menu</div>
      </nav>
      <div className={classes.Title}>Budget Manager</div>
    </header>
  );
};

export default toolbar;
