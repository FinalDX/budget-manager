import React from "react";

import TextButton from '../UI/Buttons/TextButton/TextButton';

import classes from "./Toolbar.module.css";

const toolbar = props => {
  return (
    <header className={classes.Toolbar}>
      <nav className={classes.Navigation}>
        <div className={classes.LeftBtn}>
          <TextButton 
            color={'#fff'}
            clicked={props.leftBtnAction}>
              {props.leftBtnTitle}
          </TextButton>
        </div>
        
      
        <div className={classes.Title}>
          {/* <div className={classes.FirstName}>Pocket</div>
          <div className={classes.Logo}>
            <img
              src={require('../../assets/images/PocketPlannerLogo.png')}
              alt={'Pocket Planner Logo'}
              style={{width: '30px', margin: '5px 30px 0'}}
            />
          </div>
          <div className={classes.SecondName}>Planner</div> */}
          {props.title}
        </div>
        <div className={classes.RightBtn}>
          <TextButton
            color={'#fff'}
            className={classes.RightBtn}
            clicked={props.rightBtnAction}>
              {props.rightBtnTitle}
          </TextButton>
        </div>
      </nav>
    </header>
  );
};

export default toolbar;
