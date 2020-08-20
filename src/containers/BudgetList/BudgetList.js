import React, { Component } from "react";
import { connect } from 'react-redux';
import shortID from 'shortid';

import Budgets from "../../components/BudgetListItems/BudgetListItems";
import Modal from "../../components/UI/Modal/Modal";
import Select from '../../components/UI/Select/Select';
import Toolbar from '../../components/Toolbar/Toolbar';
import * as actionCreators from '../../store/actions/actionCreators';

const MONTHS = ['January', 'Febuary', 'March', 'April',
'May', 'June', 'July', 'August', 'September', 'October',
'November', 'December'];

// ==========================================================
// Budget List
// ==========================================================
class BudgetList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showBudget: false,
      date: {
        month: new Date().toLocaleString('default', { month: 'long' }),
        year: new Date().getFullYear() 
      },
      modal: {},
      screen: 'Budget List'
    };
  }

  // ----------------------------------------------------------
  // Used in prompt modal to prompt the user to select a month
  // and a year when adding a budget.
  SELECT_DATE_FORM = (
    <div>
      <Select
        value={new Date().toLocaleString('default', { month: 'long' })}
        options={MONTHS}
        changed={(e) => {
        this.updateDate(e.target.value, 'month');
      }}/>
  
      <Select
        value={new Date().getFullYear().toString()}
        options={this.props.years}
        changed={(e) => {
        this.updateDate(e.target.value, 'year');
      }}/>
    </div>
  );

  // ----------------------------------------------------------
  // Hide the Budget component
  hideBudget = () =>
    this.setState({showBudget: false});

  // ----------------------------------------------------------
  // Hide the Modal component
  hideModal = () => {
    let hideModal = {...this.state.modal};
    hideModal.show = false;

    this.setState({modal: hideModal});
  }

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
        this.props.deleteBudget(id);
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
    let updatedBudgets = [...this.props.budgets];
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
    let updatedBudgets = [...this.props.budgets];
    let index = updatedBudgets.findIndex(budget => budget.id === id);
    updatedBudgets.splice(index, 1);
    this.setState({budgets: updatedBudgets});
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
      // Title
      'Select Date',
      // Message
      'Please select the month and the year for the new budget.',
      // When OK is pressed
      this.checkForExisting,
      // Prompt input form
      this.SELECT_DATE_FORM
    );
  }

  // ----------------------------------------------------------
  // Check if there is an existing budget with the same date.
  // If so, alert the user; if not, go to Budget with 
  // a new budget object.
  checkForExisting = () => {
    // If budget already exists, alert user then re-summon prompt
    if (this.findExistingBudget()) {
      this.summonAlertModal(
        // Title
        'Already Exists',
        // Message
        'A budget already exists for the selected month and year!',
        // When OK is pressed
        () => {
          this.summonPromptModal(
            'Select Date',
            'Please select the month and the year for the new budget.',
            this.checkForExisting,
            this.SELECT_DATE_FORM
          )
        }
      );
    // If budget does not exist, create a new budget and go to 
    // Budget Controls.
    } else {
      let newBudget = {
        id: shortID.generate(),
        date: this.state.date,
        incomes: [],
        expenses: [],
        remaining: 0
      }
      this.props.addBudget(newBudget);
      // TODO
      // Add check to see if addBudget was successful
      // before going to Budget
      this.props.goToBudget(newBudget);
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
    for (const budget of this.props.budgets) {
      if (budget.date.month === this.state.date.month &&
          budget.date.year === this.state.date.year) {
            found = true;
            break;
          }
    }
    return found;
  }
  
  // ==========================================================
  // RENDER
  // ==========================================================
  render() {
    // Budgets
    let budgets = "Loading...";
    if (this.props.budgets) {
      budgets = (
        <Budgets
            years={this.props.years}
            months={MONTHS}
            budgets={this.props.budgets}
            addClicked={this.addBtnHandler}
            viewClicked={this.props.goToBudget}
            deleteClicked={this.summonDeleteModal}
        />
      );
    }

    // Budget List
    const budgetList = (
      <div>
          <Modal
            show={this.state.modal.show}
            type={this.state.modal.type}
            title={this.state.modal.title}
            message={this.state.modal.message}
            confirmed={this.state.modal.confirmed}
            canceled={this.state.modal.canceled}
            form={this.state.modal.form}
          />
        {budgets}
      </div>
    );
    
    return (
      <div>
        <Toolbar 
          title={'Budget List'}
          leftBtnTitle={'< Back'}
          leftBtnAction={() => this.props.changeScreen('Dashboard')}
          rightBtnTitle={'Chart'}
          rightBtnAction={() => this.props.changeScreen('LineCharts')}/>
        <main style={{paddingTop: '1px', marginTop: '39px'}}>
          {budgetList}
        </main>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    budgets: state.budgets
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addBudget: (budget) => dispatch(actionCreators.saveBudget(budget)),
    deleteBudget: (id) => dispatch(actionCreators.deleteBudget(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BudgetList);