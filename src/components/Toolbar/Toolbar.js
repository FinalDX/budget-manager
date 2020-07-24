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
      <div className={classes.Title}>
        <div className={classes.FirstName}>Pocket</div>
        <div className={classes.Logo}>
        <img
          src={require('../../assets/images/PocketPlannerLogo.png')}
          alt={'Pocket Planner Logo'}
          style={{width: '30px', margin: '8px 30px 0'}}
          />
        </div>
        <div className={classes.SecondName}>Planner</div>
      </div>
    </header>
  );
};

export default toolbar;
