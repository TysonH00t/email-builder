import React, { Component } from "react";

//importing Components
import Plus from "../Components/Plus/Plus";
import NewContainer from "../Components/NewContainer/NewContainer";
import Section from "../Sections/Section/Section";
import Text from "../Components/Text/Text";
import "./Builder.css";
import Editor from '../Components/Text/myEditor/myEditor';
//import TextEditor from '../Components/Text/TextEditor/TextEditor';

//importing Redux
import { connect } from 'react-redux';
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

    //Show text editor
    if (this.props.contentShow) {
      content = <Text />
    }

    //Show New Content Sections
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
        <Editor />
        {/* <TextEditor /> */}
      </div>
    );
  }
}


//Import Redux State
const mapStateToProps = state => {
  return {
    Secs: state.sections,
    gridShow: state.gridShowing,
    contentShow: state.contentShow,
  }
}

//Import Redux Functions
const mapDispatchToProps = dispatch => {
  return {
    onGridShow: () => dispatch({type: actionTypes.SHOW_GRID}),
    onContentShow: () => dispatch({type: actionTypes.SHOW_CONTENT, index: 0, cIndex: 0}),
    onSectionAdded: (secName, contentNum) => dispatch({type: actionTypes.ADD_SECTION, sectionName: secName, contentNum: contentNum}),
    onSectionRemoved: (secIndex) => dispatch({type: actionTypes.REMOVE_SECTION, index: secIndex}),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Builder);
