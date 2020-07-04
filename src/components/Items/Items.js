import React from "react";
import Item from "./Item/Item";

import classes from "./Items.module.css";

const items = props => {
  const listItems = props.itemsList.map((cur, index) => {
    return (
      <Item
        id={cur.id}
        itemType={cur.type}
        name={cur.name}
        amount={cur.amount}
        clicked={props.clicked}
      />
    );
  });

  let addedClasses = [classes.Items];

  if (props.type === "income") {
    addedClasses = [classes.Items, classes.Green];
  } else if (props.type === "expense") {
    addedClasses = [classes.Items, classes.Red];
  }

  return (
    <div className={addedClasses.join(" ")}>
      <h2>{props.title}</h2>
      <ul>{listItems}</ul>
    </div>
  );
};

export default items;
