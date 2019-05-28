import React, {Component} from "react";
import './Content.css';

import * as actionTypes from '../store/actions';
import { connect } from 'react-redux';

//import { Value } from 'slate'
import Plain from 'slate-plain-serializer';

class Content extends Component {


 


  render() {
     let newContent = () => {
      content = <p className='pContent'>{Plain.serialize(this.props.content.value)}</p>
     } 


    let showContent = (e) => {
      e.stopPropagation();
      this.props.onContentShow(this.props.index, this.props.cIndex);
  }

    let content = <button onClick={showContent} className="content"><h4>Click to add content</h4></button>
    console.log(this.props.currentSec + 'localindex' + this.props.index)
    if (this.props.displayContent === true && this.props.currentSec === this.props.index) {
      newContent()
    }

    //&& this.props.currentSec.currentSection === this.props.index && this.props.currentSec.currentContent === this.props.cIndex

    return (
      <>
      {content}
      </>
    )
  }


  
};

const mapStateToProps = state => {
  return {
    displayContent: state.displayContent,
    content: state.currentText,
    currentSec: state.currentSelection.currentSection,
    currentCont: state.currentSelection.currentContent,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onContentShow: (secIndex, conIndex) => dispatch({type: actionTypes.SHOW_CONTENT, index: secIndex, cIndex: conIndex}),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Content);
