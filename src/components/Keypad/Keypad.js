import React, {Component} from 'react';

import Key from './Key/Key';
import InputField from './InputField/InputField';

import classes from './Keypad.module.css';

class Keypad extends Component  {
  constructor(props) {
    super(props);
    this.state = {
      fieldOne: null,
      fieldTwo: null,
      fieldThree: null,
      fieldFour: null
    }
  }

  buttonPressed = value => {
    if (value === 'Clear') {
      this.setState({
        fieldOne: null,
        fieldTwo: null,
        fieldThree: null,
        fieldFour: null,
      });
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
      case this.state.fieldFour:
        this.setState({fieldFour: null});
        break;
      case this.state.fieldThree:
        this.setState({fieldThree: null});
        break;
      case this.state.fieldTwo:
        this.setState({fieldTwo: null});
        break;
      case this.state.fieldOne:
        this.setState({fieldOne: null});
        break;
      default:
        break;
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
      <div>
        <InputField values={values}/>
        <div className={classes.Keys}>
          {keypad}
        </div>
      </div>
    );
  }
}

export default Keypad;