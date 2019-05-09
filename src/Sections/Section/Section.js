import React, {Component} from "react";
import "./Section.css";
import Content from "../../Content/Content";
// import Text from "../../Components/Text/Text";

class Section extends Component {

  state = {

  };


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
              <div className="half">
                {/* <Text /> */}
                <Content />
              </div>
              <div className="divider"></div>
              <div className="half">
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
              <div className="third">
                {/* <Text /> */}
                <Content />
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
