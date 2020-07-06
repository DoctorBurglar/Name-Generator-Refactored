import React, { Component } from "react";
import classes from "./Name.module.css";

class Name extends Component {
  state = {
    showEditor: false,
    editNameInput: "",
  };

  componentDidUpdate(prevProps) {
    if (prevProps.editAll !== this.props.editAll) {
      // The global flag will override the local one.
      if(this.props.editAll) {
        this.setState({
          showEditor: true,
        });
      } else {
        this.setState({
          showEditor: false,
        });
      }
    }
  }

  toggleEditorHandler = () => {
    this.setState({
      showEditor: !this.state.showEditor,
    });
  };

  handleInput = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  render() {
    let nameListClasses = [classes.NameList];

    return (
      <div  className={nameListClasses.join(" ")}>
        <div
          onClick={() => this.toggleEditorHandler()}
          className={classes.Name}
        >
          {this.props.person.name}
        </div>
        {this.state.showEditor ? (
          <div className={classes.Editor}>
            <input
              name="editNameInput"
              value={this.state.editNameInput}
              type="text"
              onChange={(event) => this.handleInput(event)}
            />
            <button onClick={() => this.props.editNameHandler(this.props.person.name, this.state.editNameInput)}>
              Submit Edit Name
            </button>
            <button onClick={() => this.props.delete(this.props.person.name)}>
              Delete Name
            </button>
          </div>
        ) : null}
      </div>
    );
  }
}

export default Name;
