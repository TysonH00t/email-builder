import React from "react";
import "./Plus.css";

const Plus = props => (
  <button
    onClick={props.showGrid}
    className={props.gridShowing ? "plus rotate" : "plus"}
  >
    +
  </button>
);

export default Plus;
