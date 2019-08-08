import React from 'react';
import './Check.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//importing Redux
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';

const Check = (props) => (
    <div>
      <button className='Check' onClick={() => props.onEdit(props.index)}><FontAwesomeIcon icon="check-square" /></button>
    </div>
    
)

 //Import Redux Functions
 const mapDispatchToProps = dispatch => {
    return {
      onEdit: (index) => dispatch({type: actionTypes.EDITABLE,index: index, edit: false}),
    }
  }

  export default connect(null, mapDispatchToProps)(Check);