import React from "react";

import Budget from "./Budget/Budget";
import FullButton from '../UI/Buttons/FullButton/FullButton';

import classes from "./Budgets.module.css";

const budgets = props => {
  let style = {
    position: 'absolute',
    right: '0',
    top: '10px'
  }

  // const budgets = props.budgets.map((cur, index) => (
  //   <Budget key={index} 
  //     id={index} 
  //     budget={cur} 
  //     viewClicked={props.viewClicked}
  //     deleteClicked={props.deleteClicked}/>
  // ));

  const years = props.years.reverse();
  const months = props.months.reverse();
  const budgets = [];
  let index = 0;

  for (const year of years) {
    for (const month of months) {
      for (const budget of props.budgets) {
        if (budget.date.month === month &&
            budget.date.year ===  year.toString()) {
              budgets.push(
                <Budget key={index} 
                  id={index} 
                  budget={budget} 
                  viewClicked={props.viewClicked}
                  deleteClicked={props.deleteClicked}/>
              );
              index++;
        }
      }
    }
  }

  return (
    <div className={classes.Budgets}>
      <FullButton clicked={props.addClicked}
        style={style}>Add</FullButton>
      <h2 style={{display: 'inline-block'}}>Budget List</h2>
      {budgets.length ? 
        <ul>{budgets}</ul> :
        <div style={{marginTop: '20px'}}>There are currently no budgets in this list.</div>}
    </div>
  );
};

export default budgets;
