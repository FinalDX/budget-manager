import React, { Component } from "react";
import { connect } from "react-redux";

import Balance from "../../components/Balance/Balance";
import Controls from "../../components/BudgetControls/BudgetControls";
import Items from "../../components/Items/Items";
import Modal from "../../components/UI/Modal/Modal";
import Toolbar from "../../components/Toolbar/Toolbar";
import PieCharts from "../BudgetChart/BudgetChart";

import * as actionTypes from "../../store/actions/actions";

import classes from "./Budget.module.css";
import FullButton from "../../components/UI/Buttons/FullButton/FullButton";

const ITEM_LIMIT = 50;

class Budget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showChart: false,
      budget: this.props.selectedBudget,
      modal: {},
      changesMade: false
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

  // ----------------------------------------------------------
  // Hide the Modal component
  hideModal = () => this.setState({ modal: { show: false } });

  // ----------------------------------------------------------
  // Create an item object from inputItem and add it to the income array
  // or the expense array of the budget object in the local state.
  // inputItem -- new item collected from user input.
  addItemHandler = (inputItem) => {
    // Get item type and add 's' to match the correct property
    // key in the budget object: incomes or expenses.
    const type = inputItem.type.value + "s";

    let foundItemIndex = this.checkForExistingItem(inputItem, type);

    if (foundItemIndex !== -1) {
      this.summonActionModal(
        // Title
        "Existing Item Found",
        // Message
        `An item with this name already exists inside
        this budget. You can combine both item
        amounts into a single item or you can replace the 
        existing item with this new item. 
        Please select an action:`,
        // Action buttons
        <div className={classes.ActionBtns}>
          {/* Combine amounts action */}
          <FullButton
            color={"Blue"}
            style={{
              width: "250px",
              margin: "20px auto 30px",
              padding: "10px"
            }}
            clicked={() => {
              this.combineAmounts(inputItem, foundItemIndex, type);
              this.hideModal();
            }}
          >
            Combine Amounts
          </FullButton>

          {/* Replace Existing action */}
          <FullButton
            color={"Purple"}
            style={{
              width: "250px",
              margin: "0 auto 10px",
              padding: "10px"
            }}
            clicked={() => {
              this.replaceExisting(inputItem, foundItemIndex, type);
              this.hideModal();
            }}
          >
            Replace Existing
          </FullButton>
        </div>,
        // Canceled
        this.hideModal
      );
    } else {
      this.addNewItem(inputItem, type);
    }
  };

  // ----------------------------------------------------------
  // Check if item already exists in the budget.
  // inputItem -- new item collected from user input.
  // type -- the item type; income or expense.
  // return: the index of the found item if it exists in the
  // budget; otherwise -1.
  checkForExistingItem = (inputItem, type) =>
    this.state.budget[type].findIndex(
      (item) =>
        item.category === inputItem.category.value &&
        item.name === inputItem.name.value
    );

  // ----------------------------------------------------------
  // Combine the existing item amount with the new item amount.
  // inputItem -- new item collected from user input.
  // foundItemIndex -- the index of the existing item.
  // type -- the item type; income or expense.
  combineAmounts = (inputItem, foundItemIndex, type) => {
    let updatedBudget = { ...this.state.budget };
    let updatedItems = [...updatedBudget[type]];

    updatedItems[foundItemIndex].amount += Number(inputItem.amount.value);
    updatedBudget[type] = updatedItems;

    // Update the value of remaining in the budget object in the state.
    updatedBudget.remaining = this.updateRemaining(
      "add",
      inputItem.type.value,
      Number(inputItem.amount.value)
    );

    this.setState({ budget: updatedBudget, changesMade: true });
  };

  // ----------------------------------------------------------
  // Replace the existing item amount with the new item amount.
  // inputItem -- new item collected from user input.
  // foundItemIndex -- the index of the existing item.
  // type -- the item type; income or expense.
  replaceExisting = (inputItem, foundItemIndex, type) => {
    let updatedBudget = { ...this.state.budget };
    let updatedItems = [...updatedBudget[type]];

    // Calculate the difference in the item amounts to determine
    // how the remaining value should be updated.
    let action = "add";
    let difference =
      Number(inputItem.amount.value) - updatedItems[foundItemIndex].amount;
    if (difference < 0) {
      action = "delete";
    }

    updatedItems[foundItemIndex].amount = Number(inputItem.amount.value);
    updatedBudget[type] = updatedItems;

    // Update the value of remaining in the budget object in the state.
    updatedBudget.remaining = this.updateRemaining(
      action,
      inputItem.type.value,
      Math.abs(difference)
    );

    this.setState({ budget: updatedBudget, changesMade: true });
  };

  // ----------------------------------------------------------
  // Add a new item to the budget.
  // inputItem -- new item collected from user input.
  // type -- the item type; income or expense.
  addNewItem = (inputItem, type) => {
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
      this.setState({ budget: updatedBudget, changesMade: true });
    } else {
      this.summonAlertModal(
        "Limit Reached!",
        "The total amount of items in this budget has been reahced.",
        this.hideModal
      );
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

    this.setState({ budget: updatedBudget, changesMade: true });
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
  // custom action modal.
  summonActionModal = (title, message, actions, canceled) => {
    this.setState({
      modal: {
        show: true,
        type: "action",
        title: title,
        message: message,
        actions: actions,
        canceled: canceled
      }
    });
  };
  // ----------------------------------------------------------

  // Update the modal object in the state to display a
  // custom alert modal.
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
  // custom confirm modal.
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
  // Check if there are any unsaved changes. If so, confirm to
  // the user; if not, go back to the Dashboard.
  backBtnHandler = () => {
    if (this.state.changesMade) {
      this.summonActionModal(
        // Title
        "Save Changes",
        // Message
        "Would you like to save the changes made to this budget?",
        // ActionButton
        <div className={classes.ActionBtns}>
          {/* Save changes action */}
          <FullButton
            color={"Blue"}
            style={{
              width: "250px",
              margin: "20px auto 30px",
              padding: "10px"
            }}
            clicked={() => {
              this.props.saveBudget(this.state.budget);
              // TODO
              // Check if save was successfull before changing screens
              this.props.changeScreen("BudgetList");
              this.hideModal();
            }}
          >
            Save changes
          </FullButton>

          {/* Continue without saving action */}
          <FullButton
            color={"Purple"}
            style={{
              width: "250px",
              margin: "0 auto 10px",
              padding: "10px"
            }}
            clicked={() => {
              this.props.changeScreen("BudgetList");
              this.hideModal();
            }}
          >
            Continue without saving
          </FullButton>
        </div>,
        // Canceled
        this.hideModal
      );
    } else {
      this.props.changeScreen("BudgetList");
    }
  };

  // ----------------------------------------------------------
  // ==========================================================
  // RENDER
  // ==========================================================
  render() {
    const pieCharts = (
      <PieCharts
        changeScreen={() => this.setState({ showChart: false })}
        incomeData={this.state.budget.incomes}
        expenseData={this.state.budget.expenses}
      />
    );

    const budget = (
      <div>
        <Toolbar
          title={`${this.state.budget.date.month} ${this.state.budget.date.year}`}
          leftBtnTitle={"< Back"}
          leftBtnAction={this.backBtnHandler}
          rightBtnTitle={"Chart"}
          rightBtnAction={() => this.setState({ showChart: true })}
        />
        <main style={{ paddingTop: "1px", marginTop: "39px" }}>
          <div className={classes.Budget}>
            <Modal
              show={this.state.modal.show}
              type={this.state.modal.type}
              title={this.state.modal.title}
              message={this.state.modal.message}
              canceled={this.state.modal.canceled}
              confirmed={this.state.modal.confirmed}
              actions={this.state.modal.actions}
            />

            <p style={{ marginTop: "10px" }}>
              Remaining Balance for {this.state.budget.date.month} of{" "}
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

            <div className={classes.Items}>
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
          </div>
        </main>
      </div>
    );
    return this.state.showChart ? pieCharts : budget;
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    saveBudget: (budget) => dispatch(actionTypes.saveBudget(budget))
  };
};

export default connect(null, mapDispatchToProps)(Budget);
