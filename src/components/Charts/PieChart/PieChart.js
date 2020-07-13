import React from "react";

import CanvasJSReact from "../../../assets/canvasjs/canvasjs.react";
import classes from "./Chart.module.css";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const chart = props => {
  // Calculate the budget total by first using map to get an array
  // of amount values, then using reduce to add them all up.
  let budgetTotal = props.data
    .map(item => {
      return item.amount;
    })
    .reduce((total, num) => {
      return total + num;
    }, 0);
  // Ceate an object that will onctain the total value for each category
  let categoryTotals = {};
  // Loop through every item in data to calculate the total values for each category
  for (let item of props.data) {
    // If the category already exists, add to the total value
    if (item.category in categoryTotals) {
      categoryTotals[item.category] =
        categoryTotals[item.category] + item.amount;
    // If the category does not exist, create the category with its value
    } else {
      categoryTotals[item.category] = item.amount;
    }
  }
  // Create an array that will contain each dataPoint object
  const dataPoints = [];
  // Create each dataPoint object using the categoryTotals object,
  // calculate the percentage using the budgetTotal,
  // and add it to the dataPoints array
  for (const [key, value] of Object.entries(categoryTotals)) {
    let percentage = Math.round((value / budgetTotal) * 100);
    dataPoints.push({ y: percentage, label: key });
  }

  const options = {
    exportEnabled: false,
    animationEnabled: true,
    title: {
      text: props.title
    },
    data: [
      {
        type: "pie",
        startAngle: 75,
        toolTipContent: "<b>{label}</b>: {y}%",
        showInLegend: "true",
        legendText: "{label}",
        indexLabelFontSize: 16,
        indexLabel: "{label} - {y}%",
        dataPoints: dataPoints
      }
    ]
  };

  return props.data.length > 0 ?
    <div className={classes.Chart}>
      <CanvasJSChart options={options} />
    </div>  : null;
};

export default chart;
