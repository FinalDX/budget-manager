import React, { Component } from "react";

import Budgets from "../../components/Budgets/Budgets";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      budgets: []
    };
  }

  render() {
    return (
      <div>
        <Budgets budgets={this.state.budgets} />
      </div>
    );
  }
}

export default Dashboard;
