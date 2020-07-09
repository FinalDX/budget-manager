import React, { Component } from 'react';

import Arrows from '../Icons/Arrows/Arrows';
import Backdrop from '../../UI/Backdrop/Backdrop';

import classes from './Dropdown.module.css';

class Dropdown extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            show: false,
            title: this.props.title
        }
    }

    toggleList = () => {
        const toggleShow = this.state.show ? false : true;
        this.setState({show: toggleShow})
    };

    selectedItem = (name) => {
        this.toggleList();
        this.setState({title: name});
        this.props.selected(name);
    }

    render() {
        const list = this.props.list.map(item => (
            <li className={classes.ListItem} key={item.id} onClick={() => this.selectedItem(item.name)}>{item.name}</li>
        ));

        return (
            <div className={classes.Dropdown}>
                <Backdrop show={this.state.show} 
                    clicked={this.toggleList}
                    layer={100}/>
                <div className={classes.Title} onClick={this.toggleList}>
                    {this.state.title}
                    <div className={classes.Icon}>
                        <Arrows show={this.state.show} />
                    </div>
                </div>
                {this.state.show ?
                <ul className={classes.List}>
                    {list}
                </ul> : null}
            </div>
        )
    }
}

export default Dropdown;