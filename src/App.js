import React, { Component } from "react";
import { connect } from "react-redux";

import LogIn from "./components/LogIn/LogIn";
import BudgetList from "./containers/BudgetList/BudgetList";
import LineCharts from "./containers/BudgetListChart/BudgetListChart";
import Budget from "./containers/Budget/Budget";
import * as actionTypes from "./store/actions/actions";

import DBService from "./services/DBService/DBService";
import Dashboard from "./containers/Dashboard/Dashboard";

// Return an array of years from system date;
// 20 years in the past and 20 years in the future.
const createYearOptions = (date) => {
  const from = date.getFullYear() - 10;
  const to = date.getFullYear() + 10;
  let years = [];
  for (let year = from; year <= to; year++) {
    years.push(year.toString());
  }
  return years;
};

// ==========================================================
// GLOBAL CONSTANTS
// ==========================================================
const DB = new DBService();
const CATEGORIES = [
  "Bills",
  "Debt",
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
];
const YEARS = createYearOptions(new Date());

// ==========================================================
// APP
// ==========================================================
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedBudget: null,
      loggedIn: false,
      screen: "LogIn",
      time: null
    };
  }

  // ----------------------------------------------------------
  logIn = () => {
    this.setState({ loggedIn: true, screen: "Dashboard" });
  };

  // ----------------------------------------------------------
  logOut = () => {
    this.setState({ loggedIn: false, screen: "LogIn" });
  };

  // ----------------------------------------------------------
  changeScreen = (screen) => {
    this.setState({ screen: screen });
  };

  // ----------------------------------------------------------
  // Get all budgets from the database and set budgets in state.
  componentDidMount() {
    if (DB.checkBrowserSupport()) {
      this.props.initBudgets();
    } else {
      console.log("No support");
    }
  }

  // ----------------------------------------------------------
  // Show the Budget componenet and pass the selectedBudget
  // from the state to Budget as a prop
  goToBudget = (budget) => {
    this.setState({ selectedBudget: budget, screen: "Budget" });
  };

  // ==========================================================
  // RENDER
  // ==========================================================
  render() {

    let screen = null;
    switch (true) {
      case this.state.screen === "LogIn" || !this.state.loggedIn:
        screen = <LogIn logIn={this.logIn} />;
        break;
      case this.state.screen === "Dashboard" && this.state.loggedIn:
        screen = (
          <Dashboard
            logOut={this.logOut}
            changeScreen={this.changeScreen}
            budgets={this.props.budgets}
          />
        );
        break;
      case this.state.screen === "BudgetList" && this.state.loggedIn:
        screen = (
          <BudgetList
            changeScreen={this.changeScreen}
            goToBudget={this.goToBudget}
            years={YEARS}
            DB={DB}
          />
        );
        break;
      case this.state.screen === "LineCharts" && this.state.loggedIn:
        screen = (
          <LineCharts
            changeScreen={this.changeScreen}
            categories={CATEGORIES}
            years={YEARS}
          />
        );
        break;
      case this.state.screen === "Budget" && this.state.loggedIn:
        screen = (
          <Budget
            changeScreen={this.changeScreen}
            selectedBudget={this.state.selectedBudget}
            categories={CATEGORIES}
            DB={DB}
          />
        );
        break;
      default:
        break;
    }

    return <div style={{ textAlign: "center" }}>{screen}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    budgets: state.budgets
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    initBudgets: () => dispatch(actionTypes.initBudgets())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
