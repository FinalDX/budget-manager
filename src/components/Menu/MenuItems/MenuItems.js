import React from "react";

import TextButton from "../../UI/Buttons/TextButton/TextButton";

import classes from "./MenuItems.module.css";

const menuItems = (props) => {
  return (
    <div>
      <div className={classes.FirstName}>Pocket</div>
      <div className={classes.Logo}>
        <img
          src={require("../../../assets/images/PocketPlannerLogo.png")}
          alt={"Pocket Planner Logo"}
          style={{ width: "30px", margin: "5px 30px 0" }}
        />
      </div>
      <div className={classes.SecondName}>Planner</div>
      <hr style={{ marginTop: "10px" }} />
      <ul className={classes.MenuItems}>
        <li>
          <TextButton color={"#333"}>Settings</TextButton>
        </li>
      </ul>
      <div className={classes.Bottom}>
        <TextButton clicked={() => props.changeScreen("LogIn")} color={"#333"}>
          Log out
        </TextButton>
      </div>
    </div>
  );
};

export default menuItems;
