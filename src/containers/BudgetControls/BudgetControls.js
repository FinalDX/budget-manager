import React, { Component } from "react";

import Charts from "../../components/Charts/PieCharts/PieCharts";
import Balance from "../../components/Balance/Balance";
import Controls from "../../components/Controls/Controls";
import Items from "../../components/Items/Items";
import Modal from "../../components/UI/Modal/Modal";

import classes from "./BudgetControls.module.css";

class Budget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      budget: this.props.selectedBudget,
      modal: {},
      saved: true
    };
  }

  toggleModal = () =>
    this.setState({ modal: this.state.modal.show ? {show: false} : {show: true}});

  // 
  addItemHandler = inputItem => {
    // Get item type and add 's' to match the correct property 
    // key in the budget object.
    const type = inputItem.type.value + "s";

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

    this.setState({budget: updatedBudget, saved: false});
  };
  // ----------------------------------------------------------

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
    this.setState({budget: updatedBudget, saved: false});
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

  summonSaveModal = () => {
    this.setState({modal: {
      show: true,
      type: 'alert',
      title: 'Saved Budget',
      message: 'This budget has been saved!',
      canceled: this.props.backClicked
    }, saved: true});
  }

  summonBackModal = () => {
    if (!this.state.saved) {
      this.setState({modal: {
        show: true,
        type: 'confirm',
        title: 'Unsaved Changes',
        message: 'You currently have unsaved changes to this budget. Leaving this page will discard these changes. Do you wish to continue?',
        canceled: this.toggleModal,
        confirmed: this.props.backClicked
      }})
    } else {
      this.props.backClicked();
    }
  }

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
        <div className={classes.Btns}>
          <button className={classes.SaveBtn}
            onClick={() => {
              this.summonSaveModal();
              this.props.saveClicked(this.state.budget);
            }}>Save
          </button>
          <button className={classes.BackBtn} 
            onClick={this.summonBackModal}>Back
          </button>
        </div>
        <p style={{ marginTop: "10px" }}>
          Remaining Budget for {this.state.budget.date.month} of {this.state.budget.date.year}
        </p>
        
        <Balance remaining={this.state.budget.remaining} 
          style={{fontSize: '200%', fontWeight: 'lighter'}}/>
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
      </div>
    );
  }
}

export default Budget;
