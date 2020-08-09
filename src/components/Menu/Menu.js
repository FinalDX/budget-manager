import React from "react";

const menu = (props) => {
  let line = {
    backgroundColor: "#fff",
    height: "2px",
    width: "20px",
    margin: "4px"
  };
  return (
    <div style={{ width: "30px", marginTop: "5px" }}>
      <div style={line}></div>
      <div style={line}></div>
      <div style={line}></div>
    </div>
  );
};

export default menu;
