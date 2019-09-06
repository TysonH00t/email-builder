import React from "react";
import "./NewContainer.css"
import Container from "./Container/Container";
import Button from "./Button/Button";

const NewContainer = props => {
  
  return (
    //A scetion adder with 3 options
    <Container>
      <Button clicked={() => props.clicked("1", [{display: false, content: '', alignment: 'left', margin: false}])} btnType="gridThird one">
        <div className="one"></div>
      </Button>
      <Button clicked={() => props.clicked("2", [{display: false, content: '', alignment: 'left', margin: false},{display: false, content: '', alignment: 'left', margin: false}])} btnType="gridThird">
      <div className="two"></div><div className="two"></div>
      </Button>
      <Button clicked={() => props.clicked("3", [{display: false, content: '', alignment: 'left', margin: false},{display: false, content: '', alignment: 'left', margin: false},{display: false, content: '', alignment: 'left', margin: false}])} btnType="gridThird">
      <div className="three"></div><div className="three"></div><div className="three"></div>
      </Button>
    </Container>
  );
};

export default NewContainer;
