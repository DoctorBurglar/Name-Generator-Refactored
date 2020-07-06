import React from "react";
import classes from "./Toolbar.module.css";

const toolbar = (props) => {
  let sideDrawerClasses = [classes.SideDrawerButton];
  if (props.drawerOpen) {
    sideDrawerClasses = [classes.SideDrawerButton, classes.Open];
  }
  return (
    <header className={classes.Toolbar}>
      <div
        style={{ zIndex: 151 }}
        className={sideDrawerClasses.join(" ")}
        onClick={() => props.toggleDrawerHandler()}
      >
        <div className={classes.MenuIcon}></div>
        <div className={classes.MenuIcon}></div>
        <div className={classes.MenuIcon}></div>
      </div>
      <div>LOGO</div>
    </header>
  );
};

export default toolbar;
