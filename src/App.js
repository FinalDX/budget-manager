import React, { Component } from "react";

import Layout from "./components/Layout/Layout";
import Budget from './containers/Budget/Budget';


class App extends Component {
  render () {
    return (
      <Layout>
        <Budget />
      </Layout>
    );
  };
}

export default App;
