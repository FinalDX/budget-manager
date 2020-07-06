import React, { Component } from "react";
import Balance from "../../components/Balance/Balance";
import Controls from "../../components/Controls/Controls";
import Items from "../../components/Items/Items";

class Budget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      incomes: [],
      expenses: [],
      remaining: 0
    };
  }

  addItemHandler = inputItem => {
    const type = inputItem.type.value + "s";
    const updatedItems = [...this.state[type]];
    const newItem = {
      name: inputItem.name.value,
      amount: Number(inputItem.amount.value),
      category: inputItem.category.value,
      type: inputItem.type.value
    };

    updatedItems.push(newItem);

    this.setState({ [type]: updatedItems });
    this.updateRemaining(newItem.type, newItem.amount);
  };

  deleteItemHandler = (type, key) => {
    const itemType = type + "s";
    let updatedItems = [...this.state[itemType]];
    const deletedItem = updatedItems.splice(key, 1);
    this.setState({ [itemType]: updatedItems });
    this.updateRemaining(type, deletedItem.amount);
  };

  updateRemaining = (action, type, value) => {
    console.log(value);
    console.log(type);
    let updatedRemaining = this.state.remaining;
    if (action === "add") {
      if (type === "income") {
        updatedRemaining = updatedRemaining + value;
      } else if (type === "expense") {
        console.log("deleting");
        updatedRemaining = updatedRemaining - value;
      }
    } else if (action === "remove") {
      if (type === "income") {
        updatedRemaining = updatedRemaining - value;
      } else if (type === "expense") {
        console.log("deleting");
        updatedRemaining = updatedRemaining + value;
      }
    }
    this.setState({ remaining: updatedRemaining });
  };

  render() {
    return (
      <div>
        <p>Remaining Budget: </p>
        <Balance remaining={this.state.remaining} />
        <Controls sendData={this.addItemHandler} />
        <div>
          <Items
            title={"Incomes"}
            type={"income"}
            itemsList={this.state.incomes}
            clicked={this.deleteItemHandler}
          />
          <Items
            title={"Expenses"}
            type={"expense"}
            itemsList={this.state.expenses}
            clicked={this.deleteItemHandler}
          />
        </div>
      </div>
    );
  }
}

export default Budget;
