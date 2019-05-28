import React, {Component} from "react";
import './Content.css';

import * as actionTypes from '../store/actions';
import { connect } from 'react-redux';


class Content extends Component {


 


  render() {

    let content = <button onClick={() => this.props.onContentShow(this.props.index)} className="content"><h4>Click to add content</h4></button>

    if (this.props.displayContent === true) {
      content = <p>somerandomecontent</p>
      console.log(this.props.content.value)
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
    displayContent: state.displayContent,
    content: state.currentText
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onContentShow: (secIndex) => dispatch({type: actionTypes.SHOW_CONTENT, index: secIndex}),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Content);
