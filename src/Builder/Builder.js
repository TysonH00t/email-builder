import React, { Component } from "react";
import { connect } from 'react-redux';
import Plus from "../Components/Plus/Plus";
import NewContainer from "../Components/NewContainer/NewContainer";
import Section from "../Sections/Section/Section";
// import Text from "../Components/Text/Text";
import "./Builder.css";
// import Content from "../Content/Content";
import * as actionTypes from '../store/actions';

class Builder extends Component {
  state = {
    gridShowing: false,
    Sections: []
  };

  //Show or hide NewContainer
  showGrid = () => {
    let grid = this.state.gridShowing;
    grid = !grid;
    this.setState({ gridShowing: grid });
  };

  //Add new section to Builder
  addSection = division => {
    this.setState({
      Sections: [...this.state.Sections, division]
    });
    this.showGrid();
    console.log(this.state.Sections);
  };

  render() {
    let sectionGrid = null;

    if (this.state.gridShowing) {
      sectionGrid = <NewContainer clicked={this.addSection} />;
    }

    return (
      <div className="body">
        <div className="builder">
          {/* <Section /> */}
          {this.state.Sections.map((section, index) => (
            <Section key={index} division={this.state.Sections[index]} />
          ))}
          {/* <Text /> */}
          <div className="container">
            <Plus
              gridShowing={this.state.gridShowing}
              showGrid={this.showGrid}
            />
            {sectionGrid}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    Secs: state.section
  }
}

const mapDispatchTopProps = dispatch => {
  return {
    onSectionAdded: (secName) => dispatch({type: actionTypes.ADD_SECTION, sectionName: secName})
    //onSectionAdded: (secName) => dispatch({type: actionTypes.ADD_SECTION, sectionName: secName})
  }
}

export default connect(mapStateToProps, mapDispatchTopProps)(Builder);
