import React, {Component} from "react";
import "./X.css";

import * as actionTypes from '../../store/actions';
import { connect } from 'react-redux';

class X extends Component {

  render () {

    return(
      <button
      onClick={() => this.props.onSectionRemoved(this.props.index)}
      className={"x"}
    >
      X
    </button>
    )
    }
  }

  const mapDispatchToProps = dispatch => {
    return {
      onSectionRemoved: (secIndex) => dispatch({type: actionTypes.REMOVE_SECTION, index: secIndex})
    }
  }

export default connect(null, mapDispatchToProps)(X);
