import React, { Component } from "react";
import "./Section.css";
import Content from "../../Content/Content";
import Measure from "../../Components/Measure/Measure";
// import Text from "../../Components/Text/Text";

class Section extends Component {
  state = {
    xPos: 0,
    yPos: 0,
    xMax: 0
  };

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

    switch (this.props.division) {
      case "whole":
        SecDiv = (
          <div className="outer">
            <div className="whole">
              {/* <Text /> */}
              <Content />
            </div>
          </div>
        );
        break;
      case "half":
        SecDiv = (
          <div className="outer">
            <div
              style={{ width: Number(this.state.xPos) + 565 }}
              className="half"
            >
              <Measure>{Number(this.state.xPos) + 565} px</Measure>
              {/* <Text /> */}
              <Content />
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
              <Content />
            </div>
          </div>
        );
        break;
      case "third":
        SecDiv = (
          <div className="outer">
            <div
              style={{ width: Number(this.state.xPos) + 360 }}
              className="third"
            >
              <Measure>{Number(this.state.xPos) + 360} px</Measure>
              {/* <Text /> */}
              <Content />
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
              <Content />
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
              <Content />
            </div>
          </div>
        );
        break;
      default:
        SecDiv = null;
    }

    return <>{SecDiv}</>;
  }
}

export default Section;
