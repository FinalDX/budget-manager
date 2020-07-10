import React, { Component } from "react";

import Select from "../UI/Select/Select";

import classes from "./Controls.module.css";

class Controls extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemForm: {
        name: {
          value: " "
        },
        amount: {
          value: 0
        },
        category: {
          value: " "
        },
        type: {
          value: "income"
        }
      }
    };
  }

  inputHandler = (e, inputName) => {
    const updatedForm = { ...this.state.itemForm };
    const updatedItem = { ...this.state.itemForm[inputName] };

    updatedItem.value = e.target.value;
    updatedForm[inputName] = updatedItem;

    this.setState({ itemForm: updatedForm });
  };

  render() {
    return (
      <form
        className={classes.Controls}
        onSubmit={event => {
          event.preventDefault();
          this.props.sendData(this.state.itemForm);
          event.target.reset();
        }}
        required
      >
        <p>Add an income or an expense: </p>
        <input
          type="text"
          placeholder="Name"
          onChange={event => this.inputHandler(event, "name")}
          maxLength="30"
          pattern="[a-zA-Z ]*"
          required
        />
        <input
          type="number"
          step="0.01"
          placeholder="Amount"
          onChange={event => this.inputHandler(event, "amount")}
          min="0"
          max="2147483647"
          required
        />

        <div className={classes.Radio}>
          <label>
            <input
              type="radio"
              name="itemType"
              value="income"
              checked={this.state.itemForm.type.value === "income"}
              onChange={event => this.inputHandler(event, "type")}
            />
            Income
          </label>

          <label>
            <input
              type="radio"
              name="itemType"
              value="expense"
              checked={this.state.itemForm.type.value === "expense"}
              onChange={event => this.inputHandler(event, "type")}
            />
            Expense
          </label>
        </div>

        <Select changed={event => this.inputHandler(event, "category")} 
          categories={this.props.categories}/>

        <button className={classes.Button} 
          type="submit">
          Add
        </button>
      </form>
    );
  }
}

export default Controls;
