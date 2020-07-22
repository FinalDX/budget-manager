import React from "react";

import classes from "./Toolbar.module.css";

const toolbar = props => {
  return (
    <header className={classes.Toolbar}>
      <nav className={classes.Navigation}>
          <button  className={classes.TopBtn}
            onClick={() => {
              window.scrollTo({
                top: 0,
                behavior: "smooth"
              });
            }}
          >
            Top
          </button>
      </nav>
      <div className={classes.Title}>Budget Manager</div>
    </header>
  );
};

export default toolbar;
