import React, { Component } from "react";

import BudgetControls from "../BudgetControls/BudgetControls";
import Budgets from "../../components/Budgets/Budgets";
import Modal from "../../components/UI/Modal/Modal";
import Select from '../../components/UI/Select/Select';
import LineCharts from '../../components/Charts/LineCharts/LineCharts';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showBudgetControls: false,
      date: {
        month: new Date().toLocaleString('default', { month: 'long' }),
        year: new Date().getFullYear() 
      },
      budgets: [],
      selectedBudget: null,
      modal: {},
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

  goToBudgetControls = (budget) => {
    this.setState({showBudgetControls: true, selectedBudget: budget});
  }

  toggleBudgetControls = () =>
    this.setState({
      showBudgetControls: this.state.showBudgetControls ? false : true
    });

  toggleModal = () =>
    this.setState({ modal: this.state.modal.show ? {show: false} : {show: true}});

  updateDate = (update, type) => {
    let updatedDate = {...this.state.date};
    updatedDate[type] = update;
    this.setState({date: updatedDate});
  }

  createYearOptions = (from, to) => {
    let years = [];
    for(from; from <= to; from++) {
      years.push(from);
    }
    return years;
  }

  summonAddModal = () => {
    this.setState({modal: {
      show: true,
      type: 'prompt',
      title: "Select Date",
      message: "Please select the month and the year for the new budget.",
      confirmed: () => {
        if (this.findExistingBudget()) {
          this.summonAlertModal();
        } else {
          this.goToBudgetControls({
            id: this.state.budgets.length,
            date: this.state.date,
            incomes: [],
            expenses: [],
            remaining: 0
          });
          this.toggleModal();
        }
      },
      canceled: this.toggleModal,
      form: (
        <div>
          <Select
          defaultValue={new Date().toLocaleString('default', { month: 'long' })}
          options={['January', 'Febuary', 'March', 'April',
            'May', 'June', 'July', 'August', 'September', 'October',
            'November', 'December']}
          changed={(e) => {
            this.updateDate(e.target.value, 'month');
          }}/>
          <Select
          defaultValue={new Date().getFullYear().toString()}
          options={this.createYearOptions(1970, 2070)}
          changed={(e) => {
            this.updateDate(e.target.value, 'year');
          }}/>
        </div>
      )
    }});
  };

  summonDeleteModal = (index) => {
    this.setState({modal: {
      show: true,
      type: 'confirm',
      title: 'Deleting Budget',
      message: 'This will permenately remove this budget from your budget list. Are you sure you want to delete this budget?',
      confirmed: () => {
        this.deleteBudget(index);
        this.toggleModal();
      },
      canceled: this.toggleModal,
      form: null
    }});
  };

  summonAlertModal = () => {
    this.setState({modal: {
      show: true,
      type: 'alert',
      title: 'Already Exists',
      message: 'A budget already exists for the selected month and year!',
      canceled: this.summonAddModal,
      form: null
    }});
  }

  deleteBudget = index => {
    let updatedBudgets = [...this.state.budgets];
    updatedBudgets.splice(index, 1);
    this.setState({budgets: updatedBudgets});
  }

  saveBudget = budget => {
    let updatedBudgets = [...this.state.budgets];
    if (budget.id < this.state.budgets.length) {
      updatedBudgets[budget.id] = budget;
    } else {
      updatedBudgets.push(budget);
    }
    this.setState({ budgets: updatedBudgets });
  };

  findExistingBudget = () => {
    for (const budget of this.state.budgets) {
      if (budget.date.month === this.state.date.month &&
          budget.date.year === this.state.date.year) {
            return true;
          }
    }
    return false;
  }

  render() {
    const dashboard = (
      <div>
        {this.state.modal.show ? (
          <Modal
            type={this.state.modal.type}
            title={this.state.modal.title}
            message={this.state.modal.message}
            confirmed={this.state.modal.confirmed}
            canceled={this.state.modal.canceled}
            form={this.state.modal.form}
          />
        ) : null}
        <LineCharts 
          budgets={this.state.budgets}
          categories={this.state.categories}
          years={this.createYearOptions(1970, 2070)}/>
        <hr />
        <Budgets
          years={this.createYearOptions(1970, 2070)}
          months={['January', 'Febuary', 'March', 'April',
          'May', 'June', 'July', 'August', 'September', 'October',
          'November', 'December']}
          budgets={this.state.budgets}
          addClicked={() => {
            this.setState({date: {
              month: new Date().toLocaleString('default', { month: 'long' }),
              year: new Date().getFullYear().toString()
            }})
            this.summonAddModal();
          }}
          viewClicked={this.goToBudgetControls}
          deleteClicked={this.summonDeleteModal}
        />
      </div>
    );

    return this.state.showBudgetControls ? (
      <BudgetControls
        saveClicked={this.saveBudget}
        backClicked={this.toggleBudgetControls}
        date={this.state.date}
        selectedBudget={this.state.selectedBudget}
        categories={this.state.categories}
      />
    ) : (
      dashboard
    );
  }
}

export default Dashboard;
