import React, { Component } from "react";
import Balance from "../../components/Balance/Balance";
import Controls from "../../components/Controls/Controls";
import Items from "../../components/Items/Items";

class Budget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      type: "income",
      name: "Name",
      amount: 0,
      incomes: [],
      expenses: [],
      remaining: 0
    };
  }

  inputHandler = e => {
    if (e.target.name === "name") {
      this.setState({ name: e.target.value });
    } else if (e.target.name === "amount") {
      this.setState({ amount: e.target.value });
    }
  };

  radioHandler = e => {
    this.setState({ type: e.target.value });
  };



  addHandler = () => {
    // Copy state.
    let newState = { ...this.state };
    let newItems = [];
    let newItem = {
      id: newState.id + 1,
      name: newState.name,
      amount: newState.amount,
      type: newState.type
    };
    let newRemaining = newState.remaining;

    console.log(newState);

    // Check type
    if (newState.type === "income") {
      newItems = [...newState.incomes];
      newItems.push(newItem);
      newRemaining = newRemaining + newState.amount;
      this.setState({
        incomes: newItems,
        remaining: newRemaining,
        id: newItem.id
      });
    } else if (newState.type === "expense") {
      newItems = [...newState.expenses];
      newItems.push(newItem);
      newRemaining = newRemaining - newState.amount;
      this.setState({
        expenses: newItems,
        remaining: newRemaining,
        id: newItem.id
      });
    }
  };

  deleteItemHandler = e => {
    let newItems = [];
    if (e.target.name === "income") {
      newItems = [...this.state.incomes];
      newItems.splice(
        this.state.incomes.findIndex(item => +item.id === +e.target.id),
        1
      );
      this.setState({ incomes: newItems });
    } else if (e.target.name === "expense") {
      newItems = [...this.state.expenses];
      newItems.splice(
        this.state.incomes.findIndex(item => +item.id === +e.target.id),
        1
      );
      this.setState({ expenses: newItems });
    }
  };

  render() {
    return (
      <div>
        <p>Remaining Budget: </p>
        <Balance remaining={this.state.remaining} />
        <Controls
          changed={this.inputHandler}
          type={this.state.type}
          checked={this.radioHandler}
          clicked={this.addHandler}
        />
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
