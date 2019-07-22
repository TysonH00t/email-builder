import React, {Component} from "react";

//Import Components
import './Content.css';

//Import Redex
import * as actionTypes from '../store/actions';
import { connect } from 'react-redux';

import { convertToHTML } from "draft-convert";

class Content extends Component {

  render() {

    //let bool = false;
    let showContent = (e) => {
      //Stop event bubbling
      e.stopPropagation();
      this.props.onContentShow(this.props.index, this.props.cIndex, this.props.cNum);
      
  }
    let content = <button onClick={showContent} className="content"><h4>Click to add content</h4></button>

    let tempContent = this.props.sections[this.props.index];
    if (tempContent.content[this.props.cIndex].content !== '') {
      // content = new Html ({
      //   rules: rules,
      //   defaultBlock: String | Object,
      //   parseHtml:
      // })
      // content = Html.serialize(this.props.currentText.value);
      // content = html.serialize(this.props.currentText.value);
      // content = String(html.serialize(this.props.currentText.value));
      content = <div dangerouslySetInnerHTML={{__html: convertToHTML({
        styleToHTML: style => {
          if (style === "BOLD") {
            return <span style={{ color: "blue" }} />;
          }
        },
        blockToHTML: block => {
          if (block.type === "PARAGRAPH") {
            return { element: <p />, empty: <br /> };
          }
          if (block.type === "atomic") {
            return {
              start: "",
              end: ""
            };
          }
        },
        entityToHTML: (entity, originalText) => {
          if (entity.type === "LINK") {
            return <a href={entity.data.url}>{originalText}</a>;
          }
          if (entity.type === "image") {
            return <img alt="" src={entity.data.src} />;
          }
          return originalText;
        }
      })(tempContent.content[this.props.cIndex].content.editorState.getCurrentContent())}} />
      
      
      

      // content = <p>
      //   {tempContent.content[this.props.cIndex].content}
      // </p>
    }

    return (
      <>
      {content}
      </>
    )
  }


  
};

const mapStateToProps = state => {
  return {
    sections: state.sections,
    currentText: state.currentText,
    currentSec: state.currentSelection.currentSection,
    currentCont: state.currentSelection.currentContent,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onContentShow: (secIndex, conIndex, cNum) => dispatch({type: actionTypes.SHOW_CONTENT, index: secIndex, cIndex: conIndex, cNum: cNum}),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Content);
