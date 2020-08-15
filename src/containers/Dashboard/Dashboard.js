import React, { Component } from "react";

import Toolbar from "../../components/Toolbar/Toolbar";
import SideDrawer from "../../components/UI/SideDrawer/SideDrawer";
import Balance from "../../components/Balance/Balance";
import Menu from "../../components/Menu/Menu";
import MenuItems from "../../components/Menu/MenuItems/MenuItems";
import PieChart from "../../components/Charts/PieChart/PieChart";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSideDrawer: false
    };
  }

  toggleSideDrawer = () => {
    this.setState({ showSideDrawer: this.state.showSideDrawer ? false : true });
  };

  calculateTotal = (budgets) => {
    let total = 0;
    for (let budget of budgets) {
      total += budget.remaining;
    }
    return total;
  };

  render() {
    let totalBalance = this.calculateTotal(this.props.budgets);
    let categoryTotals = {};

    for (let budget of this.props.budgets) {
      let allItems = [...budget.incomes, ...budget.expenses];
      // Loop through every item in data to calculate the total values for each category
      for (let item of allItems) {
        // If the category already exists, add to the total value
        if (item.category in categoryTotals) {
          categoryTotals[item.category] =
            categoryTotals[item.category] + item.amount;
          // If the category does not exist, create the category with its value
        } else {
          categoryTotals[item.category] = item.amount;
        }
      }
    }

    // Create an array that will contain each dataPoint object
    const dataPoints = [];

    // Create each dataPoint object using the categoryTotals object,
    // calculate the percentage using the budgetTotal,
    // and add it to the dataPoints array
    for (const [key, value] of Object.entries(categoryTotals)) {
      let percentage = Math.round((value / totalBalance) * 100);
      dataPoints.push({ y: percentage, label: key });
    }

    return (
      <div>
        <Toolbar
          title={"Dashboard"}
          rightBtnTitle={"Budget List"}
          rightBtnAction={() => this.props.changeScreen("BudgetList")}
          leftBtnTitle={<Menu />}
          leftBtnAction={this.toggleSideDrawer}
        />
        <main style={{ paddingTop: "1px", marginTop: "49px" }}>
          <SideDrawer
            show={this.state.showSideDrawer}
            toggleShow={this.toggleSideDrawer}
          >
            <MenuItems logOut={this.props.logOut} />
          </SideDrawer>

          <h1>Total Balance:</h1>
          <Balance
            remaining={totalBalance}
            style={{ fontSize: "300%", fontWeight: "lighter" }}
          />
          {dataPoints.length > 0 ? (
            <PieChart title={null} dataPoints={dataPoints} />
          ) : (
            <div>
              <p>To add a budget: </p>
              <ol>
                <li>
                  Select 'Budget List' at the top <br /> right corner of this
                  screen.
                </li>
                <li>Press 'Add'.</li>
              </ol>
            </div>
          )}
        </main>
      </div>
    );
  }
}

export default Dashboard;