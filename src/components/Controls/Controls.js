import React, { Component } from "react";

import Select from '../UI/Select/Select';

import classes from './Controls.module.css';

class Controls extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemForm: {
        name: {
          value: '',
          validation: {
            required: true
          },
          valid: false
        },
        amount: {
          value: 0,
          validation: {
            required: true
          },
          valid: false
        },
        category: {
          value: '',
          validation: {
            required: true
          },
          valid: false
        },
        type: {
          value: 'income',
          validation: {
            required: true
          },
          valid: false
        }
      }
    };
  }

  inputHandler = (e, inputName) => {
    const updatedForm = { ...this.state.itemForm };
    const updatedItem = { ...this.state.itemForm[inputName] };

    updatedItem.value = e.target.value;
    updatedForm[inputName] = updatedItem;

    console.log(this.state.itemForm);
    this.setState({itemForm: updatedForm})
    console.log(this.state.itemForm);
  }

  render() {
    return (
      <div className={classes.Controls}>
        <p>Add an income or an expense: </p>
        <input type="text" placeholder="Name" name="name"
          onChange={(event) => this.inputHandler(event, 'name')} />
        <input type="number" placeholder="Amount" name="amount"
          onChange={(event) => this.inputHandler(event, 'amount')} />

        <Select />

        <label>
          <input type="radio" name="itemType" value="income"
            checked={this.props.type === "income"}
            onChange={this.props.checked} />
          Income
        </label>

        <label>
          <input type="radio" name="itemType" value="expense"
            checked={this.props.type === "expense"}
            onChange={this.props.checked} />
          Expense
        </label>

        <button  onClick={this.props.clicked}>Add</button>
      </div>
    );
  };
}

export default Controls;
