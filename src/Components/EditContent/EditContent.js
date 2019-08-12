import React from 'react';
import './EditContent.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//importing Redux
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';

const EditContent = (props) => (
    <div className="EditDiv">
      <button className='EditContent' onClick={() => props.onEdit(props.index)}>&nbsp;+&nbsp;</button>
    </div>
)

 //Import Redux Functions
 const mapDispatchToProps = dispatch => {
    return {
      onEdit: (index) => dispatch({type: actionTypes.EDITABLE,index: index, edit: false}),
    }
  }

  export default connect(null, mapDispatchToProps)(EditContent);