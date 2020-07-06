import React from "react";
import classes from "./SideDrawer.module.css";
import Group from "./Group/Group";
import Background from "./Background/Background";
import { Component } from "react";

class SideDrawer extends Component {
  state = {
    groupNameInput: ""
  }

  handleInput = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit = () => {
    this.props.addGroupHandler(this.state.groupNameInput)
    this.setState({
      groupNameInput: "",
    })

  }

  render() {
    let sideDrawerClasses = [classes.SideDrawer, classes.Closed];

    if (this.props.drawerStatus) {
      sideDrawerClasses = [classes.SideDrawer, classes.Open];
    }
    return (
      <>
        <div className={sideDrawerClasses.join(" ")}> 
          <input
            type="text"
            name="groupNameInput"
            value={this.state.groupNameInput}
            onChange={(event) => this.handleInput(event)}
          />
          <button onClick={() => this.handleSubmit()}>Create Group</button>
          <div>Main Group</div>
          {
            this.props.groups.map(group => {
              return (
                <Group
                  nameList={this.props.nameList}
                  group={group}
                  addPersonToGroupHandler={this.props.addPersonToGroupHandler}
                />
              )
            })
          }
        </div>
        <Background status={this.props.drawerStatus} toggleDrawerHandler={this.props.toggleDrawerHandler} />
      </>
    );
  }
};

export default SideDrawer;
