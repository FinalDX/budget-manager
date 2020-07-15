import React, { Component } from "react";

import Charts from "../../components/Charts/PieCharts";
import Balance from "../../components/Balance/Balance";
import Controls from "../../components/Controls/Controls";
import Items from "../../components/Items/Items";
import Modal from "../../components/UI/Modal/Modal";

import classes from "./BudgetControls.module.css";

class Budget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSaveModal: false,
      budget: {
        date: this.props.date,
        incomes: [],
        expenses: [],
        remaining: 0
      },
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
    // Clone budget and appropriate list
    let updatedBudget = {...this.state.budget};
    let updatedItems = [...updatedBudget[type]];
    // Create new item object from the input item
    const newItem = {
      name: inputItem.name.value,
      amount: Number(inputItem.amount.value),
      category: inputItem.category.value,
      type: inputItem.type.value
    };
    // Add new item to copied list
    updatedItems.push(newItem);
    updatedBudget[type] = updatedItems;
    // Update remaining budget value
    updatedBudget.remaining = this.updateRemaining("add", newItem.type, newItem.amount);
    // Update state
    this.setState({budget: updatedBudget});
  };

  deleteItemHandler = (type, key) => {
    // Get type and add 's' to match correct list
    const itemType = type + "s";
    // Clone budget and appropriate list
    let updatedBudget = {...this.state.budget};
    let updatedItems = [...updatedBudget[itemType]];
    // Delete item from list and retrieve it
    const deletedItem = updatedItems.splice(key, 1)[0];
    updatedBudget[itemType] = updatedItems;
    // Update remaining budget value
    updatedBudget.remaining = this.updateRemaining("delete", type, deletedItem.amount);
    // Update state
    this.setState({ budget: updatedBudget });
  };

  updateRemaining = (action, type, value) => {
    // Clone budget and remaining value
    let updatedBudget = {...this.state.budget};
    let updatedRemaining = updatedBudget.remaining;
    // Perform the appropriate change based on the given action
    if ((action === "add" && type === "income") ||
        (action === "delete" && type === "expense")) {
          updatedRemaining = updatedRemaining + value;
        }
    else if ((action === "add" && type === "expense") ||
             (action === "delete" && type === "income")) {
              updatedRemaining = updatedRemaining - value;
            }
    return updatedRemaining;
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

        <Charts
          incomeData={this.state.budget.incomes}
          expenseData={this.state.budget.expenses}
        />
        <hr />
        <div className={classes.Btns}>
          <button
            className={classes.SaveBtn}
            onClick={() => {
              this.toggleSaveModal();
              this.props.sendBudget(this.state.budget);
            }}
          >
            Save
          </button>
          <button className={classes.BackBtn} onClick={this.props.backClicked}>
            Back
          </button>
        </div>
        <p style={{ marginTop: "10px" }}>
          Remaining Budget for {months[this.state.budget.date.getMonth()]} of{" "}
          {this.state.budget.date.getFullYear()}:{" "}
        </p>
        
        <Balance remaining={this.state.budget.remaining} />
        <Controls
          sendData={this.addItemHandler}
          categories={this.state.categories}
        />
        <div>
          <Items
            title={"Incomes"}
            type={"income"}
            categories={this.state.categories}
            itemsList={this.state.budget.incomes}
            deleted={this.deleteItemHandler}
          />
          <Items
            title={"Expenses"}
            type={"expense"}
            categories={this.state.categories}
            itemsList={this.state.budget.expenses}
            deleted={this.deleteItemHandler}
          />
        </div>
      </div>
    );
  }
}

export default Budget;
