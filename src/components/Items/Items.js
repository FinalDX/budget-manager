import React from "react";

import Categories from './Categories/Categories';

import classes from "./Items.module.css";

const items = props => {

  // const listItems = props.itemsList.map((cur, index) => {
  //   return (
  //     <Item
  //       key={index}
  //       index={index}
  //       name={cur.name}
  //       amount={cur.amount}
  //       itemType={cur.type}
  //       category={cur.category}
  //       deleted={props.deleted}
  //     />
  //   );
  // });

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
