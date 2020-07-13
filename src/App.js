import React, { Component } from "react";
import { Route } from 'react-router';

import Layout from "./components/Layout/Layout";
import Dashboard from './containers/Dashboard/Dashboard';
import Budget from './containers/Budget/Budget';


class App extends Component {
  render () {
    return (
      <Layout>
        <Route path='/' exact component={Dashboard} />
        <Route path='/BudgetControls' component={Budget} />
      </Layout>
    );
  };
}

export default App;
