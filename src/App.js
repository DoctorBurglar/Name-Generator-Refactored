import React, { Component } from "react";
import "./App.css";
import NameBox from "./NameBox/NameBox";
import Cockpit from "./Cockpit/Cockpit";
import Toolbar from "./components/Navigation/Toolbar/Toolbar";
import SideDrawer from "./components/Navigation/SideDrawer/SideDrawer";
import NamesContainer from "./components/NamesContainer/NamesContainer";

class App extends Component {
  state = {
    nameList: [
      {
        name: "trevor",
        groups: {
          main: {selected: false},
          test: {selected: false},
        }
      },
      {
        name: "steve",
        groups: {
          main: {selected: false}
        }
      }
    ],
    selectedGroup: "main",
    mainGroupName: "Main Group",
    chosenName: "",
    editAll: false,
    showSideDrawer: false,
    groups: [],
  };

  addNameHandler = (namesString) => {
    if (!namesString) {
      return;
    }

    let addedNamesObjectArray = [...namesString.split(", ")].map((name) => ({
      name,
      groups: {
        main: {
          selected: false,
        }
      },
    }));

    this.setState({
      nameList: [...this.state.nameList, ...addedNamesObjectArray],
    });
  };

  chooseNameHandler = () => {
    if (this.state.nameList.length === 0) {
      return;
    }

    let yetToBeSelected = this.state.nameList.filter(person => {
      return !person.groups[this.state.selectedGroup].selected;
    })

    console.log(yetToBeSelected.length);

    let chosenPerson;

    //If everyone has been selected, reset everyone's status.
    //Additionally, if there's only one unselected person remaining there is no need to randomly chooose them.
    if (yetToBeSelected.length === 1) {
      chosenPerson = yetToBeSelected[0];
      yetToBeSelected = this.state.nameList.map(person => {
        return {
          ...person,
          groups: {
            ...person.groups,
            [this.state.selectedGroup]: {
              selected: false,
            }
          }
        }
      })
      this.setState({
        nameList: yetToBeSelected,
        chosenName: chosenPerson.name,
      })
      // Bail
      return;
    }

    //If chosenPerson was not defined in the conditional, define it here.
    chosenPerson = chosenPerson ? chosenPerson : yetToBeSelected[
      Math.floor(Math.random() * yetToBeSelected.length)
    ]
    
    let newNameList = this.state.nameList.map(person => {
      return person.name === chosenPerson.name ? {
        ...chosenPerson,
        groups: {
          ...chosenPerson.groups,
          [this.state.selectedGroup]: {
            selected: true,
          }
        }
      } : person
    })


    this.setState({
      nameList: newNameList,
      chosenName: chosenPerson.name
    });
  };

  editAllHandler = () => {
    this.setState({
      editAll: !this.state.editAll,
    });
  };

  editNameHandler = (previousName, newName) => {
    this.setState({
      nameList: this.state.nameList.map(person => person.name === previousName ? {...person, name: newName} : person),
      chosenName: this.state.chosenName ? newName : ""
    })
  };

  deleteNameHandler = (name) => {
    this.setState(
      {
        chosenName: name === this.state.chosenName ? "" : this.state.chosenName,
        nameList: this.state.nameList.filter((person) => person.name !== name),
      },
      () => {
        if (this.state.nameList.length === 0) {
          this.setState({
            editAll: false,
          });
        }
      }
    );
  };

  toggleDrawerHandler = () => {
    this.setState({
      showSideDrawer: !this.state.showSideDrawer,
    })
  }

  addGroupHandler = (name) => {
    console.log('buts');
    this.setState({
      groups: [...this.state.groups, { name }],
    })
  }

  addPersonToGroupHandler = (name, group) => {
    this.setState({
      nameList: this.state.nameList.map(person => {
        return person.name === name ? {
          ...person,
          groups: {
            ...person.groups,
            [group]: {
              selected: false,
            }
          }
        } : {...person}
      })
    })
  }


  render() {
    return (
      <div className="App">
        <Toolbar
          toggleDrawerHandler={this.toggleDrawerHandler}
        />
        <SideDrawer
          toggleDrawerHandler={this.toggleDrawerHandler}
          drawerStatus={this.state.showSideDrawer}
          addGroupHandler={this.addGroupHandler}
          addPersonToGroupHandler={this.addPersonToGroupHandler}
          nameList={this.state.nameList}
          groups={this.state.groups}
        />
        <Cockpit
          chooseNameHandler={this.chooseNameHandler}
          addNameHandler={this.addNameHandler}
          editAllHandler={this.editAllHandler}
          editAll={this.state.editAll}
          mainGroupName={this.state.mainGroupName}
        />
        <div className="display-box">
          <NameBox
            namesNumber={this.state.nameList.length}
            chosenName={this.state.chosenName}
          ></NameBox>
          <hr style={{ width: "50%" }}></hr>
          <NamesContainer
            editNameHandler={this.editNameHandler}
            editAll={this.state.editAll}
            nameList={this.state.nameList}
            deleteNameHandler={this.deleteNameHandler}
            selectedGroup={this.state.selectedGroup}
          />
        </div>
      </div>
    );
  }
}

export default App;
