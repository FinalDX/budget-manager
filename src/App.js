import React, { Component } from "react";

import Layout from "./components/Layout/Layout";
import Dashboard from "./containers/Dashboard/Dashboard";

class App extends Component {
  render() {
    return (
      <Layout>
        <Dashboard />
      </Layout>
    );
  }
}

export default App;
