import React, { Component } from "react";
import "./Section.css";
import Content from "../../Content/Content";
import Measure from "../../Components/Measure/Measure";
import Colors from '../../Components/Colors/Colors';
import Button from '../../Components/Button/Button';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';

class Section extends Component {
  state = {
    xPos: 0,
    yPos: 0,
    xMax: 0,
    sliderActive: false,
  };

  //Set State = to the value of the slider
  xSlide = e => {
    this.setState({ xPos: e.target.value });
  };

  ySlide = e => {
    this.setState({ yPos: e.target.value });
  };

  slider = () => {
    return this.setState({ xMax: this.state.xMax + 103 });
  };

  activateMeasure = () => {
    this.setState({ sliderActive: !this.state.sliderActive })
  }

  onDragOver = (e) => {
    e.preventDefault();
}

 onDragStart = (e, index, props) => {
  props.onSectionDrag(true);
  e.dataTransfer.setData("id", index);
}

  render() {
    let color = this.props.sections[this.props.index].backgroundColor;
    let SecDiv = null;
    //Setting max and mins for each slider depending on where the other slider is
    if (
      this.state.xPos > 50 &&
      Number(this.state.yPos) > 1 &&
      Number(this.state.xPos) - Number(this.state.yPos) < 102 &&
      Number(this.state.xMax) !== 51
    ) {
      this.setState({ xMax: 51 });
    } else if (
      Number(this.state.xPos) < 50 &&
      Number(this.state.yPos) > 0 &&
      Number(this.state.xMax) !== 0
    ) {
      this.setState({ xMax: 0 });
    }
    if (
      this.state.xPos < 0 &&
      Number(this.state.yPos) < 1 &&
      Number(this.state.xPos) - Number(this.state.yPos) < 102 &&
      Number(this.state.xMax) !== -51
    ) {
      this.setState({ xMax: -51 });
    }
    //Setting up a switch to decide how many Content pieces will be contained in this Section
    switch (this.props.division) {
      case "1":
        SecDiv = (
          <div className="outer"  style={{background: color}}>
            <div className="whole"  style={{background: color, padding: this.props.sections[this.props.index].content[0].margin ? '0' : '25px', width: this.props.sections[this.props.index].content[0].margin ? '640px' : '590px'}}>
              {/* <Text /> */}
              <Content cIndex={0} cNum={1} index={this.props.index} />
            </div>
          </div>
        );
        break;
      case "2":
        SecDiv = (
          <div style={{paddingTop: this.state.sliderActive ? '0px' : '0px', background: color}} className="outer">
            <div
              style={{ width: this.props.sections[this.props.index].content[0].margin ? Number(this.state.xPos) + 320 :  Number(this.state.xPos) + 270 , background: color, padding: this.props.sections[this.props.index].content[0].margin ? '0' : '25px' }}
              className="half"
            >
            {!this.state.sliderActive ? null : <Measure>{Number(this.state.xPos) + 270} px</Measure>}
              {/* <Measure>{Number(this.state.xPos) + 565} px</Measure> */}
              {/* <Text /> */}
              <Content cIndex={0} cNum={2} index={this.props.index} />
            </div>
            <div className="ground">
              <div style={{display: !this.props.sections[this.props.index].edit ? 'none': 'initial', }} className="halfWidth">
                <input
                  onMouseDown={this.activateMeasure}
                  onMouseUp={this.activateMeasure}
                  onChange={this.xSlide}
                  className="halfDivider"
                  step={2}
                  min={-170}
                  max={170}
                  type="range"
                  // style={{top: this.props.sections[this.props.index].content[0].margin ? '90px' : '115px'}}
                />
              </div>
            </div>
            <div style={{ width: this.props.sections[this.props.index].content[1].margin ? -this.state.xPos + 320 : -this.state.xPos + 270, background: color, padding: this.props.sections[this.props.index].content[1].margin ? '0' : '25px' }} className="half">
            {!this.state.sliderActive ? null : <Measure>{-this.state.xPos + 270} px</Measure>}
              {/* <Text /> */}
              <Content cIndex={1} cNum={2} index={this.props.index} />
            </div>
          </div>
        );
        break;
      case "3":
        SecDiv = (
          <div style={{paddingTop: this.state.sliderActive ? '0px' : '0px', background: color}} className="outer">
            <div
              style={{ width: this.props.sections[this.props.index].content[0].margin ? Number(this.state.xPos) + 213 : Number(this.state.xPos) + 163, background: color, padding: this.props.sections[this.props.index].content[0].margin ? '0' : '25px' }}
              className="third"
            >
            {!this.state.sliderActive ? null : <Measure>{this.props.sections[this.props.index].content[0].margin ? Number(this.state.xPos) + 213 : Number(this.state.xPos) + 163} px</Measure>}
              {/* <Text /> */}
              <Content cIndex={0} cNum={3} index={this.props.index} />
            </div>
            <div className="ground">
              <div style={{display: !this.props.sections[this.props.index].edit ? 'none': 'initial'}} className="thirdWidth">
                <input
                onMouseDown={this.activateMeasure}
                onMouseUp={this.activateMeasure}
                  onChange={this.xSlide}
                  className="thirdDividerL"
                  step={1}
                  min={-77}
                  max={56 + this.state.xMax}
                  defaultValue={0}
                  style={{ width: 135 + this.state.xMax }}
                  type="range"
                />
              </div>
            </div>
            <div
              style={{
                width: this.props.sections[this.props.index].content[1].margin ? 213 + Number(this.state.yPos) - Number(this.state.xPos) : 163 + Number(this.state.yPos) - Number(this.state.xPos), background: color, padding: this.props.sections[this.props.index].content[1].margin ? '0' : '25px'
              }}
              className="third"
            >
            {!this.state.sliderActive ? null : <Measure>{this.props.sections[this.props.index].content[1].margin ? 213 + Number(this.state.yPos) - Number(this.state.xPos) : 163 + Number(this.state.yPos) - Number(this.state.xPos)} px</Measure>}
              
              {/* <Text /> */}
              <Content cIndex={1} cNum={3} index={this.props.index} />
            </div>
            <div className="ground">
              <div style={{display: !this.props.sections[this.props.index].edit ? 'none': 'initial'}} className="thirdWidth">
                <input
                onMouseDown={this.activateMeasure}
                onMouseUp={this.activateMeasure}
                  onChange={this.ySlide}
                  className="thirdDividerR"
                  step={1}
                  min={-(56 + -this.state.xMax)}
                  max={77}
                  defaultValue={0}
                  style={{ width: 134 + -this.state.xMax }}
                  type="range"
                />
              </div>
            </div>
            <div style={{ width: this.props.sections[this.props.index].content[2].margin ? 213 - this.state.yPos : 163 - this.state.yPos, background: color, padding: this.props.sections[this.props.index].content[2].margin ? '0' : '25px' }} className="third">
            {!this.state.sliderActive ? null : <Measure>{this.props.sections[this.props.index].content[2].margin ? 213 - this.state.yPos : 163 - this.state.yPos} px</Measure>}
              {/*  */}
              {/* <Text /> */}
              <Content cIndex={2} cNum={3} index={this.props.index} />
            </div>
          </div>
        );
        break;
      default:
        SecDiv = null;
    }
    
    return <div>
      {/* <div className="drop" onDragOver={(e) => this.onDragOver(e)} style={{display: !this.props.sectionDrag ? 'none' : 'block'}}></div> */}
      <div className="drop" onDrop={(e)=>{this.props.onMoveSection(e, this.props.index)}} onDragOver={(e) => this.onDragOver(e)} style={{display: !this.props.sectionDrag ? 'none' : 'block'}}></div>
      <div className="frame">
      <div style={{display: this.props.sections[this.props.index].edit ? 'none': 'initial'}}>
        <Button buttonFunction={() => this.props.onEdit(this.props.index, true)} buttonType="Edit"><FontAwesomeIcon icon="edit" /></Button>
      </div>
      <div style={{display: !this.props.sections[this.props.index].edit ? 'none': 'initial'}}>
        <div className='MovePosition'>
        <Button buttonType='Move' buttonDraggable='true' buttonDragEnd={() => this.props.onSectionDrag(false)} buttonDragStart={(e) => this.onDragStart(e, this.props.index, this.props)}><FontAwesomeIcon icon="arrows-alt" /></Button>
        </div>
        <Colors buttonFunction={(color) => this.props.onChangeColor(this.props.index, color)} index={this.props.index} />
        <Button buttonFunction={() => this.props.onSectionRemoved(this.props.index)} buttonType='X'>X</Button>
        <Button buttonFunction={() => this.props.onEdit(this.props.index, false)} buttonType='Check'><FontAwesomeIcon icon="check-square" /></Button>
      </div>
      {SecDiv}
      </div>
    </div>
  }
}


const mapStateToProps = state => {
  return {
    sections: state.sections,
    sectionDrag: state.sectionDrag,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    // onSectionDrag: () => dispatch({type: actionTypes.MOVE_SECTION, sectionDrag: 'true'}),
    onMoveSection: (e, ind) => dispatch({type: actionTypes.MOVE_SECTION, e: e, ind: ind}),
    onSectionRemoved: (secIndex) => dispatch({type: actionTypes.REMOVE_SECTION, index: secIndex}),
    onEdit: (index, edit) => dispatch({type: actionTypes.EDITABLE,index: index, edit: edit}),
    onChangeColor: (index, color) => dispatch({type: actionTypes.UPDATE_COLOR, index: index, color: color}),
    onSectionDrag: (bool) => dispatch({type: actionTypes.SECTION_DRAG, bool: bool}),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Section);
