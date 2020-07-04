import React from "react";

import classes from './Controls.module.css';

const controls = props => {
  return (
    <div className={classes.Controls}>
      <p>Add an income or an expense: </p>
      <input
        type="text"
        placeholder="Name"
        name="name"
        onChange={props.changed}
      />
      <input
        type="text"
        placeholder="Amount"
        name="amount"
        onChange={props.changed}
      />

      <label>
        <input
          type="radio"
          name="itemType"
          value="income"
          checked={props.type === "income"}
          onChange={props.checked}
        />
        Income
      </label>

      <label>
        <input
          type="radio"
          name="itemType"
          value="expense"
          checked={props.type === "expense"}
          onChange={props.checked}
        />
        Expense
      </label>

      <button
        onClick={props.clicked}>Add</button>
    </div>
  );
};

export default controls;
