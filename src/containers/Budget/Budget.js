import React, { Component } from "react";

import Charts from "../../components/Charts/Charts";
import Balance from "../../components/Balance/Balance";
import Controls from "../../components/Controls/Controls";
import Items from "../../components/Items/Items";
import Modal from "../../components/UI/Modal/Modal";

import classes from "./Budget.module.css";

class Budget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSaveModal: false,
      date: new Date().getMonth(),
      incomes: [],
      expenses: [],
      remaining: 0,
      categories: [
        "Dependants",
        "Clothing",
        "Education",
        "Entertainment",
        "Food",
        "Housing",
        "Insurance",
        "Job",
        "Medical",
        "Pets",
        "Personal",
        "Savings",
        "Transportation",
        "Utilities",
        "Other"
      ]
    };
  }

  toggleSaveModal = () =>
    this.setState({ showSaveModal: this.state.showSaveModal ? false : true });

  addItemHandler = inputItem => {
    // Get type and add 's' to match correct list
    const type = inputItem.type.value + "s";
    // Copy list and create newItem
    const updatedItems = [...this.state[type]];
    const newItem = {
      name: inputItem.name.value,
      amount: Number(inputItem.amount.value),
      category: inputItem.category.value,
      type: inputItem.type.value
    };
    // Add new item to copied list
    updatedItems.push(newItem);
    // Update state
    this.setState({ [type]: updatedItems });
    this.updateRemaining("add", newItem.type, newItem.amount);
  };

  deleteItemHandler = (type, key) => {
    const itemType = type + "s";
    let updatedItems = [...this.state[itemType]];
    const deletedItem = updatedItems.splice(key, 1)[0];
    this.setState({ [itemType]: updatedItems });
    this.updateRemaining("delete", type, deletedItem.amount);
  };

  updateRemaining = (action, type, value) => {
    let updatedRemaining = this.state.remaining;
    if (action === "add") {
      if (type === "income") {
        updatedRemaining = updatedRemaining + value;
      } else if (type === "expense") {
        updatedRemaining = updatedRemaining - value;
      }
    } else if (action === "delete") {
      if (type === "income") {
        updatedRemaining = updatedRemaining - value;
      } else if (type === "expense") {
        updatedRemaining = updatedRemaining + value;
      }
    }
    this.setState({ remaining: updatedRemaining });
  };

  render() {
    const months = [
      "January",
      "Febuary",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
    return (
      <div className={classes.Budget}>
        {this.state.showSaveModal ? (
          <Modal
            type={"alert"}
            title={"Saved Budget"}
            message={"This budget has been saved!"}
            canceled={this.toggleSaveModal}
          />
        ) : null}

        <div className={classes.Btns}>
          <button className={classes.SaveBtn} onClick={this.toggleSaveModal}>
            Save
          </button>
          <button className={classes.BackBtn} onClick={this.props.backClicked}>
            Back
          </button>
        </div>

        <Charts
          incomeData={this.state.incomes}
          expenseData={this.state.expenses}
        />
        <hr />
        <p style={{ marginTop: "10px" }}>
          Remaining Budget for {months[this.state.date]}:{" "}
        </p>
        <Balance remaining={this.state.remaining} />
        <Controls
          sendData={this.addItemHandler}
          categories={this.state.categories}
        />
        <div>
          <Items
            title={"Incomes"}
            type={"income"}
            categories={this.state.categories}
            itemsList={this.state.incomes}
            deleted={this.deleteItemHandler}
          />
          <Items
            title={"Expenses"}
            type={"expense"}
            categories={this.state.categories}
            itemsList={this.state.expenses}
            deleted={this.deleteItemHandler}
          />
        </div>
      </div>
    );
  }
}

export default Budget;
