import React from 'react';
import './Edit.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//importing Redux
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';

const Edit = (props) => (
    <div>
      <button className='Edit' onClick={() => props.onEdit(props.index)}><FontAwesomeIcon icon="edit" /></button>
    </div>
    
)

 //Import Redux Functions
 const mapDispatchToProps = dispatch => {
    return {
      onEdit: (index) => dispatch({type: actionTypes.EDITABLE, index: index, edit: true}),
    }
  }

  export default connect(null, mapDispatchToProps)(Edit);