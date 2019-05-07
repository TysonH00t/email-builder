import React from "react";
import Container from "./Container/Container";
import Button from "./Button/Button";

const NewContainer = props => {
  return (
    <Container>
      <Button clicked={() => props.clicked("whole")} btnType="gridThird">
        Whole
      </Button>
      <Button clicked={() => props.clicked("half")} btnType="gridThird">
        Half
      </Button>
      <Button clicked={() => props.clicked("third")} btnType="gridThird">
        Thirds
      </Button>
    </Container>
  );
};

export default NewContainer;
