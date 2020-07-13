import React, { Component } from "react";

import BudgetControls from "../Budget/Budget";
import Budgets from "../../components/Budgets/Budgets";
import Modal from "../../components/UI/Modal/Modal";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showBudgetControls: false,
      showAddModal: false,
      date: new Date(),
      budgets: []
    };
  }

  toggleBudgetControls = () =>
    this.setState({
      showBudgetControls: this.state.showBudgetControls ? false : true
    });

  toggleAddModal = () =>
    this.setState({ showAddModal: this.state.showAddModal ? false : true });

  saveBudget = budget => {
    let updatedBudgets = [...this.state.budgets];
    updatedBudgets.push(budget);
    this.setState({ budgets: updatedBudgets });
  };

  inputDateHandler = e => {
    const enteredDate = e.target.value;
    const dateString = enteredDate.split("-");
    const year = dateString[0];
    const month = dateString[1];
    const day = dateString[2];
    const updatedDate = new Date(this.state.date.getTime());
    updatedDate.setFullYear(year);
    updatedDate.setMonth(month - 1);
    updatedDate.setDate(day);
    this.setState({ date: updatedDate });
  };

  render() {
    let month = this.state.date.getMonth() + 1;
    if (month < 10) {
      month = "0" + month;
    }
    let inputDate = `${this.state.date.getFullYear()}-${month}-${this.state.date.getDate()}`;

    const dashboard = (
      <div>
        {this.state.showAddModal ? (
          <Modal
            type={"prompt"}
            title={"Select Date"}
            message={"Please select the month and the year for the new budget."}
            confirmed={() => {
              this.toggleBudgetControls();
              this.toggleAddModal();
            }}
            canceled={this.toggleAddModal}
            input={"date"}
            inputValue={inputDate}
            changed={e => this.inputDateHandler(e)}
          />
        ) : null}
        <Budgets
          budgets={this.state.budgets}
          addClicked={this.toggleAddModal}
        />
      </div>
    );

    return this.state.showBudgetControls ? (
      <BudgetControls
        saveClicked={this.saveBudget}
        backClicked={this.toggleBudgetControls}
        date={this.state.date}
      />
    ) : (
      dashboard
    );
  }
}

export default Dashboard;
