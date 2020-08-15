import React, {Component} from 'react';

import Key from './Key/Key';
import InputField from './InputField/InputField';
import shortID from 'shortid';

import classes from './Keypad.module.css';

class Keypad extends Component  {
  constructor(props) {
    super(props);
    this.state = {
      fieldOne: null,
      fieldTwo: null,
      fieldThree: null,
      fieldFour: null,
      message: null,
      status: null,
      createdSet: null
    }
  }

  buttonPressed = value => {
    if (value === 'Clear') {
      this.clearAllFields();
    } else if (value === 'Back') {
      this.removeLastField();
    } else {
      this.setNextField(value);
    }
  }

  setNextField = (value) => {
    switch(true) {
      case !this.state.fieldOne:
        this.setState({fieldOne: value});
        break;
      case !this.state.fieldTwo:
        this.setState({fieldTwo: value});
        break;
      case !this.state.fieldThree:
        this.setState({fieldThree: value});
        break;
      case !this.state.fieldFour:
        this.setState({fieldFour: value});
        break;
      default:
        break;
    }
  }

  removeLastField = () => {
    switch(true) {
      case this.state.fieldFour !== null:
        this.setState({fieldFour: null});
        break;
      case this.state.fieldThree !== null:
        this.setState({fieldThree: null});
        break;
      case this.state.fieldTwo !== null:
        this.setState({fieldTwo: null});
        break;
      case this.state.fieldOne !== null:
        this.setState({fieldOne: null});
        break;
      default:
        break;
    }
  }

  clearAllFields = () => {
    this.setState({
      fieldOne: null,
      fieldTwo: null,
      fieldThree: null,
      fieldFour: null,
    });
  }

  allFieldsInput = values => {
    for (let value of values) {
      if (value === null) {
        return false;
      }
    }
    return true;
  }

  checkPasscode = (passcode) => {
    let isValid = false;
    if(passcode) {
      if (this.state.fieldOne === passcode[0] && 
        this.state.fieldTwo === passcode[1] &&
        this.state.fieldThree === passcode[2] &&
        this.state.fieldFour === passcode[3] ) {
          isValid = true;
        }
    }
    return isValid;
  }

  createPasscode = (values) => {
    // Prompt user to re-enter passcode.
    this.props.setMessage('Re-enter Passcode:');
    // Save the input as createdSet and set reEntering to true.
    this.clearAllFields();
    this.setState({
      createdSet: values, 
      status: 're-entering'
    });
  }

  reEnterPasscode = values => {
    this.clearAllFields();
    let allMatch = true;
    for (let i = 0; i < values.length; i++) {
      if (values[i] !== this.state.createdSet[i]) {
        allMatch = false;
        break;
      }
    }
    if (allMatch) {
      this.props.setPasscode({
        id: shortID.generate(), 
        passcode: values.join('')
      });
      this.props.verified();
    } else {
      this.props.setMessage('Create Passcode:')
      this.setState({
        message: 'Did not match!',
        status: 'creating'
      });
    }
  }

  verifyPasscode = () => {
    // Check that the entered passcode is correct
    if (this.checkPasscode(this.props.passcode)) {
      // Passcode has been verified; logging in.
      this.props.verified();

    // Check that no message is already displayed.
    } else if (this.state.message === null){
      // Display message and clear all fields.
      this.setState({message: 'Invalid passcode!'});
      this.clearAllFields();
    }
  }

  componentDidMount () {
    if (!this.props.passcode) {
      this.setState({status: 'creating'});
    } else {
      this.setState({status: 'verifying'});
    }
  }

  componentDidUpdate () {
    let values = [
      this.state.fieldOne,
      this.state.fieldTwo,
      this.state.fieldThree,
      this.state.fieldFour
    ]
    // Once all input fields have been entered by the user.
    if (this.allFieldsInput(values)) {

      // If a passcode needs to be created.
      if (this.state.status === 'creating') {
        this.createPasscode(values);

      // If a passcode needs to be re-entered.
      } else if (this.state.status === 're-entering'){
        this.reEnterPasscode(values);

      // If a passcode needs to be verified.
      } else if (this.state.status === 'verifying'){
        this.verifyPasscode();
      }
    // Only remove the message once the user has entered an 
    // input for the first field.
    } else if (this.state.message !== null && this.state.fieldOne !== null) {
      this.setState({message: null});
    }
  }

  render() {
    let values = [
      this.state.fieldOne,
      this.state.fieldTwo,
      this.state.fieldThree,
      this.state.fieldFour
    ]
    const buttons = [7, 8, 9, 4, 5, 6, 1, 2, 3, 'Clear', 0, 'Back'];
    let keypad = [];
    let key = 0;
    for (let value  of buttons) {
      keypad.push(<Key key={key} clicked={(e) => this.buttonPressed(e.target.value)} value={value} />);
      key++;
    }

    return (
      <div className={classes.Keypad}>
        <div className={classes.Input}>
          <InputField  values={values}/>
        </div>
        <p className={classes.Message}>{this.state.message}</p>
        <div className={classes.Keys}>
          {keypad}
        </div>
      </div>
    );
  }
}

export default Keypad;