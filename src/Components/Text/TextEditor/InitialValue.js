import { Value } from "slate";

//Initial values
const initialValue = Value.fromJSON({
  document: {
    nodes: [
      {
        object: "block",
        type: "paragraph",
        nodes: [
          {
            object: "text",
            leaves: [
              {
                text: "My first paragraph!"
              }
            ]
          }
        ]
      }
    ]
  }
});

export default initialValue;
