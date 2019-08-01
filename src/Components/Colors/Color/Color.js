import React from 'react';
import './Color.css';

//importing Redux
import { connect } from 'react-redux';
import * as actionTypes from '../../../store/actions';

const Color = (props) => {
    return (
        <button className="BackColor" style={{background: props.color}} onClick={() => props.onChangeColor(props.index, props.color)}></button>
    )
}


//Import Redux State

  
  //Import Redux Functions
  const mapDispatchToProps = dispatch => {
    return {
      onChangeColor: (index, color) => dispatch({type: actionTypes.UPDATE_COLOR, index: index, color: color,}),
    }
  }
  
  export default connect(null, mapDispatchToProps)(Color);