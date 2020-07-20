import React from "react";

import Categories from './Categories/Categories';

import classes from "./Items.module.css";

const items = props => {
  let addedClasses = [classes.Items];

  if (props.type === "income") {
    addedClasses = [classes.Items, classes.Green];
  } else if (props.type === "expense") {
    addedClasses = [classes.Items, classes.Red];
  }

  return (
    <div className={addedClasses.join(" ")}>
      <h2>{props.title}</h2>
      <Categories categories={props.categories}
        itemsList={props.itemsList}
        deleted={props.deleted} />
    </div>
  );
}

export default items;
