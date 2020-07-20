import React, { Component } from "react";
import { connect } from 'react-redux';

import BudgetControls from "../BudgetControls/BudgetControls";
import Budgets from "../../components/Budgets/Budgets";
import Modal from "../../components/UI/Modal/Modal";
import Select from '../../components/UI/Select/Select';
import LineCharts from '../../components/Charts/LineCharts/LineCharts';

// Return an array of years from system date;
// 20 years in the past and 20 years in the future.
const createYearOptions = (date) => {
  const from = date.getFullYear() - 20;
  const to = date.getFullYear() + 20;
  let years = [];
  for(let year = from; year <= to; year++) {
    years.push(year.toString());
  }
  return years;
}

const YEARS = createYearOptions(new Date());
const MONTHS = ['January', 'Febuary', 'March', 'April',
'May', 'June', 'July', 'August', 'September', 'October',
'November', 'December'];
const CATEGORIES = ["Dependants", "Clothing", "Education",
  "Entertainment", "Food", "Housing", "Insurance",
  "Job", "Medical", "Pets", "Personal", "Savings",
  "Transportation", "Utilities", "Other"];

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
      modal: {}
    };
  }

  // Show the BudgetControls componenet and pass the selectedBudget
  // from the state to BudgetControls as a prop
  goToBudgetControls = (budget) => {
    this.setState({showBudgetControls: true, selectedBudget: budget});
  }
  // ----------------------------------------------------------

  // Show or hide the BudgetControls component
  toggleBudgetControls = () =>
    this.setState({
      showBudgetControls: this.state.showBudgetControls ? false : true
    });
  // ----------------------------------------------------------

  // Hide the Modal component
  hideModal = () =>
    this.setState({modal: {show: false}});
  // ----------------------------------------------------------

  // Update the date object in the state.
  // value is the updated value.
  // type is the object property key; month or year.
  updateDate = (value, type) => {
    let updatedDate = {...this.state.date};
    updatedDate[type] = value;
    this.setState({date: updatedDate});
  }
  // ----------------------------------------------------------

  // Update the modal object in the state to display a 
  // custom modal.
  // Prompt the user to select a month and a year
  // to create a new budget.
  // Default selection is the system's current month and year.
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
            id: this.props.budgets.length,
            date: this.state.date,
            incomes: [],
            expenses: [],
            remaining: 0
          });
          this.hideModal();
        }
      },
      canceled: this.hideModal,
      form: (
        <div>
          <Select
          defaultValue={new Date().toLocaleString('default', { month: 'long' })}
          options={MONTHS}
          changed={(e) => {
            this.updateDate(e.target.value, 'month');
          }}/>
          <Select
          defaultValue={new Date().getFullYear().toString()}
          options={YEARS}
          changed={(e) => {
            this.updateDate(e.target.value, 'year');
          }}/>
        </div>
      )
    }});
  };
  // ----------------------------------------------------------

  // Update the modal object in the state to display a 
  // custom modal.
  // Confirm whether or not the user wants to 
  // delete a budget from the budgets array in the state.
  summonDeleteModal = (index) => {
    this.setState({modal: {
      show: true,
      type: 'confirm',
      title: 'Deleting Budget',
      message: 'This will permenately remove this budget from your budget list. Are you sure you want to delete this budget?',
      confirmed: () => {
        this.props.deleteBudget(index);
        this.hideModal();
      },
      canceled: this.hideModal,
      form: null
    }});
  };
  // ----------------------------------------------------------

  // Update the modal object in the state to display a 
  // custom modal.
  // Inform the user that a budget already exists
  // for the selected month and year.
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
  // ----------------------------------------------------------

  // Delete the budget from the budgets array in the state by 
  // using the index.
  deleteBudget = index => {
    let updatedBudgets = [...this.props.budgets];
    updatedBudgets.splice(index, 1);
    this.setState({budgets: updatedBudgets});
  }
  // ----------------------------------------------------------

  // If the budget already exists in the budgets array in the 
  // state, then update the existing budget.
  // If the budget does not exist, add it to the budgets array.
  saveBudget = budget => {
    let updatedBudgets = [...this.props.budgets];
    if (budget.id < this.props.budgets.length) {
      updatedBudgets[budget.id] = budget;
    } else {
      updatedBudgets.push(budget);
    }
    this.setState({ budgets: updatedBudgets });
  };
  // ----------------------------------------------------------

  // Find an existing budget for the selected month and year
  // when a user tries to add a new budget.
  // Return true if an existing budget is found; 
  // otherwise return false.
  findExistingBudget = () => {
    let found = false;
    for (const budget of this.props.budgets) {
      if (budget.date.month === this.state.date.month &&
          budget.date.year === this.state.date.year) {
            found = true;
            break;
          }
    }
    return found;
  }
  // ----------------------------------------------------------

  // ==========================================================
  // RENDER
  // ==========================================================
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
          budgets={this.props.budgets}
          categories={CATEGORIES}
          years={YEARS}/>
        <hr />
        <Budgets
          years={YEARS}
          months={['January', 'Febuary', 'March', 'April',
          'May', 'June', 'July', 'August', 'September', 'October',
          'November', 'December']}
          budgets={this.props.budgets}
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

    const budgetControls = (
      <BudgetControls
        saveClicked={this.saveBudget}
        backClicked={this.toggleBudgetControls}
        date={this.state.date}
        selectedBudget={this.state.selectedBudget}
        categories={CATEGORIES}
      />
    )

    return this.state.showBudgetControls ?  budgetControls : dashboard;
  }
}

const mapStateToProps = state => {
  return {
    budgets: state.budgets,
    selectedBudget: state.selectedBudget,
    modal: state.modal,
    dashboard: state.dashboard
  };
}

const mapPropsToDispatch = dispatch => {
  return {
    deleteBudget: (index) => dispatch({type: 'DELETE_BUDGET', index: index})
  };
};

export default connect(mapStateToProps, mapPropsToDispatch)(Dashboard);
