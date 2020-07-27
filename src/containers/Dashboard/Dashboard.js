import React, { Component } from "react";
import shortID from 'shortid';

import BudgetControls from "../BudgetControls/BudgetControls";
import Budgets from "../../components/Budgets/Budgets";
import Modal from "../../components/UI/Modal/Modal";
import Select from '../../components/UI/Select/Select';
import LineCharts from '../../components/Charts/LineCharts/LineCharts';
import DBService from '../../services/DBService/DBService';

// Return an array of years from system date;
// 20 years in the past and 20 years in the future.
const createYearOptions = (date) => {
  const from = date.getFullYear() - 10;
  const to = date.getFullYear() + 10;
  let years = [];
  for(let year = from; year <= to; year++) {
    years.push(year.toString());
  }
  return years;
}

// ==========================================================
// GLOBAL CONSTANTS
// ==========================================================
const DB = new DBService();

const YEARS = createYearOptions(new Date());
const MONTHS = ['January', 'Febuary', 'March', 'April',
'May', 'June', 'July', 'August', 'September', 'October',
'November', 'December'];
const CATEGORIES = ["Bills", "Debt", "Dependants", "Clothing", "Education",
  "Entertainment", "Food", "Housing", "Insurance",
  "Job", "Medical", "Pets", "Personal", "Savings",
  "Transportation", "Utilities", "Other"];

// ==========================================================
// DASHBOARD
// ==========================================================
class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      budgets: null,
      selectedBudget: null,
      showBudgetControls: false,
      date: {
        month: new Date().toLocaleString('default', { month: 'long' }),
        year: new Date().getFullYear() 
      },
      modal: {}
    };
  }

  // Used in prompt modal to prompt the user to select a month
  // and a year when adding a budget.
  SELECT_DATE_FORM = (
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
  );
  // ----------------------------------------------------------

  // Show the BudgetControls componenet and pass the selectedBudget
  // from the state to BudgetControls as a prop
  goToBudgetControls = (budget) => {
    this.setState({selectedBudget: budget, showBudgetControls: true});
  }
  // ----------------------------------------------------------

  // Hide the BudgetControls component
  hideBudgetControls = () =>
    this.setState({showBudgetControls: false});
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
  summonPromptModal = (title, message, confirmed, form) => {
    this.setState({
      modal: {
        show: true,
        type: 'prompt',
        title: title,
        message: message,
        confirmed: confirmed,
        canceled: this.hideModal,
        form: form
      }
    });
  };
  // ----------------------------------------------------------

  // Update the modal object in the state to display a 
  // custom modal.
  // Confirm whether or not the user wants to 
  // delete a budget from the budgets array in the state.
  summonDeleteModal = (id) => {
    this.setState({modal: {
      show: true,
      type: 'confirm',
      title: 'Deleting Budget',
      message: 'This will permenately remove this budget from your budget list. Are you sure you want to delete this budget?',
      confirmed: () => {
        DB.deleteBudget(id).then(() => {
          this.deleteBudget(id);
        }).catch(error => {
          console.log('Error: ' + error.message);
        })
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
  summonAlertModal = (title, message, confirmed) => {
    this.setState({
      modal: {
        show: true,
        type: 'alert',
        title: title,
        message: message,
        canceled: confirmed,
        form: null
      }
    });
  }
  // ----------------------------------------------------------

  // If the budget already exists in the budgets array in the 
  // state, then update the existing budget.
  // If the budget does not exist, add it to the budgets array.
  saveBudget = budget => {
    let updatedBudgets = [...this.state.budgets];
    const foundIndex = updatedBudgets.findIndex(existing => existing.id === budget.id);
    if (foundIndex !== -1) {
        updatedBudgets[foundIndex] = {...budget};
    } else {
        updatedBudgets.push(budget);
    }
    this.setState({budgets: updatedBudgets});
  };
  // ----------------------------------------------------------

  // Delete the budget from the budgets array in the state by 
  // using the id to find the index.
  deleteBudget = id => {
    let updatedBudgets = [...this.state.budgets];
    let index = updatedBudgets.findIndex(budget => budget.id === id);
    updatedBudgets.splice(index, 1);
    this.setState({budgets: updatedBudgets});
  }
  // ----------------------------------------------------------

  // Check if there is an existing budget with the same date.
  // If so, alert the user; if not, go to BudgetControls with 
  // a new budget object.
  checkForExisting = () => {
    if (this.findExistingBudget()) {
      this.summonAlertModal(
        'Already Exists',
        'A budget already exists for the selected month and year!',
        () => {
          this.summonPromptModal(
            'Select Date',
            'Please select the month and the year for the new budget.',
            this.checkForExisting,
            this.SELECT_DATE_FORM
          )
        }
      );
    } else {
      this.goToBudgetControls({
        id: shortID.generate(),
        date: this.state.date,
        incomes: [],
        expenses: [],
        remaining: 0
      });
      this.hideModal();
    }
  }
  // ----------------------------------------------------------


  // Search through budgets in state to find an 
  // existing budget for the selected month and year
  // when a user tries to add a new budget.
  // Return true if an existing budget is found; 
  // otherwise return false.
  findExistingBudget = () => {
    let found = false;
    for (const budget of this.state.budgets) {
      if (budget.date.month === this.state.date.month &&
          budget.date.year === this.state.date.year) {
            found = true;
            break;
          }
    }
    return found;
  }
  // ----------------------------------------------------------

  // Reset date to system date for default selection and prompt
  // the user to select a date for the new budget.
  addBtnHandler = () => {
    this.setState({date: {
      month: new Date().toLocaleString('default', { month: 'long' }),
      year: new Date().getFullYear().toString()
    }})
    this.summonPromptModal(
      'Select Date',
      'Please select the month and the year for the new budget.',
      this.checkForExisting,
      this.SELECT_DATE_FORM
    );
  }
  // ----------------------------------------------------------

  // Get all budgets from the database and set budgets in state.
  componentDidMount() {
    if(DB.checkBrowserSupport()) {
      DB.getAllBudgets().then(result => {
        let allBudgets = [...result];
        this.setState({budgets: allBudgets});
      }).catch(error => {
        console.log('Error: ' + error.message);
      })
    } else {
      this.summonAlertModal(
        'No Browser Support',
        `The current version of your browser does not support 
        IndexedDB local storage. Any data you enter will not 
        be saved with this version. Please upgrade your browser 
        to the latest version.`,
        this.hideModal
      )
    }
  }
  // ----------------------------------------------------------

  // ==========================================================
  // RENDER
  // ==========================================================
  render() {
    // Budgets
    let budgets = "Loading...";
    if (this.state.budgets) {
      budgets = (
        <Budgets
            years={YEARS}
            months={MONTHS}
            budgets={this.state.budgets}
            addClicked={this.addBtnHandler}
            viewClicked={this.goToBudgetControls}
            deleteClicked={this.summonDeleteModal}
        />
      );
    }

    // Dashboard
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
          categories={CATEGORIES}
          years={YEARS}/>
        <hr />
        {budgets}
      </div>
    );

    // Budget Controls
    const budgetControls = (
      <BudgetControls
        selectedBudget={this.state.selectedBudget}
        saveBudget={this.saveBudget}
        backToDashboard={this.hideBudgetControls}
        date={this.state.date}
        categories={CATEGORIES}
      />
    )

    return this.state.showBudgetControls ?  budgetControls : dashboard;
  }
}

export default Dashboard;