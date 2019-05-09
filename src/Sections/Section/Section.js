import React, {Component} from "react";
import "./Section.css";
import Content from "../../Content/Content";
import Measure from '../../Components/Measure/Measure'
// import Text from "../../Components/Text/Text";

class Section extends Component {

  state = {
    xHalfPos: 0,
    xThirdPos: 0,
    yThirdPos: 0
  };

  halfSlide = (e) => {
      this.setState({xHalfPos: e.target.value});
}

  render() {

    
    
    let SecDiv = null;

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
              <div style={{width: Number(this.state.xHalfPos) + 565}} className="half">
              <Measure>{ Number(this.state.xHalfPos) + 565}</Measure>
                {/* <Text /> */}
                <Content />
              </div>
              <div className="ground">
                  <input onChange={this.halfSlide} className="halfDivider" step={2} min={-390} max={390} type="range" />
              </div>
              <div style={{width: (-this.state.xHalfPos) + 565}} className="half">
              <Measure>{-this.state.xHalfPos + 565}</Measure>
                {/* <Text /> */}
                <Content />
              </div>
            </div>
          );
          break;
        case "third":
          SecDiv = (
            <div className="outer">
              <div className="third">
                {/* <Text /> */}
                <Content />
              </div>
              <div className="ground">
                  <input onChange={this.halfSlide} className="thirdDividerL" step={2} min={-390} max={390} type="range" />
              </div>
              <div className="third">
                {/* <Text /> */}
                <Content />
              </div>
              <div className="ground">
                  <input onChange={this.halfSlide} className="thirdDividerR" step={2} min={-390} max={390} type="range" />
              </div>
              <div className="third">
                {/* <Text /> */}
                <Content />
              </div>
            </div>
          );
          break;
        default:
          SecDiv = null;
      }

      return(
          <>
        {SecDiv}
        </>
    );
  }
};

export default Section;
