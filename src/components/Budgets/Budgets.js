import React from "react";

import Budget from "./Budget/Budget";
import FullButton from "../UI/Buttons/FullButton/FullButton";

import classes from "./Budgets.module.css";

const budgets = props => {
  let styleBtn = {
    position: "absolute",
    right: "0",
    top: "10px"
  };

  const years = props.years.reverse();
  const months = props.months.reverse();
  const budgets = [];
  let index = 0;

  // Orders all budgets from the most future date to the most past date
  for (const year of years) {
    for (const month of months) {
      for (const budget of props.budgets) {
        if (
          budget.date.month === month &&
          budget.date.year === year.toString()
        ) {
          budgets.push(
            <Budget
              key={index}
              id={index}
              budget={budget}
              viewClicked={props.viewClicked}
              deleteClicked={props.deleteClicked}
            />
          );
          index++;
        }
      }
    }
  }

  return (
    <div className={classes.Budgets}>
      <FullButton clicked={props.addClicked} style={styleBtn}>
        Add
      </FullButton>
      <h2 style={{ display: "inline-block" }}>Budget List</h2>
      {/* Show budget list only if there is at least one budget */}
      {budgets.length ? (
        <ul>{budgets}</ul>
      ) : (
        <div style={{ marginTop: "20px" }}>
          There are currently no budgets in this list.
        </div>
      )}
    </div>
  );
};

export default budgets;
