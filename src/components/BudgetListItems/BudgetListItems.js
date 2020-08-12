import React, { Component } from "react";

import Budget from "./BudgetListItem/BudgetListItem";
import FullButton from "../UI/Buttons/FullButton/FullButton";

import classes from "./BudgetListItems.module.css";

class Budgets extends Component {

  render() {
    // Clone and reverse year an month arrays so that
    // a sorted list can be built from future to past.
    let years = [...this.props.years];
    let months = [...this.props.months];
    years.reverse();
    months.reverse();
    const budgets = [];

    // Orders all budgets from the most future date to the most past date
    for (const year of years) {
      for (const month of months) {
        for (const budget of this.props.budgets) {
          if (
            budget.date.month === month &&
            budget.date.year === year.toString()
          ) {
            budgets.push(
              <Budget
                key={budget.id}
                id={budget.id}
                budget={budget}
                viewClicked={this.props.viewClicked}
                deleteClicked={this.props.deleteClicked}
              />
            );
          }
        }
      }
    }

    return (
      <div className={classes.Budgets}>
        <h2>Budget List</h2>
        <div className={classes.AddBtn}>
          <FullButton 
            color={'Blue'}
            clicked={this.props.addClicked}>
            Add
          </FullButton>
        </div>
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
}

export default Budgets;
