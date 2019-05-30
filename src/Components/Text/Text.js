import React, {Component} from 'react';
import TextEditor from './TextEditor/TextEditor';
import './Text.css';

import * as actionTypes from '../../store/actions';
import { connect } from 'react-redux';

class Text extends Component {


    render() {

    let stopEvent = (e) => {
        e.stopPropagation();
    }

    let combinedFunc = () => {
      this.props.onContentShow(this.props.currentSec, this.props.currentCont, this.props.currentContNum);
      let contArray = [];
      for (let i = 0; i < this.props.currentContNum; i++) {
        if (i !== this.props.currentCont) {
            contArray.push({display: false, content: '',})
        } else {
            contArray.push({display: true, content: '',})
        }
      }
      console.log(contArray);
      this.props.activateContent(this.props.currentSec, contArray);
    }

    return(
    <div onClick={combinedFunc} className="background">
        <div onClick={stopEvent} className='text'>
            <TextEditor />
        </div>
    </div>
    )
    }
}

const mapStateToProps = state => {
    return {
      currentSec: state.currentSelection.currentSection,
      currentCont: state.currentSelection.currentContent,
      currentContNum: state.currentSelection.contentNumber
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
      onContentShow: (secIndex, conIndex, cNum) => dispatch({type: actionTypes.SHOW_CONTENT, index: secIndex, cIndex: conIndex, cNum: cNum}),
      activateContent: (secIndex, cArray) => dispatch({type: actionTypes.ACTIVATE_CONTENT, index: secIndex, cArray: cArray}),
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Text);