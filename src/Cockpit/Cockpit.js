import React, { Component } from "react";
import classes from "./Cockpit.module.css";

class Cockpit extends Component {
  constructor(props) {
    super(props);
    this.inputElement = React.createRef();
  }

  state = {
    namesInput: "",
  };

  componentDidMount() {
    this.inputElement.current.focus();
  }

  inputHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  submitHandler = () => {
    this.props.addNameHandler(this.state.namesInput);
    this.setState({
      namesInput: "",
    });
  };

  render() {
    return (
      <div className={classes.Cockpit}>
        <h1>{this.props.mainGroupName}</h1>
        <input
          name="namesInput"
          value={this.state.namesInput}
          ref={this.inputElement}
          type="text"
          onChange={(event) => this.inputHandler(event)}
          placeholder="student name"
        />
        <button onClick={() => this.submitHandler()}>Add Name</button>
        <button onClick={this.props.chooseNameHandler}>Choose Random Name!!</button>
        <button onClick={this.props.editAllHandler}>Edit All</button>
      </div>
    );
  }
}

export default React.memo(Cockpit);
