import React from "react";
import Builder from "./Builder/Builder";
import "./App.css";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faBold } from "@fortawesome/free-solid-svg-icons";
import { faItalic } from "@fortawesome/free-solid-svg-icons";
import { faUnderline } from "@fortawesome/free-solid-svg-icons";
import { faCode } from "@fortawesome/free-solid-svg-icons";
import { faListUl } from "@fortawesome/free-solid-svg-icons";
import { faListOl } from "@fortawesome/free-solid-svg-icons";
import { faImages } from "@fortawesome/free-solid-svg-icons";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { faPaintBrush } from "@fortawesome/free-solid-svg-icons";
import { faAlignRight } from "@fortawesome/free-solid-svg-icons";
import { faAlignLeft } from "@fortawesome/free-solid-svg-icons";
import { faAlignCenter } from "@fortawesome/free-solid-svg-icons";
import { faArrowsAlt } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faCheckSquare } from "@fortawesome/free-solid-svg-icons";
import { faColumns } from "@fortawesome/free-solid-svg-icons";

library.add(faBold);
library.add(faItalic);
library.add(faUnderline);
library.add(faCode);
library.add(faListUl);
library.add(faListOl);
library.add(faImages);
library.add(faLink);
library.add(faPaintBrush);
library.add(faAlignRight);
library.add(faAlignLeft);
library.add(faAlignCenter);
library.add(faArrowsAlt);
library.add(faEdit);
library.add(faCheckSquare);
library.add(faColumns);

function App() {
  return (
    <div className="app">
      <h1>Email Builder</h1>
      <Builder />
    </div>
  );
}

export default App;
