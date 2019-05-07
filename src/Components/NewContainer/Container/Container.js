import React from "react";
import "./Container.css";

const Container = props => (
  <div className="gridContainer">{props.children}</div>
);

export default Container;
