import React from "react";

import Budget from "./Budget/Budget";
import FullButton from '../UI/Buttons/FullButton/FullButton';

import classes from "./Budgets.module.css";

const budgets = props => {
  const budgets = props.budgets.map((cur, index) => (
    <Budget key={index} id={index} budget={cur} />
  ));

  return (
    <div className={classes.Budgets}>
      <h2>Budget List</h2>
      <FullButton clicked={props.addClicked}>Add</FullButton>
      <ul>{budgets}</ul>
    </div>
  );
};

export default budgets;
