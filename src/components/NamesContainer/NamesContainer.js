import React, { Component } from 'react';
import Name from '../../Name/Name';

class NamesContainer extends Component {
  state = {
    conditionalNameList: [],
  };

  componentDidMount() {
    this.setState({
      conditionalNameList: this.props.nameList,
    })
  }

  componentDidUpdate(prevProps) {
    if (prevProps.selectedGroup !== this.props.selectedGroup) {
      this.setState({
        conditionalNameList: this.props.nameList.filter(person => {
          return person.groups[this.props.selectedGroup];
        }),
      });
    }
    if (prevProps.nameList !== this.props.nameList) {
      this.setState({
        conditionalNameList: this.props.nameList,
      });
    }
  }

  render() {
    return (
      <>
        {this.state.conditionalNameList
          .filter(person => {
            return person.groups[this.props.selectedGroup];
          })
          .filter(person => {
            return this.props.editAll ? person : !person.groups[this.props.selectedGroup].selected;
          })
          .map((person, index) => {
            return (
              <Name
                person={person}
                key={person.name}
                editNameHandler={this.props.editNameHandler}
                delete={this.props.deleteNameHandler}
                editAll={this.props.editAll}
                selectedGroup={this.props.selectedGroup}
              />
            );
          })}
      </>
    );
  }
}

export default NamesContainer;
