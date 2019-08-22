import React, {Component} from "react";
import "./Button.css";

const Button = (props) =>  {

    return(
      <button
      onClick={() => props.buttonFunction(props.variable)}
      className={props.buttonType}
      style={{background: props.color, display: props.display}}
      draggable={props.buttonDraggable}
      onDragEnd={props.buttonDragEnd}
      onDragStart={props.buttonDragStart}
    >
      {props.children}
    </button>
    )
    }

export default Button;
