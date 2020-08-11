import React, { Component } from "react";

import PieChart from "./PieChart/PieChart";
import Toolbar from "../../Toolbar/Toolbar";
import Select from "../../UI/Select/Select";

import classes from "./PieCharts.module.css";

class PieCharts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: "Incomes and Expenses"
    };
  }

  // ----------------------------------------------------------
  chartSelected = (name) => {
    this.setState({ selected: name });
  };

  render() {
    let content = null;

    // Used to determine the data that the Chart componenet
    // recieves based on the selection from the select box.
    const data = {
      "Incomes and Expenses": [
        ...this.props.incomeData,
        ...this.props.expenseData
      ],
      Expenses: [...this.props.expenseData],
      Incomes: [...this.props.incomeData]
    };

    // Calculate the budget total by first using map to get an array
    // of amount values, then using reduce to add them all up.
    let budgetTotal = data[this.state.selected].map(
      item => {
        return item.amount;
      }).reduce(
        (total, num) => {
          return total + num;
        }, 0);

    // Ceate an object that will onctain the total value for each category
    let categoryTotals = {};

    // Loop through every item in data to calculate the total values for each category
    for (let item of data[this.state.selected]) {
      // If the category already exists, add to the total value
      if (item.category in categoryTotals) {
        categoryTotals[item.category] =
          categoryTotals[item.category] + item.amount;
      // If the category does not exist, create the category with its value
      } else {
        categoryTotals[item.category] = item.amount;
      }
    }

    // Create an array that will contain each dataPoint object
    const dataPoints = [];

    // Create each dataPoint object using the categoryTotals object,
    // calculate the percentage using the budgetTotal,
    // and add it to the dataPoints array
    for (const [key, value] of Object.entries(categoryTotals)) {
      let percentage = Math.round((value / budgetTotal) * 100);
      dataPoints.push({ y: percentage, label: key });
    }

    // Ensures that the Chart componenet is only rendered if the data
    // has at least one item.
    let chart = data[this.state.selected].length > 0 ? (
      <PieChart title={this.state.selected} dataPoints={dataPoints} />
    ) : <div>No data to display for this selection!</div>;

    // Show the content if there is at least one item inside
    // incomes or expenses.
    if (this.props.incomeData.length > 0 || this.props.expenseData.length > 0) {
      content = (
        <div className={classes.Charts}>
          <Select
            style={{ width: "250px" }}
            value={this.state.selected}
            changed={(e) => this.chartSelected(e.target.value)}
            options={["Incomes and Expenses", "Incomes", "Expenses"]}
          />

          <div className={classes.ChartContainer}>
            {chart}
          </div>
        </div>
      );
      // If there are no items, display a message.
    } else {
      content = (
        <div style={{ marginTop: "20px" }}>
          <p>No data to display!</p>
          Please enter at least one budget item to view the pie charts.
        </div>
      );
    }

    return (
      <div>
        <Toolbar
          title={"Pie Charts"}
          leftBtnTitle={"< Back"}
          leftBtnAction={this.props.changeScreen}
        />
        <main style={{ paddingTop: "1px", marginTop: "39px" }}>{content}</main>
      </div>
    );
  }
}

export default PieCharts;
