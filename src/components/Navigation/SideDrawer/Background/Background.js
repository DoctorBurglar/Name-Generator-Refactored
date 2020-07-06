import React from "react";
import classes from "./Background.module.css";

const background = (props) => {
  let styles;
  if (props.zIndex > 0) {
    styles = { zIndex: props.zIndex };
  }
  return (
    <>
      {props.status ? (
        <div
          onClick={() => props.toggleDrawerHandler()}
          className={classes.Background}
          style={styles}
        ></div>
      ) : null}
    </>
  );
};

export default background;
