import React, {Component} from "react";

//Import Components
import './Content.css';

//Import Redex
import * as actionTypes from '../store/actions';
import { connect } from 'react-redux';

import { convertToHTML } from "draft-convert";
import Button from '../Components/Button/Button';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Content extends Component {

  render() {

    

    //let bool = false;
    let showContent = (e) => {
      //Stop event bubbling
      e.stopPropagation();
      this.props.onContentShow(this.props.index, this.props.cIndex, this.props.cNum);
      
  }

  let contArray = [];
      for (let i = 0; i < this.props.cNum; i++) {
        if (i === this.props.cIndex) {
          contArray.push({ display: true, content: this.props.currentText, alignment: this.props.sections[this.props.index].content[i].alignment, margin: !this.props.sections[this.props.index].content[i].margin});
        } else {
          
            contArray.push({ display: true, content: this.props.sections[this.props.index].content[i].content, alignment: this.props.sections[this.props.index].content[i].alignment, margin: this.props.sections[this.props.index].content[i].margin });
          
        }
      }

    let content = this.props.sections[this.props.index].edit ? <div>
      <button onClick={showContent} className="content">+</button>
      <Button style={{display: this.props.sections[this.props.index].edit ? 'initial' : 'none'}} buttonFunction={() => this.props.activateContent(this.props.index, contArray)} buttonType='Margin'><FontAwesomeIcon icon="columns" /></Button>
    </div> : <div></div>

    let tempContent = this.props.sections[this.props.index];
    if (tempContent.content[this.props.cIndex].content !== '') {
      content = <div>
        <div style={{textAlign: this.props.sections[this.props.index].content[this.props.cIndex] == '' ? 'left' : this.props.sections[this.props.index].content[this.props.cIndex].alignment}} className="ContentDisplayed">
        {/* <div style={{textAlign: this.props.sections[this.props.index].content[this.props.cIndex] == '' ? 'left' : this.props.sections[this.props.index].content[this.props.cIndex].alignment, width: this.props.sections[this.props.index].content[this.props.cIndex].margin ? '640px' : '590px', margin: this.props.sections[this.props.index].content[this.props.cIndex].margin ? '0' : '0px 25px 25px 25px'}} className="ContentDisplayed"> */}
          <Button buttonFunction={() => this.props.onContentShow(this.props.index, this.props.cIndex, this.props.cNum)} display={this.props.sections[this.props.index].edit ? 'initial': 'none'} buttonType="EditContent"><FontAwesomeIcon icon="edit" /></Button>
          <div dangerouslySetInnerHTML=
          {{__html: convertToHTML({
            styleToHTML: style => {
              if (style === "BOLD") {
                return <strong />;
              }
              if (style === "ITALIC") {
                return <em />;
              }
              if (style === "UNDERLINE") {
                return <span style={{ textDecoration: 'underline' }} />;
              }
              if (style === "blue") {
                return <span style={{ color: "#0078D7" }} />;
              }
              if (style === "white") {
                return <span style={{ color: "white" }} />;
              }
            },
            blockToHTML: block => {
              if (block.type === "header-one") {
                return {
                  start:
                    '<h1 style="margin: 0px; font-size:37px; font-family: &#39;Segoe UI&#39;; color: #505050;text-align: ' +
                    this.props.sections[this.props.index].content[this.props.cIndex].alignment +
                    ';">',
                  end: "</h1>",
                  empty: ""
                };
              }
              if (block.type === "header-two") {
                return {
                  start:
                    '<h2 style="margin: 0px; font-size:28px; font-family: &#39;Segoe UI&#39;; color: #505050;text-align: ' +
                    this.props.sections[this.props.index].content[this.props.cIndex].alignment +
                    ';">',
                  end: "</h2>",
                  empty: ""
                };
              }
              if (block.type === "header-three") {
                return {
                  start:
                    '<h3 style="margin: 0px; font-size:20px; font-family: &#39;Segoe UI&#39;; color: #505050;text-align: ' +
                    this.props.sections[this.props.index].content[this.props.cIndex].alignment +
                    ';">',
                  end: "</h3>",
                  empty: ""
                };
              }
              if (block.type === "paragraph") {
                return {
                  start:
                    '<p style="margin: 0px; font-size:16px; font-family: &#39;Segoe UI&#39;; color: #505050;text-align: ' +
                    this.props.sections[this.props.index].content[this.props.cIndex].alignment +
                    ';">',
                  end: "</p>",
                  empty: ""
                };
              }
              if (block.type === "unordered-list-item") {
                return {
                  start:
                    '<li style="margin: 0px; font-size:16px font-family: &#39;Segoe UI&#39;; color: #505050;">',
                  end: "</li>",
                  empty: "",
                  nest: <ul />,
                };
              }
              if (block.type === "ordered-list-item") {
                  return {
                    start:
                      '<li style="margin: 0px; font-size:16px font-family: &#39;Segoe UI&#39;; color: #505050;">',
                    end: "</li>",
                    empty: "",
                    nest: <ol />
                  };
                }
              if (block.type === "unstyled") {
                return {
                  start:
                    '<p style="margin: 0px; font-size:16px font-family: &#x27Segoe UI&#x27; color: #505050;text-align:' +
                    this.props.sections[this.props.index].content[this.props.cIndex].alignment +
                    '">',
                  end: "</p>",
                  empty: ""
                };
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
        </div>
        <Button display={this.props.sections[this.props.index].edit ? 'initial' : 'none'} buttonFunction={() => this.props.activateContent(this.props.index, contArray)} buttonType='Margin'><FontAwesomeIcon icon="columns" /></Button>
      </div>

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
    onContentShow: (secIndex, conIndex, cNum) => dispatch({type: actionTypes.SHOW_EDITOR, index: secIndex, cIndex: conIndex, cNum: cNum}),
    activateContent: (secIndex, cArray) =>
      dispatch({
        type: actionTypes.ACTIVATE_CONTENT,
        index: secIndex,
        cArray: cArray,
      })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Content);
