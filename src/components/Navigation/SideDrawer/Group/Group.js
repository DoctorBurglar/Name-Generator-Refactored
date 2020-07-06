import React from 'react';
import { Component } from 'react';

class Group extends Component {
  state = {
    showMembersPanel: false,
  };

  toggleMembersPanel = () => {
    this.setState({
      showMembersPanel: !this.state.showMembersPanel,
    });
  };

  render() {
    return (
      <div>
        <div onClick={() => this.toggleMembersPanel()}>{this.props.group.name}</div>
        {this.props.nameList
          .filter(person => {
            return person.groups[this.props.group.name];
          })
          .map(person => {
            return <div>{person.name}</div>;
          })}
        {this.state.showMembersPanel ? (
          <div>
            {this.props.nameList
              .filter(person => {
                return !person.groups[this.props.group.name];
              })
              .map(person => {
                return (
                  <div
                    onClick={() =>
                      this.props.addPersonToGroupHandler(person.name, this.props.group.name)
                    }
                  >
                    {person.name}
                  </div>
                );
              })}
          </div>
        ) : null}
      </div>
    );
  }
}

export default Group;
