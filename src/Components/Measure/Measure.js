import React from "react";
import "./Measure.css";

const Measure = props => {
  //Create measure line above each content piece showing pixel width
  return <div className="measure">{props.children}</div>;
};

export default Measure;
