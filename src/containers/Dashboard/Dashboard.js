import React, { Component } from "react";

import Toolbar from "../../components/Toolbar/Toolbar";
import SideDrawer from "../../components/UI/SideDrawer/SideDrawer";
import Balance from "../../components/Balance/Balance";
import Menu from "../../components/Menu/Menu";
import MenuItems from "../../components/Menu/MenuItems/MenuItems";

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
    return (
      <div>
        <Toolbar
          title={"Dashboard"}
          rightBtnTitle={"Budget List"}
          rightBtnAction={() => this.props.changeScreen("BudgetList")}
          leftBtnTitle={<Menu />}
          leftBtnAction={this.toggleSideDrawer}
        />
        <main style={{ paddingTop: "1px", marginTop: "39px" }}>
          <SideDrawer
            show={this.state.showSideDrawer}
            toggleShow={this.toggleSideDrawer}
          >
            <MenuItems changeScreen={this.props.changeScreen} />
          </SideDrawer>

          <h1>Total Balance:</h1>
          <Balance
            remaining={this.calculateTotal(this.props.budgets)}
            style={{ fontSize: "300%", fontWeight: "lighter" }}
          />
        </main>
      </div>
    );
  }
}

export default Dashboard;
