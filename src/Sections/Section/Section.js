import React, {Component} from "react";
import "./Section.css";
import Content from "../../Content/Content";
import Measure from '../../Components/Measure/Measure'
// import Text from "../../Components/Text/Text";

class Section extends Component {

  state = {
    xPos: 0,
    yPos: 0
  };

  xSlide = (e) => {
      this.setState({xPos: e.target.value});
}

ySlide = (e) => {
  this.setState({yPos: e.target.value});
}

  render() {

    
    
    let SecDiv = null;
    let xMax = 205;
    let yMin = 205;
    if (Number(this.state.xPos) - Number(this.state.yPos)  > 199){
      xMax = 205 - 40;
      console.log(xMax)
    }else {
      xMax = 205;
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
              <div style={{width: Number(this.state.xPos) + 565}} className="half">
              <Measure>{ Number(this.state.xPos) + 565} px</Measure>
                {/* <Text /> */}
                <Content />
              </div>
              <div className="ground">
                  <div className="halfWidth">
                    <input onChange={this.xSlide} className="halfDivider" step={2} min={-390} max={390} type="range" />
                  </div>
              </div>
              <div style={{width: (-this.state.xPos) + 565}} className="half">
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
              <div style={{width: Number(this.state.xPos) + 360}} className="third">
              <Measure>{Number(this.state.xPos) + 360} px</Measure>
                {/* <Text /> */}
                <Content />
              </div>
              <div className="ground">
                  <div className="thirdWidth">
                    <input onChange={this.xSlide} className="thirdDividerL" step={2} min={-205} max={xMax} type="range" />
                  </div>
              </div>
              <div style={{width: 360 + Number(this.state.yPos) - Number(this.state.xPos)}} className="third">
              <Measure>{360 + Number(this.state.yPos) - Number(this.state.xPos)} px</Measure>
                {/* <Text /> */}
                <Content />
              </div>
              <div className="ground">
                  <div className="thirdWidth">
                    <input onChange={this.ySlide} className="thirdDividerR" step={2} min={-yMin} max={205} type="range" />
                  </div>
              </div>
              <div style={{width: 360 - (this.state.yPos)}} className="third">
              <Measure>{360 - (this.state.yPos)} px</Measure>
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

      return(
          <>
        {SecDiv}
        </>
    );
  }
};

export default Section;
