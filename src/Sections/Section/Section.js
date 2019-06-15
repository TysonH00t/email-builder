import React, { Component } from "react";
import "./Section.css";
import Content from "../../Content/Content";
import Measure from "../../Components/Measure/Measure";
import X from '../../Components/X/X';

class Section extends Component {
  state = {
    xPos: 0,
    yPos: 0,
    xMax: 0
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

  render() {
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
          <div className="outer">
            <div className="whole">
              {/* <Text /> */}
              <Content cIndex={0} cNum={1} index={this.props.index} />
            </div>
          </div>
        );
        break;
      case "2":
        SecDiv = (
          <div className="outer">
            <div
              style={{ width: Number(this.state.xPos) + 565 }}
              className="half"
            >
              <Measure>{Number(this.state.xPos) + 565} px</Measure>
              {/* <Text /> */}
              <Content cIndex={0} cNum={2} index={this.props.index} />
            </div>
            <div className="ground">
              <div className="halfWidth">
                <input
                  onChange={this.xSlide}
                  className="halfDivider"
                  step={2}
                  min={-390}
                  max={390}
                  type="range"
                />
              </div>
            </div>
            <div style={{ width: -this.state.xPos + 565 }} className="half">
              <Measure>{-this.state.xPos + 565} px</Measure>
              {/* <Text /> */}
              <Content cIndex={1} cNum={2} index={this.props.index} />
            </div>
          </div>
        );
        break;
      case "3":
        SecDiv = (
          <div className="outer">
            <div
              style={{ width: Number(this.state.xPos) + 360 }}
              className="third"
            >
              <Measure>{Number(this.state.xPos) + 360} px</Measure>
              {/* <Text /> */}
              <Content cIndex={0} cNum={3} index={this.props.index} />
            </div>
            <div className="ground">
              <div className="thirdWidth">
                <input
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
                width: 360 + Number(this.state.yPos) - Number(this.state.xPos)
              }}
              className="third"
            >
              <Measure>
                {360 + Number(this.state.yPos) - Number(this.state.xPos)} px
              </Measure>
              {/* <Text /> */}
              <Content cIndex={1} cNum={3} index={this.props.index} />
            </div>
            <div className="ground">
              <div className="thirdWidth">
                <input
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
            <div style={{ width: 360 - this.state.yPos }} className="third">
              <Measure>{360 - this.state.yPos} px</Measure>
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
    return <div className="frame"><X index={this.props.index} />{SecDiv}</div>;
  }
}

export default Section;
