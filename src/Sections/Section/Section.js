import React, { Component } from "react";
import "./Section.css";
import Content from "../../Content/Content";
import Measure from "../../Components/Measure/Measure";
import Move from '../../Components/Move/Move';
import Colors from '../../Components/Colors/Colors';
import X from '../../Components/X/X';

import { connect } from 'react-redux';

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

 

  render() {
    let color = this.props.sections[this.props.index].backgroundColor;
    let SecDiv = null;
    //Setting max and mins for each slider depending on where the other slider is
    if (
      this.state.xPos > 101 &&
      Number(this.state.yPos) > 1 &&
      Number(this.state.xPos) - Number(this.state.yPos) < 205 &&
      Number(this.state.xMax) !== 103
    ) {
      this.setState({ xMax: 103 });
    } else if (
      Number(this.state.xPos) < 101 &&
      Number(this.state.yPos) > 0 &&
      Number(this.state.xMax) !== 0
    ) {
      this.setState({ xMax: 0 });
    }
    if (
      this.state.xPos < 0 &&
      Number(this.state.yPos) < 1 &&
      Number(this.state.xPos) - Number(this.state.yPos) < 205 &&
      Number(this.state.xMax) !== -103
    ) {
      this.setState({ xMax: -103 });
    }
    //Setting up a switch to decide how many Content pieces will be contained in this Section
    switch (this.props.division) {
      case "1":
        SecDiv = (
          <div className="outer"  style={{background: color}}>
            <div className="whole"  style={{background: color}}>
              {/* <Text /> */}
              <Content cIndex={0} cNum={1} index={this.props.index} />
            </div>
          </div>
        );
        break;
      case "2":
        SecDiv = (
          <div style={{paddingTop: this.state.sliderActive ? '21px' : '50px', background: color}} className="outer">
            <div
              style={{ width: Number(this.state.xPos) + 565, background: 'color' }}
              className="half"
            >
            {!this.state.sliderActive ? null : <Measure>{Number(this.state.xPos) + 565} px</Measure>}
              {/* <Measure>{Number(this.state.xPos) + 565} px</Measure> */}
              {/* <Text /> */}
              <Content cIndex={0} cNum={2} index={this.props.index} />
            </div>
            <div className="ground">
              <div className="halfWidth">
                <input
                  onMouseDown={this.activateMeasure}
                  onMouseUp={this.activateMeasure}
                  onChange={this.xSlide}
                  className="halfDivider"
                  step={2}
                  min={-390}
                  max={390}
                  type="range"
                />
              </div>
            </div>
            <div style={{ width: -this.state.xPos + 565, background: color }} className="half">
            {!this.state.sliderActive ? null : <Measure>{-this.state.xPos + 565} px</Measure>}
              {/* <Text /> */}
              <Content cIndex={1} cNum={2} index={this.props.index} />
            </div>
          </div>
        );
        break;
      case "3":
        SecDiv = (
          <div style={{paddingTop: this.state.sliderActive ? '21px' : '50px', background: color}} className="outer">
            <div
              style={{ width: Number(this.state.xPos) + 360, background: color }}
              className="third"
            >
            {!this.state.sliderActive ? null : <Measure>{Number(this.state.xPos) + 360} px</Measure>}
              {/* <Text /> */}
              <Content cIndex={0} cNum={3} index={this.props.index} />
            </div>
            <div className="ground">
              <div className="thirdWidth">
                <input
                onMouseDown={this.activateMeasure}
                onMouseUp={this.activateMeasure}
                  onChange={this.xSlide}
                  className="thirdDividerL"
                  step={2}
                  min={-205}
                  max={103 + this.state.xMax}
                  defaultValue={0}
                  style={{ width: 308 + this.state.xMax }}
                  type="range"
                />
              </div>
            </div>
            <div
              style={{
                width: 360 + Number(this.state.yPos) - Number(this.state.xPos), background: color
              }}
              className="third"
            >
            {!this.state.sliderActive ? null : <Measure>{360 + Number(this.state.yPos) - Number(this.state.xPos)} px</Measure>}
              
              {/* <Text /> */}
              <Content cIndex={1} cNum={3} index={this.props.index} />
            </div>
            <div className="ground">
              <div className="thirdWidth">
                <input
                onMouseDown={this.activateMeasure}
                onMouseUp={this.activateMeasure}
                  onChange={this.ySlide}
                  className="thirdDividerR"
                  step={2}
                  min={-(102 + -this.state.xMax)}
                  max={205}
                  defaultValue={0}
                  style={{ width: 307 + -this.state.xMax }}
                  type="range"
                />
              </div>
            </div>
            <div style={{ width: 360 - this.state.yPos, background: color }} className="third">
            {!this.state.sliderActive ? null : <Measure>{360 - this.state.yPos} px</Measure>}
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
      {/* <div className="drop" style={{display: !this.props.sectionDrag ? 'none' : 'block'}}></div> */}
      <div className="drop"></div>
      <div className="frame">
      <Move />
        <Colors index={this.props.index} />
      <X index={this.props.index} />
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

export default connect(mapStateToProps, null)(Section);
