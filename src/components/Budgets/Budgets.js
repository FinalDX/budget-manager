import React from "react";

import Budget from "./Budget/Budget";

const budgets = props => {
  const budgets = props.budgets.map((cur, index) => (
    <Budget key={index} month={cur.date.getMonth()} year={cur.date.getYear()} />
  ));

  return (
    <div>
      <h2>Budgets</h2>
      <button>Add</button>
      <ul>{budgets}</ul>
    </div>
  );
};

export default budgets;
