import React, { Component } from "react";
import { connect } from "react-redux";

import Keypad from "../../components/Keypad/Keypad";
import * as actionCreators from "../../store/actions/actionCreators";

import classes from "./LogIn.module.css";

class LogIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "Enter Passcode:",
      dataSet: false
    };
  }

    // ----------------------------------------------------------
    // 'Create Passcode:', 'Enter Passcode:'.
    setMessage = message => {
        this.setState({message: message});
    }

    // ----------------------------------------------------------
    // Set passcode in indexeddb.
    setPasscode = passcode => {
        this.props.setPasscode(passcode);
    }

    // ----------------------------------------------------------
    // If no passcode exists in indexeddb then prompt the user
    // to create a passcode.
    componentDidUpdate () {
        if (!this.state.dataSet &&
            !this.props.passcode && 
            this.props.loaded) {
            this.setState({message: 'Create Passcode:', dataSet: true});
        }
    }
  

  render() {
    let content = <div>Loading assets...</div>;
    if (this.props.loaded) {
      content = (
        <div>
          <h3>{this.state.message}</h3>
          <div className={classes.Keypad}>
            <Keypad
              setMessage={this.setMessage}
              passcode={this.props.passcode}
              setPasscode={this.setPasscode}
              verified={this.props.logIn}
            />
          </div>
        </div>
      );
    }

    return (
      <div className={classes.Background}>
        <div className={classes.LogIn}>
          <h1>
            <span style={{ color: "#33658a" }}>P</span>ocket{" "}
            <span style={{ color: "rgb(253, 68, 68)" }}>P</span>lanner
          </h1>
          {content}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    passcode: state.passcode,
    loaded: state.dataLoaded
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setPasscode: (passcode) =>
      dispatch(actionCreators.setPasscode(passcode))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
