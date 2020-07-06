import React, { Component } from "react";
import classes from "./NameBox.module.css";

class NameBox extends Component {
  state = {
    message: "Add names",
    subMessage: "(try a commma-separated list)",
  };

  componentDidUpdate(prevProps) {
    if (prevProps.chosenName !== this.props.chosenName) {
      this.setState({
        message: this.props.chosenName,
        subMessage: "",
      });
    }

    if (
      prevProps.namesNumber !== this.props.namesNumber &&
      this.props.namesNumber === 0
    ) {
      this.setState({
        message: "Add names again!",
        subMessage: "(try a comma-separated list)",
      });
    }

    if (
      prevProps.namesNumber !== this.props.namesNumber &&
      this.props.namesNumber > 0 &&
      !this.props.chosenName
    ) {
      this.setState({
        message: 'click "Choose Random Name"',
        subMessage: "",
      });
    }
  }

  render() {
    return (
      <>
        <div
          className={
            this.state.subMessage || !this.props.chosenName
              ? classes.Placeholder
              : classes.NameBox
          }
        >
          {this.state.message}
        </div>
        <div className={classes.SubText}>{this.state.subMessage}</div>
      </>
    );
  }
}

export default NameBox;
