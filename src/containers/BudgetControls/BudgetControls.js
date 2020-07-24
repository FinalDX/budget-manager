import React, { Component } from "react";

import Charts from "../../components/Charts/PieCharts/PieCharts";
import Balance from "../../components/Balance/Balance";
import Controls from "../../components/Controls/Controls";
import Items from "../../components/Items/Items";
import Modal from "../../components/UI/Modal/Modal";

import classes from "./BudgetControls.module.css";
import DBService from "../../services/DBService/DBService";

const DB = new DBService();
const ITEM_LIMIT = 30;

class Budget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      budget: this.props.selectedBudget,
      modal: {},
      saved: true
    };
  }
  /* 
  Budget object structure
    budget: {
              id: shortID.generate(),
              date: {month: string, year: string},
              incomes: [Item objects],
              expenses: [Item Objects],
              remaining: number
            } 
  */

  // Hide the Modal component
  hideModal = () => this.setState({ modal: { show: false } });
  // ----------------------------------------------------------

  // Create an item object from inputItem and add it to the income array
  // or the expense array of the budget object in the local state.
  addItemHandler = inputItem => {
    // Get item type and add 's' to match the correct property
    // key in the budget object: incomes or expenses.
    const type = inputItem.type.value + "s";

    let updatedBudget = { ...this.state.budget };
    let updatedItems = [...updatedBudget[type]];

    // Check that item amount has not exceeded limit
    if (updatedItems.length < ITEM_LIMIT) {
      const newItem = {
        name: inputItem.name.value,
        amount: Number(inputItem.amount.value),
        category: inputItem.category.value,
        type: inputItem.type.value
      };
      updatedItems.push(newItem);
      updatedBudget[type] = updatedItems;
      // Update the value of remaining in the budget object in the state.
      updatedBudget.remaining = this.updateRemaining(
        "add",
        newItem.type,
        newItem.amount
      );
      this.setState({ budget: updatedBudget, saved: false });
    } else {
      this.summonAlertModal('Limit Reached!',
        'The total amount of items in this budget has been reahced.',
        this.hideModal);
    }
  };
  // ----------------------------------------------------------

  // Delete an item from the either the income array or the
  // expense array of the budget object in the local state.
  // type -- is either income or expense and specifies which array
  // to remove the item from.
  // id -- is used to find the item in the array to delete it.
  deleteItemHandler = (type, id) => {
    // Get item type and add 's' to match the correct property
    // key in the budget object: incomes or expenses.
    const itemType = type + "s";

    let updatedBudget = { ...this.state.budget };
    let updatedItems = [...updatedBudget[itemType]];
    // Delete item from list and retrieve the item to collect the amount
    // in order to update the value of remaining.
    const deletedItem = updatedItems.splice(id, 1)[0];
    updatedBudget[itemType] = updatedItems;
    // Update the value of remaining in the budget object in the state.
    updatedBudget.remaining = this.updateRemaining(
      "delete",
      type,
      deletedItem.amount
    );

    this.setState({ budget: updatedBudget, saved: false });
  };
  // ----------------------------------------------------------

  // Update the value of the remaining property in the budget
  // object of the state.
  // action -- specifies whether to add or delete.
  // type -- specifies whether it's an income or expense.
  // value -- the amount used to update remaining.
  updateRemaining = (action, type, value) => {
    // Clone budget and remaining value
    let updatedBudget = { ...this.state.budget };
    let updatedRemaining = updatedBudget.remaining;
    // Perform the appropriate change based on the given action
    if (
      (action === "add" && type === "income") ||
      (action === "delete" && type === "expense")
    ) {
      updatedRemaining = updatedRemaining + value;
    } else if (
      (action === "add" && type === "expense") ||
      (action === "delete" && type === "income")
    ) {
      updatedRemaining = updatedRemaining - value;
    }
    return updatedRemaining;
  };
  // ----------------------------------------------------------

  // Update the modal object in the state to display a
  // custom modal.
  summonAlertModal = (title, message, canceled) => {
    this.setState({
      modal: {
        show: true,
        type: "alert",
        title: title,
        message: message,
        canceled: canceled
      }
    });
  };
  // ----------------------------------------------------------

  // Update the modal object in the state to display a
  // custom modal.
  summonConfirmModal = (title, message, confirmed) => {
    this.setState({
      modal: {
        show: true,
        type: "confirm",
        title: title,
        message: message,
        confirmed: confirmed,
        canceled: this.hideModal
      }
    });
  };
  // ----------------------------------------------------------

  // Add budget to the database and to the budgets in the 
  // Dashboard state, then go back to the Dashboard.
  saveBtnHandler = () => {
    DB.addBudget(this.state.budget).then(() => {
      this.props.saveBudget(this.state.budget);
      this.summonAlertModal('Saved Budget!',
        'This budget has been saved!',
        this.props.backToDashboard);
    }).catch(error => {
      console.log('Error: ' + error.message);
    })
  }
  // ----------------------------------------------------------

  // Check if there are any unsaved changes. If so, confirm to 
  // the user; if not, go back to the Dashboard.
  backBtnHandler = () => {
    if(!this.state.saved) {
      this.summonConfirmModal('Unsaved Changes',
        `You currently have unsaved changes to this budget. 
        Leaving this page will discard these changes. 
        Do you wish to continue?`,
        this.props.backToDashboard);
    } else {
      this.props.backToDashboard();
    }
  }
  // ----------------------------------------------------------

  // ==========================================================
  // RENDER
  // ==========================================================
  render() {
    return (
      <div className={classes.Budget}>
        {this.state.modal.show ? (
          <Modal
            type={this.state.modal.type}
            title={this.state.modal.title}
            message={this.state.modal.message}
            canceled={this.state.modal.canceled}
            confirmed={this.state.modal.confirmed}
          />
        ) : null}

        <Charts
          incomeData={this.state.budget.incomes}
          expenseData={this.state.budget.expenses}
        />
        <hr />
        <p style={{ marginTop: "10px" }}>
          Remaining Budget for {this.state.budget.date.month} of{" "}
          {this.state.budget.date.year}
        </p>

        <Balance
          remaining={this.state.budget.remaining}
          style={{ fontSize: "200%", fontWeight: "lighter" }}
        />
        <Controls
          sendData={this.addItemHandler}
          categories={this.props.categories}
        />
        <div>
          <Items
            title={"Incomes"}
            type={"income"}
            categories={this.props.categories}
            itemsList={this.state.budget.incomes}
            deleted={this.deleteItemHandler}
          />
          <Items
            title={"Expenses"}
            type={"expense"}
            categories={this.props.categories}
            itemsList={this.state.budget.expenses}
            deleted={this.deleteItemHandler}
          />
        </div>

        <div className={classes.BottomControls}>
          <button
            className={classes.SaveBtn}
            onClick={this.saveBtnHandler}>
            Save
          </button>

          <button 
            className={classes.BackBtn} 
            onClick={this.backBtnHandler}>
            Back
          </button>
        </div>
      </div>
    );
  }
}

export default Budget;
