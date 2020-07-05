import React from 'react'

const categories = ["Housing", "Food", "Transportation", "Utilites",
    "Insurance", "Clothing", "Medical", "Personal", "Education",
    "Savings", "Entertainment"];

let options = categories.map(cur => (
    <option value={cur}>{cur}</option>
));

const select = props => (
    <select name={props.name}>
        {options}
    </select>
);

export default select;