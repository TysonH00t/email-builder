import React, {Component} from "react";

//Import Components
import './Content.css';

//Import Redex
import * as actionTypes from '../store/actions';
import { connect } from 'react-redux';

//import { Value } from 'slate'
//import Plain from 'slate-plain-serializer';

class Content extends Component {

  render() {

    let bool = false;
    let showContent = (e) => {
      //Stop event bubbling
      e.stopPropagation();
      this.props.onContentShow(this.props.index, this.props.cIndex, this.props.cNum);
      
  }
    let content = <button onClick={showContent} className="content"><h4>Click to add content</h4></button>

    let newContent = () => {
      //content = <p className='pContent'>{String(Plain.serialize(this.props.content.value))}</p>
     //content = <p>Pretend Content</p>
     bool = true;
     } 
    console.log(this.props.currentSec + 'localindex' + this.props.index + " " + this.props.cIndex)

    if (this.props.currentSec === this.props.index) {
      newContent()
    }

    if (bool === true) {
      content = <p>Pretend Content</p>
    }

    // && this.props.currentSec === this.props.index && this.props.currentSec.currentSection === this.props.index && this.props.currentSec.currentContent === this.props.cIndex

    return (
      <>
      {content}
      </>
    )
  }


  
};

const mapStateToProps = state => {
  return {
    content: state.currentText,
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
