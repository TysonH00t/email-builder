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
          //contArray.push({ display: false, content: "" });
        } else {
          
            contArray.push({ display: true, content: this.props.sections[this.props.index].content[i].content, alignment: this.props.sections[this.props.index].content[i].alignment, margin: this.props.sections[this.props.index].content[i].margin });
          
        }
      }

    let content = this.props.sections[this.props.index].edit ? <div>
      <button onClick={showContent} className="content">+</button>
      {/* <button style={{width: this.props.sections[this.props.index].content[this.props.cIndex].margin ? '640px' : '590px', margin: this.props.sections[this.props.index].content[this.props.cIndex].margin ? '0' : '0px 25px 25px 25px'}} onClick={showContent} className="content">+</button> */}
      <Button style={{display: this.props.sections[this.props.index].edit ? 'initial' : 'none'}} buttonFunction={() => this.props.activateContent(this.props.index, contArray)} buttonType='Margin'><FontAwesomeIcon icon="columns" /></Button>
    </div> : <div></div>

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
      content = <div>
        <div style={{textAlign: this.props.sections[this.props.index].content[this.props.cIndex] == '' ? 'left' : this.props.sections[this.props.index].content[this.props.cIndex].alignment}} className="ContentDisplayed">
        {/* <div style={{textAlign: this.props.sections[this.props.index].content[this.props.cIndex] == '' ? 'left' : this.props.sections[this.props.index].content[this.props.cIndex].alignment, width: this.props.sections[this.props.index].content[this.props.cIndex].margin ? '640px' : '590px', margin: this.props.sections[this.props.index].content[this.props.cIndex].margin ? '0' : '0px 25px 25px 25px'}} className="ContentDisplayed"> */}
          <Button buttonFunction={() => this.props.onContentShow(this.props.index, this.props.cIndex, this.props.cNum)} display={this.props.sections[this.props.index].edit ? 'initial': 'none'} buttonType="EditContent"><FontAwesomeIcon icon="edit" /></Button>
          <div dangerouslySetInnerHTML=
          {{__html: convertToHTML({
            styleToHTML: style => {
              // if (style === "BOLD") {
              //   return <strong />;
              // }
              // if (style === "ITALIC") {
              //   return <em />;
              // }
              // if (style === "UNDERLINE") {
              //   return <span style={{ textDecoration: 'underline' }} />;
              // }
              if (style === "blue") {
                return <span style={{ color: '#0078D7' }} />;
              }
              if (style === "white") {
                return <span style={{ color: 'white' }} />;
              }
            },
            blockToHTML: block => {
              console.log('block' + block.type)
              if (block.type === "PARAGRAPH") {
                console.log('paragraph')
                return { element: <p />, empty: '' };
              }
              // if (block.type === "H1") {
              //   return { element: <h1 />, empty: <br /> };
              // }
              // if (block.type === "H2") {
              //   return { element: <h2 />, empty: <br /> };
              // }
              // if (block.type === "H3") {
              //   return { element: <h3 />, empty: <br /> };
              // }
              if (block.type === "unstyled") {
                return {
                  start: "",
                  end: ""
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
              console.log(entity)
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
