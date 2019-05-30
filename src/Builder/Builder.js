import React, { Component } from "react";
import { connect } from 'react-redux';
import Plus from "../Components/Plus/Plus";
import NewContainer from "../Components/NewContainer/NewContainer";
import Section from "../Sections/Section/Section";
import Text from "../Components/Text/Text";
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
    let grid = this.props.gridShow;
    grid = !grid;
    this.setState({ gridShowing: grid });
  };

  render() {
    let sectionGrid = null;
    let content = null;

    if (this.props.contentShow) {
      content = <Text />
    }

    if (this.props.gridShow) {
      sectionGrid = <NewContainer clicked={this.props.onSectionAdded} />;
    }

    return (
      <div className="body">
        {/* <Text /> */}
        <div className="builder">
        {content}
          {this.props.Secs.map((section,index) => (
            <Section key={index + section.division} index={index} division={section.division} x={this.props.onSectionRemoved} />
          ))}
          <div className="container">
            <Plus
              gridShowing={this.props.gridShow}
              showGrid={this.props.onGridShow}
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
    Secs: state.sections,
    gridShow: state.gridShowing,
    contentShow: state.contentShow,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onGridShow: () => dispatch({type: actionTypes.SHOW_GRID}),
    onContentShow: () => dispatch({type: actionTypes.SHOW_CONTENT, index: 0, cIndex: 0}),
    onSectionAdded: (secName) => dispatch({type: actionTypes.ADD_SECTION, sectionName: secName}),
    onSectionRemoved: (secIndex) => dispatch({type: actionTypes.REMOVE_SECTION, index: secIndex}),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Builder);
