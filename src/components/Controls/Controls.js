import React, { Component } from "react";

import Select from "../UI/Select/Select";
import FullButton from "../UI/Buttons/FullButton/FullButton";

import classes from "./Controls.module.css";

class Controls extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemForm: {
        name: {
          value: "",
          validation: {
            pattern: /^[A-Za-z0-9 ]+$/,
            maxLength: 20,
            required: true
          },
          valid: false
        },
        amount: {
          value: 0,
          validation: {
            pattern: /^[0-9]+(\.[0-9][0-9])?$/,
            maxLength: 9,
            required: true
          },
          valid: false
        },
        category: {
          value: "Category",
          validation: {
            selected: true
          },
          valid: false
        },
        type: {
          value: "income",
          validation: {},
          valid: true
        }
      },
      formIsValid: false
    };
  }

  // Validates the input on the form by checking every property in the input's
  // validation object.
  validate = (value, validation) => {
    let isValid = true;
    if (validation.pattern) {
      isValid = value.match(validation.pattern) != null && isValid;
    }
    if (validation.maxLength) {
      isValid = value.length <= validation.maxLength && isValid;
    }
    if (validation.minLength) {
      isValid = value.length >= validation.minLength && isValid;
    }
    if (validation.required) {
      isValid = value.trim() !== "" && isValid;
    }
    if (validation.selected) {
      isValid = value !== "Category" && isValid;
    }
    return isValid;
  };
  // ----------------------------------------------------------

  // Changes the value of an item in the itemForm based on the
  // user's input
  inputHandler = (e, inputName) => {
    // Clone itemForm and the correct input object from the state
    const updatedForm = { ...this.state.itemForm };
    const updatedItem = { ...this.state.itemForm[inputName] };
    // Update item value and validate
    updatedItem.value = e.target.value;
    updatedItem.valid = this.validate(
      updatedItem.value,
      updatedItem.validation
    );
    updatedForm[inputName] = updatedItem;
    // Check if the entire itemForm is valid by checking if each
    // item is valid.
    let formIsValid = true;
    for (let inputName in updatedForm) {
      formIsValid = updatedForm[inputName].valid && formIsValid;
    }
    this.setState({ itemForm: updatedForm, formIsValid: formIsValid });
  };
  // ----------------------------------------------------------

  render() {
    let btnStyle = { margin: "30px auto" };
    return (
      <form
        className={classes.Controls}
        onSubmit={event => {
          event.preventDefault();
          this.props.sendData(this.state.itemForm);
          event.target.reset();
        }}
      >
        <p>Add an income or an expense: </p>
        <input
          type="text"
          placeholder="Name"
          onChange={event => this.inputHandler(event, "name")}
          maxLength="20"
          pattern="[a-zA-Z0-9 ]*"
          required
        />
        <input
          type="number"
          step="0.01"
          placeholder="Amount"
          onChange={event => this.inputHandler(event, "amount")}
          min="0"
          max="999999999"
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

        <Select
          haveDefaultOption={true}
          defaultValue={"Category"}
          changed={event => this.inputHandler(event, "category")}
          options={this.props.categories}
        />

        <FullButton style={btnStyle} disabled={!this.state.formIsValid}>
          Add
        </FullButton>
      </form>
    );
  }
}

export default Controls;
